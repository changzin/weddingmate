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
        };
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
        const box_id = req.body.box_id;
        const order_info_pay_type = req.body.order_info_pay_type;
        const order_info_price = req.body.order_info_price;
        const order_info_total_price = req.body.order_info_total_price;
        const order_info_sale_price = req.body.order_info_sale_price;
        const order_info_cash_receipt = req.body.order_info_cash_receipt;
        const order_info_name = v4();

        let responseBody = {};
        let result = "";
        let query = "INSERT INTO order_info(box_id, order_info_name, order_info_pay_type, order_info_price, order_info_total_price, order_info_sale_price, order_info_cash_receipt) VALUES(?, ?, ?, ?, ?, ?, ?)";

        result = await db(query, [box_id, order_info_name, order_info_pay_type, order_info_price, order_info_total_price, order_info_sale_price, order_info_cash_receipt]);

        if (result.affectedRows == 1){
            responseBody = {
                status: 200,
                message: "주문 정보 추가 완료"
            }
            res.json(responseBody);
        }
        else{
            throw new Error("주문 정보를 추가하지 못했습니다.");
        }
    }catch(err){
        console.error(err);
        responseBody = {
            status : 400,
            message : err.message
        };
        res.json(responseBody);
    }
}