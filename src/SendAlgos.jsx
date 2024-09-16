import { useWallet } from '@txnlab/use-wallet-react'
import  algosdk  from 'algosdk'

const appId = 722023682;
const method = {
  "name": "reigsterCandidate",
  "args": [
    {
      "name": "address",
      "type": "address"
    },
    {
      "name": "fistName",
      "type": "string"
    },
    {
      "name": "lastName",
      "type": "string"
    },
    {
      "name": "email",
      "type": "string"
    },
    {
      "name": "phone",
      "type": "string"
    }
  ],
  "returns": {
    "type": "void"
  }
}

function SendAlgos() {
  const { algodClient, activeAddress, transactionSigner } = useWallet()

  const sendAlgos = async () => {
    const methodArgs = ["XU3ZVMTCP2J4SWXTV5U5RE4DKDABY3M2RH7BGXN7U26NLTIRAKUYIWIETQ", "Pepe", "Gome", "test@some.com", "123456"];
    const atc = new algosdk.AtomicTransactionComposer()
    const suggestedParams = await algodClient.getTransactionParams().do()
    //const boxKey = new Uint8Array( Buffer.from( methodArgs[0], 'utf8'));
    const address = algosdk.decodeAddress(methodArgs[0]).publicKey;
    const boxRef = { appIndex: 0, name: address };
    const boxes = [ boxRef ];
    

    atc.addMethodCall({
      method: new algosdk.ABIMethod(method),
      methodArgs: methodArgs,
      boxes,
      suggestedParams,
      sender: activeAddress,
      signer: transactionSigner,
      appID : Number(appId),
    });


    await atc.execute(algodClient, 3)
  }

  return <button onClick={sendAlgos}>Buy dev a Lavazza ☕️</button>
}

export default SendAlgos