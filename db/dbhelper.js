var  config = require('./dbconfig');
const sql = require('mssql');
const logger = require('/util/logger')

async function getApDomain(domainType) {
  try {
    let  pool = await  sql.connect(config);
    let  apdomain = await  pool.request()
    .input('domaintype_parameter', sql.NVarChar, domainType)
    .query("SELECT * from [AP_DOMAIN] where [TYPE] = @domaintype_parameter");
    return  apdomain.recordsets;
  }
  catch (error) {
    logger.error(error);
    return [];
  }
}

module.exports = {
    getApDomain:  getApDomain
}