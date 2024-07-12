const { response } = require("express");
const db = require("../util/db");

// 결제내역
exports.paymentList = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    let page = req.query.page;
    let count = [];
    let result = [];
    let query = "";
    let responseBody = {};

    //영수증 경로 추가
    const orderId = Number(req.body.orderId);
    console.log(orderId);

    page = !page ? 0 : Number(page) - 1;

    query =
      "SELECT order_info_id,order_info_end_date, box_name, order_info_total_price FROM order_info JOIN box ON order_info.box_id = box.box_id WHERE box.user_id = ? ORDER BY order_info_id LIMIT 15 OFFSET ?;";
    result = await db(query, [user_id, page * 15]);

    query =
      "SELECT COUNT(*) AS COUNT FROM order_info JOIN box ON order_info.box_id = box.box_id WHERE user_id = ?;";
    count = await db(query, [user_id]);

        count = count[0]["COUNT"];
        count = count == 0 ? 1 : count;

    responseBody = {
      status: 200,
      paymentList: result,
      maxPage: Math.ceil(count / 15),
    };

    res.json(responseBody);
  } catch (error) {
    responseBody = {
      status: 400,
      mesage: "잘못된 페이지 요청입니다",
    };
    res.json(responseBody);
  }
};


//결제 영수증 건용 추가 
exports.receiptList = async(req, res)=>{
    try{
        console.log(req.body);

        const user_id = req.body.user_id;
        const box_id = req.body.box_id
        const orderId = Number(req.body.orderId)
        // const order_info_name = v4();
        console.log(orderId)

        //order_code 제작 order_info_name 사용
        orderquery = "SELECT order_info_name FROM order_info WHERE order_info_id = ?; "
        orderName = await db(orderquery,[orderId])
        console.log(orderName)

        query = `SELECT 
            b.box_name,
            o.order_info_name,
            o.order_info_id,
            o.order_info_end_date,
            o.order_info_price,
            b.user_id
        FROM
            order_info AS o
                JOIN
            box AS b ON o.box_id = b.box_id
        WHERE
            b.user_id = ? AND o.order_info_id = ?`;

        receipt = await db(query,[user_id,orderId])
        const responseBody ={
            status : 200,
            receiptList : receipt[0],
            order_code: orderName[0]
        }
        res.json(responseBody);
    }catch(error){
        console.log(error);
        responseBody = {
            status : 400,
            mesage: "잘못된 페이지 요청입니다"
        }
        res.json(responseBody);
    }
};

// 북마크
exports.bookmarkList = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    let page = req.query.page;
    let count = [];
    let result = [];
    let responseBody = {};

    page = !page ? 0 : Number(page) - 1;
    query = `SELECT 
                bookmark.bookmark_id, 
                bookmark.item_id, 
                item.item_name, 
                item.item_price, 
                item.item_tn_image_path
            FROM 
                bookmark
            JOIN 
                item ON bookmark.item_id = item.item_id 
            WHERE 
                bookmark.user_id = ?
            GROUP BY 
                bookmark.bookmark_id, 
                bookmark.item_id, 
                item.item_name,  
                item.item_price,  
                item.item_tn_image_path
            ORDER BY 
            bookmark.bookmark_id
            LIMIT 10 OFFSET ?;`
        result = await db(query, [user_id, (page * 10)]);
        console.log(result);
        query ="SELECT COUNT (*) AS COUNT FROM bookmark WHERE user_id = ?";
        count = await db(query, [user_id]);
        count = count[0]["COUNT"];
        count = count == 0 ? 1 : count;

    responseBody = {
      status: 200,
      bookmarkList: result,
      maxPage: Math.ceil(count / 10),
    };
    res.json(responseBody);
  } catch (error) {
    responseBody = {
      status: 400,
      message: "북마크를 불러올 수 없습니다",
    };
    res.json(responseBody);
  }
};

