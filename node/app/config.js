const  {Sequelize} = require('sequelize');

const config = {
    username: 'root',
    password: 'cisco',
    database:'compagniaaerea',
    host: 'mysql',
    dialect: 'mysql'
}

const sequelize = new Sequelize('compagniaaerea','root', 'cisco', {
    host: 'mysql',
    dialect: 'mysql'
});

module.exports = sequelize;