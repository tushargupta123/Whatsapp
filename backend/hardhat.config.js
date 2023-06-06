require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.18",
  networks:{
    goerli:{
      url: "https://eth-goerli.g.alchemy.com/v2/ykNx0Yycb7C2hbM4nZhTtjDVfcsZP-z_",
      accounts: ['846e01f67c64b6072d1cc40efb3a1f876b5b9b3ae7d1dbeb91669d6554d0d06f']
    },
    sepolia:{
      url:"https://eth-sepolia.g.alchemy.com/v2/HsEZF53JtTFwkBp_RXOQCevOOgPyoYjL",
      accounts:['846e01f67c64b6072d1cc40efb3a1f876b5b9b3ae7d1dbeb91669d6554d0d06f']
    }
  }
};
