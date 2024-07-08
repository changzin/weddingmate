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

        if(result.length != 1){
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

exports.analysis = async (req, res) =>{
    try{
        let responseBody = {};
        let result = "";
        let query = "";

        // 쿼리문에 들어갈 현재 날짜. 연과 월을 따로 구했다.
        const date = new Date();
        const year = date.getFullYear(); 
        const month = ((date.getMonth()+1 < 10) ? "0" : "") + (date.getMonth() + 1);
        

        // 현재 달의 날짜별 판매 정보 불러오기
        query = "SELECT DATE_FORMAT(order_info_end_date, '%Y-%m-%d') AS date, COUNT(*) AS daily_pay_amount, SUM(order_info_price) AS daily_profit FROM order_info WHERE order_info_end_date LIKE ? GROUP BY DATE_FORMAT(order_info_end_date, '%Y-%m-%d') ORDER BY DATE_FORMAT(order_info_end_date, '%Y-%m-%d')";
        result = await db(query, [`${year}-${month}%`]);

        // 그래프를 띄우기 위한 정보 가공
        let dayTableData = [
            ['날짜', '판매량', '판매액']
        ];
        let dayLineData = [
            ['날짜', '판매액']
        ];
        for(let i in result){
            dayTableData.push([result[i]['date'], result[i]['daily_pay_amount'], result[i]['daily_profit']]);
            dayLineData.push([result[i]['date'], result[i]['daily_profit']]);

        }

        // 올해의 월별 판매 정보 불러오기
        query = "SELECT DATE_FORMAT(order_info_end_date, '%Y-%m') AS date, COUNT(*) AS monthly_pay_amount, SUM(order_info_price) AS monthly_profit FROM order_info WHERE order_info_end_date like ? GROUP BY DATE_FORMAT(order_info_end_date, '%Y-%m') ORDER BY DATE_FORMAT(order_info_end_date, '%Y-%m')";
        result = await db(query, [`${year}%`]);

        // 그래프를 띄우기 위한 정보 가공
        let monthTableData = [
            ['날짜', '판매량', '판매액']
        ];
        let monthLineData = [
            ['날짜', '판매액']
        ];
        for(let i in result){
            monthTableData.push([result[i]['date'], result[i]['monthly_pay_amount'], result[i]['monthly_profit']]);
            monthLineData.push([result[i]['date'], result[i]['monthly_profit']]);
        }

        // 최근 10년 간의 판매 정보 불러오기
        query = "SELECT DATE_FORMAT(order_info_end_date, '%Y') AS date, COUNT(*) AS yearly_pay_amount, SUM(order_info_price) AS yearly_profit FROM order_info WHERE YEAR(order_info_end_date) > ? GROUP BY DATE_FORMAT(order_info_end_date, '%Y') ORDER BY DATE_FORMAT(order_info_end_date, '%Y')";
        result = await db(query, [year-10]);

        // 그래프를 띄우기 위한 정보 가공
        let yearTableData = [
            ['날짜', '판매량', '판매액']
        ];
        let yearLineData = [
            ['날짜', '판매액']
        ]
        for(let i in result){
            yearTableData.push([result[i]['date'], result[i]['yearly_pay_amount'], result[i]['yearly_profit']]);
            yearLineData.push([result[i]['date'], result[i]['yearly_profit']])
        }

        // 전체 상품 정보 가져오기
        query = "SELECT SUM(box_item.box_item_total_price) AS total_sale_price, SUM(box_item.box_item_quantity) AS total_sale_amount,item.item_name, item.item_factory_name, item.item_price, item.item_star_rating, item.item_review_count FROM box_item, box, item_detail, item where box.box_id = box_item.box_id AND box_item.item_detail_id=item_detail.item_detail_id AND item_detail.item_id = item.item_id AND box.box_ordered='T' GROUP BY item.item_id ORDER BY total_sale_price";
        result = await db(query);

        // 그래프를 띄우기 위한 정보 가공
        let itemTableData = [
            ['상품명', '회사', '판매 금액', '판매 수량', '가격', '별점', '리뷰 수']
        ];
        for(let i in result){
            itemTableData.push([result[i]['item_name'], result[i]['item_factory_name'], result[i]['total_sale_price'], result[i]['total_sale_amount'], result[i]['item_price'], result[i]['item_star_rating'], result[i]['item_review_count']]);
        }

        query = "SELECT item_detail.item_detail_type, SUM(box_item.box_item_total_price) AS total_sale_price, SUM(box_item.box_item_quantity) AS total_sale_amount, SUM(item.item_review_count) AS review_count FROM box_item, box, item_detail, item where box.box_id = box_item.box_id AND box_item.item_detail_id=item_detail.item_detail_id AND item_detail.item_id = item.item_id AND box.box_ordered='T' GROUP BY item_detail.item_detail_type ORDER BY total_sale_price DESC";
        result = await db(query);

        // 상품 카테고리별 정보 불러오기
        let categoryPiePriceData = [
            ['상품 종류', '판매 금액']
        ];
        let categoryPieAmountData = [
            ['상품 종류', '판매 수량']
        ];
        let categoryPieReviewData = [
            ['상품 종류', '리뷰 갯수']
        ];
        for(let i in result){
            categoryPiePriceData.push([result[i]['item_detail_type'], result[i]['total_sale_price']]);
            categoryPieAmountData.push([result[i]['item_detail_type'], result[i]['total_sale_amount']]);
            categoryPieReviewData.push([result[i]['item_detail_type'], result[i]['review_count']]);
        }
        query = "SELECT item_detail.item_detail_type, count(*) AS review_count FROM review, item_detail, item where item_detail.item_id = item.item_id AND review.item_id=item.item_id GROUP BY item_detail.item_detail_type";
        result = await db(query);
        for(let i in result){
            categoryPieReviewData.push([result[i]['item_detail_type'], result[i]['review_count']]);
        }
        res.json({
            status: 200,
            day_table_data: dayTableData,
            month_table_data: monthTableData,
            year_table_data: yearTableData,
            day_line_data: dayLineData,
            month_line_data: monthLineData,
            year_line_data: yearLineData,
            item_table_data: itemTableData,
            category_pie_price_data: categoryPiePriceData,
            category_pie_amount_data: categoryPieAmountData,
            category_pie_review_data: categoryPieReviewData
        })
    }
    catch(err){
        console.error(err);
        responseBody = {
            status : 400,
            message : "오류로 인해 데이터에 접근할 수 없습니다."
        };
        res.json(responseBody);
    }
}