import React, { useState } from 'react';
import axios from 'axios';
import PatrimoineChart from '../components/PatrimoineChart';

function PatrimoinePage() {
  const [dateDebut, setDateDebut] = useState('');
  const [dateFin, setDateFin] = useState('');
  const [jour, setJour] = useState(1);
  const [patrimoineData, setPatrimoineData] = useState([]);

  const handleFetchPatrimoine = () => {
    axios.get('http://localhost:5000/patrimoine/range', {
      params: {
        dateDebut,
        dateFin,
        jour
      }
    })
    .then(response => {
      setPatrimoineData(response.data);
    })
    .catch(error => {
      console.error('Erreur lors de la récupération des données du patrimoine:', error);
    });
  };

  // Trouve la valeur actuelle (la dernière valeur dans les données)
  const getCurrentValue = () => {
    if (patrimoineData.length > 0) {
      // Trier les données par date pour s'assurer que la dernière valeur est correcte
      const sortedData = patrimoineData.sort((a, b) => new Date(b.date) - new Date(a.date));
      return sortedData[0].valeur;
    }
    return 'N/A';
  };

  return (
    <div className="container">
      <h1>Patrimoine</h1>
      <div>
        <input
          type="date"
          value={dateDebut}
          onChange={e => setDateDebut(e.target.value)}
        />
        <input
          type="date"
          value={dateFin}
          onChange={e => setDateFin(e.target.value)}
        />
        <select
          value={jour}
          onChange={e => setJour(parseInt(e.target.value, 10))}
        >
          <option value={1}>Jour</option>
          <option value={7}>Semaine</option>
          <option value={30}>Mois</option>
        </select>
        <button onClick={handleFetchPatrimoine}>Valider</button>
      </div>
      <PatrimoineChart data={patrimoineData} />
      <div className="current-value">
        <h2>Valeur actuelle : {getCurrentValue()} EUR</h2>
      </div>
    </div>
  );
}

export default PatrimoinePage;
