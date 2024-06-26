const { request, query } = require('express');
const db = require('../util/db');

//메인페이지에 리뷰 점수가 가장 높은 순으로 정렬 
exports.bestStudioImage = async (req,res)=>{
    //쿼리문으로 데이터베이스에 있는 썸네일 이미지경로와 점수를 가져오고 그 값들을 Json으로 보내준다.
    try{
        max_star = 5;
        image = req.body.image;
        tn_iamge = req.body.tn_iamge;
        star_rating = req.body.star_rating;
        star = []
        //별점 5점에 가까운 순으로 이미지 가져오기 
        //이미지 데이터 따로 가져오고 리뷰점수 따로 가져오고 한꺼번에 데이터 가져오고
        //이미지를 배열로 불러와서 저장시키고  인덱스로 뽑아서 사용?
        query = "SELECT item_tn_image_path FROM item" 
        image = await db(query);
        console.log(images);
        query = "SELECT item_star_rating FROM item  ORDER BY item_star_rating DESC";
        star = await db(query);
        query = "SELECT item_tn_image_path = ? ,item_star_rating FROM item  ORDER BY item_star_rating = ? DESC"
        result = await db(query, [tn_image,star_rating])
        //점수 별로 정렬하는 것은  백에서 할게 아닐까 ? 

        const responseBody = {
            status: 200,
            message : "이미지 보내주니?",
            data: result,
        }
        res.json(responseBody);
    }catch(err){
        console.error(err);
        responseBody = {
            status : 400,
            message : err.message
        };
        res.json(responseBody);
    }
}