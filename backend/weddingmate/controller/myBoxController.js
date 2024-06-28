const { response } = require("express");
const db = require('../util/db');
const { v4 } = require('uuid')

//box_item | item_detail | item 3중 JOIN
// //SELECT i.item_id, i.item_name, ide.*, bi.box_id
// FROM item_detail AS ide 
// INNER JOIN item AS i   
// ON ide.item_id = i.item_id
// INNER JOIN box_item AS bi
// ON bi.item_detail_id = ide.item_detail_id;



//견적함 카테고리 이름 가져오기 
exports.myBoxCategory = async(req,res)=>{
    try{
        //미들웨어에서 가져오는 loginCheck
        const user_id = req.body.user_id;
        //카테고리 이름 받아오기 
        let cetegory 
        let box_id
        let item_detail 



        mybox_category = `SELECT i.item_id, i.item_name, ide.*, bi.box_id,b.user_id FROM item_detail AS ide INNER JOIN item AS i ON ide.item_id = i.item_id INNER JOIN box_item AS bi ON bi.item_detail_id = ide.item_detail_id INNER JOIN box AS b ON bi.box_id = b.box_id WHERE item_detail_type = ?  AND bi.item_detail_id = ?  AND bi.box_id  =? `;
        category_info = await db(mybox_category)


        console.log(category_info);
        const responseBody = { 
            status : 200,
            detail : category_info
        }
        res.json(responseBody);

    }catch{
        console.error(err);
            responseBody = {
                status : 400,
                message : "카테고리가 없습니다."
            };
            res.json(responseBody);
        }
}

exports.myBoxItemName = async(req,res)=>{
    try{
        
    

    }catch{
        console.error(err);
            responseBody = {
                status : 400,
                message : "카테고리가 없습니다."
            };
            res.json(responseBody);
        }
}

exports.myBoxItemOption = async(req,res)=>{
    try{


    }catch{
        console.error(err);
            responseBody = {
                status : 400,
                message : "카테고리가 없습니다."
            };
            res.json(responseBody);
        }
}