const db = require("../util/db");
const { encrypt, equals } = require('../util/wcrypt')
const { v4  } = require('uuid')

// 로그인 컨트롤러
exports.login = async(req,res)=>{
    try{
        // req.body 받아옴.
        const email = req.body.email;
        const password = req.body.password;
        const loginType = req.body.loginType;
        
        let count = 0;
        let result = 0;
        let responseBody = {};

        const accessToken = v4();

        if (loginType == 'local'){
            // 이메일과 비밀번호가 일치하고, 이메일 인증이 완료된 유저를 가져옴
            query = "SELECT * FROM user WHERE user_email = ? AND user_password = ? AND user_email_verified = 'T' AND user_block='F' AND user_type=?";
            result = await db(query, [email, password, loginType]);
            count = result.length;
            // accessToken을 uuid로 생성
            
            // count 가 1이면 유저를 하나 찾음 -> 로그인 가능
            if (count == 1){
                user = result[0];
                // user_access_token을 update해주는 쿼리문 실행
                query = "UPDATE user SET user_access_token = ? WHERE user_id = ?";
                result = await db(query, [accessToken, user.user_id]);
        
                responseBody = {
                    status: 200,
                    accessToken: accessToken,
                    type: "local",
                    message: "로그인 완료했습니다"
                }
                res.json(responseBody);
                return;
            }

            // 관리자 로그인 -- 이메일이 관리자의 것인지 확인합니다.
            query = "SELECT * FROM admin WHERE admin_email = ? AND admin_password = ?"
            result = await db(query, [email, password]);
            count = result.length;
            
            if (count == 1){
                admin = result[0];

                // admin_access_token을 update해주는 쿼리문 실행
                query = "UPDATE admin SET admin_access_token = ? WHERE admin_id = ?";
                result = await db(query, [accessToken, admin.admin_id]);
                responseBody = {
                    status: 200,
                    accessToken: accessToken,
                    type: "admin",
                    message: "로그인 완료했습니다"
                }
                res.json(responseBody);
                return;
            }
            else{
                throw new Error("로그인을 할 수 없습니다 : 정확하지 않은 정보입니다.")
            }
        }
        else {
            // 소셜의 경우 - 로그인할 수 있는지 먼저 확인한다. (계정이 있음 로그인, 없음 회원가입으로 보낸다.)
            query = "SELECT * FROM user WHERE user_email = ? AND user_block='F' AND user_type=?";                
            result = await db(query, [email, loginType]);
            // 로그인 가능하다.
            if (result.length == 1){
                user = result[0];   
                query = "UPDATE user SET user_access_token = ? WHERE user_id = ?";
                result = await db(query, [accessToken, user.user_id]);
        
                responseBody = {
                    status: 200,
                    accessToken: accessToken,
                    type: loginType,
                    message: "로그인 완료했습니다"
                }
                res.json(responseBody);
                return;
            }

            // 로그인을 못하면 일단 이메일 중복 체크부터 시작함.
            query = "SELECT count(*) AS count FROM user WHERE user_email=?";                
            result = await db(query, [email]);
            count = result[0]['count'];
            if (count != 0){
                throw new Error("중복된 이메일입니다.")
            }
            query = "SELECT count(*) AS count FROM admin WHERE admin_email=?";                
            result = await db(query, [email]);
            count = result[0]['count'];
            if (count != 0){
                throw new Error("중복된 이메일입니다.")
            }

            responseBody = {
                status: 300,
                message: "로그인이 필요한 소셜 계정입니다.",
                user_email: email
            };
            res.json(responseBody); 
            return;
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
}

// 유저 정보를 가져오는 컨트롤러이다.
exports.info = async(req, res)=>{
    try{
        const accessToken = req.body.accessToken;
        let count = 0;
        let result = 0;
        let responseBody = {};
        // accessToken으로 유저 정보를 가져옴
        query = "SELECT user_type, user_id, user_email, user_password, user_nickname, user_name, user_email, user_addr1, user_addr2 FROM user WHERE user_access_token = ?";
        result = await db(query, [accessToken]);
        const user = result[0];

        // 유저가 있다면 유저 정보를 보내고, 없다면 에러 발생
        if (user){
            responseBody = user;
            responseBody.status = 200;
            res.json(responseBody);
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

exports.signUp = async (req, res)=>{
    try{
        const user_email = req.body.user_email;
        const user_password = req.body.user_password;
        const user_name = req.body.user_name;
        const user_nickname = req.body.user_nickname;
        const user_type = req.body.user_type;
        const user_addr1 = req.body.user_addr1;
        const user_addr2 = req.body.user_addr2;

        let count = 0;
        let result = 0;
        let responseBody = {};

        query = "SELECT count(*) AS count FROM user WHERE user_email=?";                
        result = await db(query, [user_email]);
        count = result[0]['count'];
        if (count != 0){
            throw new Error("중복된 이메일입니다.")
        }
        query = "SELECT count(*) AS count FROM admin WHERE admin_email=?";                
        result = await db(query, [user_email]);
        count = result[0]['count'];
        if (count != 0){
            throw new Error("중복된 이메일입니다.")
        }
        if(user_type == 'local'){
            query = "INSERT INTO user(user_email, user_password, user_name, user_nickname, user_type, user_addr1, user_addr2) values(?, ?, ?, ?, ?, ?, ?)";
            result = await db(query, [user_email, user_password, user_name, user_nickname, user_type, user_addr1, user_addr2]);
            result = result.affectedRows;

            if (result == 1){
                // 성공
                responseBody = {
                    status: 200,
                    message: "회원가입 완료"
                };
                res.status(200).json(responseBody);
            }
            else{
                throw new Error("회원가입을 완료하지 못했습니다.")
            }
        }
        else{
            query = "INSERT INTO user(user_email, user_password, user_name, user_nickname, user_type, user_addr1, user_addr2, user_email_verified) values(?, ?, ?, ?, ?, ?, ?, ?)";
            result = await db(query, [user_email, user_password, user_name, user_nickname, user_type, user_addr1, user_addr2, 'T']);
            result = result.affectedRows;
            if (result == 1){
                // 성공
                responseBody = {
                    status: 200,
                    message: "회원가입 완료"
                };
                res.status(200).json(responseBody);
            }
            else{
                throw new Error("회원가입을 완료하지 못했습니다.")
            }
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
}

exports.emailVerify = async(req, res)=>{
    try{
            const user_email = req.body.user_email;
            let count = 0;
            let result = 0;
            let responseBody = {};
            query = "SELECT count(*) AS count FROM user WHERE user_email=?";                
            result = await db(query, [user_email]);
            count = result[0]['count'];
            if (count != 0){
                throw new Error("중복된 이메일입니다.")
            }
            query = "SELECT count(*) AS count FROM admin WHERE admin_email=?";                
            result = await db(query, [user_email]);
            count = result[0]['count'];
            if (count != 0){
                throw new Error("중복된 이메일입니다.")
            }
            
            responseBody = {
                status: 200,
                message: "중복되지 않은 이메일입니다."
            };
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

exports.emailIsVerified = async(req, res)=>{
    try{
        const user_email = req.body.user_email;
        const query = 'UPDATE user SET user_email_verified="T" WHERE user_email=?';

        let result = [];
        result = await db(query, [user_email]);
        result = result.changedRows;

        if (result == 1){
            responseBody = {
                status: 200,
                message: "이메일 인증 반영 완료."
            };
            res.status(200).json(responseBody);
        }        
        else{
            throw Error("해당 유저를 찾을 수 없습니다.");
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
}

exports.edit = async(req, res)=>{
    try{
        let query = "UPDATE USER SET user_name=?, user_nickname=?, user_addr1=?, user_addr2=? WHERE user_id=?";
        let result = await db(query, [req.body.user_name, req.body.user_nickname, req.body.user_addr1, req.body.user_addr2, req.body.user_id]);
        console.log(req.body);
        console.log(result);

        if (result.affectedRows != 1){
            throw new Error("user_id와 일치하는 회원이 없습니다");
        }
        let responseBody = {
            status: 200,
            message: "회원 정보 수정 완료."
        }
        res.json(responseBody);
    }
    catch(err){
        console.error(err);
        responseBody = {
            status: 400,
            message: "사용자 정보를 수정할 수 없습니다."
        };
        res.json(responseBody);           
    }
}