const db = require('../util/db');


// requestBody의 accessToken을 중간에서 user_id로 넣어주는 미들웨어, accessToken이 필요한 컨트롤러에서 인증 처리 + user_id를 찾는 중복 쿼리를 줄일 수 있다.
exports.loginCheck = async(req,res, next)=>{
    try{
        const accessToken = req.body.access_token;
        query = "SELECT user_id FROM user WHERE user_access_token = ?";
        result = await db(query, [accessToken]);
        const userId = result[0].user_id;

        if (result == 0){
            req.body.user_id = userId;
            next();
        }
        else{
            throw new Error("accessToken이 유효하지 않거나 존재하지 않습니다.");
        }
    }
    catch{
        console.error(err);
        responseBody = {
            status: 400,
            message: "로그인 상태가 아닙니다."
        };
        res.json(responseBody);      
    }
}

// 관리자용 로그인 체크
exports.adminLoginCheck = async(req,res, next)=>{
    try{
        const accessToken = req.body.access_token;
        query = "SELECT admin_id FROM admin WHERE admin_access_token = ?";
        result = await db(query, [accessToken]);
        const adminId = result[0].admin_id;
        
        if (adminId){
            req.body.admin_id = adminId;
            next();
        }
        else{
            throw new Error("accessToken이 유효하지 않거나 존재하지 않습니다.");
        }
    }
    catch(err){
        console.error(err);
        responseBody = {
            status: 400,
            message: "로그인 상태가 아닙니다."
        };
        res.json(responseBody);      
    }
}