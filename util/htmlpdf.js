const Html_Pdf = require('html-pdf');
const conversionFactory = require('html-to-xlsx')

function createPdfStream(html, pdf_options) {
    return new Promise(function(resolve, reject) {
        Html_Pdf.create(html, pdf_options).toStream(function(err, stream) {
        if (err) {
            return reject(err);
        }
        return resolve(stream);
        });
    })
}
  
function streamToBuffer(stream, cb) {
    const chunks = [];
    stream.on('data', (chunk) => {
      chunks.push(chunk);
    });
    stream.on('end', (chunk) => {
      return cb(null, Buffer.concat(chunks));
    });
    stream.on('error', (e) => {
      return cb(e);
    });
}

module.exports = {
    createPdfStream:  createPdfStream,
    streamToBuffer: streamToBuffer,
}