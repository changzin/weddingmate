const db = require('../util/db');

// 회원 리스트를 10개씩 받아오는 컨트롤러
exports.userList = async (req, res)=>{
    try{
        let page = req.query.page;
        let block = req.query.block;
        let mode = req.query.mode;
        let keyword = "%" + req.query.keyword + "%";

        // request에 오는 param들은 전부 String 타입이기 때문에, db문에 끼워 넣으러면 숫자로 바꿔야 합니다.
        page = (!page) ? 0 : Number(page) - 1;
        block = (!block) ? null : block;


        let result = [];
        let count = 0;
        let query = "";
        // user_create_date로 정렬 후, OFFSET만큼 뛰어넘은 다음 LIMIT 개수만큼 가져오는 쿼리문        

        if(mode === 'all'){
            if (block=="T"){
                query = "SELECT user_id, user_name, user_email, user_create_date, user_type, user_block FROM user WHERE user_block=? AND (user_email LIKE ? OR user_name LIKE ?) ORDER BY user_create_date LIMIT 10 OFFSET ? ";
                result = await db(query, [block, keyword, keyword, page*10]);
                query = "SELECT count(*) AS count FROM user WHERE user_block=? AND (user_email LIKE ? OR user_name LIKE ?) "
                count = await db(query, [block, keyword, keyword])[0].count;
            }
            else{
                query = "SELECT user_id, user_name, user_email, user_create_date, user_type, user_block FROM user WHERE (user_email LIKE ? OR user_name LIKE ?) ORDER BY user_create_date LIMIT 10 OFFSET ? ";
                result = await db(query, [keyword, keyword, page*10]);
                query = "SELECT count(*) AS count FROM user WHERE (user_email LIKE ? OR user_name LIKE ?)";
                count = await db(query, [block, keyword, keyword])[0].count;
            }
        }
        else if (mode === 'email'){
            if (block=="T"){
                query = "SELECT user_id, user_name, user_email, user_create_date, user_type, user_block FROM user WHERE user_block=? AND user_email LIKE ? ORDER BY user_create_date LIMIT 10 OFFSET ? ";
                result = await db(query, [block, keyword, page*10]);
                query = "SELECT count(*) AS count FROM user WHERE user_block=? AND user_email LIKE ?";
                count = await db(query, [block, keyword, keyword])[0].count;
            }
            else{
                query = "SELECT user_id, user_name, user_email, user_create_date, user_type, user_block FROM user WHERE user_email LIKE ? ORDER BY user_create_date LIMIT 10 OFFSET ? ";
                result = await db(query, [keyword, page*10]);
                query = "SELECT count(*) AS count FROM user WHERE user_email LIKE ?";
                count = await db(query, [block, keyword, keyword])[0].count;
            }
        }
        else if (mode === 'name'){
            if (block=="T"){
                query = "SELECT user_id, user_name, user_email, user_create_date, user_type, user_block FROM user WHERE user_block=? AND user_name LIKE ? ORDER BY user_create_date LIMIT 10 OFFSET ? ";
                result = await db(query, [block, keyword, page*10]);
                query = "SELECT count(*) AS count FROM user WHERE user_block=? AND user_name LIKE ? ";
                count = await db(query, [block, keyword, keyword])[0].count;
            }
            else{
                query = "SELECT user_id, user_name, user_email, user_create_date, user_type, user_block FROM user WHERE user_name LIKE ? ORDER BY user_create_date LIMIT 10 OFFSET ? ";
                result = await db(query, [keyword, page*10]);
                query = "SELECT count(*) AS count FROM user WHERE user_name LIKE ? ";
                count = await db(query, [block, keyword, keyword])[0].count;
            }            
        }
        // 검색 옵션이 걸리지 않았을 때의 실행
        // 쿼리문에 넣을 paramter들을 꼭 배열로 넣어야 합니다.
        else if (block=="T"){
            query = "SELECT user_id, user_name, user_email, user_create_date, user_type, user_block FROM user WHERE user_block=? ORDER BY user_create_date LIMIT 10 OFFSET ? ";            
            result = await db(query, [block, page*10]);
            query = "SELECT count(*) AS count FROM user WHERE user_block=? ";
            count = await db(query, [block, keyword, keyword])[0].count;
        }
        else{
            query = "SELECT user_id, user_name, user_email, user_create_date, user_type, user_block FROM user ORDER BY user_create_date LIMIT 10 OFFSET ? ";
            result = await db(query, [page*10]);
            query = "SELECT count(*) AS count FROM user";
            count = await db(query, [block, keyword, keyword])[0].count;
        }

        for(user of result){
            query = "SELECT SUM(order_info_price) AS sum FROM order_info WHERE box_id IN (SELECT box_id FROM box WHERE user_id=?);";
            let user_total_price = await db(query, [user.user_id]);
            user_total_price = (!user_total_price[0].sum) ? 0 : user_total_price[0].sum;
            user.user_total_price = user_total_price;
        }

        for(user of result){
            query = "SELECT COUNT(order_info_price) AS count FROM order_info WHERE box_id IN (SELECT box_id FROM box WHERE user_id=?);";
            let user_buy_count = await db(query, [user.user_id]);
            user_buy_count = (!user_buy_count[0].count) ? 0 : user_buy_count[0].count;
            user.user_buy_count = user_buy_count;
        }
        
        for(user of result){
            query = "SELECT COUNT(*) AS count FROM review WHERE user_id=?";
            let user_review_count = await db(query, [user.user_id]);
            user_review_count = (!user_review_count[0].count) ? 0 : user_review_count[0].count;
            user.user_review_count = user_review_count;
        }

        for(user of result){
            query = "SELECT COUNT(*) AS count FROM qna WHERE user_id=?";
            let user_qna_count = await db(query, [user.user_id]);
            user_qna_count = (!user_qna_count[0].count) ? 0 : user_qna_count[0].count;
            user.user_qna_count = user_qna_count;
        }
        res.status(200);

        
        console.log(Math.floor(count / 10) + 1);

        console.log(count);
        responseBody = {
            maxPage: Math.floor(count / 10) + 1,
            memberList: result
        }
        res.json(responseBody);
    }
    catch(err){
        console.error(err);
        responseBody = {
            status: 401,
            message: "잘못된 페이지 요청입니다."
        };
        res.json(responseBody);
    }
}

