const db = require("../util/db");

exports.adminReviewList = async (req, res) => {
  try {
    let page = req.query.page;
    let reported = req.query.reported;
    let mode = req.query.mode;
    let keyword = "%" + req.query.keyword + "%";

    // request에 오는 param들은 전부 String 타입이기 때문에, db문에 끼워 넣으러면 숫자로 바꿔야 합니다.
    page = !page ? 0 : Number(page) - 1;
    reported = !reported ? null : reported;

    let result = [];
    let count = 0;
    let query = "";

    // review_date로 정렬 후, OFFSET만큼 뛰어넘은 다음 LIMIT 개수만큼 가져오는 쿼리문들. 검색 옵션에 따라 상이한 쿼리문 적용
    if (mode === "all") {
      if (reported == "T") {
        query =
          "SELECT review.review_id, review.review_star, review.review_image_path, review.review_reported, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE review.user_id = user.user_id AND review.review_reported=? AND (review.review_content LIKE ? OR user.user_nickname LIKE ?) ORDER BY review.review_date LIMIT 9 OFFSET ? ";
        result = await db(query, [reported, keyword, keyword, page * 9]);
        query =
          "SELECT count(*) AS count FROM review, user WHERE review.user_id = user.user_id AND review.review_reported=? AND (review.review_content LIKE ? OR user.user_nickname LIKE ?)";
        count = await db(query, [reported, keyword, keyword]);
        count = count[0]["count"];
      } else {
        query =
          "SELECT review.review_id, review.review_star, review.review_image_path, review.review_reported, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE review.user_id = user.user_id AND (review.review_content LIKE ? OR user.user_nickname LIKE ?) ORDER BY review.review_date LIMIT 9 OFFSET ? ";
        result = await db(query, [keyword, keyword, page * 9]);
        query =
          "SELECT count(*) AS count FROM review, user WHERE review.user_id = user.user_id AND (review.review_content LIKE ? OR user.user_nickname LIKE ?)";
        count = await db(query, [keyword, keyword]);
        count = count[0]["count"];
      }
    } else if (mode === "content") {
      if (reported == "T") {
        query =
          "SELECT review.review_id, review.review_star, review.review_image_path, review.review_reported, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE review.user_id = user.user_id AND review.review_reported=? AND review.review_content LIKE ? ORDER BY review.review_date LIMIT 9 OFFSET ? ";
        result = await db(query, [reported, keyword, page * 9]);
        query =
          "SELECT count(*) AS count FROM review, user WHERE review.user_id = user.user_id AND review.review_reported=? AND review.review_content LIKE ?";
        count = await db(query, [reported, keyword]);
        count = count[0]["count"];
      } else {
        query =
          "SELECT review.review_id, review.review_star, review.review_image_path, review.review_reported, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE review.user_id = user.user_id AND review.review_content LIKE ? ORDER BY review.review_date LIMIT 9 OFFSET ? ";
        result = await db(query, [keyword, page * 9]);
        query =
          "SELECT count(*) AS count FROM review, user WHERE review.user_id = user.user_id AND review.review_content LIKE ?";
        count = await db(query, [keyword]);
        count = count[0]["count"];
      }
    } else if (mode === "nickname") {
      if (reported == "T") {
        query =
          "SELECT review.review_id, review.review_star, review.review_image_path, review.review_reported, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE review.user_id = user.user_id AND review.review_reported=? AND user.user_nickname LIKE ? ORDER BY review.review_date LIMIT 9 OFFSET ? ";
        result = await db(query, [reported, keyword, page * 9]);
        query =
          "SELECT count(*) AS count FROM review, user WHERE review.user_id = user.user_id AND review.review_reported=? AND user.user_nickname LIKE ?";
        count = await db(query, [reported, keyword]);
        count = count[0]["count"];
      } else {
        query =
          "SELECT review.review_id, review.review_star, review.review_image_path, review.review_reported, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE review.user_id = user.user_id AND user.user_nickname LIKE ? ORDER BY review.review_date LIMIT 9 OFFSET ? ";
        result = await db(query, [keyword, page * 9]);
        query =
          "SELECT count(*) AS count FROM review, user WHERE review.user_id = user.user_id AND user.user_nickname LIKE ?";
        count = await db(query, [keyword]);
        count = count[0]["count"];
      }
    } else if (reported == "T") {
      query =
        "SELECT review.review_id, review.review_star, review.review_image_path, review.review_reported, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE review.user_id = user.user_id AND review.review_reported=? ORDER BY review.review_date LIMIT 9 OFFSET ? ";
      result = await db(query, [reported, page * 10]);
      query =
        "SELECT count(*) AS count FROM review, user WHERE review.user_id = user.user_id AND review.review_reported=?";
      count = await db(query, [reported]);
      count = count[0]["count"];
    } else {
      query =
        "SELECT review.review_id, review.review_star, review.review_image_path, review.review_reported, review.review_content, user.user_nickname, review.review_date FROM review, user WHERE review.user_id = user.user_id ORDER BY review.review_date LIMIT 9 OFFSET ? ";
      result = await db(query, [page * 10]);
      query =
        "SELECT count(*) AS count FROM review, user WHERE review.user_id = user.user_id ";
      count = await db(query, []);
      count = count[0]["count"];
    }
    responseBody = {
      maxPage: Math.ceil(count / 9),
      reviewList: result,
    };
    res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    responseBody = {
      status: 400,
      message: "잘못된 페이지 요청입니다.",
    };
    res.json(responseBody);
  }
};

