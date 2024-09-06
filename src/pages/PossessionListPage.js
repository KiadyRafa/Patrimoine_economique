import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PossessionListPage() {
  const [possessions, setPossessions] = useState([]);

  useEffect(() => {
    fetchPossessions();
  }, []);

  const fetchPossessions = () => {
    axios.get('http://localhost:5000/possession')
      .then(response => {
        setPossessions(response.data);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des possessions:', error);
      });
  };

  const handleClosePossession = (libelle) => {
    axios.put(`http://localhost:5000/possession/${encodeURIComponent(libelle)}/close`)
      .then(response => {
        console.log('Possession clôturée avec succès:', response.data);
        fetchPossessions();
      })
      .catch(error => {
        console.error('Erreur lors de la clôture de la possession:', error);
      });
  };

  const handleEditPossession = (libelle) => {
    window.location.href = `/possession/${encodeURIComponent(libelle)}/update`;
  };

  const handleGoHome = () => {
    window.location.href = '/'; // Redirige vers la page d'accueil
  };

  const handleDeletePossession = (libelle) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette possession ?')) {
      axios.delete(`http://localhost:5000/possession/${encodeURIComponent(libelle)}`)
        .then(response => {
          console.log('Possession supprimée avec succès:', response.data);
          fetchPossessions(); // Recharger la liste des possessions après la suppression
        })
        .catch(error => {
          console.error('Erreur lors de la suppression de la possession:', error);
        });
    }
  };

  return (
    <div>
      <h1>Liste des Possessions</h1>
      <button onClick={() => window.location.href = '/possession/create'}>
        Créer une nouvelle Possession
      </button>
      <button onClick={handleGoHome} style={{ marginLeft: '10px' }}>
        Retour à l'accueil
      </button>
      <table>
        <thead>
          <tr>
            <th>Libellé</th>
            <th>Valeur</th>
            <th>Date Début</th>
            <th>Date Fin</th>
            <th>Taux</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map((possession, index) => (
            <tr key={index}>
              <td>{possession.libelle}</td>
              <td>{possession.valeur}</td>
              <td>{new Date(possession.date_debut).toLocaleDateString()}</td>
              <td>{possession.date_fin ? new Date(possession.date_fin).toLocaleDateString() : 'N/A'}</td>
              <td>{possession.taux}</td>
              <td>
                <button onClick={() => handleClosePossession(possession.libelle)}>Clôturer</button>
                <button onClick={() => handleEditPossession(possession.libelle)}>Modifier</button>
                <button onClick={() => handleDeletePossession(possession.libelle)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PossessionListPage;
