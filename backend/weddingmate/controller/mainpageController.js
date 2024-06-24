const { request } = require('express');
const db = require('../util/db');
let responseBody;

//결제정보 데이터
exports.mainStudio = async (req,res)=>{
    try{
        let studio = req.body.studio;
        let reivew_star = req.body.star;

        
        

        

    }catch(err){
        console.error(err);
        responseBody = {
            status : 400,
            message : err.message
        };
        res.json(responseBody);
    }
}