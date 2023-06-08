function fieldSerial(etag, serial, type) {
    if(type === '1') {
        return serial
    } else {
        return etag
    }
}

module.exports = fieldSerial;