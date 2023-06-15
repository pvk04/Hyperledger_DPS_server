module.exports.CHANNEL = "blockchain2023";
module.exports.CHAINCODE = "dps";
module.exports.CONTRACTS = {
  USERS: "UserContract",
  LICENSES: "LicensesContract",
};
module.exports.TRANSACTIONS = {
  USERS: {
    INIT: "init",
    GETUSERS: "getUsers",
    GETUSER: "getUser",
    REGISTRATION: "newUser",
    MAKEPENALTY: "makePenalty",
    PAYPENALTY: "payPenalty",
    EXTENDLICENSE: "extendLicense",
    ADDDRIVERLICENSE: "addDriverToLicense",
    ADDCAR: "addCar",
  },
  LICENSES: {
    INIT: "init",
    GETLICENSES: "getLicenses",
  },
};
module.exports.ORGS = {
  USERS: "org1",
  BANK: "org2",
};
module.exports.DATE = new Date();
