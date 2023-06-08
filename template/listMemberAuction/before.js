const Db = require('/db/dbhelper_trans');
const report_data = require("./data.json")

async function beforeRender(params) {
    try {
        return {
            report: report_data
        };
    } catch (error) {
        return [];
    }
}

module.exports = {
    beforeRender: beforeRender
}