require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks: {
    ganache: {
      url: "http://127.0.0.1:7545", // Ganache RPC URL
      accounts: [
        "0x55ed77c20edc11c39e14c4ced32fad114a8b38c4ddf0424ecfd1fce0431d26bf",
      ],
    },
  }
};
