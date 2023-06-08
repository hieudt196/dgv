const Db = require('/db/dbhelper_trans');

async function beforeRender(params) {
    try {
        var data = await Db.GetTransAllDateRange(params.fromDate, params.toDate);
        return {
            companyName: "Công ty TNHH MTC Tasco",
            tollName: "Trạm thu phí Phan Thiết - Dầu Giây",
            fromDate: "2022/03/01",
            toDate: "2022/05/01",
            trans: data[0]
        };
    } catch (error) {
        return [];
    }
}

module.exports = {
    beforeRender:  beforeRender
}