exports.bookmarkDel = async (req, res) => {
  try {
    const bookmarkId = req.body.bookmark_id;

       // bookmarkId가 유효한지 확인
       if (!bookmarkId) {
        responseBody = {
          status: 400,
          message: "선택된 북마크가 없습니다 북마크를 선택해주세요",
        };
        return res.json(responseBody);
      }


    // Bookmark 데이터 존재 확인
    const selectQuery = "SELECT * FROM bookmark WHERE bookmark_id = ?";
    const selectResult = await db(selectQuery, [bookmarkId]);

    if (selectResult.length <= 0) {
        responseBody = {
            status: 400,
            message: "북마크된 아이템이 없습니다",
          };
          return res.json(responseBody);
    }


    const deleteQuery = "DELETE FROM bookmark WHERE bookmark_id = ?";
    let result = await db(deleteQuery, [bookmarkId]);

    const affectedRows = result.affectedRows;

    if (affectedRows) {
      responseBody = {
        status: 200,
        delBookmark: result,
        message: "성공적으로 지웠습니다",
      };
      return res.json(responseBody);
    } else {
      responseBody = {
        status: 400,
        delBookmark: result,
        message: "지우는데 실패하였습니다",
      };
      return res.json(responseBody);
      // throw new Error("선택된 북마크를 삭제할 수 없습니다.");
    }
  } catch (err) {
    console.error(err);
    responseBody = {
      status: 400,
      message: "잘못된 페이지 요청입니다",
    };
    return res.json(responseBody);
  }
};

exports.bookmarkDeleteC = async (req, res) => {
  try {
    const bookmarkIds = req.body.checkedbookmarkIds; // 클라이언트에서 전송된 체크된 북마크 ID들의 배열

    if (!Array.isArray(bookmarkIds) || bookmarkIds.length === 0) {
      throw new Error("삭제할 북마크를 선택해주세요.");
    }

    let query = "DELETE FROM bookmark WHERE bookmark_id IN (?)"; // IN 절을 사용하여 여러 개의 bookmark_id를 한 번에 처리

    let result = await db(query, [bookmarkIds]);

    const affectedRows = result.affectedRows;

    if (affectedRows > 0) {
      res.status(200).json({
        status: 200,
        message: `${affectedRows}개의 북마크가 삭제되었습니다.`,
      });
    } else {
      throw new Error("선택된 북마크를 삭제할 수 없습니다.");
    }
  } catch (error) {
    console.error(error);
    responseBody = {
      status: 400,
      mesage: "잘못된 페이지 요청입니다",
    };
    res.json(responseBody);
  }
};

// 리뷰
exports.reviewList = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    let page = req.query.page;
    let count = [];
    let query = "";
    let result = [];
    let responseBody = {};

    page = !page ? 0 : Number(page) - 1;

    query = `SELECT item.item_name, item.item_tn_image_path, review_id, review_star, review_content 
                    FROM review 
                    JOIN item ON review.item_id = item.item_id
                    WHERE user_id = ? LIMIT 10 OFFSET ?`;

        result = await db(query, [user_id,(page * 10)]);
        console.log(result);
        query = "SELECT COUNT(*) AS COUNT FROM review WHERE user_id = ?"
        count = await db(query,[user_id]);
        count=count[0]["COUNT"];
        count = count == 0 ? 1 : count;

    responseBody = {
      status: 200,
      reviewList: result,
      maxPage: Math.ceil(count / 10),
    };
    res.json(responseBody);
  } catch (error) {
    console.log(error);
  }
};

