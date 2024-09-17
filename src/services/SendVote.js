import  algosdk  from 'algosdk'

const appId = 722209123
const method = {
  "name": "vote",
  "args": [
    {
      "name": "candidate",
      "type": "address"
    }
  ],
  "returns": {
    "type": "void"
  }
}

export async function SendVote(addressCandidate, algodClient, activeAddress, transactionSigner) {
  console.log('Avanzó ss --s', addressCandidate)
  if (!addressCandidate) {
    console.error('Candidate address is required');
    return;
  }
  const methodArgs = [addressCandidate]; 
  console.log('Votación iniciada con argumentos:', methodArgs);


    const atc = new algosdk.AtomicTransactionComposer()
    const suggestedParams = await algodClient.getTransactionParams().do()
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
    console.log('Resultado del voto:', result);
    return result;

}
