const Db = require('/db/dbhelper_trans');

async function beforeRender(params) {
    try {
        var data = await Db.GetAllTransaction(params.fromDate,params.toDate,params.TransDir,params.Array_TransType,params.Array_SpecialTransType,params.LaneIn,params.LaneOut,params.Plate,params.Etag,params.Array_VehicleType,params.Array_TicketType,params.TransID,params.ErrorType,params.TollIn,params.TollOut,params.Array_Staff,params.VioStatus);
        return {
            companyName: "Công ty TNHH VETC",
            tollName: "Trạm thu phí Phan Thiết - Dầu Giây",
            trans: data[0]
        };
    } catch (error) {
        return [];
    }
}

module.exports = {
    beforeRender:  beforeRender
}