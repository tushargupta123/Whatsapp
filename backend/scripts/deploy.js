const hre = require("hardhat");

const main = async () =>  {
  const Whatsapp = await hre.ethers.getContractFactory("Whatsapp");
  const whatsapp = await Whatsapp.deploy();
  await whatsapp.deployed();
  console.log("whatsapp deployed to : ",whatsapp.address);
}

const runMain = async () => {
  try{
    await main();
    process.exit(0);
  }catch(error){
    console.log(error);
    process.exit(1);
  }
}

runMain();
