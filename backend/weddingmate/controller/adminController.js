const db = require('../util/db');

// 현재 로그인한 admin 정보 받아오기
exports.adminInfo = async (req, res)=>{
    try{
        const accessToken = req.body.accessToken;
        let count = 0;
        let result = 0;
        let responseBody = {};
        // accessToken으로 유저 정보를 가져옴
        query = "SELECT admin_nickname FROM admin WHERE admin_access_token = ?";
        result = await db(query, [accessToken]);
        const admin = result[0];

        // 유저가 있다면 유저 정보를 보내고, 없다면 에러 발생
        if (admin){
            responseBody = admin;
            responseBody.status = 200;
            res.json(responseBody);
        }
        else{
            throw new Error("쿠키가 만료되었습니다.");
        }
        count = result.length;
    } catch(err){
        console.error(err);
        responseBody = {
            status: 400,
            message: err.message
        };
        res.json(responseBody);         
    }
}

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
        const itemType = req.body.item_type;
        const itemName = req.body.item_name;
        const itemFactoryName = req.body.item_factory_name;
        const itemPrice = Number(req.body.item_price);
        const itemDiscountRate = Number(req.body.item_discount_rate);
        const itemTnImagePath = req.body.item_tn_image_path;
        const itemDetailImagePath = req.body.item_detail_image_path;
        const itemMainImagePath = req.body.item_main_image_path;

        const itemDetailList = req.body.item_detail_list;

        let result;
        let responseBody;
        let query;

        const itemList = ['hall', 'sdm_package', 'studio', 'dress', 'makeup', 'giving_dress', 'giving_item', 'giving_package', 'snap', 'video', 'flower', 'music', 'mc', 'shoes', 'gift', 'letter'];

        if (!itemList.find((element)=>{
            if (element == itemType){
                return true;
            }
        })){
            throw Error("지원하지 않는 물품 카테고리입니다");
        }

        query = 'INSERT INTO item(item_factory_name, item_name, item_price, item_discount_rate, item_tn_image_path, item_main_image_path, item_detail_image_path) VALUES(?, ?, ?, ?, ?, ?, ?)';
        result = await db(query, [itemFactoryName, itemName, itemPrice, itemDiscountRate, itemTnImagePath, itemMainImagePath, itemDetailImagePath]);
        if (result.affectedRows != 1){
            throw Error("아이템을 추가할 수 없습니다.");
        }
        query = 'SELECT item_id FROM item WHERE item_factory_name=? AND item_name=? AND item_price=? AND item_discount_rate=? AND item_tn_image_path=? AND item_main_image_path=? AND item_detail_image_path=?'
        result = await db(query, [itemFactoryName, itemName, itemPrice, itemDiscountRate, itemTnImagePath, itemMainImagePath, itemDetailImagePath]);
        const item_id = result[0]['item_id'];

        if (itemDetailList.length == 0){
            query = 'INSERT INTO item_detail(item_id, item_detail_type) VALUES(?, ?)';
            result = await db(query, [item_id, itemType]);
            if (result.affectedRows != 1){
                throw Error("아이템을 추가할 수 없습니다.");
            }
        }
        else{
            for(let i = 0; i < itemDetailList.length; i++){
                let item = itemDetailList[i];
                let keyList = [];
                let valueList = [];
                let paramList = [];
                for (let key in item){
                    if (key != 'item_detail_lock'){
                        // ''로 DB에 들어가면 싫으니깐 null로 바꿔줌
                        item[key] = (!item[key]) ? null : item[key];
                        // 넣을 항목과 값들을 따로 리스트로 저장한다.
                        valueList.push(item[key]);
                        keyList.push(key);
                    }
                }
                keyList.sort();
                for(let j = 0; j < keyList.length; j++){
                    paramList.push(item[keyList[j]]);
                }
                paramList.push(itemType);
                paramList.push(item_id);
                query = 'INSERT INTO ITEM_DETAIL(item_detail_color, item_detail_flower_life, item_detail_heel_height, item_detail_kind, item_detail_loc, item_detail_local, item_detail_makeup, item_detail_quality, item_detail_quantity, item_detail_size, item_detail_ticket, item_detail_type, item_id) values(?,?,?,?,?,?,?,?,?,?,?,?,?)'
                result = await db(query, paramList);
                if (result.affectedRows != 1){
                    throw Error("아이템을 추가할 수 없습니다.");
                }
            }
        }
        responseBody = {
            status: 200,
            message: "상품 추가 완료."
        }
        res.json(responseBody);
    }
    catch(err){
        console.error(err);
        responseBody = {
            status: 400,
            message: "상품을 추가할 수 없습니다."
        };
        res.json(responseBody);
    }
}

