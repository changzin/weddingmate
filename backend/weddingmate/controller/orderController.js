const { request } = require('express');
const db = require('../util/db');
const { v4 } = require('uuid');

let responseBody;

//결제정보 데이터
exports.orderData = async (req,res)=>{
    try{
        let orderId = Number(req.body.order_id);
        let userId = req.body.user_id;
        let result = "";
        let responseBody = {};
        let query = "SELECT item.item_name, item_detail.item_detail_type, box_item.box_item_quantity, item.item_discount_rate, item.item_price, box_item.box_item_total_price from box, box_item, item_detail, item WHERE box.box_id=box_item.box_id AND box_item.item_detail_id=item_detail.item_detail_id AND item_detail.item_id=item.item_id AND box_item.box_id=? AND box.user_id=?";

        result = await db(query, [orderId, userId]);

        responseBody = {
            status: 200,
            boxItemList: result
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


exports.makeOrder = async (req, res)=>{
    try{
        
        const uuid = v4();
        const box_id = req.body.box_id;

        // let query = "insert into order_info(box_id, order_info_name, order_info_pay_type, order_info_price, order_info_total_price, order_info_sale_price, order_info_cash_receipt) values(?, ?, ?, ?, ?, ?, ?)";


    }catch(err){
        console.error(err);
        responseBody = {
            status : 400,
            message : err.message
        };
        res.json(responseBody);
    }
}