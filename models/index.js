import MERC_MENU_REL from './SW_TBL_MERC_MENU_REL'
import MERCHANT_MENU from './SW_TBL_MERCHANT_MENU'
import PROFILE_MERCHANT from './SW_TBL_PROFILE_MERCHANT'



//one to many relationship.....MERC_MENU_REL has many PROFILE_MERCHANT..
MERC_MENU_REL.hasOne(PROFILE_MERCHANT,{foreignKey:'MSISDN',targetKey:'Merc_Code',as:'merchent'})
//PROFILE_MERCHANT.belongsTo(MERC_MENU_REL,{foreignKey:'MSISDN',targetKey:'Merc_Code',as:'menu'})



module.exports = {MERC_MENU_REL,MERCHANT_MENU,PROFILE_MERCHANT};