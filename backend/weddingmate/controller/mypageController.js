const db = require('../util/db');

exports.bookmarkList = async(req, res) =>{
    try{
        console.log("req.body");
        console.log(req.body);
        const user_id = req.body.user_id;
        let page = req.query.page;

        page = (!page) ? 0 : page-1;

        let result = [];
        let query = "SELECT item.item_name, item.item_price, item.item_tn_image_path, bookmark.bookmark_id FROM item WHERE item.item_id IN (SELECT bookmark.item_id FROM bookmark WHERE bookmark.user_id = ?) LIMIT 10 offset ? "; // 10개만 가져온다 시작점에서(어디가 시작인지 몰라서 ?)
        // 조인으로 바꿔라

        let responseBody ={};

        result = await db(query, [user_id, page * 10] );

        responseBody = {
            status: 200,
            bookmarkList: result
        };
        res.json(responseBody);
    }catch(err) {
        console.error(err);
        responseBody = {
            status : 400,
            mesage: "잘못된 페이지 요청입니다"
        }
        res.json(responseBody);
    
    }
}