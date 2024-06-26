const db = require('../util/db');

exports.addReport = async (req, res)=>{
    try{
        const review_id = req.body.review_id;
        const user_id = req.body.user_id;
        const report_content = req.body.report_content;

        let result;
        let responseBody;
        let query;

        query = "INSERT INTO report(review_id, user_id, report_content) VALUES(?, ?, ?)";
        result = await db(query, [review_id, user_id, report_content]);
        result = result.affectedRows;

        if(result == 1){
            // 성공
            responseBody = {
                status : 200,
                message: "신고 성공."
            }
            res.json(responseBody);
        }
        else{
            // 실패
            throw new Error("신고 DB 에러");
        }
    }
    catch(err){
        console.error(err);
        responseBody = {
            status: 400,
            message: "신고 실패"
        };
        res.json(responseBody);
    }
};