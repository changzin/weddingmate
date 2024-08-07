const db = require("../util/db");

exports.productList = async (req, res) => {
  try {
    // 데이터 준비
    // const itemType = req.query.itemType;
    const itemType = req.params.itemDetailType;
    let keyword = req.query.keyword;
    const page = parseInt(req.query.page) || 1;

    // 키워드가 null이거나 비어 있으면 %%을 붙여 쿼리문이 잘 돌아가도록 함.
    keyword = !keyword ? "%%" : "%" + keyword + "%";
    let result = [];
    let maxPage = 1;

    // 페이지네이션
    const pageSize = 12;
    const offset = (page - 1) * pageSize;
    if (itemType == "all") {
      const countQuery = `
          SELECT COUNT(*) AS totalCount 
          FROM item 
          WHERE item_name LIKE ?
        `;
      const countResult = await db(countQuery, [keyword]);
      const totalCount = countResult[0].totalCount;
      maxPage = Math.ceil(totalCount / pageSize);

      // 현재 페이지에 따른 item 데이터 가져오기
      const query = `
          SELECT DISTINCT item.*, item_detail.item_detail_type
          FROM item 
          JOIN item_detail ON item.item_id = item_detail.item_id 
          WHERE item.item_name LIKE ? 
          LIMIT ? OFFSET ?
        `;
      result = await db(query, [keyword, pageSize, offset]);
    } else {
      const countQuery = `
          SELECT COUNT(*) AS totalCount 
          FROM item 
          JOIN item_detail ON item.item_id = item_detail.item_id 
          WHERE item_detail.item_detail_type = ? AND item_name LIKE ?
          GROUP BY item.item_id
        `;
      const countResult = await db(countQuery, [itemType, keyword]);
      let totalCount = 0;
      if (countResult[0] != null){
        totalCount = countResult[0].totalCount;
        maxPage = Math.ceil(totalCount / pageSize);
      }
      // 현재 페이지에 따른 item 데이터 가져오기
      const query = `
          SELECT DISTINCT item.*, item_detail.item_detail_type
          FROM item 
          JOIN item_detail ON item.item_id = item_detail.item_id 
          WHERE item_detail.item_detail_type = ? AND item.item_name LIKE ? 
          LIMIT ? OFFSET ?
        `;
      result = await db(query, [itemType, keyword, pageSize, offset]);
    }

    // 데이터 보낼 준비
    const responseBody = {
      status: 200,
      message: "ProductController.js의 productList 데이터 성공",
      data: result,
      maxPage: maxPage,
    };
    // 데이터 보내기
    res.json(responseBody);
  } catch (err) {
    console.error(err);
    const responseBody = {
      status: 400,
      message: err.message,
    };
    res.json(responseBody);
  }
};

exports.productDetail = async (req, res) => {
  try {
    const itemId = req.params.itemId;

    // item 테이블에서 item_id에 해당하는 데이터 가져오기
    const itemQuery = `SELECT * FROM item WHERE item_id = ?`;
    const itemResult = await db(itemQuery, [itemId]);

    if (itemResult.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Item not found",
      });
    }

    // item_detail 테이블에서 item_id에 해당하는 데이터 가져오기
    const itemDetailQuery = `SELECT * FROM item_detail WHERE item_id = ?`;
    const itemDetailResult = await db(itemDetailQuery, [itemId]);

    const responseBody = {
      status: 200,
      message: "ProductController.js의 productDetail 데이터 성공",
      data: {
        item: itemResult[0],
        itemDetails: itemDetailResult,
      },
    };

    res.json(responseBody);
  } catch (err) {
    console.error(err);
    const responseBody = {
      status: 400,
      message: err.message,
    };
    res.json(responseBody);
  }
};

exports.BoxList = async (req, res) => {
  try {
    // 데이터 준비
    const user_id = req.body.user_id;

    // 현재 페이지에 따른 item 데이터 가져오기
    const query = `
            SELECT * FROM box where user_id = ?;
          `;
    const result = await db(query, [user_id]);

    // 데이터 보낼 준비
    const responseBody = {
      status: 200,
      message: "ProductController.js의 productList 데이터 성공",
      data: result,
    };
    // 데이터 보내기
    res.json(responseBody);
  } catch (err) {
    console.error(err);
    const responseBody = {
      status: 400,
      message: err.message,
    };
    res.json(responseBody);
  }
};

