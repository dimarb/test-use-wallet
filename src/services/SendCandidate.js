import { useWallet } from '@txnlab/use-wallet-react'
import  algosdk  from 'algosdk'

const appId = 722180870;
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

export async function SendCandidate(methodArgs,algodClient, activeAddress, transactionSigner) {
  // const { algodClient, activeAddress, transactionSigner } = useWallet()
  console.log('Avanzó ss --s', methodArgs)


    const atc = new algosdk.AtomicTransactionComposer()
    const suggestedParams = await algodClient.getTransactionParams().do()
    //const boxKey = new Uint8Array( Buffer.from( methodArgs[0], 'utf8'));
    const address = algosdk.decodeAddress(methodArgs[0]).publicKey;
    const boxRef = { appIndex: 0, name: address };
    const boxes = [ boxRef ];
    console.log('Avanzó')
    

    atc.addMethodCall({
      method: new algosdk.ABIMethod(method),
      methodArgs: methodArgs,
      boxes,
      suggestedParams,
      sender: activeAddress,
      signer: transactionSigner,
      appID : Number(appId),
    });
    const result = await atc.execute(algodClient, 3);
    console.log(result);
    return result;

}
