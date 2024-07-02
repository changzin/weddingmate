const fs = require('fs');
const path = require('path');
const { v4  } = require('uuid');

// 컨트롤러가 요청을 받기 전, 먼저 요청을 받아 이미지 파일 업로드를 먼저 처리하는 미들웨어

/**
 * 리뷰, Q&A, 상품을 등록할 때의 미들웨어
 * 
 * 리뷰 시 필요 
 * review_image (64base encoding된 파일 데이터)
 * review_image_ext (확장자)
 * 
 * Q&A
 * qna_image
 * qna_image_ext
 * 
 * 상품
 * item_tn_image, item_main_image, item_detail_image
 * item_tn_image_ext, item_main_image_ext, item_detail_image_ext
 */
exports.upload = async(req, res, next)=>{
    try{
        // requestBody에서 Image file, 확장자(.png 등)를 가져온다.
        // review를 업로드하려면 review_image, review_image_ext가 있어야 함
        // qna는 qna_image, qna_image_ext 필요
        // item은 item_tn_image, item_detail_image, item_main_image, item_tn_image_ext, item_main_image_ext, item_detail_image_ext 필요
        let {review_image, qna_image, item_tn_image, item_detail_image, item_main_image, review_image_ext, qna_image_ext, item_tn_image_ext, item_main_image_ext, item_detail_image_ext} = req.body;
        let insertFileList = [];

        // 어떤 변수가 null이 아닌지에 따라 사진 위치 지정 가능  -> 리뷰, Q&A 등 다른 종류의 파일 업로드 처리 가능함
        if (req.body.upload_type=='review'){
            if (review_image && review_image_ext){
                // 'YYYY-MM-DD'로 파일 이름의 시작을 만듦
                const date = getToday();

                // 파일 이름 전체는 날짜 + UUID로 랜덤값을 만들어 넣는다.
                const filename = date + v4() + review_image_ext;
                
                // 파일의 상대경로이다. (weddingmate/src/uploads 다음에 올 경로라고 보면 됨.)
                // DB에 들어갈 경로 값이다.
                const filePath = `review/${filename}`;

                // DB에 넣는 건 컨트롤러가 해야 하니 reqestBody에 넣어서 넘겨준다.
                req.body.review_image_path = filePath;

                // 파일 업로드를 하기 위한 배열에 값을 넣는다.
                insertFileList.push({path:filePath, data: review_image});
                // 파일을 폴더에 직접 저장하는 함수 (res는 저장 실패 시 그대로 리턴하도록 하기 위함이다)
                writeFile(insertFileList, res);
            }
            // 리뷰는 사진이 없을 수 있다.
            else{
                req.body.review_image_path = null;
            }
        }
        else if (req.body.upload_type=='qna'){
            if (qna_image && qna_image_ext){
                const date = getToday();
                const filename = date + v4() + qna_image_ext;
                const filePath = `qna/${filename}`;

                req.body.qna_image_path = filePath;
                insertFileList.push({path:filePath, data: qna_image});
                // 파일을 폴더에 직접 저장하는 함수 (res는 저장 실패 시 그대로 리턴하도록 하기 위함이다)
                writeFile(insertFileList, res);
            }
            // Q&A도 사진이 없을 수 있다.
            else{
                req.body.qna_image_path = null;
            }
        }
        else if (req.body.upload_type='item'){
            if (item_tn_image && item_detail_image && item_main_image && item_tn_image_ext && item_detail_image_ext && item_main_image_ext){
                // 동일한 방식이지만, 상품 썸네일, 상세, 메인으로 이미지 파일이 3개이다.
                const date = getToday();
                const fileNameTn = date + v4() + item_tn_image_ext;
                const fileNameDetail = date + v4() + item_detail_image_ext;
                const fileNameMain = date + v4() + item_main_image_ext;
    
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
                // 파일을 폴더에 직접 저장하는 함수 (res는 저장 실패 시 그대로 리턴하도록 하기 위함이다)
                writeFile(insertFileList, res);
            }
            //item은 상품이 있어야 한다.
            else{
                throw new Error("상품 등록에 필요한 이미지를 받지 못했습니다.");    
            }
        }
        else{
            throw new Error("이미지 파일이나 확장자가 오지 않았습니다");
        }
        // 저장이 완료되었다면 컨트롤러로 넘긴다.
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

/**
 * 리뷰, Q&A, 상품을 수정
 * 
 * 리뷰 시 필요 
 * review_image (새 이미지 64base encoding 된 데이터)
 * review_image_ext (확장자)
 * review_image_change (바뀐 여부, true or false)
 * prev_review_image_path (기존 db에 들어가 있던 파일 경로)
 * 
 * Q&A
 * qna_image
 * qna_image_ext
 * qna_image_change
 * prev_qna_image_path

 * 상품
 * item_tn_image, item_main_image, item_detail_image
 * item_tn_image_ext, item_main_image_ext, item_detail_image_ext
 * item_tn_image_change, item_main_image_change, item_detail_image_change
 * prev_item_tn_image_path, prev_item_main_image_path, prev_item_detail_image_path
 */
// 이미지 수정 파일
exports.uploadUpdate = async(req, res, next)=>{
    try{
        // requestBody에서 Image file, 확장자(.png 등)를 가져온다.
        // review를 업로드하려면 review_image, review_image_ext가 있어야 함
        // qna는 qna_image, qna_image_ext 필요
        // item은 item_tn_image, item_detail_image, item_main_image, item_tn_image_ext, item_main_image_ext, item_detail_image_ext 필요
        let {review_image, qna_image, item_tn_image, item_detail_image, item_main_image, review_image_ext, qna_image_ext, item_tn_image_ext, item_main_image_ext, item_detail_image_ext} = req.body;
        let {review_image_change, qna_image_change, item_main_image_change, item_tn_image_change, item_detail_image_change} = req.body;
        let {prev_review_image_path, prev_qna_image_path, prev_item_main_image_path, prev_item_tn_image_path, prev_item_detail_image_path} = req.body;

        let insertFileList = [];

        // 어떤 변수가 null이 아닌지에 따라 사진 위치 지정 가능  -> 리뷰, Q&A 등 다른 종류의 파일 업로드 처리 가능함
        if (req.body.upload_type=='review'){
            if (review_image && review_image_ext && review_image_change){
                // 'YYYY-MM-DD'로 파일 이름의 시작을 만듦
                const date = getToday();

                // 파일 이름 전체는 날짜 + UUID로 랜덤값을 만들어 넣는다.
                const filename = date + v4() + review_image_ext;
                
                // 파일의 상대경로이다. (weddingmate/src/uploads 다음에 올 경로라고 보면 됨.)
                // DB에 들어갈 경로 값이다.
                const filePath = `review/${filename}`;

                // DB에 넣는 건 컨트롤러가 해야 하니 reqestBody에 넣어서 넘겨준다.
                req.body.review_image_path = filePath;

                // 파일 업로드를 하기 위한 배열에 값을 넣는다.
                insertFileList.push({path:filePath, data: review_image});
                // 파일을 폴더에 직접 저장하는 함수 (res는 저장 실패 시 그대로 리턴하도록 하기 위함이다)
                writeFile(insertFileList, res);

                // 이전 이미지가 존재할 경우 지운다.
                if (prev_review_image_path){
                    deleteFile(prev_review_image_path, res);
                }
            }
            else{
                req.body.review_image_path = null;
            }
        }
        else if (req.body.upload_type=='qna'){
            if (qna_image && qna_image_ext && qna_image_change){
                const date = getToday();
                const filename = date + v4() + qna_image_ext;
                const filePath = `qna/${filename}`;

                req.body.qna_image_path = filePath;
                insertFileList.push({path:filePath, data: qna_image});
                // 파일을 폴더에 직접 저장하는 함수 (res는 저장 실패 시 그대로 리턴하도록 하기 위함이다)
                writeFile(insertFileList, res);

                // 이전 이미지가 존재할 경우 지운다.
                if (prev_qna_image_path){
                    deleteFile(prev_qna_image_path, res);
                }
            }
            else{
                req.body.qna_image_path = null;
            }
        }
        else if (req.body.upload_type='item'){

            if (item_tn_image && item_tn_image_ext && item_tn_image_change){

                const date = getToday();
                const fileNameTn = date + v4() + item_tn_image_ext;
                // DB에 들어갈 path 값이다.
                const filePathTn = `item/${fileNameTn}`;
                req.body.item_tn_image_path = filePathTn;
                insertFileList.push({path:filePathTn, data: item_tn_image});

                deleteFile(prev_item_tn_image_path, res);
            }
            if (item_main_image && item_main_image_ext && item_main_image_change){
                const date = getToday();
                const fileNameMain = date + v4() + item_main_image_ext;
                const filePathMain = `item/${fileNameMain}`;
                
                req.body.item_main_image_path = filePathMain;
                
                insertFileList.push({path:filePathMain, data: item_main_image});
                deleteFile(prev_item_main_image_path, res);
            }
            if (item_detail_image && item_detail_image_ext && item_detail_image_change){
                const date = getToday();
                const fileNameDetail = date + v4() + item_detail_image_ext;
                const filePathDetail = `item/${fileNameDetail}`;
                req.body.item_detail_image_path = filePathDetail;
                insertFileList.push({path:filePathDetail, data: item_detail_image});
                deleteFile(prev_item_detail_image_path, res);
            }
            // 파일을 폴더에 직접 저장하는 함수 (res는 저장 실패 시 그대로 리턴하도록 하기 위함이다)
            if (insertFileList.length != 0){
                writeFile(insertFileList, res);
            }
        }
        // 미들웨어를 넣었는데 파일이 없으면 에러 발생
        else{
            throw new Error("이미지 파일이나 확장자가 오지 않았습니다");
        }
        // 저장이 완료되었다면 컨트롤러로 넘긴다.
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

/**
 * 리뷰, Q&A, 상품을 수정
 * 
 * 리뷰 시 필요 
 * prev_review_image_path (기존 db에 들어가 있던 파일 경로)
 * 
 * Q&A
 * prev_qna_image_path

 * 상품
 * prev_item_tn_image_path, prev_item_main_image_path, prev_item_detail_image_path
 */

exports.uploadDelete = async(req, res, next)=>{
    console.log(req.body);
    try{
        let {prev_review_image_path, prev_qna_image_path, prev_item_main_image_path, prev_item_tn_image_path, prev_item_detail_image_path} = req.body;

        if (req.body.upload_type=='review'){
            if (prev_review_image_path){
                deleteFile(prev_review_image_path, res);
            }
        }
        else if (req.body.upload_type=='qna'){
            if (prev_qna_image_path){
                deleteFile(prev_qna_image_path, res);
            }
        }
        else if (req.body.upload_type=='item'){
            deleteFile(prev_item_tn_image_path, res);
            deleteFile(prev_item_main_image_path, res);
            deleteFile(prev_item_detail_image_path, res);
        }
        next();
    }
    catch(err){
        console.error(err);
        let responseBody = {
            status: 400,
            message: "이미지 파일을 삭제할 수 없습니다."
        };
        res.json(responseBody);  
    }
}


function writeFile(files, res){
    // 파일을 여러개를 올리는 경우가 있어 배열로 하나씩 올리도록 만들었다.
    for(let i = 0; i < files.length; i++){
        // 컴퓨터의 절대경로를 받아와 만들 파일 이름까지 저장된 fullPath
        const fullPath = path.join(__dirname, `../uploads/${files[i].path}`);

        // 64base encoding을 진행한 파일을 decoding해준다.
        const data = files[i].data.slice(files[i].data.indexOf(';base64') + 8);
        
        // 파일 저장 부분. 에러 발생 시 그대로 리턴하도록 만듦
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

// 오늘 날짜를 문자열 'YYYY-MM-DD'로 리턴하는 함수이다.
function getToday(){
    const date = new Date();
    const year = date.getFullYear();
    const month = ("0" + (1 + date.getMonth())).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}

function deleteFile(imagePath, res){
    const fullPath = path.join(__dirname, `../uploads/${imagePath}`);
    fs.unlink(fullPath, (err)=>{
        console.error(err);
    });
}