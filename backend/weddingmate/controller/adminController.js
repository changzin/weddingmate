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
        // user_create_date로 정렬 후, OFFSET만큼 뛰어넘은 다음 LIMIT 개수만큼 가져오는 쿼리문 사용 // 전체 페이지를 구하는 쿼리도 추가
        // mode(검색어) block (차단 여부) 에 따라 다른 쿼리문을 넣도록 설계
        if(mode === 'all'){
            if (block=="T"){

                query = "SELECT user_id, user_name, user_email, user_create_date, user_type, user_block FROM user WHERE user_block=? AND (user_email LIKE ? OR user_name LIKE ?) AND user_email_verified='T' ORDER BY user_create_date LIMIT 10 OFFSET ? ";
                result = await db(query, [block, keyword, keyword, page*10]);

                query = "SELECT count(*) AS count FROM user WHERE user_block=? AND (user_email LIKE ? OR user_name LIKE ?) AND user_email_verified='T'"
                count = await db(query, [block, keyword, keyword]);
                count = count[0]['count'];
            }
            else{
                query = "SELECT user_id, user_name, user_email, user_create_date, user_type, user_block FROM user WHERE (user_email LIKE ? OR user_name LIKE ?) AND user_email_verified='T' ORDER BY user_create_date LIMIT 10 OFFSET ? ";
                result = await db(query, [keyword, keyword, page*10]);
                query = "SELECT count(*) AS count FROM user WHERE (user_email LIKE ? OR user_name LIKE ?) AND user_email_verified='T'";
                count = await db(query, [keyword, keyword]);
                count = count[0]['count'];
            }
        }
        else if (mode === 'email'){
            if (block=="T"){
                query = "SELECT user_id, user_name, user_email, user_create_date, user_type, user_block FROM user WHERE user_block=? AND user_email LIKE ? AND user_email_verified='T' ORDER BY user_create_date LIMIT 10 OFFSET ? ";
                result = await db(query, [block, keyword, page*10]);
                query = "SELECT count(*) AS count FROM user WHERE user_block=? AND user_email LIKE ? AND user_email_verified='T'";
                count = await db(query, [block, keyword]);
                count = count[0]['count'];
            }
            else{
                query = "SELECT user_id, user_name, user_email, user_create_date, user_type, user_block FROM user WHERE user_email LIKE ? AND user_email_verified='T' ORDER BY user_create_date LIMIT 10 OFFSET ? ";
                result = await db(query, [keyword, page*10]);
                query = "SELECT count(*) AS count FROM user WHERE user_email LIKE ? AND user_email_verified='T'";                
                count = await db(query, [keyword]);
                count = count[0]['count'];

            }
        }
        else if (mode === 'name'){
            if (block=="T"){
                query = "SELECT user_id, user_name, user_email, user_create_date, user_type, user_block FROM user WHERE user_block=? AND user_name LIKE ? AND user_email_verified='T' ORDER BY user_create_date LIMIT 10 OFFSET ? ";
                result = await db(query, [block, keyword, page*10]);
                query = "SELECT count(*) AS count FROM user WHERE user_block=? AND user_name LIKE ? AND user_email_verified='T'";
                count = await db(query, [block, keyword]);
                count = count[0]['count'];
            }
            else{
                query = "SELECT user_id, user_name, user_email, user_create_date, user_type, user_block FROM user WHERE user_name LIKE ? AND user_email_verified='T' ORDER BY user_create_date LIMIT 10 OFFSET ? ";
                result = await db(query, [keyword, page*10]);
                query = "SELECT count(*) AS count FROM user WHERE user_name LIKE ? AND user_email_verified='T'";
                count = await db(query, [keyword]);
                count = count[0]['count'];
            }            
        }
        // 검색 옵션이 걸리지 않았을 때의 실행
        // 쿼리문에 넣을 paramter들을 꼭 배열로 넣어야 합니다.
        else if (block=="T"){
            query = "SELECT user_id, user_name, user_email, user_create_date, user_type, user_block FROM user WHERE user_block=? AND user_email_verified='T' ORDER BY user_create_date LIMIT 10 OFFSET ? ";            
            result = await db(query, [block, page*10]);
            query = "SELECT count(*) AS count FROM user WHERE user_block=? AND user_email_verified='T'";
            count = await db(query, [block]);
            count = count[0]['count'];
        }
        else{
            query = "SELECT user_id, user_name, user_email, user_create_date, user_type, user_block FROM user AND user_email_verified='T' ORDER BY user_create_date LIMIT 10 OFFSET ? ";
            result = await db(query, [page*10]);
            query = "SELECT count(*) AS count FROM user WHERE user_email_verified='T'";
            count = await db(query, []);
            count = count[0]['count'];
        }


        // 유저의 총 구매 금액 받아오기
        for(user of result){
            query = "SELECT SUM(order_info_price) AS sum FROM order_info WHERE box_id IN (SELECT box_id FROM box WHERE user_id=?);";
            let user_total_price = await db(query, [user.user_id]);
            user_total_price = (!user_total_price[0].sum) ? 0 : user_total_price[0].sum;
            user.user_total_price = user_total_price;
        }

        // 유저의 구매 수량 가져오기
        for(user of result){
            query = "SELECT COUNT(order_info_price) AS count FROM order_info WHERE box_id IN (SELECT box_id FROM box WHERE user_id=?);";
            let user_buy_count = await db(query, [user.user_id]);
            user_buy_count = (!user_buy_count[0].count) ? 0 : user_buy_count[0].count;
            user.user_buy_count = user_buy_count;
        }
        
        // 유저의 리뷰 수 가져오기
        for(user of result){
            query = "SELECT COUNT(*) AS count FROM review WHERE user_id=?";
            let user_review_count = await db(query, [user.user_id]);
            user_review_count = (!user_review_count[0].count) ? 0 : user_review_count[0].count;
            user.user_review_count = user_review_count;
        }

        // 유저의 qna 수 가져오기
        for(user of result){
            query = "SELECT COUNT(*) AS count FROM qna WHERE user_id=?";
            let user_qna_count = await db(query, [user.user_id]);
            user_qna_count = (!user_qna_count[0].count) ? 0 : user_qna_count[0].count;
            user.user_qna_count = user_qna_count;
        }
        res.status(200);

        console.log(count);
        console.log(result);
        // maxPage를 같이 반환한다.
        responseBody = {
            maxPage: Math.ceil(count / 10),
            memberList: result
        }
        res.status(200).json(responseBody);
    }
    catch(err){
        console.error(err);
        responseBody = {
            status: 400,
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
            res.status(200).json(responseBody);
        }    
        // 하나 이상 바뀌거나 0개 바뀌었다면 에러를 던짐 -> 아래의 catch문이 400 에러로 응답한다.    
        else{
            throw Error("차단을 할 유저를 찾을 수 없습니다.");
        }
        
    }
    catch(err){
        console.error(err);
        responseBody = {
            status: 400,
            message: err.message
        };
        res.json(responseBody);
    }
}

