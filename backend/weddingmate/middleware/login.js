const db = require('../util/db');


// accessToken을 Id로 바꿔주는 미들웨어
// type을 넣어 주면 어떨까 생각 중
exports.tokenToId = async(req,res, next)=>{
    try{
        
        
        next();
    }
    catch{


        next();
    }
}