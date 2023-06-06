import './App.css';
import React, { useEffect, useState } from "react";
import { contractABI, contractAddress } from "./utils/constants";
const { ethereum } = window;
const ethers = require("ethers")

function App() {

  const getEthereumContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);
    return contract;
  }

  const [currentAccount, setCurrentAccount] = useState("");
  const [addressTo, setAddressTo] = useState();
  const [msg,setMsg] = useState();
  const [contract,setContract] = useState(getEthereumContract);
  const [msgList,setMsgList] = useState([]);

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return alert("Please install metamask");
      } else {
        const account = await ethereum.request({ method: 'eth_requestAccounts' });
        setCurrentAccount(account);
      }
    } catch (e) {
      throw new Error("no ethereum object");
    }
  }

  const checkIfWalletConnected = async () => {
    try {
      if (!ethereum) {
        return alert("please install metamask");
      } else {
        const account = await ethereum.request({ method: 'eth_accounts' });
        if (account.lenght) {
          setCurrentAccount(account[0]);
        } else {
          console.log("no account found");
        }
      }
    } catch (e) {
      throw new Error("no ethereum object");
    }
  }

  const send = async() => {
    const transaction = await contract.send(addressTo,msg);
    await transaction.wait();
    alert("Message send successfully !");
    showMsg();
  }

  const showMsg = async() => {
    const count = await contract.totalMessageTo(currentAccount[0],addressTo);
    const total = count.toNumber();
    var tmpArr = [];
    let obj;
    for(let i=0; i<total;i++){
      const transaction = await contract.allMessages(currentAccount[0],i);
      obj = {time: (transaction.timestamp).toNumber(),msg: transaction._msg,class: "text-end"};
      if(transaction.to===addressTo){
        tmpArr.push(obj)
      }
    }
    const countRec = await contract.totalMessageTo(addressTo,currentAccount[0]);
    const totalRec = await countRec.toNumber();
    var tempArr = [];
    let objt;
    for(let i=0; i<totalRec; i++){
      const transactionRec = await contract.allMessages(addressTo,i);   
      objt = {time: (transactionRec.timestamp).toNumber(),msg: transactionRec._msg,class: "text-start"};
      if((transactionRec.to).toLowerCase()===currentAccount[0]){
        tempArr.push(objt);
      }
    }
    var arr = [];
    let i=0;
    let j=0;
    while(j<total && i<totalRec){
      if(tempArr[i].time<tmpArr[j].time){
        console.log(tempArr[i].time<tmpArr[j].time)
        arr.push(tempArr[i]);
        i++;
      }else{
        arr.push(tmpArr[j]);
        j++;
      }
      
    }
    while(j<total){
      arr.push(tmpArr[j]);
      j++;
    }
    while(i<totalRec){
      arr.push(tempArr[i]);
      i++;
    }
    console.log(arr)
    setMsgList([...arr]);
  }

  useEffect(() => {
    checkIfWalletConnected();
  }, []);

  useEffect(() => {
    showMsg();
  },[addressTo]);

  return (
    <>
      <div className="text-center">
        <nav class="navbar bg-dark navbar-expand-lg text-light ms-5 me-5 mt-3 ps-4 pe-4">
          <div class="container-fluid">
            <div>Navbar</div>
            <div class="d-flex">
              {!currentAccount ?
                <>
                  <button type='button' className='btn btn-light' onClick={connectWallet}>Connect Wallet</button>
                </> :
                <>
                  {currentAccount}
                </>
              }
            </div>
          </div>
        </nav>
        <div className="mt-4 mb-4">Send message to : <input placeholder="Address" onChange={(e) => setAddressTo(e.target.value)} value={addressTo}/></div>
        <textarea  placeholder="Type a Message . . . " onChange={(e) => setMsg(e.target.value)} value={msg}/><br/>
        <button className='btn btn-dark mt-4' onClick={send}>Send</button><br/>
        <div className="mt-5 container">
          <h2>My all chats with : <br/>{addressTo}</h2>
          {
            msgList.map(i => {
              return(
                <>
                <p className={i.class}>{i.msg}</p>
                <p className={i.class}>at {new Date(i.time).getHours()}:{new Date(i.time).getMinutes()}:{new Date(i.time).getSeconds()}</p>
                </>
              )
            })
          }
          
        </div>
      </div>
    </>
  );
}

export default App;