// 유저 차단을 해제하는 컨트롤러
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
            res.status(200).json(responseBody);
        }        
        else{
            throw Error("잘못된 요청입니다.");
        }
        
    }
    catch(err){
        console.error(err);
        responseBody = {
            status: 400,
            message: err.message
        };
        res.json(responseBody);
    }
}

exports.addProduct = async(req, res)=>{
    try{
        console.log(req.body);
        const itemType = req.body.item_type;
        const itemName = req.body.item_name;
        const itemFactoryName = req.body.item_factory_name;
        const itemPrice = req.body.item_price;
        const itemDiscountRate = req.body.item_discount_rate;
        const itemDetailList = req.body.item_detail_list;

        let result;
        let responseBody;
        let query;

        const itemList = ['hall', 'sdm_package', 'studio', 'dress', 'makeup', 'giving_dress', 'giving_item', 'giving_package', 'snap', 'video', 'flower', 'music', 'mc', 'shoes', 'gift', 'letter'];

        if (!itemList.find((element)=>{
            if (element == itemType){
                console.log(element);
                return true;
            }
        })){
            throw Error("지원하지 않는 물품 카테고리입니다");
        }

        query = 'INSERT INTO item INTO VALUES()';
        
    }
    catch(err){
        console.log(err);
        responseBody = {
            status: 400,
            message: "상품을 추가할 수 없습니다."
        };
        res.json(responseBody);
    }
}