

import DataTypes from 'sequelize'
import {msdb as sequelize} from '../config/database'

const SW_TBL_MERC_MENU_REL = sequelize.define('SW_TBL_MERC_MENU_REL', {

    Merc_Code: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true,
    },
    Menu_Code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    }
}, {
    tableName: 'SW_TBL_MERC_MENU_REL',
    freezeTableName: true,
    timestamps: false
});


module.exports = SW_TBL_MERC_MENU_REL;
