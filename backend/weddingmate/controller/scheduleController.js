const db = require('../util/db');


exports.scheduleList = async (req, res) =>{
    try{
        const user_id = req.body.user_id;

        let result = [];
        let query = "SELECT schedule_id, schedule_start, schedule_end, schedule_title FROM schedule WHERE calendar_id = (SELECT user_id FROM calendar WHERE user_id = ?)";
        let responseBody = {};

        result = await db(query, [user_id]);

        responseBody = {
            status: 200,
            scheduleList: result
        };
        res.json(responseBody);
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