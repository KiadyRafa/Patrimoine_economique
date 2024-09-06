import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css'; // Ajoute les styles nécessaires

function UpdatePossessionPage() {
  const { libelle } = useParams(); // Récupère le libelle depuis l'URL
  const [possession, setPossession] = useState({ libelle: '', dateFin: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Récupère les données de la possession via l'API lorsque le composant est monté
    axios.get(`http://localhost:5000/possession/${libelle}`)
      .then(response => {
        if (response.data) {
          setPossession(response.data);
        } else {
          console.error('Possession non trouvée!');
        }
      })
      .catch(error => {
        console.error('Il y a eu une erreur lors de la récupération de la possession:', error);
      });
  }, [libelle]);

  const handleChange = (e) => {
    setPossession({ ...possession, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Envoie les données mises à jour à l'API
    axios.put(`http://localhost:5000/possession/${libelle}`, possession)
      .then(() => {
        navigate('/possession');
      })
      .catch(error => {
        console.error('Il y a eu une erreur lors de la mise à jour de la possession:', error);
      });
  };

  return (
    <div className="container">
      <h1>Mettre à jour la Possession</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="libelle">Libellé:</label>
          <input
            type="text"
            id="libelle"
            name="libelle"
            value={possession.libelle}
            onChange={handleChange}
            disabled // Enlève ce disabled si tu veux permettre la modification du libelle
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateFin">Date de Fin:</label>
          <input
            type="date"
            id="dateFin"
            name="dateFin"
            value={possession.dateFin}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Mettre à Jour</button>
      </form>
    </div>
  );
}

export default UpdatePossessionPage;