// 리뷰 삭제 요청
exports.adminReviewDelete = async (req, res) => {
  try {
    // 어차피 미들웨어에서 관리자 인증을 진행하기 때문에 그냥 삭제함.
    const review_id = req.body.review_id;
    const query = "DELETE FROM review WHERE review_id=?";

    let result = [];
    result = await db(query, [review_id]);
    // affectedRows는 바뀐 행 개수이다.
    result = result.affectedRows;

    if (result == 1) {
      responseBody = {
        status: 200,
        message: "리뷰 삭제 완료.",
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

// 리뷰 삭제 요청
exports.userReviewDelete = async (req, res) => {
  try {
    const review_id = req.body.review_id;
    // 미들웨어에서 검증해준 user_id 사용
    const user_id = req.body.user_id;
    const query = "DELETE FROM review WHERE review_id=? AND user_id=?";

    console.log(review_id, user_id);

    let result = [];
    result = await db(query, [review_id, user_id]);

    // affectedRows는 바뀐 행 개수이다.
    result = result.affectedRows;

    console.log(result);
    if (result == 1) {
      responseBody = {
        status: 200,
        message: "리뷰 삭제 완료.",
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

exports.itemDetail = async (req, res) => {
  try {
        const user_id = req.body.user_id;

    const item_id = req.params.item_id;
    // item_id로 최근 리뷰 6개를 가져오는 쿼리문
    // const query =
    //   `SELECT review.review_id, review.review_star, review.review_image_path, review.review_content, user.user_nickname, review.review_date 
    //   FROM review, user 
    //   WHERE review.user_id = user.user_id 
    //   AND item_id=? 
    //   ORDER BY review.review_date 
    //   LIMIT 6`;

    


    const query =
  `SELECT review.review_id, review.review_star, review.review_image_path, review.review_content, user.user_nickname, review.review_date,
     CASE 
      WHEN review.user_id = ? THEN 1 
      ELSE 0 
      END AS is_current_user
    FROM review
    JOIN user ON review.user_id = user.user_id 
    WHERE item_id=? 
    ORDER BY review.review_date 
    LIMIT 6`;

    let result = [];
    result = await db(query, [user_id, item_id]);

    responseBody = {
      status: 200,
      reviewList: result,
    };
    res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    responseBody = {
      status: 400,
      message: err.message,
    };
    res.json(responseBody);
  }
};

exports.reviewReport = async (req, res) => {
  try {
    // 데이터 준비
    // req.body.user_id는 전 미들웨어인 loginCheck에서 가져온 값
    const user_id = req.body.user_id;
    // req.body.box_name는 뷰에서 가져온 값
    const review_id = req.body.review_id;
    const report_content = req.body.report_content;

    // Box 데이터 생성
    const query = `
                  INSERT INTO report (user_id, review_id, report_content)
            VALUES (?, ?, ?);
                `;
    const result = await db(query, [user_id, review_id, report_content]);


    

    // 데이터 보낼 준비
    const responseBody = {
      status: 200,
      message: "ReviewController.js의 reviewReport 데이터 성공",
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

exports.wholeReview = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    // PathVariable을 가져온다.
    const item_id = req.params.item_id;
    const page = parseInt(req.query.page) || 1;
    let maxPage = 1;
    const pageSize = 22;
    const offset = (page - 1) * pageSize;

    const countQuery = `
          SELECT COUNT(*) AS totalCount 
          FROM qna 
          WHERE qna.item_id=?
        `;
    const countResult = await db(countQuery, [item_id]);
    const totalCount = countResult[0].totalCount;
    maxPage = Math.ceil(totalCount / pageSize);

    // item_id로 최근 Q&A 전부 가져오는 쿼리문
    const query = `SELECT review.review_id, review.review_content, review.review_star, review.review_image_path, review.review_reported,  user.user_id,  user.user_nickname, review_date, 
                CASE 
                    WHEN review.user_id = ? THEN 1 
                    ELSE 0 
                    END AS is_current_user
                FROM review JOIN user ON review.user_id = user.user_id 
                WHERE review.item_id = ? ORDER BY review.review_date LIMIT ? OFFSET ?`;

    let result = [];
    result = await db(query, [user_id, item_id, pageSize, offset]);

    responseBody = {
      status: 200,
      reviewList: result,
      maxPage: maxPage,
    };
    res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    responseBody = {
      status: 400,
      message: err.message,
    };
    res.json(responseBody);
  }
};

//   access_token: "temp-token",
//   item_id: this.item_id,
//   review_content: this.form.content,
//   review_title: this.form.title,
//   review_image_path: this.form.image,

exports.insertReview = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const item_id = req.body.item_id;
    const review_content = req.body.review_content;
    const review_star = req.body.review_star;
    const review_image_path = req.body.reiview_image_path;

    //결과 qna_visibility :  undefined

    const query = `
          INSERT INTO review (user_id, item_id, review_content, review_image_path, review_star)
    VALUES (?, ?, ?, ?, ?);
        `;
    const result = await db(query, [
      user_id,
      item_id,
      review_content,
      review_image_path,
      review_star,
    ]);

    const responseBody = {
      status: 200,
      message: "ReviewController.js의 insertReview 데이터 성공",
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

exports.getSelectedReviewDetail = async (req, res) => {
  try {
    const review_id = req.query.review_id;

    console.log("qnareview_id : ", review_id);

    const query = `
            SELECT * FROM review where review_id = ?;
        `;
    const result = await db(query, [review_id]);

    const responseBody = {
      status: 200,
      message: "ReviewController.js의 getSelectedReviewDetail 데이터 성공",
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

exports.updateSelectedReviewDetail = async (req, res) => {
  try {
    const review_id = req.body.review_id;
    const review_content = req.body.review_content;
    const review_image_path = req.body.review_image_path;
    const review_star = req.body.review_star;

    // SQL Update Query
    const updateQuery = `
          UPDATE review
          SET review_content = ?, review_image_path = ?, review_star = ?
          WHERE review_id = ?;
        `;
    const updateResult = await db(updateQuery, [
      review_content,
      review_image_path,
      review_star,
      review_id,
    ]);

    const responseBody = {
      status: 200,
      message: "ReviewController.js의 updateSelectedReviewDetail 데이터 성공",
      data: updateResult,
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
