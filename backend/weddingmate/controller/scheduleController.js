const db = require('../util/db');


exports.scheduleList = async (req, res) =>{
    try{
        const user_id = req.body.user_id;

        // 캘린더 아이디 가져오기
        let calendar_id_query = "SELECT calendar_id FROM calendar  WHERE user_id = ?;";
        calendar_id_query_result = await db(calendar_id_query, [user_id]);
        if(!calendar_id_query_result) {
          responseBody = {
            status: 201,
            message: "등록된 캘린더가 없습니다"
        };
        res.json(responseBody);
        }
        const calendar_id = calendar_id_query_result[0].calendar_id

        
        console.log("calendar_id_query_result[0].calendar_id: ", user_id);

        // 캘린더에 등록된 스케쥴 가져오기
        let result = [];
        let query = "SELECT schedule_id, schedule_start, schedule_end, schedule_title FROM schedule WHERE calendar_id = ?";
        let responseBody = {};
        
        result = await db(query, [calendar_id]);
        responseBody = {
            status: 200,
            scheduleList: result,
            calendar_id: calendar_id
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


exports.insertSchedule = async (req, res) => {
    try {
      const user_id = req.body.user_id;
      const schedule_title = req.body.schedule_title;
      const schedule_start = req.body.schedule_start;
      const schedule_end = req.body.schedule_end;
      const calendar_id = req.body.calendar_id;


  
      const query = `
            INSERT INTO schedule (calendar_id, schedule_title, schedule_start, schedule_end)
      VALUES (?, ?, ?, ?);
          `;
      const result = await db(query, [
        calendar_id,
        schedule_title,
        schedule_start,
        schedule_end,
      ]);
  
      const responseBody = {
        status: 200,
        message: "ScheduleController.js의 insertSchedule 데이터 성공",
        data: result,
      };
      // 데이터 보내기
      res.json(responseBody);
    } catch (err) {
      console.error(err);
      const responseBody = {
        status: 400,
        message: err.message,
      };
      res.json(responseBody);
    }
  };


  exports.deleteSchedule = async (req, res) => {
    try {
      const user_id = req.body.user_id;
      const schedule_id = req.body.schedule_id;

  
      const query = `
        DELETE FROM schedule 
        WHERE schedule_id = ?
      `;
      const result = await db(query, [schedule_id]);
  
      const responseBody = {
        status: 200,
        message: "ScheduleController.js의 deleteSchedule 데이터 성공",
        data: result,
      };
      // 데이터 보내기
      res.json(responseBody);
    } catch (err) {
      console.error(err);
      const responseBody = {
        status: 400,
        message: err.message,
      };
      res.json(responseBody);
    }
  };