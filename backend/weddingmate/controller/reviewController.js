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
        let count = 0;
        let query = "";
        // user_create_date로 정렬 후, OFFSET만큼 뛰어넘은 다음 LIMIT 개수만큼 가져오는 쿼리문        

        if(mode === 'all'){
            if (reported=="T"){
                query = "SELECT review.review_id, review.review_star, review.review_image_path, review.review_reported, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE review.user_id = user.user_id AND review.review_reported=? AND (review.review_content LIKE ? OR user.user_nickname LIKE ?) ORDER BY review.review_date LIMIT 9 OFFSET ? ";
                result = await db(query, [reported, keyword, keyword, page*9]);
                query = "SELECT count(*) AS count FROM review, user WHERE review.user_id = user.user_id AND review.review_reported=? AND (review.review_content LIKE ? OR user.user_nickname LIKE ?)"
                count = await db(query, [reported, keyword, keyword]);
                count = count[0]['count'];
            }
            else{
                query = "SELECT review.review_id, review.review_star, review.review_image_path, review.review_reported, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE review.user_id = user.user_id AND (review.review_content LIKE ? OR user.user_nickname LIKE ?) ORDER BY review.review_date LIMIT 9 OFFSET ? ";
                result = await db(query, [keyword, keyword, page*9]);
                query = "SELECT count(*) AS count FROM review, user WHERE review.user_id = user.user_id AND (review.review_content LIKE ? OR user.user_nickname LIKE ?)";
                count = await db(query, [keyword, keyword]);
                count = count[0]['count'];
            }
        }
        else if (mode === 'content'){
            if (reported=="T"){
                query = "SELECT review.review_id, review.review_star, review.review_image_path, review.review_reported, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE review.user_id = user.user_id AND review.review_reported=? AND review.review_content LIKE ? ORDER BY review.review_date LIMIT 9 OFFSET ? ";
                result = await db(query, [reported, keyword, page*9]);
                query = "SELECT count(*) AS count FROM review, user WHERE review.user_id = user.user_id AND review.review_reported=? AND review.review_content LIKE ?";
                count = await db(query, [reported, keyword]);
                count = count[0]['count'];
            }
            else{
                query = "SELECT review.review_id, review.review_star, review.review_image_path, review.review_reported, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE review.user_id = user.user_id AND review.review_content LIKE ? ORDER BY review.review_date LIMIT 9 OFFSET ? ";
                result = await db(query, [keyword, page*9]);
                query = "SELECT count(*) AS count FROM review, user WHERE review.user_id = user.user_id AND review.review_content LIKE ?";                
                count = await db(query, [keyword]);
                count = count[0]['count'];
            }
        }
        else if (mode === 'nickname'){
            if (reported=="T"){
                query = "SELECT review.review_id, review.review_star, review.review_image_path, review.review_reported, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE review.user_id = user.user_id AND review.review_reported=? AND user.user_nickname LIKE ? ORDER BY review.review_date LIMIT 9 OFFSET ? ";
                result = await db(query, [reported, keyword, page*9]);
                query = "SELECT count(*) AS count FROM review, user WHERE review.user_id = user.user_id AND review.review_reported=? AND user.user_nickname LIKE ?";
                count = await db(query, [reported, keyword]);
                count = count[0]['count'];
            }
            else{
                query = "SELECT review.review_id, review.review_star, review.review_image_path, review.review_reported, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE review.user_id = user.user_id AND user.user_nickname LIKE ? ORDER BY review.review_date LIMIT 9 OFFSET ? ";
                result = await db(query, [keyword, page*9]);
                query = "SELECT count(*) AS count FROM review, user WHERE review.user_id = user.user_id AND user.user_nickname LIKE ?";
                count = await db(query, [keyword]);
                count = count[0]['count'];
            }            
        }
        else if (reported=="T"){
            query = "SELECT review.review_id, review.review_star, review.review_image_path, review.review_reported, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE review.user_id = user.user_id AND review.review_reported=? ORDER BY review.review_date LIMIT 9 OFFSET ? ";
            result = await db(query, [reported, page*10]);
            query = "SELECT count(*) AS count FROM review, user WHERE review.user_id = user.user_id AND review.review_reported=?";
            count = await db(query, [reported]);
            count = count[0]['count'];
        }
        else{
            query = "SELECT review.review_id, review.review_star, review.review_image_path, review.review_reported, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE review.user_id = user.user_id ORDER BY review.review_date LIMIT 9 OFFSET ? ";
            result = await db(query, [page*10]);
            query = "SELECT count(*) AS count FROM review, user WHERE review.user_id = user.user_id ";
            count = await db(query, []);
            count = count[0]['count'];
        }
        responseBody = {
            maxPage: Math.ceil(count / 9),
            reviewList: result
        }
        res.status(200).json(responseBody);
    }
    catch(err){
        console.error(err);
        responseBody = {
            status: 401,
            message: "잘못된 페이지 요청입니다."
        };
        res.status(401).json(responseBody);
    }
}

exports.adminReviewDelete = async (req, res)=>{
    try{
        const review_id = req.body.review_id;
        const query = 'DELETE FROM review WHERE review_id=?';

        let result = [];
        result = await db(query, [review_id]);
        
        // changedRows는 바뀐 행 개수이다.
        result = result.changedRows

        console.log(review_id);
        console.log(result);
        if (result == 1){
            responseBody = {
                status: 200,
                message: "리뷰 삭제 완료."
            };
            res.status(200).json(responseBody);
        }    
        // 하나 이상 바뀌거나 0개 바뀌었다면 에러를 던짐 -> 아래의 catch문이 400 에러로 응답한다.    
        else{
            throw Error("리뷰를 찾을 수 없습니다.");
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
};