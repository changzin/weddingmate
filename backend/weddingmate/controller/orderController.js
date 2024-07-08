const { request } = require('express');
const db = require('../util/db');
const { v4 } = require('uuid');
const axios = require('axios');

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
        console.log("result", result);
        if(result.length == 0){
            throw new Error("견적함을 찾을 수 없습니다");
        }

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
        let query = "";

        query = `SELECT COUNT(*) AS count FROM order_info WHERE box_id=?`;
        result = await db(query, [box_id]);
        if (result[0].count){
            responseBody = {
                status: 300,
                message: "이미 완료된 주문 페이지입니다.",
            }
            res.json(responseBody);
            return;
        }
        query = "INSERT INTO order_info(box_id, order_info_name, order_info_pay_type, order_info_price, order_info_total_price, order_info_sale_price, order_info_cash_receipt) VALUES(?, ?, ?, ?, ?, ?, ?)";

        result = await db(query, [box_id, order_info_name, order_info_pay_type, order_info_price, order_info_total_price, order_info_sale_price, (order_info_cash_receipt) ? 'T' : 'F']);

        if (result.affectedRows == 1){
            responseBody = {
                status: 200,
                message: "주문 정보 추가 완료",
                order_code: order_info_name
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

exports.kakaoPay = async(req, res) =>{
    try{
        let responseBody = {};

        const result = await axios({
                method: "POST",
                url: "https://open-api.kakaopay.com/online/v1/payment/ready",
                data: req.body,
                headers: {
                    "Authorization": `SECRET_KEY ${process.env.VUE_APP_KAKAOPAY_APP_KEY}`,
                    "Content-Type": 'application/json'
                }
            });
        console.log(result.data);
        responseBody = {
            status: 200,
            data: result.data
        }
        res.json(responseBody);
    }
    catch(err){
        console.error(err);
        responseBody = {
            status : 400,
            message : "kakaoPay가 응답하지 않습니다."
        };
        res.json(responseBody);
    }    
}