import { useWallet } from '@txnlab/use-wallet-react'

const appId = 722023682;

function ViewAllBoxes() {
  const { algodClient } = useWallet()

  const viewBoxes = async () => {
    try {
      // Obtener la lista de todos los nombres de boxes asociados al appId
      const boxesList = await algodClient.getApplicationBoxes(appId).do();
      console.log(boxesList);
      for (let box of boxesList.boxes) {
        const boxName = box.name;
        
        // Obtener los datos del box por nombre
        const boxData = await algodClient.getApplicationBoxByName(appId, boxName).do();

        // Decodificar el nombre del box y su contenido
        const decodedBoxName = new TextDecoder().decode(boxName);
        const decodedBoxData = new TextDecoder().decode(boxData.value);

        console.log(`Box Name: ${decodedBoxName}`);
        console.log(`Box Data: ${decodedBoxData}`);
      }
    } catch (error) {
      console.error("Error al obtener los boxes:", error);
    }
  }

  return <button onClick={viewBoxes}>View All Boxes</button>
}

export default ViewAllBoxes;
