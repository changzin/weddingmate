const db = require("../util/db");

exports.productList = async (req, res) => {
  try {
    // 데이터 준비
    // const itemType = req.query.itemType;
    const itemType = req.params.itemDetailType;
    const page = parseInt(req.query.page) || 1;

    // 페이지네이션
    const pageSize = 12;
    const offset = (page - 1) * pageSize;

    const countQuery = `
        SELECT COUNT(*) AS totalCount 
        FROM item 
        JOIN item_detail ON item.item_id = item_detail.item_id 
        WHERE item_detail.item_detail_type = ?
      `;
    const countResult = await db(countQuery, [itemType]);
    const totalCount = countResult[0].totalCount;
    const maxPage = Math.ceil(totalCount / pageSize);

    // 현재 페이지에 따른 item 데이터 가져오기
    const query = `
        SELECT item.item_id, item.item_name, item.item_discount_rate 
        FROM item 
        JOIN item_detail ON item.item_id = item_detail.item_id 
        WHERE item_detail.item_detail_type = ?
        LIMIT ? OFFSET ?
      `;
    const result = await db(query, [itemType, pageSize, offset]);

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
    // 데이터 준비

    const itemId = req.params.itemId;

    // item테이블의  item_id 별 데이터 가져오기
    const query = `
    select * from item where item_id = ?
  `;
    const result = await db(query, [itemId]);
    const responseBody = {
      status: 200,
      message: "ProductController.js의 productDetail 데이터 성공",
    //   data: result,
      data: result[0],
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
