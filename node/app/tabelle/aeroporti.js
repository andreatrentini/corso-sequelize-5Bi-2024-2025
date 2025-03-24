const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config');

class Aeroporto extends Model {}

Aeroporto.init({
    codice: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING(20)
    },
    fkcategoria: {
        type: DataTypes.TINYINT,
        allowNull: false
    },
    fkcitta: {
        type: DataTypes.SMALLINT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Aeroporti',
    tableName: 'Aeroporti',
    timestamps: false
})

module.exports = Aeroporto;