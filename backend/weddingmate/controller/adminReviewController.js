const db = require('../util/db');

exports.adminReviewList = async(req, res)=>{
    try{
        let page = req.query.page;
        let reported = req.query.reported;
        let mode = req.query.mode;
        let keyword = "%" + req.query.keyword + "%";

        // request에 오는 param들은 전부 String 타입이기 때문에, db문에 끼워 넣으러면 숫자로 바꿔야 합니다.
        page = (!page) ? 0 : Number(page) - 1;
        reported = (!reported) ? null : reported;


        let result = [];
        let query = "";
        // user_create_date로 정렬 후, OFFSET만큼 뛰어넘은 다음 LIMIT 개수만큼 가져오는 쿼리문        

        if(mode === 'all'){
            if (reported=="T"){
                query = "SELECT review.review_id, review.review_star, review.review_image_path, review.review_reported, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE user.user_id = review.user_id AND review.review_reported=? AND (review.review_content LIKE ? OR user.user_nickname LIKE ?) ORDER BY review_date LIMIT 9 OFFSET ?";
                result = await db(query, [reported, keyword, keyword, page*9]);
            }
            else{
                query = "SELECT review.review_id, review.review_star, review.review_image_path, review.review_reported, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE user.user_id = review.user_id AND (review.review_content LIKE ? OR user.user_nickname LIKE ?) ORDER BY review_date LIMIT 9 OFFSET ?";
                result = await db(query, [keyword, keyword, page*9]);
            }
        }
        else if (mode === 'nickname'){
            if (reported=="T"){
                query = "SELECT review.review_id, review.review_star, review.review_image_path, review.review_reported, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE user.user_id = review.user_id AND review.review_reported=? AND user.user_nickname LIKE ? ORDER BY review_date LIMIT 9 OFFSET ?";
                result = await db(query, [reported, keyword, page*9]);
            }
            else{
                query = "SELECT review.review_id, review.review_star, review.review_image_path, review.review_reported, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE user.user_id = review.user_id AND user.user_nickname LIKE ? ORDER BY review_date LIMIT 9 OFFSET ?";
                result = await db(query, [keyword, page*9]);
            }
        }
        else if (mode === 'name'){
            if (reported=="T"){
                query = "SELECT review.review_id, review.review_star, review.review_image_path, review.review_reported, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE user.user_id = review.user_id AND review.review_reported=? AND review.review_content LIKE ? ORDER BY review_date LIMIT 9 OFFSET ?";
                result = await db(query, [reported, keyword, page*9]);
            }
            else{
                query = "SELECT review.review_id, review.review_star, review.review_image_path, review.review_reported, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE user.user_id = review.user_id AND review.review_content LIKE ? ORDER BY review_date LIMIT 9 OFFSET ?";
                result = await db(query, [keyword, page*9]);
            }            
        }
        // 검색 옵션이 걸리지 않았을 때의 실행
        // 쿼리문에 넣을 paramter들을 꼭 배열로 넣어야 합니다.
        else if (reported=="T"){
            query = "SELECT review.review_id, review.review_star, review.review_image_path, review.review_reported, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE user.user_id = review.user_id AND review.review_reported=? ORDER BY review_date LIMIT 9 OFFSET ?";
            result = await db(query, [reported, page*9]);
        }
        else{            
            query = "SELECT review.review_id, review.review_star, review.review_image_path, review.review_reported, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE user.user_id = review.user_id ORDER BY review_date LIMIT 9 OFFSET ?";
            result = await db(query, [page*9]);
        }

        res.status(200);
        res.json(result);
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

exports.adminReviewDelete = async(req, res)=>{

};
