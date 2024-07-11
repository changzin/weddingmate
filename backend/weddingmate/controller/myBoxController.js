const { response } = require("express");
const db = require('../util/db');
const { v4 } = require('uuid')

exports.myBoxItemName = async(req,res)=>{
    try{
        const user_id = req.body.user_id;
        const box_id = req.body.boxId;
        // const query = "SELECT DISTINCT i.item_name FROM item AS i INNER JOIN item_detail AS ide ON i.item_id = ide.item_id INNER JOIN box_item AS bi ON ide.item_detail_id = bi.item_detail_id"
        const query = "SELECT DISTINCT b.box_name, bi.box_item_id,b.user_id, bi.box_id, ide.*,i.item_discount_rate,  i.item_name,bi.box_item_total_price FROM item_detail AS  ide INNER JOIN box_item AS bi  ON ide.item_detail_id = bi.item_detail_id INNER JOIN item AS i ON ide.item_id = i.item_id INNER JOIN box AS b ON bi.box_id = b.box_id WHERE bi.box_id = ? AND b.user_id = ? ";
        box_name = await db(query,[box_id,user_id]);
        const boxquery  = "SELECT * FROM box WHERE box_id = ?";
        boxObj = await db(boxquery,[box_id]);
        console.log(box_name);
        console.log(boxObj);
        const responseBody = {
            status : 200,
            box_itemName : box_name,
            box_itemObj : boxObj[0]
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
exports.myBoxNameUpdate = async(req, res)=>{
    try{
        let box_name = req.body.box_name;
        const box_id = req.body.boxId;
        // const getBoxName = `SELECT box_name FROM box WHERE box_id = ?`
        console.log(box_name);
        // const boxName = await db(getBoxName,[box_id]);
        // console.log(boxName);
        updateBoxNameQuery = "UPDATE box SET box_name = ? WHERE box_id = ?"
        boxNameUpdate = await db(updateBoxNameQuery,[box_name,box_id])

        const affectedRows = boxNameUpdate.affectedRows;
        if(affectedRows == 1){ 
            const responseBody ={
                status : 200,
                data : boxNameUpdate
            }
            res.json(responseBody);
        }else{
            throw new Error("견적함의 이름을 변경 할 수 없습니다.")
        }
    }catch(err){
        console.error(err);
        responseBody = {
            status : 400,
            message : "카테고리가 없습니다."
        };
    
    }       
}

exports.myBoxDelete = async(req,res)=>{
    try{
        const user_id = req.body.user_id;
        const boxId = req.body.boxId;
        console.log(boxId);
        delectquery = "DELETE FROM box WHERE box_id = ?;" 
        delectBox = await db(delectquery,[boxId])
        console.log(delectBox);
        const affectedRows = delectBox.affectedRows;
        if(affectedRows == 1){ 
            const responseBody ={
                status : 200,
                data : delectBox
            }
            res.json(responseBody);
        }else{
            throw new Error("견적함을 삭제 할 수 없습니다.")
        }
    }catch(err){
        console.error(err);
        responseBody ={
            status : 400,
            message : "myBoxDelete 를 실행할 수 없습니다."
        }
    }
}

exports.myBoxOrder = async(req,res) => {
    try{
        const boxId = Number(req.body.boxId)
        console.log(boxId);
        const user_id = req.body.user_id
        console.log(user_id);
        orderquery = 
        "SELECT item.item_name, item_detail.item_detail_type, box_item.box_item_quantity, item.item_discount_rate, item.item_price, box_item.box_item_total_price, item_detail.item_detail_quantity from box, box_item, item_detail, item WHERE box.box_id=box_item.box_id AND box_item.item_detail_id=item_detail.item_detail_id AND item_detail.item_id=item.item_id AND box_item.box_id=? AND box.user_id=? AND box.box_ordered='F'";
        orderBox = (orderquery,[boxId,user_id])
        console.log(orderBox)
        const affectedRows = orderBox.affectedRows;
        if(affectedRows == 1){
            const responseBody ={
                status:200,
                order : orderBox
            }
            res.json(responseBody);
        }else{
            throw new Error("견적함을 주문 할 수 없습니다.")
        }
    }catch(err){
        console.error(err);
        responseBody = {
            status : 400,
            message : "myBoxOrder 를 실행 할 수 없습니다."
        }
    }
}