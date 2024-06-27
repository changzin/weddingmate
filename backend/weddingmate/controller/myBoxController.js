const { response } = require("express");
const db = require('../util/db');
const { v4 } = require('uuid')

//견적함 카테고리 이름 가져오기 
exports.myBoxCategory = async(req,res)=>{
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