import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from "web3";
import ICOJson from "../src/ICO.json"
import { AbiItem } from "web3-utils";
const address = "0xDcF5373f9ce442a57509C66de4A501D0753fbFb5";
function App() {
  const web3 = new Web3(window.ethereum);
  const [accountMetaMask, setAccountMetaMask] = useState<any>([])
  const [checkAmount, setCheckAmount] = useState("")

  async function connectWallet() {
    try {
      if (!window.ethereum) {
        alert("Please Install the wallet")
      }
      else
        await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts()
      setAccountMetaMask(accounts)
      // chainId = await web3.eth.getChainId()
      console.log("address", accounts[0]);
      // const web3 = new Web3(window.ethereum);
      web3.eth.getChainId().then(console.log);
      // checkChainId();
      return accounts

    } catch (error) {
      console.log(error);
    }


  }
  async function Developer() {
    try {
      const accounts = await web3.eth.getAccounts()

      const contract = new web3.eth.Contract(ICOJson.abi as AbiItem[], address);
      const buyTokenDeveloper = await contract.methods.Developer(accounts[0]).send({ from: accountMetaMask[0] });
      console.log("buyTokenDeveloper", buyTokenDeveloper.events.Transfer.returnValues.value)
    } catch (error) {
      console.log(error)

    }

  }
  const Amount = () => {
    setCheckAmount(checkAmount);
    console.log(checkAmount)
    return checkAmount;
  }
  async function User(amount: any) {
    connectWallet()
    try {
      console.log("amount", amount)
      const contract = new web3.eth.Contract(ICOJson.abi as AbiItem[], address);

      const buyToken = await contract.methods.User().send({ from: accountMetaMask[0], value: amount });
      console.log("buyToken", buyToken)
    }
    catch (error) {
      console.log(error)

    }

  }
  async function Customers(amount: any) {

    await User(amount);


  }
  return (
    <>
      <div className="App">
        <div className='personalClass'>
          <div className='display-flex'>
            <h1>
              Kibi Tokens
            </h1>
          </div>
          <div className='display-flex fontstyle'>
            <h4>The future is here</h4>
          </div>
          <div className='display-flex'>
            <button onClick={() => { connectWallet() }} className='btnclass'>Connect to MetaMask</button>
          </div>
          <div className="col-lg-12 display-flex">

            <form className='vertical-center'>
              <div className="form-group">
                <label className="MintAmount">Amount To Invest</label>

                <input className="form-control display-flex" placeholder="Amount" onChange={event => setCheckAmount(event.target.value)} />

              </div>
            </form>

            <button onClick={() => Customers(checkAmount)} className="submitClass">Invest</button>
            <button onClick={() => Developer()} className="submitClass">Claim</button>


          </div>
        </div>
      </div>
    </>
  );
}

export default App;
