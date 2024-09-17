import  algosdk  from 'algosdk'

const appId = 722209123
const method = {

    "name": "getVotes",
    "args": [
      {
        "name": "candidate",
        "type": "address"
      }
    ],
    "returns": {
      "type": "(string,string,string,string,uint8)"
    }
}

export async function GetVotes(candidateAddress, algodClient, activeAddress, transactionSigner) {
    try {
        // Asegúrate de que la dirección del candidato está proporcionada
        if (!candidateAddress) {
          throw new Error("La dirección del candidato es necesaria para obtener los votos.");
        }
        console.log(candidateAddress)
        const methodArgs = candidateAddress; 
        console.log('Votación iniciada con argumentos:', methodArgs);
      
      
          const atc = new algosdk.AtomicTransactionComposer()
          const suggestedParams = await algodClient.getTransactionParams().do()
          const address = algosdk.decodeAddress(methodArgs[0]).publicKey;
          const boxRef = { appIndex: 0, name: address };
          const boxes = [ boxRef ];
          console.log('Avanzó')
          
      
          atc.addMethodCall({
            method: new algosdk.ABIMethod(method),
            methodArgs: candidateAddress,
            boxes,
            suggestedParams,
            sender: activeAddress,
            signer: transactionSigner,
            appID : Number(appId),
          });
          const result = await atc.execute(algodClient, 3);
          console.log('Resultado de la votación:', result);
          return result;
    

      } catch (error) {
        console.error("Error obteniendo los votos:", error);
        throw error;
      }
}
