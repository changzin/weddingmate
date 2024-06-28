const db = require('../util/db');


// requestBody의 accessToken을 중간에서 user_id로 넣어주는 미들웨어, accessToken이 필요한 컨트롤러에서 인증 처리 + user_id를 찾는 중복 쿼리를 줄일 수 있다.
exports.loginCheck = async(req,res, next)=>{
/*
    exports. 다른 페이지에서도 쓸 수 있게 해줌
*/
    try{
        // access_token은 유저를 식별하기 위해 DB에 들어간 값이다. 이걸로 쿼리문을 날려 user_id를 식별할 수 있다.
        const accessToken = req.body.access_token;
        query = "SELECT user_id FROM user WHERE user_access_token = ?";
        result = await db(query, [accessToken]);
        const userId = result[0].user_id;

        // userId가 null이면 에러고, 발생하면 requestBody에 넣어서 컨트롤러로 넘겨 준다.
        if (userId){
            req.body.user_id = userId;
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

// 관리자용 로그인 체크. 똑같은 매커니즘인데 변수 이름만 바뀌었다.
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

exports.loginFilter = async(req,res, next)=>{

    /*
    exports. 다른 페이지에서도 쓸 수 있게 해줌
    
    
    */
        try{
            const accessToken = req.body.access_token;
            query = "SELECT user_id FROM user WHERE user_access_token = ?";
            result = await db(query, [accessToken]);
            const userId = result[0].user_id;
    
            if (userId){
                req.body.user_id = userId;
                next();
            }
            else{
                req.body.user_id = null;
                next();
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