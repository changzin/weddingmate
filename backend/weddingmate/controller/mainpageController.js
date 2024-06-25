const { request } = require('express');
const db = require('../util/db');
let responseBody;

//메인페이지에 리뷰 점수가 가장 높은 순으로 정렬 
exports.bestStudio = async (req,res)=>{
    try{
        let studio = req.body.studio;
        let review_star = req.body.star;
        
        
        

        

    }catch(err){
        console.error(err);
        responseBody = {
            status : 400,
            message : err.message
        };
        res.json(responseBody);
    }
}