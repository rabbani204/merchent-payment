

import DataTypes from 'sequelize'
import {msdb as sequelize} from '../config/database'

const SW_TBL_PROFILE_MERCHANT = sequelize.define('SW_TBL_PROFILE_MERCHANT', {
    MSISDN: {
        type: DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    Merchant_Name: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    Logo_Image: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    Status:{
       type: DataTypes.SMALLINT,
    }
}, {
    tableName: 'SW_TBL_PROFILE_MERCHANT',
    freezeTableName: true,
    timestamps: false
});

module.exports = SW_TBL_PROFILE_MERCHANT;
