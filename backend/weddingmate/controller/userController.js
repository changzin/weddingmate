const db = require("../util/db");
const { encrypt, equals } = require('../util/wcrypt')
const { v4  } = require('uuid')
// 로그인 컨트롤러
exports.login = async(req,res)=>{
    try{
        // req.body 받아옴.
        const email = req.body.email;
        const password = req.body.password;
        const accessToken = req.body.accessToken;

        let count = 0;
        let result = 0;
        let responseBody = {};
        // 이메일과 비밀번호가 일치하고, 이메일 인증이 완료된 유저를 가져옴
        query = "SELECT * FROM user WHERE user_email = ? AND user_password = ? AND user_email_verified = 'T'";
        result = await db(query, [email, password]);
        count = result.length;

        // count 가 1이면 유저를 하나 찾음 -> 로그인 가능
        if (count == 1){
            user = result[0];

            // accessToken을 uuid로 생성
            const accessToken = v4();

            // user_access_token을 update해주는 쿼리문 실행 필요
            query = "UPDATE user SET user_access_token = ? WHERE user_id = ?";
            result = await db(query, [accessToken, user.user_id]);
        
            // 로그인 방법 분리
            if (user.user_type === "local"){
                responseBody = {
                    status: 200,
                    accessToken: accessToken,
                    message: "로그인 완료했습니다"
                }
            }
            else if (user.user_type === "naver"){

            }
            else if (user.user_type === "kakao"){

            }
            else if (user.user_type === "google"){

            }
            else{
                throw new Error("로그인을 할 수 없습니다 : API를 불러올 수 없거나 사용자 정보가 정확하지 않습니다");
            }            
        }
        else{
            query = "SELECT *  FROM admin WHERE admin_email = ? AND admin_password = ?"
            result = await db(query, [email, password]);
            count = result.length;

            if (count == 1){
                // 관리자 로그인
            }
            else{
                throw new Error("로그인을 할 수 없습니다 : 잘못된 정보 입력");
            }
        }
        res.json(responseBody);
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


exports.info = async(req, res)=>{
    try{
        const accessToken = req.body.accessToken;
        let count = 0;
        let result = 0;
        let responseBody = {};
        // accessToken으로 유저 정보를 가져옴
        query = "SELECT user_id, user_email, user_password, user_name, user_email, user_addr1, user_addr2 FROM user WHERE user_access_token = ?";
        result = await db(query, [accessToken]);
        const user = result[0];

        // 유저가 있다면 유저 정보를 보내고, 없다면 에러 발생
        if (user){
            responseBody = {
                status: 200,
                user: user
            }
            res.json(user);
        }
        else{
            throw new Error("쿠키가 만료되었습니다.");
        }
        count = result.length;
    } catch(err){
        console.error(err);
        responseBody = {
            status: 400,
            message: err.message
        };
        res.json(responseBody);         
    }
}