// 유저를 차단하는 컨트롤러
exports.userBlock = async(req, res)=>{
    try{
        const userId = req.body.user_id;
        const query = 'UPDATE user SET user_block="T" WHERE user_id=?';

        let result = [];
        result = await db(query, [userId]);

        // changedRows는 바뀐 행 개수이다.
        result = result.changedRows


        if (result == 1){
            responseBody = {
                status: 200,
                message: "유저 차단 완료."
            };
            res.json(responseBody);
        }    
        // 하나 이상 바뀌거나 0개 바뀌었다면 에러를 던짐 -> 아래의 catch문이 400 에러로 응답한다.    
        else{
            throw Error;
        }
        
    }
    catch(err){
        console.error(err);
        responseBody = {
            status: 400,
            message: "잘못된 요청입니다."
        };
        res.json(responseBody);
    }
}

exports.userUnblock = async(req, res)=>{
    try{
        const userId = req.body.user_id;
        const query = 'UPDATE user SET user_block="F" WHERE user_id=?';

        console.log("userId", userId);

        let result = [];
        result = await db(query, [userId]);
        result = result.changedRows


        if (result == 1){
            responseBody = {
                status: 200,
                message: "유저 차단 해제 완료."
            };
            res.json(responseBody);
        }        
        else{
            throw Error;
        }
        
    }
    catch(err){
        console.error(err);
        responseBody = {
            status: 400,
            message: "잘못된 요청입니다."
        };
        res.json(responseBody);
    }
}