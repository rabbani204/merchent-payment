

import DataTypes from 'sequelize'
import {msdb as sequelize} from '../config/database'

const SW_TBL_MERCHANT_MENU = sequelize.define('SW_TBL_MERCHANT_MENU', {
    Menu_Code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    Menu_Name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Menu_Description: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Parent: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
    },
    Menu_Order:{
        type: DataTypes.INTEGER
    },
    Menu_Banner:{
        type: DataTypes.STRING(100),
    }
}, {
    tableName: 'SW_TBL_MERCHANT_MENU',
    freezeTableName: true,
    timestamps: false
});

module.exports = SW_TBL_MERCHANT_MENU;
