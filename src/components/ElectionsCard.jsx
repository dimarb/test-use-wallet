import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { CardMedia } from '@mui/material';
import { useWallet } from '@txnlab/use-wallet-react';
import { GetVotes } from '../services/GetVotes';
import { useState } from 'react';

const ElectionsCard = ({ candidate, onVote }) => {
  console.log('candidate:', candidate);
  const { wallets, activeWallet, activeAccount, algodClient, activeAddress, transactionSigner } = useWallet();
  const [votes, setVotes] = useState(null);

  const fetchVotes = async (candidateAddress) => {
      try {
        // Verificar que activeAddress y transactionSigner estén disponibles
        if (!activeAddress || !transactionSigner) {
          throw new Error('La billetera no está conectada correctamente.');
        }

        // Llamar a GetVotes para obtener los votos
        console.log(candidateAddress);
        const resultVotes = await GetVotes([candidateAddress], algodClient, activeAddress, transactionSigner);
        console.log('Resultado de los votos:', resultVotes);
        if (resultVotes){
          console.log('Resultado de los votos:------>', resultVotes.methodResults[0].returnValue[4]);
          const votesBigInt = resultVotes?.methodResults[0]?.returnValue[4];
          const votesNumber = Number(votesBigInt);  // Convertir de BigInt a número
          setVotes(votesNumber);  // Guardar el número en el estado
        }
      } catch (error) {
        console.error('Error al obtener los votos:', error);
      }
    };
  return (
    <Card sx={{ width: 200, margin: '1rem' }}>
        <CardMedia
        style={{ maxHeight: 140, objectFit: 'contain' }}
        component="img"
        alt={candidate.name}
        height="140"
        image="https://media.istockphoto.com/id/1399395748/es/foto/alegre-mujer-de-negocios-con-gafas-posando-con-las-manos-bajo-la-cara-mostrando-su-sonrisa-en.jpg?s=612x612&w=0&k=20&c=0y9KGEHKrwRUhZX2b7OH-SPUJ9t_HPf9Dle5khT77bg="
        />
      <CardContent>
        <Typography sx={{ height: 55 }} gutterBottom variant="h6" component="div">
          {candidate[1]+' '+candidate[2]}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary',
          overflow: 'hidden', 
          textOverflow: 'ellipsis', 
          whiteSpace: 'nowrap', 
          maxWidth: '100%' }}>
          Id: {candidate[0]} 
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          email: {candidate[3]}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          cellphone number: {candidate[4]}
        </Typography>
        {votes !== null && (
        <Typography variant="body2" sx={{ color: 'blue', marginBottom: '1rem'}}>
            Votes: {votes}
        </Typography>
        )}
        <Button variant="contained" color="primary" onClick={() => fetchVotes(candidate[0])}>
          View Votes
        </Button>

      </CardContent>
      <CardActions style={{display: 'flex', justifyContent: 'center'}}>
        <Button variant='outlined' sx={{ fontSize: '1.2rem', padding: '1rem 3.5rem' }} onClick={() => onVote(candidate[0])}>
          Vote
        </Button>
      </CardActions>
    </Card>
  );
};

export default ElectionsCard;