// 리뷰 삭제 요청
exports.reviewDel = async (req, res) => {
  try {
    const review_id = req.body.reviewId;
    const query = "DELETE FROM review WHERE review_id=?";

    console.log(review_id);

    let result = [];
    result = await db(query, [review_id]);
    const affectedRows = result.affectedRows;

    console.log(result);
    if (affectedRows == 1) {
      responseBody = {
        status: 200,
        message: "리뷰 삭제 완료.",
        affectedRows,
      };
      res.status(200).json(responseBody);
    }
    // 하나 이상 바뀌거나 0개 바뀌었다면 에러를 던짐 -> 아래의 catch문이 400 에러로 응답한다.
    else {
      throw Error("리뷰를 찾을 수 없습니다.");
    }
  } catch (err) {
    console.error(err);
    responseBody = {
      status: 400,
      message: err.message,
    };
    res.json(responseBody);
  }
};



exports.qnaList = async (req, res) => {
    try{
        const user_id = req.body.user_id;
        let page = req.query.page;
        let count = [];
        let result = [];
        let responseBody = {};

        page = !page ? 0 :Number(page) - 1;
        query ="SELECT qna_date, qna_title, qna_type, qna_id FROM qna WHERE user_id = ? LIMIT 15 OFFSET ?";
        result = await db(query, [user_id, (page * 15) ]);

        query ="SELECT COUNT (*) AS COUNT FROM qna WHERE user_id = ?";
        count = await db(query, [user_id]);
        count = count[0]["COUNT"];
        count = count == 0 ? 1 : count;

        responseBody = {
            status: 200,
            qnaList : result,
            maxPage : Math.ceil(count / 15)
        }
        res.json(responseBody);
   
  } catch (err) {
    console.error(err);
    responseBody = {
      status: 400,
      message: err.message,
    };
    res.json(responseBody);
  }
};


// 견적함

exports.boxList = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    let page = req.query.page;
    let mode = req.body.mode;
    let responseBody = {};
    let result = [];
    let count = [];

    page = !page ? 0 : Number(page) - 1;

    mode = !mode ? "current" : mode;

    let orderBy;
    if (mode === "current") {
      orderBy = "box_date";
    } else if (mode === "price") {
      orderBy = "box_item_total_price";
    } else if (mode === "quantity") {
      orderBy = "box_quantity";
    }

    // 동적으로 쿼리를 작성합니다.
    let query = `SELECT box.box_id, box_name, box_date, box_quantity, SUM(box_item_total_price) AS box_item_total_price
                        FROM box 
                        LEFT JOIN box_item ON box.box_id = box_item.box_id
                        WHERE user_id = ? AND box_ordered = 'F' 
                        GROUP BY box.box_id, box_name, box_date, box_quantity
                        ORDER BY ${orderBy} DESC                      
                        LIMIT 15 OFFSET ?`;

    result = await db(query, [user_id, page * 15]);

    query = `SELECT COUNT(*) AS COUNT
                    FROM (
                        SELECT box.box_id
                        FROM box 
                        LEFT JOIN box_item ON box.box_id = box_item.box_id
                        WHERE user_id = ? AND box_ordered = 'F'
                        GROUP BY box.box_id, box_name, box_date, box_quantity
                    ) AS grouped_result`;
    count = await db(query, [user_id]);

        count = count[0]["COUNT"];
        count = count == 0 ? 1 : count;

    responseBody = {
      status: 200,
      boxList: result,
      maxPage: Math.ceil(count / 15),
      mode,
    };
    res.json(responseBody);
  } catch (error) {
    responseBody = {
      status: 400,
      message: "견적함 목록을 불러올 수 없습니다",
    };
    res.json(responseBody);
  }
};

exports.boxAdd = async (req, res) => {
  try {
    const boxName = req.body.boxName;
    const user_id = req.body.user_id;
    let result = [];
    let responseBody = {};
    let query =
      "INSERT INTO box(user_id, box_name, box_quantity) VALUES(?,?,0);";
    result = await db(query, [user_id, boxName]);

    responseBody = {
      status: 200,
      boxAdd: result,
    };
    res.json(responseBody);
  } catch (error) {
    responseBody = {
      status: 400,
      mesage: "견적함 추가에 실패했습니다.",
    };
  }
};
