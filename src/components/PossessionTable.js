import React from 'react';

function PossessionTable({ possessions, onEdit, onClose }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Libelle</th>
          <th>Valeur</th>
          <th>Date Début</th>
          <th>Date Fin</th>
          <th>Taux</th>
          <th>Valeur Actuelle</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {possessions.map(possession => (
          <tr key={possession.libelle}>
            <td>{possession.libelle}</td>
            <td>{possession.valeur}</td>
            <td>{possession.dateDebut}</td>
            <td>{possession.dateFin || 'N/A'}</td>
            <td>{possession.taux}</td>
            <td>{/* Valeur actuelle calculée */}</td>
            <td>
              <button onClick={() => onEdit(possession.libelle)}>Edit</button>
              <button onClick={() => onClose(possession.libelle)}>Close</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PossessionTable;

