var  config = require('./dbconfig');
const sql = require('mssql');
const logger = require('/util/logger')

async function GetTransAllDateRange(fromDate, toDate) {
  try {
    let  pool = await  sql.connect(config);
    let  trans = await  pool.request()
    .input('StartDate', sql.NVarChar, fromDate)
    .input('EndDate', sql.NVarChar, toDate)
    .execute('TO_CLOSED_TRANSACTION_GETALL_DATERANGE');
    return trans.recordsets;
  }
  catch (error) {
    logger.error(error);
    return [];
  }
}

async function GetTransAllDateRangePaging(fromDate, toDate, PageNum, PageSize) {
  try {
    let  pool = await  sql.connect(config);
    let  trans = await  pool.request()
    .input('StartDate', sql.NVarChar, fromDate)
    .input('EndDate', sql.NVarChar, toDate)
    .input('PageNum', sql.Int, PageNum)
    .input('PageSize', sql.Int, PageSize)
    .execute('TO_CLOSED_TRANSACTION_GETALL_DATERANGE_PAGING');
    return trans.recordsets;
  }
  catch (error) {
    logger.error(error);
    return [];
  }
}

async function GetTransAllDateRangeCount(fromDate, toDate) {
  try {
    let  pool = await  sql.connect(config);
    let  trans = await  pool.request()
    .input('StartDate', sql.NVarChar, fromDate)
    .input('EndDate', sql.NVarChar, toDate)
    .execute('TO_CLOSED_TRANSACTION_GETALL_DATERANGE_COUNT');
    return trans.recordsets;
  }
  catch (error) {
    logger.error(error);
    return [];
  }
}

async function GetAllTransaction(fromDate,toDate,TransDir,Array_TransType,Array_SpecialTransType,LaneIn,LaneOut,Plate,Etag,Array_VehicleType,Array_TicketType,TransID,ErrorType,TollIn,TollOut,Array_Staff,VioStatus) {
  try {
    let  pool = await  sql.connect(config);
    let  trans = await  pool.request()
    .input('StartDate', sql.NVarChar, fromDate)
    .input('EndDate', sql.NVarChar, toDate)
    .input('TransDir', sql.Int, TransDir)
    .input('Array_TransType', sql.NVarChar, Array_TransType)
    .input('Array_SpecialTransType', sql.NVarChar, Array_SpecialTransType)
    .input('LaneIn', sql.Int, LaneIn)
    .input('LaneOut', sql.Int, LaneOut)
    .input('Plate', sql.NVarChar, Plate)
    .input('Etag', sql.NVarChar, Etag)
    .input('Array_VehicleType', sql.NVarChar, Array_VehicleType)
    .input('Array_TicketType', sql.NVarChar, Array_TicketType)
    .input('TransID', sql.NVarChar, TransID)
    .input('ErrorType', sql.NVarChar, ErrorType)
    .input('TollIn', sql.Int, TollIn)
    .input('TollOut', sql.Int, TollOut)
    .input('Array_Staff', sql.NVarChar, Array_Staff)
    .input('VioStatus', sql.Int, VioStatus)
    .execute('TO_CLOSED_TRANSACTION_GETALL');
    return trans.recordsets;
  }
  catch (error) {
    logger.error(error);
    return [];
  }
}

module.exports = {
    GetTransAllDateRange: GetTransAllDateRange,
    GetTransAllDateRangePaging: GetTransAllDateRangePaging,
    GetTransAllDateRangeCount: GetTransAllDateRangeCount,
    GetAllTransaction: GetAllTransaction
}