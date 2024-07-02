const db = require("../util/db");

exports.adminQnaList = async (req, res) => {
  try {
    let page = req.query.page;
    let hasAnswer = req.query.hasAnswer;
    let mode = req.query.mode;
    let keyword = req.query.keyword;

    // request에 오는 param들은 전부 String 타입이기 때문에, db문에 끼워 넣으러면 숫자로 바꿔야 합니다.
    page = !page ? 0 : Number(page) - 1;
    keyword = !keyword ? "" : keyword;
    keyword = "%" + req.query.keyword + "%";
    hasAnswer = !hasAnswer ? "T" : hasAnswer;
    mode = !mode ? "all" : mode;

    let result = [];
    let count = 0;
    let query = "";
    // user_create_date로 정렬 후, OFFSET만큼 뛰어넘은 다음 LIMIT 개수만큼 가져오는 쿼리문

    if (mode === "all") {
      if (hasAnswer == "F") {
        query =
          "SELECT qna.qna_id, qna.qna_type, qna.qna_has_answer, qna.qna_title, user.user_nickname, qna_date FROM qna, user WHERE qna.user_id=user.user_id AND qna.qna_has_answer=? AND (user.user_nickname LIKE ? OR qna.qna_title LIKE ? OR qna.qna_content LIKE ?) ORDER BY qna.qna_date LIMIT 10 OFFSET ?";
        result = await db(query, [
          hasAnswer,
          keyword,
          keyword,
          keyword,
          page * 10,
        ]);
        query =
          "SELECT count(*) AS count FROM qna, user WHERE qna.user_id=user.user_id AND qna.qna_has_answer=? AND (user.user_nickname LIKE ? OR qna.qna_title LIKE ? OR qna.qna_content LIKE ?) ";
        count = await db(query, [hasAnswer, keyword, keyword, keyword]);
        count = count[0]["count"];
      } else {
        query =
          "SELECT qna.qna_id, qna.qna_type, qna.qna_has_answer, qna.qna_title, user.user_nickname, qna_date FROM qna, user WHERE qna.user_id=user.user_id AND (user.user_nickname LIKE ? OR qna.qna_title LIKE ? OR qna.qna_content LIKE ?) ORDER BY qna.qna_date LIMIT 10 OFFSET ?";
        result = await db(query, [keyword, keyword, keyword, page * 10]);
        console.log(result);
        query =
          "SELECT count(*) AS count FROM qna, user WHERE qna.user_id=user.user_id AND (user.user_nickname LIKE ? OR qna.qna_title LIKE ? OR qna.qna_content LIKE ?)";
        count = await db(query, [keyword, keyword, keyword]);
        count = count[0]["count"];
      }
    } else {
      if (hasAnswer == "F") {
        query =
          "SELECT qna.qna_id, qna.qna_type, qna.qna_has_answer, qna.qna_title, user.user_nickname, qna_date FROM qna, user WHERE qna.user_id=user.user_id AND qna.qna_has_answer=? AND (user.user_nickname LIKE ? OR qna.qna_title LIKE ? OR qna.qna_content LIKE ?) AND qna.qna_type=? ORDER BY qna.qna_date LIMIT 10 OFFSET ?";
        result = await db(query, [
          hasAnswer,
          keyword,
          keyword,
          keyword,
          mode,
          page * 10,
        ]);
        query =
          "SELECT count(*) AS count FROM qna, user WHERE qna.user_id=user.user_id AND qna.qna_has_answer=? AND (user.user_nickname LIKE ? OR qna.qna_title LIKE ? OR qna.qna_content LIKE ?) AND qna.qna_type=? ";
        count = await db(query, [hasAnswer, keyword, keyword, keyword, mode]);
        count = count[0]["count"];
      } else {
        query =
          "SELECT qna.qna_id, qna.qna_type, qna.qna_has_answer, qna.qna_title, user.user_nickname, qna_date FROM qna, user WHERE qna.user_id=user.user_id AND (user.user_nickname LIKE ? OR qna.qna_title LIKE ? OR qna.qna_content LIKE ?) AND qna.qna_type=? ORDER BY qna.qna_date LIMIT 10 OFFSET ?";
        result = await db(query, [keyword, keyword, keyword, mode, page * 10]);
        query =
          "SELECT count(*) AS count FROM qna, user WHERE qna.user_id=user.user_id AND (user.user_nickname LIKE ? OR qna.qna_title LIKE ? OR qna.qna_content LIKE ?) AND qna.qna_type=? ";
        count = await db(query, [keyword, keyword, keyword, mode]);
        count = count[0]["count"];
      }
    }
    responseBody = {
      maxPage: Math.ceil(count / 10),
      qnaList: result,
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

exports.qnaDetail = async (req, res) => {
  try {
    const qna_id = req.body.qna_id;

    // answer이 없는 것은 null로 응답을 보내기 위해 left outer join을 활용하였다.
    const query = `SELECT qna.qna_id, qna.qna_title, qna.qna_content, qna.qna_image_path, qna.qna_date, qna.qna_has_answer, qna.user_nickname, answer.answer_id, answer.admin_id, answer.answer_content, answer.answer_date 
      from (SELECT qna.qna_id, qna.qna_title, qna.qna_content, qna.qna_image_path, qna.qna_date, qna.qna_has_answer, user.user_nickname FROM qna, user 
      WHERE qna.user_id = user.user_id) qna left join answer on qna.qna_id=answer.qna_id WHERE qna.qna_id=?`;
    let result = await db(query, [qna_id]);

    if (result.length != 1) {
      throw new Error("리뷰를 찾을 수 없습니다");
    }

    let responseBody = result[0];
    responseBody.status = 200;
    res.json(responseBody);
  } catch (err) {
    console.error(err);
    responseBody = {
      status: 400,
      message: "qna를 찾을 수 없습니다.",
    };
    res.json(responseBody);
  }
};

exports.itemDetail = async (req, res) => {
  try {
    // PathVariable을 가져온다.
    const item_id = req.params.item_id;
    // item_id로 최근 Q&A 5개를 가져오는 쿼리문
    const query =
      "SELECT qna.qna_id, qna.qna_type, qna.qna_has_answer, qna.qna_title, user.user_nickname, qna_date FROM qna, user WHERE qna.user_id=user.user_id AND qna.item_id=? ORDER BY qna.qna_id LIMIT 5";

    let result = [];
    result = await db(query, [item_id]);

    responseBody = {
      status: 200,
      qnaList: result,
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

exports.wholeItemDetail = async (req, res) => {
  try {
    // PathVariable을 가져온다.
    const item_id = req.params.item_id;
    const page = parseInt(req.query.page) || 1;
    let maxPage = 1;
    const pageSize = 12;
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
    const query = `SELECT qna.qna_id, qna.qna_type, qna.qna_has_answer, qna.qna_title, user.user_nickname, qna_date 
        FROM qna, user WHERE qna.user_id=user.user_id AND qna.item_id=? ORDER BY qna.qna_date LIMIT ? OFFSET ?`;

    let result = [];
    result = await db(query, [item_id, pageSize, offset]);

    responseBody = {
      status: 200,
      qnaList: result,
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

exports.getSelectedQnADetail = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const qna_id = req.body.qna_id;
    let isVisibleEditTrash = false;

    console.log("qna_id : ", qna_id);
    console.log("user_id : ", user_id);

    const query = `
          SELECT * FROM qna where qna_id = ?;
      `;
    const result = await db(query, [qna_id]);

    if (result.length > 0 && result[0].user_id == user_id) {
      isVisibleEditTrash = true;
    }

    const userid_query2 = `
    SELECT user_nickname FROM user where user_id = ?;
`;
    const userid_result2 = await db(userid_query2, [user_id]);

    const responseBody = {
      status: 200,
      message: "QnAController.js의 getSelectedQnADetail 데이터 성공",
      data: result,
      isVisibleEditTrash: isVisibleEditTrash,
      user_nickname: userid_result2[0],
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

exports.insertQnA = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const item_id = req.body.item_id;
    const qna_type = req.body.qna_type;
    const qna_content = req.body.qna_content;
    const qna_title = req.body.qna_title;
    const qna_visibility = req.body.qna_visibility;
    const qna_image_path = req.body.qna_image_path;

    //결과 qna_visibility :  undefined

    const query = `
        INSERT INTO qna (user_id, item_id, qna_type, qna_content, qna_title, qna_visibility, qna_image_path)
  VALUES (?, ?, ?, ?, ?, ?, ?);
      `;
    const result = await db(query, [
      user_id,
      item_id,
      qna_type,
      qna_content,
      qna_title,
      qna_visibility,
      qna_image_path,
    ]);

    const responseBody = {
      status: 200,
      message: "QnAController.js의 insertQnA 데이터 성공",
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

exports.deleteQnA = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const qna_id = req.body.qna_id;

    console.log("user_id : ", user_id);

    const query = `
      DELETE FROM qna 
      WHERE user_id = ? AND qna_id = ?
    `;
    const result = await db(query, [user_id, qna_id]);

    const responseBody = {
      status: 200,
      message: "QnAController.js의 insertQnA 데이터 성공",
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

exports.updateSelectedQnADetail = async (req, res) => {
  try {
    const qna_id = req.body.qna_id;
    const qna_type = req.body.qna_type;
    const qna_content = req.body.qna_content;
    const qna_title = req.body.qna_title;
    const qna_visibility = req.body.qna_visibility;
    const qna_image_path = req.body.qna_image_path;

    // SQL Query to get item_id
    const getItemIdQuery = `
        SELECT item_id FROM qna WHERE qna_id = ?;
      `;
    const itemIdResult = await db(getItemIdQuery, [qna_id]);

    if (itemIdResult.length === 0) {
      throw new Error("Invalid qna_id");
    }

    const item_id = itemIdResult[0].item_id;

    // SQL Update Query
    const updateQuery = `
        UPDATE qna
        SET qna_type = ?, qna_content = ?, qna_title = ?, qna_visibility = ?, qna_image_path = ?
        WHERE qna_id = ?;
      `;
    const updateResult = await db(updateQuery, [
      qna_type,
      qna_content,
      qna_title,
      qna_visibility,
      qna_image_path,
      qna_id,
    ]);

    const responseBody = {
      status: 200,
      message: "QnAController.js의 updateQnA 데이터 성공",
      data: updateResult,
      item_id: item_id, // Include the item_id in the response
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

exports.searchItemDetail = async (req, res) => {
  try {
    // PathVariable을 가져온다.
    const item_id = req.params.item_id;
    // qna_title를 검색해야함
    const qna_title = req.body.qna_title || "";
    const page = parseInt(req.query.page) || 1;
    const pageSize = 12;
    const offset = (page - 1) * pageSize;

    console.log("qna_title:", qna_title);

    // 페이지네이션을 위한 count 쿼리
    const countQuery = `
        SELECT COUNT(*) AS totalCount 
        FROM qna 
        WHERE item_id = ? AND qna_title LIKE ?
      `;
    const countResult = await db(countQuery, [item_id, `%${qna_title}%`]);
    const totalCount = countResult[0].totalCount;
    const maxPage = Math.ceil(totalCount / pageSize);

    // item_id로 최근 Q&A 전부 가져오는 쿼리문
    const query = `
        SELECT qna.qna_id, qna.qna_type, qna.qna_has_answer, qna.qna_title, qna.qna_visibility ,user.user_nickname, qna.qna_date 
        FROM qna
        JOIN user ON qna.user_id = user.user_id 
        WHERE qna.item_id = ? AND qna.qna_title LIKE ?
        LIMIT ? OFFSET ?
      `;

    console.log("Executing query:", query);
    console.log("Query params:", [item_id, `%${qna_title}%`, pageSize, offset]);

    const result = await db(query, [
      item_id,
      `%${qna_title}%`,
      pageSize,
      offset,
    ]);

    // 검색결과 총 몇개 쿼리문
    const countSearchQuery = `SELECT COUNT(*) as total FROM qna JOIN user ON qna.user_id = user.user_id  WHERE qna.item_id = ? AND qna.qna_title LIKE ?`;
    const countSearchresult = await db(countSearchQuery, [item_id, `%${qna_title}%`,]);


    const responseBody = {
      status: 200,
      qnaList: result,
      maxPage: maxPage,
      searchCount: countSearchresult,
    };
    res.status(200).json(responseBody);
  } catch (err) {
    console.error(err);
    const responseBody = {
      status: 400,
      message: err.message,
    };
    res.json(responseBody);
  }
};

exports.isSelectedQnaVisibility = async (req, res) => {
  try {
    const user_id = req.body.user_id;
    const qna_id = req.body.qna_id;

    console.log("qna_id : ", qna_id);
    console.log("user_id : ", user_id);

    const query = `
            SELECT * FROM qna where qna_id = ?;
        `;
    const result = await db(query, [qna_id]);

    // 만약 본인이 아니고 비밀글일 경우
    if (
      result.length > 0 &&
      result[0].user_id != user_id &&
      result[0].qna_visibility == "F"
    ) {
      const responseBody = {
        status: 201,
        message: "QnAController.js의 getSelectedQnADetail 데이터 성공",
      };
      res.json(responseBody);
    } else {
      const responseBody = {
        status: 202,
        message: "QnAController.js의 getSelectedQnADetail 데이터 성공",
      };
      res.json(responseBody);
    }
  } catch (err) {
    console.error(err);
    const responseBody = {
      status: 400,
      message: err.message,
    };
    res.json(responseBody);
  }
};
