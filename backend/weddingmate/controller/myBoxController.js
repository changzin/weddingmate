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

//box 카테고리 쿼리문 
// SELECT b.user_id, bi.box_id, ide.item_detail_type
// FROM item_detail AS  ide
// INNER JOIN box_item AS bi 
// ON ide.item_detail_id = bi.item_detail_id
// INNER JOIN box AS b
// ON bi.box_id = b.box_id;

//견적함 카테고리 이름 가져오기 
// exports.myBoxCategory = async(req,res)=>{
//     try{
//         //미들웨어에서 가져오는 loginCheck
       
//         mybox_category = "SELELT "
//         // mybox_category = "SELECT b.user_id, bi.box_id FROM item_detail AS  ide INNER JOIN box_item AS bi ON ide.item_detail_id = bi.item_detail_id INNER JOIN box AS b ON bi.box_id = b.box_id WHERE b.user_id = '?'";
//         console.log(req.body);
//         console.log(box_id);
//         category_info = await db(mybox_category)

//         console.log(category_info);
//         const responseBody = { 
//             status : 200,
//             itemType : category_info
//         }
//         res.json(responseBody);

//     }catch{
//         console.error(err);
//             responseBody = {
//                 status : 400,
//                 message : "카테고리가 없습니다."
//             };
//             res.json(responseBody);
//         }
// }

exports.myBoxItemName = async(req,res)=>{
    try{
        const user_id = req.body.user_id;
        const box_id = req.body.boxId;
        // const query = "SELECT DISTINCT i.item_name FROM item AS i INNER JOIN item_detail AS ide ON i.item_id = ide.item_id INNER JOIN box_item AS bi ON ide.item_detail_id = bi.item_detail_id"
        const query = "SELECT  bi.box_item_id,b.user_id, bi.box_id, ide.*,i.item_discount_rate, i.item_name,bi.box_item_total_price FROM item_detail AS  ide INNER JOIN box_item AS bi  ON ide.item_detail_id = bi.item_detail_id INNER JOIN item AS i ON ide.item_id = i.item_id INNER JOIN box AS b ON bi.box_id = b.box_id WHERE bi.box_id = ? AND b.user_id = ? ";
        box_name = await db(query,[box_id,user_id]);

        console.log(box_name);
        const responseBody = {
            status : 200,
            box_itemName : box_name
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

exports.myBoxItemDelete = async(req,res)=>{
    try{
        const boxItemId = req.body.box_item_id
        const query = "DELETE FROM box_item WHERE box_item_id = ?";
        const itemDel = await db(query,[boxItemId])

        const affectedRows = itemDel.affectedRows;
        if(affectedRows == 1){ 
            const responseBody ={
                status : 200,
                boxItem_id : itemDel
            }
            res.json(responseBody);
        }else{
            throw new Error("선택된 상품을 지울 수 없습니다.")
        }
    }catch(err){
        console.error(err);
            responseBody = {
                status : 400,
                message : "카테고리가 없습니다."
            };
            res.json(responseBody);
        }
}