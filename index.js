const express = require("express");
const { json } = require("express");
const fabric = require("./fabric");
const cors = require("cors");
const {
  CHANNEL,
  CHAINCODE,
  CONTRACTS,
  TRANSACTIONS,
  ORGS,
  DATE,
} = require("./config");
const { fromBuffer } = require("./fromBuffer");

const app = express();
app.use(cors());
app.use(json());

app.use("/getUsers", async (req, res) => {
  try {
    const wallet = await fabric.createWallet(ORGS.USERS, "admin");
    const gateway = await fabric.createGateway(wallet, "admin", ORGS.USERS);
    const contract = await fabric.getContract(
      gateway,
      CHANNEL,
      CHAINCODE,
      CONTRACTS.USERS
    );
    const userData = await contract.submitTransaction(
      TRANSACTIONS.USERS.GETUSERS
    );

    if (userData) {
      gateway.disconnect();
      return res.json(await fromBuffer(userData));
    }
  } catch (e) {
    console.log(e.errors);
    return res.json({ erorr: e.errors[0].message });
  }
});

app.use("/login", async (req, res) => {
  try {
    const { login, password } = req.body;

    await fabric.loginIdentity(login, password, ORGS.USERS);
    const wallet = await fabric.createWallet(ORGS.USERS, login);
    const gateway = await fabric.createGateway(wallet, login, ORGS.USERS);
    const contract = await fabric.getContract(
      gateway,
      CHANNEL,
      CHAINCODE,
      CONTRACTS.USERS
    );
    const userData = await contract.submitTransaction(
      TRANSACTIONS.USERS.GETUSER,
      login
    );

    if (userData) {
      gateway.disconnect();
      return res.json(await fromBuffer(userData));
    }
  } catch (e) {
    console.log(e.errors);
    return res.json({ erorr: e.errors[0].message });
  }
});

app.use("/registration", async (req, res) => {
  try {
    const { login, password, fio, isDPS, years, unpaidPenaltys, balance } =
      req.body;

    await fabric.registerIdentity(login, password, ORGS.USERS);
    const wallet = await fabric.createWallet(ORGS.USERS, login);
    const gateway = await fabric.createGateway(wallet, login, ORGS.USERS);
    const contract = await fabric.getContract(
      gateway,
      CHANNEL,
      CHAINCODE,
      CONTRACTS.USERS
    );
    const userData = await contract.submitTransaction(
      TRANSACTIONS.USERS.REGISTRATION,
      login,
      fio,
      isDPS,
      years,
      unpaidPenaltys,
      balance
    );

    if (userData) {
      gateway.disconnect();
      return res.json(await fromBuffer(userData));
    }
  } catch (e) {
    console.log(e.errors);
    return res.json({ erorr: e.errors[0].message });
  }
});

app.use("/addLicense", async (req, res) => {
  try {
    const { login, number, validity, category } = req.body;

    const wallet = await fabric.createWallet(ORGS.USERS, "admin");
    const gateway = await fabric.createGateway(wallet, "admin", ORGS.USERS);
    const contract = await fabric.getContract(
      gateway,
      CHANNEL,
      CHAINCODE,
      CONTRACTS.USERS
    );
    const userData = await contract.submitTransaction(
      TRANSACTIONS.USERS.ADDDRIVERLICENSE,
      login,
      number,
      validity,
      category
    );

    if (userData) {
      gateway.disconnect();
      return res.json(await fromBuffer(userData));
    }
  } catch (e) {
    console.log(e.errors);
    return res.json({ erorr: e.errors[0].message });
  }
});

app.use("/extendLicense", async (req, res) => {
  try {
    const { login } = req.body;

    const wallet = await fabric.createWallet(ORGS.USERS, "admin");
    const gateway = await fabric.createGateway(wallet, "admin", ORGS.USERS);
    const contract = await fabric.getContract(
      gateway,
      CHANNEL,
      CHAINCODE,
      CONTRACTS.USERS
    );
    const userData = await contract.submitTransaction(
      TRANSACTIONS.USERS.EXTENDLICENSE,
      login,
      DATE
    );

    if (userData) {
      gateway.disconnect();
      return res.json(await fromBuffer(userData));
    }
  } catch (e) {
    console.log(e.errors);
    return res.json({ erorr: e.errors[0].message });
  }
});

app.use("/payPenalty", async (req, res) => {
  try {
    const { login, penaltyId } = req.body;

    const wallet = await fabric.createWallet(ORGS.USERS, "admin");
    const gateway = await fabric.createGateway(wallet, "admin", ORGS.USERS);
    const contract = await fabric.getContract(
      gateway,
      CHANNEL,
      CHAINCODE,
      CONTRACTS.USERS
    );
    const userData = await contract.submitTransaction(
      TRANSACTIONS.USERS.PAYPENALTY,
      login,
      penaltyId,
      DATE
    );

    if (userData) {
      gateway.disconnect();
      return res.json(await fromBuffer(userData));
    }
  } catch (e) {
    console.log(e.errors);
    return res.json({ erorr: e.errors[0].message });
  }
});

app.use("/makePenalty", async (req, res) => {
  try {
    const { login, license } = req.body;

    const wallet = await fabric.createWallet(ORGS.USERS, "admin");
    const gateway = await fabric.createGateway(wallet, "admin", ORGS.USERS);
    const contract = await fabric.getContract(
      gateway,
      CHANNEL,
      CHAINCODE,
      CONTRACTS.USERS
    );
    const userData = await contract.submitTransaction(
      TRANSACTIONS.USERS.MAKEPENALTY,
      login,
      license,
      DATE
    );

    if (userData) {
      gateway.disconnect();
      return res.json(await fromBuffer(userData));
    }
  } catch (e) {
    console.log(e.errors);
    return res.json({ erorr: e.errors[0].message });
  }
});

app.use("/getDate", (req, res) => {
  res.json(DATE);
});

app.listen(5000, async () => {
  console.log("SERVER RUNNING AT PORT " + 5000);
  try {
    // await fabric.loginIdentity("admin", "adminpw");
    // const wallet = await fabric.createWallet(ORGS.USERS, "admin");
    // const gateway = await fabric.createGateway(wallet, "admin", ORGS.USERS);

    // const users = await fabric.getContract(
    //   gateway,
    //   CHANNEL,
    //   CHAINCODE,
    //   CONTRACTS.USERS
    // );
    // await users.submitTransaction(TRANSACTIONS.USERS.INIT);

    // const licenses = await fabric.getContract(
    //   gateway,
    //   CHANNEL,
    //   CHAINCODE,
    //   CONTRACTS.LICENSES
    // );
    // await licenses.submitTransaction(TRANSACTIONS.LICENSES.INIT);

    // await fabric.registerIdentity("Водитель 1", "123", ORGS.USERS);
    // await fabric.registerIdentity("Водитель 2", "123", ORGS.USERS);
    // await fabric.registerIdentity("Водитель 3", "123", ORGS.USERS);

    setInterval(() => {
      DATE.setDate(DATE.getDate() + 1);
    }, 60000);

    console.log("INIT SUCCESS");
  } catch (e) {
    console.log(e);
  }
});
