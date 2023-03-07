import { useState } from "react";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import server from "./server";

const Sign = ({
  address,
  privateKey,
  setPrivateKey,
  setToggleSign,
  toggleSign,
  sendAmount,
  recipient,
  setBalance,
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const setValue = (setter) => (evt) => setter(evt.target.value);
  async function Transfer() {
    try {
      const {
        data: { balance },
      } = await server.post(`send`, {
        sender: address,
        amount: parseInt(sendAmount),
        recipient,
      });
      setBalance(balance);
    } catch (ex) {
      alert(ex.response.data.message);
    }
  }
  async function sign(PRIVATEKEY, ADDRESS) {
    const PublicKey = toHex(secp.getPublicKey(PRIVATEKEY).slice(-20));
    if (PublicKey == ADDRESS) {
      return true;
    } else {
      return false;
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setToggleSign(!toggleSign);
    const isValid = await sign(privateKey, address);
    if (!isValid) {
      setErrorMessage("Invalid signature");
      alert("this is not your account");
    } else {
      setErrorMessage("");
      Transfer();
      // do something else, e.g., submit the form
    }
  }

  return (
    <form className="container transfer sign" onSubmit={handleSubmit}>
      <h2>SIGN THIS TRANSACTION</h2>
      <label>
        enter your privateKey
        <input
          type="password"
          placeholder="enter your privateKey"
          value={privateKey}
          onChange={setValue(setPrivateKey)}
        ></input>
      </label>
      <input type="submit" className="button" value="sign" />
      {errorMessage && <div className="error">{errorMessage}</div>}
    </form>
  );
};

export default Sign;
