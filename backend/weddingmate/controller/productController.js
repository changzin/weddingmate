const db = require("../util/db");

exports.productList = async (req, res) => {
  try {
    // 데이터 준비
    // const itemType = req.query.itemType;
    const itemType = req.params.itemDetailType;
    let keyword = req.query.keyword;
    const page = parseInt(req.query.page) || 1;

    // 키워드가 null이거나 비어 있으면 %%을 붙여 쿼리문이 잘 돌아가도록 함.
    keyword = (!keyword) ? "%%" : "%" + keyword + "%";
    let result = []
    let maxPage = 1;

    // 페이지네이션
    const pageSize = 12;
    const offset = (page - 1) * pageSize;
    if (itemType == 'all'){
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
          SELECT item.item_id, item.item_name, item.item_discount_rate 
          FROM item 
          WHERE item.item_name LIKE ? 
          LIMIT ? OFFSET ?
        `;
      result = await db(query, [keyword, pageSize, offset]);
    }
    else{
      const countQuery = `
          SELECT COUNT(*) AS totalCount 
          FROM item 
          JOIN item_detail ON item.item_id = item_detail.item_id 
          WHERE item_detail.item_detail_type = ? AND item_name LIKE ?
        `;
      const countResult = await db(countQuery, [itemType, keyword]);
      const totalCount = countResult[0].totalCount;
      maxPage = Math.ceil(totalCount / pageSize);

      // 현재 페이지에 따른 item 데이터 가져오기
      const query = `
          SELECT DISTINCT item.item_id, item.item_name, item.item_discount_rate 
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
