import Wallet from "./Wallet";
import Transfer from "./Transfer";
import Sign from "./Sign";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [toggleSign, setToggleSign] = useState(false);
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [Bool, setBool] = useState();
  return (
    <div className="app">
      {toggleSign ? (
        <Sign
          privateKey={privateKey}
          setPrivateKey={setPrivateKey}
          address={address}
          setToggleSign={setToggleSign}
          toggleSign={toggleSign}
          setBool={setBool}
          setBalance={setBalance}
          sendAmount={sendAmount}
          recipient={recipient}
        />
      ) : (
        <></>
      )}
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer
        setToggleSign={setToggleSign}
        toggleSign={toggleSign}
        setBalance={setBalance}
        address={address}
        privateKey={privateKey}
        Bool={Bool}
        sendAmount={sendAmount}
        setSendAmount={setSendAmount}
        recipient={recipient}
        setRecipient={setRecipient}
      />
    </div>
  );
}

export default App;
