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
    ADDCAR: "addCar",
  },
  LICENSES: {
    INIT: "init",
    GETLICENSES: "getLicenses",
    ADDDRIVERLICENSE: "addDriverToLicense",
  },
};
