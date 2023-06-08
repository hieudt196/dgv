var  config = require('./dbconfig');
const sql = require('mssql');
const logger = require('/util/logger');
const db = require("./sequelize");

async function BienBanCuocDauGia(Asset_id) {
  try {
    let listAsset = await db.sequelize.query('exec REPORT_Bien_Ban_Cuoc_Dau_Gia @Asset_id =:Asset_id', 
            {replacements: { 
              Asset_id: Asset_id
            }});
    return listAsset[0];
  }
  catch (error) {
    logger.error(error);
    return [];
  }
}

module.exports = {
    BienBanCuocDauGia: BienBanCuocDauGia
}