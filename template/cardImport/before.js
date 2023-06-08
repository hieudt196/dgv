const Db = require('/db/dbhelper_card');
const DbCom = require('/db/dbhelper');

async function beforeRender(params) {
    try {
        var data = await Db.getCardImportTransction(params.transid);
        var data_detail = await Db.getCardImportTransctionDetail(params.transid);
        return {
            companyName: "Công ty TNHH VETC",
            tollName: "Trạm thu phí Phan Thiết - Dầu Giây",
            trans: data[0][0],
            trans_detail: data_detail[0]
        };
    } catch (error) {
        return [];
    }
}

module.exports = {
    beforeRender:  beforeRender
}