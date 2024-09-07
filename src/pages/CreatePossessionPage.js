import React, { useState } from 'react';
import axios from 'axios';

function CreatePossessionPage() {
  const [libelle, setLibelle] = useState('');
  const [valeur, setValeur] = useState('');
  const [dateDebut, setDateDebut] = useState('');
  const [taux, setTaux] = useState('');
  const [error, setError] = useState('');

  const handleCreatePossession = () => {
    if (!libelle || !valeur || !dateDebut || !taux) {
      setError('Tous les champs sont obligatoires.');
      return;
    }

    axios.post('http://localhost:5000/possession', {
      libelle,
      valeur,
      dateDebut,
      taux
    })
      .then(response => {
        console.log('Possession créée avec succès:', response.data);
        window.location.href = '/possession';
      })
      .catch(error => {
        console.error('Erreur lors de la création de la possession:', error);
        setError('Une erreur s\'est produite lors de la création de la possession. Veuillez réessayer.');
      });
  };

  return (
    <div>
      <h1>Créer une nouvelle Possession</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input
        type="text"
        placeholder="Libellé"
        value={libelle}
        onChange={e => setLibelle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Valeur"
        value={valeur}
        onChange={e => setValeur(e.target.value)}
      />
      <input
        type="date"
        placeholder="Date de Début"
        value={dateDebut}
        onChange={e => setDateDebut(e.target.value)}
      />
      <input
        type="number"
        placeholder="Taux"
        value={taux}
        onChange={e => setTaux(e.target.value)}
      />
      <button onClick={handleCreatePossession}>Créer</button>
    </div>
  );
}

export default CreatePossessionPage;
