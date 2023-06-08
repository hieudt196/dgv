const express = require('express');
const res = require('express/lib/response');
const router = express.Router();
const logger = require('/util/logger');
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const htmlpdf = require('/util/htmlpdf');

router.route('/GetReportPDF').get(async (request, response) => {
  logger.info("/GetReportPDF: parameters = " + JSON.stringify(request.query));
  
  try {
    // read config file
    let rawdata = fs.readFileSync(path.join(process.cwd(), request.query.path + "/config.json"), 'utf8');
    let reportConfig = JSON.parse(rawdata);
    // call beforeRender
    var data = [];
    if(reportConfig.beforeRender !== undefined && reportConfig.beforeRender !== '') {
      const api = require(reportConfig.beforeRender);
      data = await api.beforeRender(request.query);
      logger.info('data.length = '+data.length);
    }
    // register helper
    if(reportConfig.helperFunctions !== undefined && reportConfig.helperFunctions.length > 0) {
      reportConfig.helperFunctions.forEach(e => {
        logger.info('register helper = '+ e.name);
        handlebars.registerHelper(e.name, require(e.ref));
      });
    }
    // read hbs file
    logger.info('read hbs file = '+ reportConfig.htmlFile);
    var templateHtml = fs.readFileSync(path.join(process.cwd(), reportConfig.htmlFile), 'utf8');
    // read css file
    var templateCSS = "";
    if(reportConfig.cssFiles !== undefined && reportConfig.cssFiles.length > 0) {
      reportConfig.cssFiles.forEach(e => {
        logger.info('read css file = '+ e);
        templateCSS += fs.readFileSync(path.join(process.cwd(), e), 'utf8');
      });
    }
    // compile html file
    var DOC = handlebars.compile(templateHtml);
    let html = DOC({
      title: reportConfig.tittle,
      data: data,
      Css: templateCSS
    });
    // get pdf options
    let pdf_options = reportConfig.pdf_options;
    logger.info('pdf_options = '+ JSON.stringify(pdf_options));
    // create pdf from html
    htmlpdf.createPdfStream(html, pdf_options).then((stream) => {
      htmlpdf.streamToBuffer(stream, function(err, buffer){
        if(err) {
          throw new Error(err);
        }
        let namePDF = "ReportPDF";
        response.setHeader('Content-Disposition', "inline; filename*=UTF-8''" + namePDF);
        response.setHeader('Content-Type', 'application/pdf');
        // send response
        logger.info('send pdf file = '+ buffer.length + ' bytes');
        return response.send(buffer);
      });
    });
  } catch (error) {
    // error
    logger.error(error)
    response.json({ error: error.message});
  }
})

module.exports = router;