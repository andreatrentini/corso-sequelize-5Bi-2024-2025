const express = require('express');
const { Op } = require('sequelize');

const db = require('./tabelle/associazioni');

db.sequelize.authenticate()
    .then(() => {
        console.log('Connessione con mysql stabilita.')
    })
    .catch(() => {
        console.log('Errore durante la connessione con mysql.')
    });

db.sequelize.sync()
    .then(() => {
        console.log('Tabelle sincronizzate con successo.');
    })
    .catch(error => {
        console.log('Error:', error)
    })

const app = express();
app.use(express.json());

app.get('/aeroporti', async (req, res) => {
    try {
        const aeroporti = await db.tabelle.Aeroporto.findAll();
        return res.status(200).json(aeroporti);
    }
    catch (error) {
        return res.status(500).json({
            messaggio: 'Errore durante la lettura dei dati.',
            errore: error 
        })
    }
})

app.get('/categoria',async (req, res) => {
    try {
        const categorie = await db.tabelle.Categoria.findAll();
        return res.status(200).json(categorie);
    }
    catch (error) {
        return res.status(500).json({
            messaggio: 'Errore durante la lettura dei dati.',
            errore: error 
        })
    }
})

app.get('/regione',async (req, res) => {
    try {
        const regioni = await db.tabelle.Regione.findAll();
        return res.status(200).json(regioni);
    }
    catch (error) {
        return res.status(500).json({
            messaggio: 'Errore durante la lettura dei dati.',
            errore: error 
        })
    }
})

app.get('/citta',async (req, res) => {
    try {
        const citta = await db.tabelle.Citta.findAll();
        return res.status(200).json(citta);
    }
    catch (error) {
        return res.status(500).json({
            messaggio: 'Errore durante la lettura dei dati.',
            errore: error 
        })
    }
})

app.get('/aeroporto',async (req, res) => {
    try {
        const aeroporti = await db.tabelle.Aeroporto.findAll({
            include: {
                model: db.tabelle.Volo                
            },
        });
        return res.status(200).json(aeroporti);
    }
    catch (error) {
        return res.status(500).json({
            messaggio: 'Errore durante la lettura dei dati.',
            errore: error 
        })
    }
})

app.get('/volo',async (req, res) => {
    try {
        const voli = await db.tabelle.Volo.findAll();
        return res.status(200).json(voli);
    }
    catch (error) {
        return res.status(500).json({
            messaggio: 'Errore durante la lettura dei dati.',
            errore: error 
        })
    }
})

app.post('/categoria', async (req, res) => {
    try {

        const nuovaCategoria = await db.tabelle.Categoria.create({nome: req.body.nome});
        return res.status(200).json({
            messaggio: 'Inserimento avvenuto con successo',
            dati: nuovaCategoria
        });
    }
    catch (error) {
        return res.status(500).json({
            messaggio: 'Errore durante l\'inserimento dei dati.',
            errore: error 
        })
    }
});

app.post('/regione', async (req, res) => {
    try {

        const nuovaRegione = await db.tabelle.Regione.create({nome: req.body.nome});
        return res.status(200).json({
            messaggio: 'Inserimento avvenuto con successo',
            dati: nuovaRegione
        });
    }
    catch (error) {
        return res.status(500).json({
            messaggio: 'Errore durante l\'inserimento dei dati.',
            errore: error 
        })
    }
});

app.post('/aeroporto', async (req, res) => {
    try {
        const nuovoAeroporto = await db.tabelle.Aeroporto.create({
            codice: req.body.codice,
            nome: req.body.nome,
            fkcategoria: req.body.fkcategoria,
            fkcitta: req.body.fkcitta
        });
        return res.status(200).json({
            messaggio: 'Inserimento avvenuto con successo',
            dati: nuovoAeroporto
        });
    }
    catch (error) {
        return res.status(500).json({
            messaggio: 'Errore durante l\'inserimento dei dati.',
            errore: error 
        })
    }
})

app.post('/citta', async (req, res) => {
    try {
        const nuovaCitta = await db.tabelle.Citta.create({
            nome: req.body.nome,
            numeroabitanti: req.body.numeroabitanti,
            fkregione: req.body.fkregione
        });
        return res.status(200).json({
            messaggio: 'Inserimento avvenuto con successo',
            dati: nuovaCitta
        });
    }
    catch (error) {
        return res.status(500).json({
            messaggio: 'Errore durante l\'inserimento dei dati.',
            errore: error 
        })
    }
});

app.post('/volo', async (req, res) => {
    try {
        const nuovoVolo = await  db.tabelle.Volo.create({
          orariopartenza: req.body.orariopartenza,
          durataminuti: req.body.durataminuti,
          fkaeroportopartenza: req.body.fkaeroportopartenza,
          fkaeroportoarrivo: req.body.fkaeroportoarrivo   
        });
        return res.status(200).json({
            messaggio: 'Inserimento avvenuto con successo',
            dati: nuovoVolo
        });
    }
    catch (error) {
        return res.status(500).json({
            messaggio: 'Errore durante l\'inserimento dei dati.',
            errore: error 
        })
    }
});

app.get('/volo/orario/:ora', async (req, res) => {
    try {

        const ora = req.params.ora;
        const voli = await db.tabelle.Volo.findAll({
            where:  {
                orariopartenza: {
                    [Op.eq]: ora
                }
            }                      
        });
        console.log(voli)
        return res.status(200).json(voli);
    }
    catch (error) {
        return res.status(500).json({
            messaggio: 'Errore durante il recupero dei dati.',
            errore: error 
        })
    };
})

app.get('/volo/giorno/:giorno', async (req, res) => {
    try {

        const giorno = req.params.giorno;
        const voli = await db.tabelle.Volo.findAll({
            where: db.sequelize.where(db.sequelize.fn("day", db.sequelize.col("orariopartenza")),
               {[Op.eq]:giorno})            
        });
        console.log(voli)
        return res.status(200).json(voli);
    }
    catch (error) {
        return res.status(500).json({
            messaggio: 'Errore durante il recupero dei dati.',
            errore: error 
        })
    };
})

app.get('/volo/citta/:citta', async (req, res) => {
    try {
        const voli = await getVoliPerCitta(req.params.citta);
        res.status(200).json(voli);
    }
    catch (error) {
        return res.status(500).json({
            messaggio: 'Errore durante il recupero dei dati.',
            errore: error 
        })
    }
})

async function getVoliPerCitta(idCitta) {
    return await db.tabelle.Volo.findAll({
        include: {
            model: db.tabelle.Aeroporto,
            as: 'partenza',            
            where: {
                fkcitta: idCitta
            }
        }
    })
}

app.listen(3000, () => {
    console.log('Server in attesa di connessioni...')
});

