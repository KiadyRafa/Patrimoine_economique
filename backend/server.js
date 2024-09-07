const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const dataFilePath = path.join(__dirname, 'data.json');


const readData = () => {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
};


const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
};

// Get all possessions
app.get('/possession', (req, res) => {
    const data = readData();
    const patrimoine = data.find(item => item.model === 'Patrimoine');
    res.json(patrimoine.data.possessions);
});

// Create a new possession
app.post('/possession', (req, res) => {
    const { libelle, valeur, dateDebut, taux } = req.body;
    const data = readData();
    
    const patrimoine = data.find(item => item.model === 'Patrimoine');
    const newPossession = {
        possesseur: patrimoine.data.possesseur,
        libelle,
        valeur,
        dateDebut,
        dateFin: null,
        tauxAmortissement: taux
    };
    
    patrimoine.data.possessions.push(newPossession);
    writeData(data);
    
    res.json(newPossession);
});

// Update a possession
app.put('/possession/:libelle', (req, res) => {
    const libelle = decodeURIComponent(req.params.libelle);
    const { dateFin } = req.body;
    
    console.log('Libelle reçu:', libelle);

    const data = readData();
    const patrimoine = data.find(item => item.model === 'Patrimoine');
    const possession = patrimoine.data.possessions.find(p => p.libelle === libelle);
    
    console.log('Possession trouvée:', possession);
    
    if (!possession) {
        return res.status(404).json({ message: 'Possession not found' });
    }
    
    possession.dateFin = dateFin;
    writeData(data);
    
    res.json(possession);
});


// Delete a possession
app.delete('/possession/:libelle', (req, res) => {
    const { libelle } = req.params;
    
    const data = readData();
    const patrimoine = data.find(item => item.model === 'Patrimoine');
    
    const possessionIndex = patrimoine.data.possessions.findIndex(p => p.libelle === libelle);
    if (possessionIndex === -1) {
        return res.status(404).json({ message: 'Possession not found' });
    }
    
    patrimoine.data.possessions.splice(possessionIndex, 1);
    writeData(data);
    
    res.status(200).json({ message: 'Possession deleted successfully' });
});

// Close a possession
app.put('/possession/:libelle/close', (req, res) => {
    const { libelle } = req.params;
    
    const data = readData();
    const patrimoine = data.find(item => item.model === 'Patrimoine');
    
    const possession = patrimoine.data.possessions.find(p => p.libelle === libelle);
    if (!possession) {
        return res.status(404).json({ message: 'Possession not found' });
    }
    
    possession.dateFin = new Date().toISOString(); // ou toute autre logique pour clore
    writeData(data);
    
    res.json(possession);
});

// Get patrimoine data for chart
app.get('/patrimoine/range', (req, res) => {
    try {
        const data = readData();
        const patrimoine = data.find(item => item.model === 'Patrimoine');
        
        
        if (!patrimoine) {
            return res.status(404).json({ message: 'Patrimoine not found' });
        }

        
        const chartData = patrimoine.data.possessions.map(p => ({
            date: p.dateDebut, 
            valeur: p.valeur
        }));

        res.json(chartData);
    } catch (error) {
        console.error('Erreur lors de la récupération des données du patrimoine:', error);
        res.status(500).json({ message: 'Erreur lors de la récupération des données' });
    }
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
