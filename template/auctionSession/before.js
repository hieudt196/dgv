const Db = require('/db/dbhelper_report');
const moment = require('moment');
const VNnum2words = require('vn-num2words');
async function beforeRender(params) {
    try {
        var data = await Db.BienBanCuocDauGia(params.Asset_id);
        return {
            org: data[0].org,
            auction_name: data[0].auction_name,
            auction_code: data[0].auction_code,
            asset_name: data[0].asset_name,
            asset_code: data[0].asset_code,
            price: data[0].price,
            full_name: data[0].full_name,
            user_code: data[0].user_code,
            hour: moment(data[0].start_time).utcOffset(0).format('HH'),
            minute: moment(data[0].start_time).utcOffset(0).format('mm'),
            day: moment(data[0].start_time).utcOffset(0).format('DD/MM/yyyy'),
            end_time: moment(data[0].end_time).utcOffset(0).format('HH'),
            countBid: data[0].countBid,
            member_name: data[0].member_name,
            member_address: data[0].member_address,
            id_number: data[0].id_number,
            id_date: moment(data[0].id_date).utcOffset(0).format('DD/MM/yyyy'),
            id_place: data[0].id_place,
            highestBid: data[0].highestBid,
            highestBidTex: VNnum2words(data[0].highestBid),
            agency_name: data[0].agency_name,
            full_name: data[0].full_name
        };
    } catch (error) {
        return [];
    }
}

module.exports = {
    beforeRender: beforeRender
}