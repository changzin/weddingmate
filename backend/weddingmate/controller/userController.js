const db = require('../util/db');

// 회원 리스트를 10개씩 받아오는 컨트롤러
exports.userList = async (req, res)=>{
    try{
        let page = req.query.page;
        let block = req.query.block;
        
        // request에 오는 param들은 전부 String 타입이기 때문에, db문에 끼워 넣으러면 숫자로 바꿔야 합니다.
        page = (!page) ? 0 : Number(page) - 1;

        let result = [];
        let query = "";
        if (!block || block === 'F'){            
            // user_create_date로 정렬 후, OFFSET만큼 뛰어넘은 다음 LIMIT 개수만큼 가져오는 쿼리문
            query = "SELECT user_name, user_email, user_create_date, user_type, user_block FROM user ORDER BY user_create_date LIMIT 10 OFFSET ? ";                        
            result = await db(query, [page*10]);
        }
        else{
            query = "SELECT user_name, user_email, user_create_date, user_type, user_block FROM user WHERE user_block=? ORDER BY user_create_date LIMIT 10 OFFSET ? ";            
            // 쿼리문에 넣을 paramter들을 꼭 배열로 넣어야 합니다.
            // page * 10 만큼을 OFFSET으로 잡는다는 의미
            result = await db(query, [block, page*10]);
        }

        for(user of result){
            query = "SELECT SUM(order_info_price) AS sum FROM order_info WHERE box_id IN (SELECT box_id FROM box WHERE user_id in (SELECT user_id FROM user WHERE user_email=?));";
            let user_total_price = await db(query, [user.user_email]);
            user_total_price = (!user_total_price[0].sum) ? 0 : user_total_price[0].sum;
            user.user_total_price = user_total_price;
        }

        for(user of result){
            query = "SELECT COUNT(order_info_price) AS count FROM order_info WHERE box_id IN (SELECT box_id FROM box WHERE user_id in (SELECT user_id FROM user WHERE user_email= ?));";
            let user_buy_count = await db(query, [user.user_email]);
            user_buy_count = (!user_buy_count[0].count) ? 0 : user_buy_count[0].count;
            user.user_buy_count = user_buy_count;
        }
        
        for(user of result){
            query = "SELECT COUNT(*) AS count FROM review WHERE user_id in (SELECT user_id FROM user WHERE user_email= ?)";
            let review_count = await db(query, [user.user_email]);
            review_count = (!review_count[0].count) ? 0 : review_count[0].count;
            user.review_count = review_count;
        }

        for(user of result){
            query = "SELECT COUNT(*) AS count FROM qna WHERE user_id in (SELECT user_id FROM user WHERE user_email= ?)";
            let qna_count = await db(query, [user.user_email]);
            qna_count = (!qna_count[0].count) ? 0 : qna_count[0].count;
            user.qna_count = qna_count;
        }
        res.json(result);
    }
    catch(err){
        console.error(err);
        responseBody = {
            errorCode: 401,
            message: "잘못된 페이지 요청입니다."
        };
        res.json(responseBody);
    }
}