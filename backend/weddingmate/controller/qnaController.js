exports.adminQnaList = async (req, res)=>{
    try{
        let page = req.query.page;
        let hasAnswer = req.query.hasAnswer;
        let mode = req.query.mode;
        let keyword = "%" + req.query.keyword + "%";

        // request에 오는 param들은 전부 String 타입이기 때문에, db문에 끼워 넣으러면 숫자로 바꿔야 합니다.
        page = (!page) ? 0 : Number(page) - 1;
        hasAnswer = (!hasAnswer) ? null : hasAnswer;

        let result = [];
        let count = 0;
        let query = "";
        // user_create_date로 정렬 후, OFFSET만큼 뛰어넘은 다음 LIMIT 개수만큼 가져오는 쿼리문        

        if(mode === 'all'){
            if (hasAnswer=="T"){
                query = "SELECT FROM qna_id, qna_type, qna_has_answer, qna_title, (  ORDER BY .review_date LIMIT 9 OFFSET ? ";
                query = "SELECT FROM qna_id, qna_type, qna_has_answer, qna_title,   ORDER BY qna_date LIMIT 9 OFFSET ? ";
                result = await db(query, [hasAnswer, keyword, keyword, page*9]);
                query = "SELECT count(*) AS count FROM review, user WHERE review.user_id = user.user_id AND review.review_hasAnswer=? AND (review.review_content LIKE ? OR user.user_nickname LIKE ?)"
                count = await db(query, [hasAnswer, keyword, keyword]);
                count = count[0]['count'];
            }
            else{
                query = "SELECT review.review_id, review.review_star, review.review_image_path, review.review_hasAnswer, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE review.user_id = user.user_id AND (review.review_content LIKE ? OR user.user_nickname LIKE ?) ORDER BY review.review_date LIMIT 9 OFFSET ? ";
                result = await db(query, [keyword, keyword, page*9]);
                query = "SELECT count(*) AS count FROM review, user WHERE review.user_id = user.user_id AND (review.review_content LIKE ? OR user.user_nickname LIKE ?)";
                count = await db(query, [keyword, keyword]);
                count = count[0]['count'];
            }
        }
        else if (mode === 'content'){
            if (hasAnswer=="T"){
                query = "SELECT review.review_id, review.review_star, review.review_image_path, review.review_hasAnswer, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE review.user_id = user.user_id AND review.review_hasAnswer=? AND review.review_content LIKE ? ORDER BY review.review_date LIMIT 9 OFFSET ? ";
                result = await db(query, [hasAnswer, keyword, page*9]);
                query = "SELECT count(*) AS count FROM review, user WHERE review.user_id = user.user_id AND review.review_hasAnswer=? AND review.review_content LIKE ?";
                count = await db(query, [hasAnswer, keyword]);
                count = count[0]['count'];
            }
            else{
                query = "SELECT review.review_id, review.review_star, review.review_image_path, review.review_hasAnswer, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE review.user_id = user.user_id AND review.review_content LIKE ? ORDER BY review.review_date LIMIT 9 OFFSET ? ";
                result = await db(query, [keyword, page*9]);
                query = "SELECT count(*) AS count FROM review, user WHERE review.user_id = user.user_id AND review.review_content LIKE ?";                
                count = await db(query, [keyword]);
                count = count[0]['count'];
            }
        }
        else if (mode === 'nickname'){
            if (hasAnswer=="T"){
                query = "SELECT review.review_id, review.review_star, review.review_image_path, review.review_hasAnswer, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE review.user_id = user.user_id AND review.review_hasAnswer=? AND user.user_nickname LIKE ? ORDER BY review.review_date LIMIT 9 OFFSET ? ";
                result = await db(query, [hasAnswer, keyword, page*9]);
                query = "SELECT count(*) AS count FROM review, user WHERE review.user_id = user.user_id AND review.review_hasAnswer=? AND user.user_nickname LIKE ?";
                count = await db(query, [hasAnswer, keyword]);
                count = count[0]['count'];
            }
            else{
                query = "SELECT review.review_id, review.review_star, review.review_image_path, review.review_hasAnswer, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE review.user_id = user.user_id AND user.user_nickname LIKE ? ORDER BY review.review_date LIMIT 9 OFFSET ? ";
                result = await db(query, [keyword, page*9]);
                query = "SELECT count(*) AS count FROM review, user WHERE review.user_id = user.user_id AND user.user_nickname LIKE ?";
                count = await db(query, [keyword]);
                count = count[0]['count'];
            }            
        }
        else if (hasAnswer=="T"){
            query = "SELECT review.review_id, review.review_star, review.review_image_path, review.review_hasAnswer, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE review.user_id = user.user_id AND review.review_hasAnswer=? ORDER BY review.review_date LIMIT 9 OFFSET ? ";
            result = await db(query, [hasAnswer, page*10]);
            query = "SELECT count(*) AS count FROM review, user WHERE review.user_id = user.user_id AND review.review_hasAnswer=?";
            count = await db(query, [hasAnswer]);
            count = count[0]['count'];
        }
        else{
            query = "SELECT review.review_id, review.review_star, review.review_image_path, review.review_hasAnswer, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE review.user_id = user.user_id ORDER BY review.review_date LIMIT 9 OFFSET ? ";
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
            status: 400,
            message: err.message
        };        

        res.json(responseBody);
    }
}


exports.adminQnaDelete = async (req, res)=>{

}