exports.updateProduct = async (req, res)=>{
    try{
        const itemName = req.body.item_name;
        const itemFactoryName = req.body.item_factory_name;
        const itemPrice = Number(req.body.item_price);
        const itemDiscountRate = Number(req.body.item_discount_rate);
        const itemTnImagePath = req.body.item_tn_image_path;
        const itemDetailImagePath = req.body.item_detail_image_path;
        const itemMainImagePath = req.body.item_main_image_path;
        const itemDetailList = req.body.item_detail_list;
        const itemType = itemDetailList[0].item_detail_type;

        const {item_tn_image_change, item_main_image_change, item_detail_image_change} = req.body;
        const item_id = req.body.item_id;

        const itemDetailDeletedList = req.body.item_detail_deleted_list;

        let result;
        let responseBody;
        let query;

        const itemList = ['hall', 'sdm_package', 'studio', 'dress', 'makeup', 'giving_dress', 'giving_item', 'giving_package', 'snap', 'video', 'flower', 'music', 'mc', 'shoes', 'gift', 'letter'];

        if (!itemList.find((element)=>{
            if (element == itemType){
                return true;
            }
        })){
            throw Error("지원하지 않는 물품 카테고리입니다");
        }

        // item 테이블 수정문
        query = 'UPDATE ITEM SET item_factory_name=?, item_name=?, item_price=?, item_discount_rate=? WHERE item_id=?';
        result = await db(query, [itemFactoryName, itemName, itemPrice, itemDiscountRate, item_id]);
        if (result.affectedRows != 1){
            throw Error("아이템을 수정할 수 없습니다.");
        }
        if (item_tn_image_change){
            query = 'UPDATE ITEM SET item_tn_image_path=? WHERE item_id=?';
            result = await db(query, [itemTnImagePath, item_id]);
            if (result.affectedRows != 1){
                throw Error("아이템을 수정할 수 없습니다.");
            }
        }
        if (item_main_image_change){
            query = 'UPDATE ITEM SET item_main_image_path=? WHERE item_id=?';
            result = await db(query, [itemMainImagePath, item_id]);
            if (result.affectedRows != 1){
                throw Error("아이템을 수정할 수 없습니다.");
            }
        }
        if (item_detail_image_change){
            query = 'UPDATE ITEM SET item_detail_image_path=? WHERE item_id=?';
            result = await db(query, [itemDetailImagePath, item_id]);
            if (result.affectedRows != 1){
                throw Error("아이템을 수정할 수 없습니다.");
            }
        }
        // item_detail 처리부
        // 상세옵션이 없는 것들은 바로 리턴
        if (itemType=='giving_mechine' || itemType=='giving_package' || itemType=='video' || itemType == 'mc' || itemType=='letter'){
            res.json({
                status: 200,
                message: "상품 수정 완료."     
            });
            return;
        }
        // 삭제된 옵션 제거
        if (itemDetailDeletedList.length != 0){
            for(let i = 0; i < itemDetailDeletedList.length; i++){
                query = 'DELETE FROM item_detail WHERE item_detail_id=?';
                result = await db(query, [itemDetailDeletedList[i]]);
                if (result.affectedRows != 1){
                    throw Error("아이템 옵션을 삭제할 수 없습니다.");
                }
            }
        }
        // 나머지 옵션 추가하거나 수정
        for(let i = 0; i < itemDetailList.length; i++){
            let item = itemDetailList[i];

            let keyList = [];
            let valueList = [];
            let paramList = [];

            // item_detail_id가 있으면 수정이고, 없으면 추가이다.

            // 존재했던 옵션을 수정하는 부분
            if (item.item_detail_id){
                
                for (let key in item){
                    if (key != 'item_detail_lock' && key != 'item_detail_id' && key != 'item_id' && key != 'item_detail_type'){

                        // ''로 DB에 들어가면 싫으니깐 null로 바꿔줌
                        item[key] = (!item[key]) ? null : item[key];

                        // 넣을 항목과 값들을 따로 리스트로 저장한다.
                        valueList.push(item[key]);
                        keyList.push(key);
                    }
                }
                keyList.sort();
                for(let j = 0; j < keyList.length; j++){
                    paramList.push(item[keyList[j]]);
                }
                paramList.push(itemType);
                paramList.push(item.item_detail_id);

                query = 'UPDATE ITEM_DETAIL SET item_detail_color=?, item_detail_flower_life=?, item_detail_heel_height=?, item_detail_kind=?, item_detail_loc=?, item_detail_local=?, item_detail_makeup=?, item_detail_quality=?, item_detail_quantity=?, item_detail_size=?, item_detail_ticket=?, item_detail_type=? WHERE item_detail_id=?';
                result = await db(query, paramList);
                if (result.affectedRows != 1){
                    throw Error("아이템을 수정할 수 없습니다.");
                }
            }
            // 새 옵션을 넣는 부분임
            else{
                for (let key in item){
                    if (key != 'item_detail_lock' && key != 'item_detail_type'){
                        // ''로 DB에 들어가면 싫으니깐 null로 바꿔줌
                        item[key] = (!item[key]) ? null : item[key];
                        // 넣을 항목과 값들을 따로 리스트로 저장한다.
                        valueList.push(item[key]);
                        keyList.push(key);
                    }
                }
                keyList.sort();
                for(let j = 0; j < keyList.length; j++){
                    paramList.push(item[keyList[j]]);
                }
                paramList.push(itemType);
                paramList.push(item_id);
                query = 'INSERT INTO ITEM_DETAIL(item_detail_color, item_detail_flower_life, item_detail_heel_height, item_detail_kind, item_detail_loc, item_detail_local, item_detail_makeup, item_detail_quality, item_detail_quantity, item_detail_size, item_detail_ticket, item_detail_type, item_id) values(?,?,?,?,?,?,?,?,?,?,?,?,?)'
                result = await db(query, paramList);
                if (result.affectedRows != 1){
                    throw Error("아이템을 추가할 수 없습니다.");
                }
            }
        }
        responseBody = {
            status: 200,
            message: "상품 수정 완료."
        }
        res.json(responseBody);
    }
    catch(err){
        console.error(err);
        responseBody = {
            status: 400,
            message: "상품을 수정할 수 없습니다."
        };
        res.json(responseBody);        
    }
}

exports.deleteProduct = async(req, res)=>{
    let result;
    let responseBody;
    let query = "";

    try{
        query = "DELETE FROM item WHERE item_id=?";
        result = await db(query, [req.body.item_id]);
        if (result.affectedRows != 1){
            throw Error("아이템을 추가할 수 없습니다.");
        }
        responseBody = {
            status: 200,
            message: "상품 삭제 완료하였습니다."
        }
        res.json(responseBody);
    }
    catch(err){
        console.error(err);
        responseBody = {
            status: 400,
            message: "상품을 삭제할 수 없습니다."
        };
        res.json(responseBody);        
    }
}