const { readFileSync } = require("fs");
const { Gateway, Wallets } = require("fabric-network");
const FabricCAServices = require("fabric-ca-client");

module.exports = class Fabric {
  static getConnectionProfile(org) {
    return JSON.parse(readFileSync(`./gateway/connection-${org}.json`));
  }

  static createCA(org) {
    const connectionProfile = this.getConnectionProfile(org);

    const ca =
      connectionProfile.certificateAuthorities[`ca.${org}.example.com`];
    const rootCA = ca.tlsCACerts.pem;

    return new FabricCAServices(
      ca.url,
      {
        trustedRoots: rootCA,
        verify: false,
      },
      ca.name
    );
  }

  static async createWallet(org, login) {
    return await Wallets.newFileSystemWallet(`./wallet/${org}-${login}`);
  }

  static async createGateway(wallet, login, org) {
    const gateway = new Gateway();
    const connectionProfile = this.getConnectionProfile(org);
    await gateway.connect(connectionProfile, {
      identity: login,
      discovery: {
        asLocalhost: true,
        enabled: true,
      },
      wallet,
    });

    return gateway;
  }

  static async getAdmin(org) {
    const wallet = await this.createWallet(org, "admin");
    return await wallet.get(wallet);
  }

  static createIdentity(org, enrollment) {
    const msp = `${org[0].toUpperCase()}${org.slice(1)}MSP`;
    return {
      credentials: {
        certificate: enrollment.certificate,
        privateKey: enrollment.key.toBytes(),
      },
      mspId: msp,
      type: "X.509",
    };
  }

  static async getAdminIdentity(org) {
    const wallet = await this.createWallet(org, "admin");

    const adminIdentity = await wallet.get("admin");

    const provider = wallet
      .getProviderRegistry()
      .getProvider(adminIdentity.type);
    const admin = await provider.getUserContext(adminIdentity, "admin");

    return admin;
  }

  static async registerIdentity(login, password, org = "org1") {
    try {
      const admin = await this.getAdminIdentity(org);

      const ca = this.createCA(org);
      await ca.register(
        {
          enrollmentID: login,
          enrollmentSecret: password,
          maxEnrollments: 2 ** 32,
        },
        admin
      );

      const enrollment = await ca.enroll({
        enrollmentID: login,
        enrollmentSecret: password,
      });

      const identity = this.createIdentity(org, enrollment);

      const wallet = await this.createWallet(org, login);
      await wallet.put(login, identity);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  static async loginIdentity(login, password, org = "org1") {
    const ca = this.createCA(org);
    const enrollment = await ca.enroll({
      enrollmentSecret: password,
      enrollmentID: login,
    });
    const wallet = await this.createWallet(org, login);
    const identity = this.createIdentity(org, enrollment);
    await wallet.put(login, identity);
  }

  static async getContract(gateway, channelName, chaincode, contract) {
    const channel = await gateway.getNetwork(channelName);

    return await channel.getContract(chaincode, contract);
  }
};
