//! Acá inicia sesión con pera para hacer la votación

import { useEffect, useState } from "react";
import ElectionsCard from "./ElectionsCard";
import { useWallet } from "@txnlab/use-wallet-react";
import { SendVote } from "../services/SendVote";

const VotingComponent = () => {
  const [accountAddress, setAccountAddress] = useState(null);
  const { wallets, activeWallet, activeAccount, algodClient, activeAddress, transactionSigner } = useWallet();
  const [candidates, setCandidates] = useState([]);

  const connectWallet = async () => {
    if (wallets.length === 0) {
      alert('No hay billeteras disponibles');
      return;
    }

    try {
      const result = await wallets[0].connect(); // Intentar conectar la primera billetera disponible
      if (result) {
        setAccountAddress(result[0].address); // Guardar la dirección del administrador
        console.log('Votante', accountAddress);
        alert('Inicio de sesión de exitoso');
      }
    } catch (error) {
      console.error('Error al conectar:', error);
      alert('Error al iniciar sesión');
    }
  };
  const handleVote = async (id) => {
    console.log('Voting for candidate with id:', id);
    

    const result = await SendVote(id, algodClient, activeAddress, transactionSigner);
    console.log("Resultado del voto", result);
  };
    useEffect(() => {
        const storedCandidates = localStorage.getItem("candidates");
    
        if (storedCandidates) {
          setCandidates(JSON.parse(storedCandidates)); // Asignamos los candidatos al estado
          console.log("Candidatos desde local storage:", JSON.parse(storedCandidates));
        } else {
          console.log("No se encontraron candidatos en local storage");
        }
    }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Elections</h1>
      {accountAddress ? (
        <p>Connected as: {accountAddress}</p>
      ) : (
        <button onClick={connectWallet}>Connect Pera Wallet</button>
      )}
            <div className="candidate-list">
        {candidates.map(candidate => (
          <ElectionsCard key={candidate[0]} candidate={candidate} onVote={handleVote} />
        ))}
      </div>
    </div>
  );
};

export default VotingComponent;
