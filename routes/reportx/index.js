const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const logger = require('/util/logger');
const fs = require("fs");
const path = require("path");
var XlsxTemplate = require('xlsx-template');

router.route('/GetReportExcel').post(async (request, response) => {
  logger.info("/GetReportExcel: parameters = " + JSON.stringify(request.body));

  try {
    // read config file
    let rawdata = fs.readFileSync(path.join(process.cwd(), request.body.path + "/config.json"), 'utf8');
    let reportConfig = JSON.parse(rawdata);
    // call beforeRender
    var data = [];
    if(reportConfig.beforeRender !== undefined && reportConfig.beforeRender !== '') {
      const api = require(reportConfig.beforeRender);
      data = await api.beforeRender(request.body);
      logger.info('data.length = '+data.length);
    }
    // Load an XLSX file into memory
    fs.readFile(path.join(process.cwd(), reportConfig.xlsxFile), function(err, datafile) {
      // Create a template
      var template = new XlsxTemplate(datafile);

      // Replacements take place on first sheet
      var sheetNumber = 1;

      // Set up some placeholder values matching the placeholders in the template
      var values = data

      // Perform substitution
      template.substitute(sheetNumber, values);

      // Get binary data
      var xlsx_data = template.generate({ type: 'nodebuffer'});

      // send response
      logger.info('send excel file = '+ xlsx_data.length + ' bytes');
      response.set({'Content-Disposition': `attachment; filename=export.xlsx`, 'Content-Type': 'text/xlsx'});
      response.send(xlsx_data);
    });
  } catch (error) {
    // error
    logger.error(error)
    response.json({ error: error.message});
  }
})

router.route('/CheckingTransaction').post(async (req, res) => {
  try {
    let rawdata = fs.readFileSync(path.join(process.cwd(), req.body.path + "/config.json"), 'utf8');
    let reportConfig = JSON.parse(rawdata);
    // call beforeRender
    var data = [];
    if(reportConfig.beforeRender !== undefined && reportConfig.beforeRender !== '') {
      const api = require(reportConfig.beforeRender);
      data = await api.beforeRender(req.body);
      const url = path.join(__dirname, '/../../public/trans/' + `${req.body.fromDate}-${req.body.toDate}.txt`);
      let text= '';
      data.trans.forEach(e => {
        text += JSON.stringify(e) + "\n";
      })
      fs.writeFileSync(url, text);
      logger.info('data.length = '+data.length);
      res.status(200).send({ message: 'ok' });
    }
    
  } catch (e) {
    res.json({ error: e.message });
  }
})

module.exports = router;