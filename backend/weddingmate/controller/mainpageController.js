const { request, query } = require('express');
const db = require('../util/db');

//메인페이지에 리뷰 점수가 가장 높은 순으로 정렬 
exports.bestItem = async (req,res)=>{
    //쿼리문으로 데이터베이스에 있는 썸네일 이미지경로와 점수를 가져오고 그 값들을 Json으로 보내준다.
    try{
        //별점 5점에 가까운 순으로 이미지 가져오기 
        star_query = "SELECT item_name, item_star_rating,item_tn_image_path FROM item  ORDER BY item_star_rating DESC";
        item_star = await db(star_query);
        
        console.log(item_star);
        const responseBody = {
            status : 200,
            best_item : item_star,
            // image : image,
        }
        res.json(responseBody);
    }catch(err){
        console.error(err);
        responseBody = {
            status : 400,
            message : "아이템이 없습니다."
        };
        res.json(responseBody);
    }
}