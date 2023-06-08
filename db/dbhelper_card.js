var  config = require('./dbconfig');
const sql = require('mssql');
const logger = require('/util/logger')

async function getCardImportTransction(transid) {
  try {
    let  pool = await  sql.connect(config);
    let  trans = await  pool.request()
    .input('transid', sql.Int, transid)
    .execute('TO_CLOSED_CARD_GET_TRANSACTION_REPORT');
    return trans.recordsets;
  }
  catch (error) {
    logger.error(error);
    return [];
  }
}

async function getCardImportTransctionDetail(transid) {
  try {
    let  pool = await  sql.connect(config);
    let  trans = await  pool.request()
    .input('transid', sql.Int, transid)
    .execute('TO_CLOSED_CARD_GET_TRANSACTION_DETAIL_REPORT');
    return trans.recordsets;
  }
  catch (error) {
    logger.error(error);
    return [];
  }
}

module.exports = {
  getCardImportTransction:  getCardImportTransction,
  getCardImportTransctionDetail: getCardImportTransctionDetail
}