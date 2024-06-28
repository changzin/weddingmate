const db = require('../util/db');

exports.bookmarkList = async(req, res) =>{
    try{

        const user_id = req.body.user_id;
        let page = req.query.page;

        page = (!page) ? 0 : page-1;

        let result = [];
        let query = " SELECT bookmark.bookmark_id, item.item_name, item.item_price, item.item_tn_image_path FROM item JOIN bookmark ON item.item_id = bookmark.item_id WHERE bookmark.user_id = ? ORDER BY bookmark.bookmark_id LIMIT 10 OFFSET ?"; // 10개만 가져온다 시작점에서(어디가 시작인지 몰라서 ?)
   
        let responseBody ={};

        result = await db(query, [user_id, page * 10] );
        result2 = req.body;
      
        responseBody = {
            status: 200,
            bookmarkList: result, 
            log : result2
        };
        res.json(responseBody);
    }catch(err) {
        console.error(err);
        responseBody = {
            status : 400,
            mesage: "잘못된 페이지 요청입니다"
        }
        res.json(responseBody);
    
    }
}

exports.bookmarkDelete2 = async(req, res) =>{
  try{

    const user_id = req.body.user_id;

    let result = [];
    let query = "DELETE FROM bookmark"
    let responseBody = [];

  
  } catch(err){
    console.error(err);
  }
}

exports.bookmarkDeleteC = async (req, res) => {
  try {
      const bookmarkIds = req.body.checkedbookmarkIds; // 클라이언트에서 전송된 체크된 북마크 ID들의 배열

      if (!Array.isArray(bookmarkIds) || bookmarkIds.length === 0) {
          throw new Error("삭제할 북마크를 선택해주세요.");
      }

      const query = 'DELETE FROM bookmark WHERE bookmark_id IN (?)'; // IN 절을 사용하여 여러 개의 bookmark_id를 한 번에 처리

      const result = await db(query, [bookmarkIds]);

      const affectedRows = result.affectedRows;

      if (affectedRows > 0) {
          res.status(200).json({
              status: 200,
              message: `${affectedRows}개의 북마크가 삭제되었습니다.`
          });
      } else {
          throw new Error("선택된 북마크를 삭제할 수 없습니다.");
      }
  } catch (error) {
      res.status(400).json({
          status: 400,
          message: error.message
      });
  }
};
