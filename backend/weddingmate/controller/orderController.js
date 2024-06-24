const { request } = require('express');
const db = require('../util/db');
let responseBody;

//결제정보 데이터
exports.orderData = async (req,res)=>{
    try{
        const order = request.body;

        
        

        

    }catch(err){
        console.error(err);
        responseBody = {
            status : 400,
            message : err.message
        };
        res.json(responseBody);
    }
}