exports.AddBox = async (req, res) => {
  try {
    // 데이터 준비
    // req.body.user_id는 전 미들웨어인 loginCheck에서 가져온 값
    const user_id = req.body.user_id;
    // req.body.box_name는 뷰에서 가져온 값
    const box_name = req.body.box_name;

    // Box 데이터 생성
    const query = `
            INSERT INTO box (user_id, box_name, box_quantity)
      VALUES (?, ?, 0);
          `;
    const result = await db(query, [user_id, box_name]);

    const query2 = `
    SELECT * FROM box where user_id = ? and box_ordered = 'F';
  `;
    const result2 = await db(query2, [user_id]);

    // 데이터 보낼 준비
    const responseBody = {
      status: 200,
      message: "ProductController.js의 productList 데이터 성공",
      data: result2,
    };

    // 데이터 보내기
    res.json(responseBody);
  } catch (err) {
    console.error(err);
    const responseBody = {
      status: 400,
      message: err.message,
    };
    res.json(responseBody);
  }
};

exports.InsertItemIntoBox = async (req, res) => {
  try {
    // 데이터 준비
    // req.body.user_id는 전 미들웨어인 loginCheck에서 가져온 값
    const user_id = req.body.user_id;
    // req.body.box_name는 뷰에서 가져온 값
    const box_id = req.body.box_id;
    const item_detail_id = req.body.item_detail_id;
    const box_item_quantity = req.body.box_item_quantity;
    const box_item_total_price = req.body.box_item_total_price;
    const box_item_schedule_start = req.body.box_item_schedule_start;
    const box_item_schedule_end = req.body.box_item_schedule_end;

    const searchSamRecodequery = `
              select box_item_id 
              from box_item 
              where box_id = ? and item_detail_id = ?
            `;
    const searchSameRecodResult = await db(searchSamRecodequery, [
      box_id,
      item_detail_id,
    ]);

    // 만약에 박스에 기존 아이템이 담겨져 있을 경우 중복으로 담지 않고 기존 아이템을 업데이트를 해준다
    if (searchSameRecodResult.length > 0) {
      const updateboxItemquery = `
      UPDATE box_item 
      SET 
        box_item_quantity = ?,
        box_item_schedule_start = ?,
        box_item_schedule_end = ?,
        box_item_total_price = ?
      WHERE box_item_id = ?
          `;
    const updateboxItemResult = await db(updateboxItemquery, [
      box_item_quantity,
      box_item_schedule_start,
      box_item_schedule_end,
      box_item_total_price * box_item_quantity,
      searchSameRecodResult[0].box_item_id,
    ]);
      // 데이터 보낼 준비
      const responseBody = {
        status: 200,
        message: "ProductController.js의 productList 데이터 성공",
        data: updateboxItemResult,
      };
      // 데이터 보내기
      return res.json(responseBody);
    }

    // 만약에 박스에 기존 아이템이 담겨져있지 않은 경우 중복으로 담지 않고 기존 아이템을 업데이트를 해준다

    const query = `
              INSERT INTO box_item (box_id, item_detail_id, box_item_quantity,box_item_total_price, box_item_schedule_start, box_item_schedule_end)
        VALUES (?, ?, ?, ?, ?, ?);
            `;
    const result = await db(query, [
      box_id,
      item_detail_id,
      box_item_quantity,
      box_item_total_price,
      box_item_schedule_start,
      box_item_schedule_end,
    ]);

    // 데이터 보낼 준비
    const responseBody = {
      status: 200,
      message: "ProductController.js의 productList 데이터 성공",
      data: result,
    };
    // 데이터 보내기
    res.json(responseBody);
  } catch (err) {
    console.error(err);
    const responseBody = {
      status: 400,
      message: err.message,
    };
    res.json(responseBody);
  }
};

exports.Bookmark = async (req, res) => {
  try {
    // 데이터 준비
    // req.body.user_id는 전 미들웨어인 loginCheck에서 가져온 값
    const user_id = req.body.user_id;
    // req.body.box_name는 뷰에서 가져온 값
    const item_id = req.body.item_id;

    // Bookmark 데이터 존재 확인
    const selectQuery = `
              select * from bookmark where item_id = ? and user_id = ?
            `;
    const selectResult = await db(selectQuery, [item_id, user_id]);
    
    if (selectResult.length > 0) {
      // 데이터 보낼 준비
      const responseBody = {
        status: 201,
        message: "이미 있는 데이터라 못 넣음",
      };
      // 데이터 보내기
      return res.json(responseBody);
    }

    // Bookmark 데이터 생성
    const query = `
              INSERT INTO bookmark (item_id, user_id)
        VALUES (?, ?);
            `;
    const result = await db(query, [item_id, user_id]);


    // 데이터 보낼 준비
    const responseBody = {
      status: 200,
      message: "ProductController.js의 bookmark 데이터 성공",
      data: result.insertId,
    };
    // 데이터 보내기
    res.json(responseBody);
  } catch (err) {
    console.error(err);
    const responseBody = {
      status: 400,
      message: err.message,
    };
    res.json(responseBody);
  }
};

