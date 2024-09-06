import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage'; 
import PatrimoinePage from './pages/PatrimoinePage';
import PossessionListPage from './pages/PossessionListPage';
import CreatePossessionPage from './pages/CreatePossessionPage';
import UpdatePossessionPage from './pages/UpdatePossessionPage'; 
import './App.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/patrimoine" element={<PatrimoinePage />} />
        <Route path="/possession" element={<PossessionListPage />} />
        <Route path="/possession/create" element={<CreatePossessionPage />} />
        <Route path="/possession/:libelle/update" element={<UpdatePossessionPage />} />
      </Routes>
    </Router>
  );
}

export default App;

