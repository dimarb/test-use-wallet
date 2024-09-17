// RegisterCandidate.js
import React, { useState } from 'react';
import { useWallet } from '@txnlab/use-wallet-react';
import { SendCandidate } from './services/SendCandidate';

const RegisterCandidate = () => {
  const [candidateAddress, setCandidateAddress] = useState('');
  const [adminAddress, setAdminAddress] = useState('');
  const [isCandidateLoggedIn, setIsCandidateLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const { wallets, activeWallet, activeAccount, algodClient, activeAddress, transactionSigner } = useWallet();

  const [errors, setErrors] = useState({});

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleCandidateLogin = async () => {//! Tengo error acá, me pide loguear 2 veces
    if (wallets.length === 0) {
      alert('No hay billeteras disponibles');
      return;
    }

    try {
      const result = await wallets[0].connect(); // Intentar conectar la primera billetera disponible
      if (activeAccount  && result) {
        setCandidateAddress(activeAccount.address); // Guardar la dirección del candidato
        setIsCandidateLoggedIn(true);
        alert('Inicio de sesión de candidato exitoso');
      }
    } catch (error) {
      console.error('Error al conectar:', error);
      alert('Error al iniciar sesión del candidato');
    }
  };

  const handleAdminLogin = async () => {//! Tengo error acá, me pide loguear 2 veces
    if (wallets.length === 0) {
      alert('No hay billeteras disponibles');
      return;
    }

    try {
      const result = await wallets[0].connect(); // Intentar conectar la primera billetera disponible
      if (activeAccount && result) {
        setAdminAddress(activeAccount.address); // Guardar la dirección del administrador
        setIsAdminLoggedIn(true);
        alert('Inicio de sesión de administrador exitoso');
      }
    } catch (error) {
      console.error('Error al conectar:', error);
      alert('Error al iniciar sesión del administrador');
    }
  };
  const validateForm = () => {
    let formErrors = {};

    if (!firstName.trim()) {
      formErrors.firstName = 'First name is required';
    }

    if (!lastName.trim()) {
      formErrors.lastName = 'Last name is required';
    }

    if (!email.trim()) {
      formErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      formErrors.email = 'Email address is invalid';
    }

    if (!phone.trim()) {
      formErrors.phone = 'Phone number is required';
    } else if (phone.length !== 10 || !/^\d+$/.test(phone)) {
      formErrors.phone = 'Phone number must be 10 digits';
    }

    return formErrors;
  };

  const handleRegister = async () => {
    // if (!candidateName || !accountAddress || !peraWallet) {
    //   alert('Please fill in all fields and connect your wallet.');
    //   return;
    // }
    // const validationErrors = validateForm();
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   return;
    // }
    // if (!firstName || !lastName || !email || !phone ) {
    //   alert('Revise los datos');
    //   return;
    // }
    try {
      // Asegúrate de que la billetera esté conectada
      const candidateData = [candidateAddress,
        firstName,
        lastName,
        email,
        phone]
        console.log('candidateData', candidateData, 'a mano', ['MQVVFJTI22UXAZFBZR6MOMKPGAB7HR3A6NC6MCWSB5KK6KF6Q7MQINLDMY', 'Juan', 'Perez', 're@gmai.com', '3216549870'])

      const result = await SendCandidate(candidateData,algodClient, activeAddress, transactionSigner);
      console.log(result);
      if (result) {
        alert(`Candidate ${firstName} ${lastName} registered successfully!`);
        // Reset fields
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setErrors({});
        // Update candidates array in local storage
        const candidates = JSON.parse(localStorage.getItem('candidates')) || [];
        const newCandidate = candidateData;
        candidates.push(newCandidate);
        localStorage.setItem('candidates', JSON.stringify(candidates));
      }

    } catch (error) {
      console.error('Error registering candidate:', error);
      alert('Failed to register candidate.');
    }
  };

  const handleLogout = () => {
    if (activeWallet) {
      activeWallet.disconnect(); // Desconectar la billetera activa
      setCandidateAddress(''); // Limpiar la dirección del candidato
      setAdminAddress(''); // Limpiar la dirección del administrador
      setIsCandidateLoggedIn(false);
      setIsAdminLoggedIn(false);
      alert('Sesión cerrada');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Registro</h2>
      {!isCandidateLoggedIn && !isAdminLoggedIn ? (
        <>
          <button onClick={handleCandidateLogin}>Iniciar sesión como Candidato</button>
          
        </>
      ) : (
        <div>
          {isCandidateLoggedIn && <div>
            <p>Conectado como candidato con la cuenta: {candidateAddress}</p>
            <button onClick={handleAdminLogin}>Iniciar sesión como Administrador</button>
          </div>
          
          }
          {isAdminLoggedIn && <p>Conectado como administrador con la cuenta: {adminAddress}</p>}
          {isAdminLoggedIn &&           <div style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>}
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
            <button onClick={handleRegister}>Register Candidate</button>
          </div>}
          <button onClick={handleLogout}>Cerrar sesión</button>
        </div>
      )}
    </div>
  );
};

export default RegisterCandidate;