exports.totalProductDetail = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const itemId = req.params.itemId;

    // item 테이블에서 item_id에 해당하는 데이터 가져오기
    const itemQuery = `SELECT * FROM item WHERE item_id = ?`;
    const itemResult = await db(itemQuery, [itemId]);

    if (itemResult.length === 0) {
      return res.status(404).json({
        status: 404,
        message: "Item not found",
      });
    }

    // item_detail 테이블에서 item_id에 해당하는 데이터 가져오기
    const itemDetailQuery = `SELECT * FROM item_detail WHERE item_id = ?`;
    const itemDetailResult = await db(itemDetailQuery, [itemId]);

    // 리뷰
    const reviewQuery = `SELECT review.review_id, review.review_star, review.review_image_path, review.review_content, user.user_nickname, review.review_date,
     CASE 
      WHEN review.user_id = ? THEN 1 
      ELSE 0 
      END AS is_current_user
    FROM review
    JOIN user ON review.user_id = user.user_id 
    WHERE item_id=? 
    ORDER BY review.review_id
    LIMIT 6`;

    let reviewResult = [];
    reviewResult = await db(reviewQuery, [user_id, itemId]);

    // QnA
    const qnaQuery =
      "SELECT qna.qna_id, qna.qna_type, qna.qna_has_answer, qna.qna_title, qna.qna_visibility, user.user_nickname, qna_date FROM qna, user WHERE qna.user_id=user.user_id AND qna.item_id=? ORDER BY qna.qna_id LIMIT 5";

    let qnaResult = [];
    qnaResult = await db(qnaQuery, [itemId]);

    // 견적함
    const boxQuery = `
    SELECT * FROM box where user_id = ? and box_ordered = 'F';
  `;
    const boxResult = await db(boxQuery, [user_id]);

    // 북마크
    const bookmarkQuery = `
    SELECT * FROM bookmark where item_id = ?;
  `;

    const bookmarkResult = await db(bookmarkQuery, [itemId]);

    const responseBody = {
      status: 200,
      message: "ProductController.js의 productDetail 데이터 성공",
      data: {
        item: itemResult[0],
        bookmarkResult: bookmarkResult[0],
        itemDetails: itemDetailResult,
        reviewList: reviewResult,
        qnaList: qnaResult,
        data: boxResult,
      },
    };

    res.json(responseBody);
  } catch (err) {
    console.error(err);
    const responseBody = {
      status: 400,
      message: err.message,
    };
    res.json(responseBody);
  }
};

// exports.totalProductDetail = async (req, res) => {
//   try {
//     const user_id = req.body.user_id;
//     const itemId = req.params.itemId;

//     console.log("itemId : ", itemId);

//     // item 테이블에서 item_id에 해당하는 데이터 가져오기
//     const itemQuery = `SELECT * FROM item WHERE item_id = ?`;
//     const itemDetailQuery = `SELECT * FROM item_detail WHERE item_id = ?`;
//     const reviewQuery = `
//       SELECT review.review_id, review.review_star, review.review_image_path, review.review_content, user.user_nickname, review.review_date,
//         CASE
//           WHEN review.user_id = ? THEN 1
//           ELSE 0
//         END AS is_current_user
//       FROM review
//       JOIN user ON review.user_id = user.user_id
//       WHERE item_id = ?
//       ORDER BY review.review_date
//       LIMIT 6`;
//     const qnaQuery = `
//       SELECT qna.qna_id, qna.qna_type, qna.qna_has_answer, qna.qna_title, user.user_nickname, qna_date
//       FROM qna
//       JOIN user ON qna.user_id = user.user_id
//       WHERE qna.item_id = ?
//       ORDER BY qna.qna_date
//       LIMIT 5`;
//     const boxQuery = `SELECT * FROM box WHERE user_id = ?`;

//     const [
//       itemResult,
//       itemDetailResult,
//       reviewResult,
//       qnaResult,
//       boxResult
//     ] = await Promise.all([
//       db(itemQuery, [itemId]),
//       db(itemDetailQuery, [itemId]),
//       db(reviewQuery, [user_id, itemId]),
//       db(qnaQuery, [itemId]),
//       db(boxQuery, [user_id])
//     ]);

//     if (itemResult.length === 0) {
//       return res.status(404).json({
//         status: 404,
//         message: "Item not found",
//       });
//     }

//     const responseBody = {
//       status: 200,
//       message: "ProductController.js의 productDetail 데이터 성공",
//       data: {
//         item: itemResult[0],
//         itemDetails: itemDetailResult,
//         reviewList: reviewResult,
//         qnaList: qnaResult,
//         data: boxResult,
//       },
//     };

//     res.json(responseBody);
//   } catch (err) {
//     console.error(err);
//     const responseBody = {
//       status: 400,
//       message: err.message,
//     };
//     res.json(responseBody);
//   }
// };
