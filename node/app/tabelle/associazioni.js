const sequelize = require('../config');

const Aeroporto = require('./aeroporti');
const Volo = require('./voli');
const Categoria = require('./categorie');
const Regione = require('./regioni');
const Citta = require('./citta');

Aeroporto.hasMany(Volo, {
    foreignKey: 'fkaeroportopartenza'
});

Volo.belongsTo(Aeroporto, {
    as: 'partenza',
    foreignKey: 'fkaeroportopartenza'
});

Aeroporto.hasMany(Volo, {
    foreignKey: 'fkaeroportoarrivo'
});

Volo.belongsTo(Aeroporto, {
    as: 'arrivo',
    foreignKey: 'fkaeroportoarrivo'
});

Aeroporto.belongsTo(Categoria, {
    foreignKey: 'FKCategoria'
});

Categoria.hasMany(Aeroporto, {
    foreignKey: 'fkcategoria'
});

Aeroporto.belongsTo(Citta, {
    foreignKey: 'fkcitta'
})

Citta.hasMany(Aeroporto, {
    foreignKey: 'fkcitta'
})

Citta.belongsTo(Regione, {
    foreignKey: 'fkregione'
});

Regione.hasMany(Citta, {
    foreignKey: 'fkregione'
})


const db = {
    sequelize,
    tabelle: {
        Aeroporto, 
        Volo,
        Categoria,
        Citta,
        Regione
    }
}

module.exports = db;