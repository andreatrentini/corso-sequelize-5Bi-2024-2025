import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize('aeroporti', 'root', 'cisco', {
    host: 'mysql',
    dialect: 'mysql'   
});

sequelize.authenticate()
    .then(() => {
        console.log('Connessione con mysql stabilita.')
    })
    .catch(() => {
        console.log('Errore durante la connessione con mysql.')
    });