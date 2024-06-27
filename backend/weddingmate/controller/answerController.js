const db = require('../util/db');

exports.addAnswer = async(req, res)=>{
    try{
        const qna_id = req.body.qna_id;
        const admin_id = req.body.admin_id;
        const answer_content = req.body.answer_content;

        // answer INSERT 쿼리문
        const query = "INSERT INTO answer(qna_id, admin_id, answer_content) VALUES(?, ?, ?)";
        let result = await db(query, [qna_id, admin_id, answer_content]);        
        result = result.affectedRows;

        if (result == 1){
            // 생성한 answer의 정보를 받아오는 쿼리문 (answer_date를 받아오기 위해서 씀)
            const query = "SELECT * FROM answer WHERE qna_id=? AND admin_id=? AND answer_content=?";
            let result = await db(query, [qna_id, admin_id, answer_content]);        
            const answer = result[0];

            responseBody = {
                status: 200,
                answer_id: answer.answer_id,
                admin_id: answer.admin_id,
                answer_content: answer.answer_content,
                answer_date: answer.answer_date,
                message: "답변 생성 완료"
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
            message: "답변 생성 실패"
        };        
        res.json(responseBody);        
    }
}


exports.updateAnswer = async(req, res)=>{
    try{
        const admin_id = req.body.admin_id;
        const answer_id = req.body.answer_id;
        const answer_content = req.body.answer_content;

        // answer UPDATE 문
        const query = "UPDATE answer SET admin_id=?, answer_content=? WHERE answer_id=?";
        let result = await db(query, [admin_id, answer_content, answer_id]);        
        result = result.affectedRows;

        if (result == 1){
            const query = "SELECT * FROM answer WHERE answer_id=?";
            let result = await db(query, [answer_id]);        
            const answer = result[0];

            responseBody = {
                status: 200,
                answer_id: answer.answer_id,
                admin_id: answer.admin_id,
                answer_content: answer.answer_content,
                answer_date: answer.answer_date,
                message: "답변 수정 완료"
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
            message: "답변 수정 실패"
        };        
        res.json(responseBody);        
    }
}