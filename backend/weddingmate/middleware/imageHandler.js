const fs = require('fs');
const path = require('path');
const { v4  } = require('uuid');

exports.upload = async(req, res, next)=>{
    try{
        let {review_image, qna_image, item_tn_image, item_detail_image, item_main_image, review_image_ext, qna_image_ext, item_tn_image_ext, item_main_image_ext, item_detail_image_ext} = req.body;
        let insertFileList = [];

        if (review_image && review_image_ext){
            // 'YYYY-MM-DD'로 파일 이름의 시작을 만듦
            const date = getToday();

            // 파일 이름 전체는 날짜 + UUID
            const filename = date + v4() + review_image_ext;
            
            // 파일의 상대경로이다. (weddingmate/src/uploads 다음에 올 경로라고 보면 됨.)
            // DB에 들어갈 값이다.
            const filePath = `review/${filename}`;

            // req에 넣어 넘겨줄 것이다.
            req.body.review_image_path = filePath;

            insertFileList.push({path:filePath, data: review_image});
            
        }
        else if (qna_image && qna_image_ext){
            const date = getToday();
            const filename = date + v4() + qna_image_ext;
            const filePath = `qna/${filename}`;

            req.body.qna_image_path = filePath;
            insertFileList.push({path:filePath, data: qna_image});

        }
        else if (item_tn_image && item_detail_image && item_main_image && item_tn_image_ext && item_detail_image_ext && item_main_image_ext){
            const date = getToday();
            const fileNameTn = date + v4() + item_tn_image_ext;
            const fileNameDetail = date + v4() + item_detail_image_ext;
            const fileNameMain = date + v4() + item_main_image_ext;

            console.log(fileNameDetail, fileNameMain, fileNameTn);
            // DB에 들어갈 path 값이다.
            const filePathTn = `item/${fileNameTn}`;
            const filePathDetail = `item/${fileNameDetail}`;
            const filePathMain = `item/${fileNameMain}`;

            req.body.item_tn_image_path = filePathTn;
            req.body.item_detail_image_path = filePathDetail;
            req.body.item_main_image_path = filePathMain;

            insertFileList.push({path:filePathTn, data: item_tn_image});
            insertFileList.push({path:filePathDetail, data: item_detail_image});
            insertFileList.push({path:filePathMain, data: item_main_image});
        }
        else{
            throw new Error("이미지 파일이나 확장자가 오지 않았습니다");
        }
        
        writeFile(insertFileList, res);
        next();
    }
    catch(err){
        console.error(err);
        let responseBody = {
            status: 400,
            message: "파일을 저장할 수 없습니다."
        };
        res.json(responseBody);
    }
};



function writeFile(files, res){
    for(let i = 0; i < files.length; i++){
        // 만들 파일 이름까지 저장된 path이다.
        const fullPath = path.join(__dirname, `../uploads/${files[i].path}`);

        // 파일의 데이터 decoding
        const data = files[i].data.slice(files[i].data.indexOf(';base64') + 8);
        
        // 파일 저장 부문
        fs.writeFile(fullPath, data, 'base64', async(err)=>{
            if (err){
                console.error(err);
                let responseBody = {
                    status: 400,
                    message: "파일을 저장할 수 없습니다."
                };
                res.json(responseBody);
            }
        });
    };
}

function getToday(){
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}