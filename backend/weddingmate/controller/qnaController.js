const db = require('../util/db');

exports.adminQnaList = async (req, res)=>{
    try{
        let page = req.query.page;
        let hasAnswer = req.query.hasAnswer;
        let mode = req.query.mode;
        let keyword = req.query.keyword;
        

        // request에 오는 param들은 전부 String 타입이기 때문에, db문에 끼워 넣으러면 숫자로 바꿔야 합니다.
        page = (!page) ? 0 : Number(page) - 1;
        keyword = (!keyword) ? "" : keyword;
        keyword = "%" + req.query.keyword + "%";
        hasAnswer = (!hasAnswer) ? 'T' : hasAnswer;
        mode = (!mode) ? 'all' : mode;

        let result = [];
        let count = 0;
        let query = "";
        // user_create_date로 정렬 후, OFFSET만큼 뛰어넘은 다음 LIMIT 개수만큼 가져오는 쿼리문        

        if(mode === 'all'){
            if (hasAnswer=="F"){
                query = "SELECT qna.qna_id, qna.qna_type, qna.qna_has_answer, qna.qna_title, user.user_nickname, qna_date FROM qna, user WHERE qna.user_id=user.user_id AND qna.qna_has_answer=? AND (user.user_nickname LIKE ? OR qna.qna_title LIKE ? OR qna.qna_content LIKE ?) ORDER BY qna.qna_date LIMIT 10 OFFSET ?";
                result = await db(query, [hasAnswer, keyword, keyword, keyword, page*10]);
                query = "SELECT count(*) AS count FROM qna, user WHERE qna.user_id=user.user_id AND qna.qna_has_answer=? AND (user.user_nickname LIKE ? OR qna.qna_title LIKE ? OR qna.qna_content LIKE ?) "
                count = await db(query, [hasAnswer, keyword, keyword, keyword]);
                count = count[0]['count'];
            }
            else{
                query = "SELECT qna.qna_id, qna.qna_type, qna.qna_has_answer, qna.qna_title, user.user_nickname, qna_date FROM qna, user WHERE qna.user_id=user.user_id AND (user.user_nickname LIKE ? OR qna.qna_title LIKE ? OR qna.qna_content LIKE ?) ORDER BY qna.qna_date LIMIT 10 OFFSET ?";
                result = await db(query, [keyword, keyword, keyword, page*10]);
                query = "SELECT count(*) AS count FROM qna, user WHERE qna.user_id=user.user_id AND (user.user_nickname LIKE ? OR qna.qna_title LIKE ? OR qna.qna_content LIKE ?)";
                count = await db(query, [keyword, keyword, keyword]);
                count = count[0]['count'];
            }
        }
        else{
            if (hasAnswer=="F"){
                query = "SELECT qna.qna_id, qna.qna_type, qna.qna_has_answer, qna.qna_title, user.user_nickname, qna_date FROM qna, user WHERE qna.user_id=user.user_id AND qna.qna_has_answer=? AND (user.user_nickname LIKE ? OR qna.qna_title LIKE ? OR qna.qna_content LIKE ?) AND qna.qna_type=? ORDER BY qna.qna_date LIMIT 10 OFFSET ?";
                result = await db(query, [hasAnswer, keyword, keyword, keyword, mode, page*10]);
                query = "SELECT count(*) AS count FROM qna, user WHERE qna.user_id=user.user_id AND qna.qna_has_answer=? AND (user.user_nickname LIKE ? OR qna.qna_title LIKE ? OR qna.qna_content LIKE ?) AND qna.qna_type=? "
                count = await db(query, [hasAnswer, keyword, keyword, keyword, mode]);
                count = count[0]['count'];
            }
            else{
                query = "SELECT qna.qna_id, qna.qna_type, qna.qna_has_answer, qna.qna_title, user.user_nickname, qna_date FROM qna, user WHERE qna.user_id=user.user_id AND (user.user_nickname LIKE ? OR qna.qna_title LIKE ? OR qna.qna_content LIKE ?) AND qna.qna_type=? ORDER BY qna.qna_date LIMIT 10 OFFSET ?";
                result = await db(query, [keyword, keyword, keyword, mode, page*10]);
                query = "SELECT count(*) AS count FROM qna, user WHERE qna.user_id=user.user_id AND (user.user_nickname LIKE ? OR qna.qna_title LIKE ? OR qna.qna_content LIKE ?) AND qna.qna_type=? "
                count = await db(query, [keyword, keyword, keyword, mode]);
                count = count[0]['count'];
            }
        }
        responseBody = {
            maxPage: Math.ceil(count / 10),
            qnaList: result
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

exports.qnaDetail = async (req, res)=>{
    try{
        const qna_id = req.body.qna_id;

        // answer이 없는 것은 null로 응답을 보내기 위해 left outer join을 활용하였다.
        const query = "SELECT qna.qna_id, qna.qna_title, qna.qna_content, qna.qna_image_path, qna.qna_date, qna.qna_has_answer, qna.user_nickname, answer.answer_id, answer.admin_id, answer.answer_content, answer.answer_date from (SELECT qna.qna_id, qna.qna_title, qna.qna_content, qna.qna_image_path, qna.qna_date, qna.qna_has_answer, user.user_nickname FROM qna, user WHERE qna.user_id = user.user_id) qna left join answer on qna.qna_id=answer.qna_id WHERE qna.qna_id=?";
        let result = await db(query, [qna_id]);        
        
        if (result.length != 1){
            throw new Error("리뷰를 찾을 수 없습니다");
        }

        let responseBody = result[0];
        responseBody.status = 200;
        res.json(responseBody);

    }
    catch(err){
        console.error(err);
        responseBody = {
            status: 400,
            message: "qna를 찾을 수 없습니다."
        };        
        res.json(responseBody);        
    }
}

exports.adminQnaDelete = async (req, res)=>{

}