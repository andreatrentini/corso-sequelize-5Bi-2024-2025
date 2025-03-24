const { Model, DataTypes, SMALLINT } = require('sequelize');
const sequelize = require('../config');

class Volo extends Model {}

Volo.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    orariopartenza: {
        type: DataTypes.TIME,        
    },
    durataminuti: {
        type: DataTypes.SMALLINT
    },
    fkaeroportopartenza: {
        type: SMALLINT,
        allowNull: false
    },
    fkaeroportoarrivo: {
        type: DataTypes.SMALLINT,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'Voli',
    modelName: 'Voli',
    timestamps: false
});

module.exports = Volo;