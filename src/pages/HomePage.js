import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 

function HomePage() {
  return (
    <div className="container">
      <h1>Bienvenue sur la Calculatrice de Patrimoine</h1>
      <p>Utilisez les fonctionnalités ci-dessous pour gérer vos possessions et suivre la valeur de votre patrimoine.</p>
      <div className="homepage-buttons">
        <Link to="/patrimoine">
          <button>Consulter le Patrimoine</button>
        </Link>
        <Link to="/possession">
          <button>Voir les Possessions</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
