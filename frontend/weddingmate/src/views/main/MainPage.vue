<template>
  <div>
    <MateHeader />
      <!-- 본문  -->  
      <div class="container productdetail_main_content">
        <div class="main_best_studio_text">
            베스트 상품
        </div>
        <div class="reviewlist_review-section">
            <!-- 메인이미지 클릭시 item_detail로 전송 -->
            <!-- 이미지는 추후에 등록 --> 
              <!-- 1번 -->
            <div class="reviewlist_review-cards">
              <button
              class="reviewlist_review-card"
              v-for="(star,index) in limitBestItem(best_item)" :key="index"
              @click="goToProductDetail(star.item_id)"
            >
              <img
                :src="this.$imageFileFormat(star.item_tn_image_path)"
                class="reviewlist_card-img-top"
                alt="Review Image"
              />
              <div class="reviewlist_card-body">
                <!-- 이름 -->
                <div class="reviewlist_review-section_title-div">
                  {{ star.item_name }}
                </div>
                <!-- 가격 -->
                <div
                  v-if="
                    star.item_discount_rate !== undefined &&
                    star.item_discount_rate !== null &&
                    star.item_price !== undefined &&
                    star.item_price !== null
                  "
                >
                  <span class="productdetail_main_content_discount_div">
                    {{ star.item_discount_rate }}%
                  </span>
                  <span class="productdetail_main_content_origin_price_div">
                    {{ star.item_price.toLocaleString() }}원
                  </span>
                </div>
                <div
                   v-if="finally_price !== undefined && finally_price !== null" > 
                  <span class="productdetail_main_content_discount_price_div">
                    {{ finally_price(item).toLocaleString() }}원
                  </span>
                </div>
                <!-- 별점 -->
                <div class="qnawrite_row">
                  <div class="rating">
                    <label
                      v-for="n in 10"
                      :key="n"
                      class="rating__label"
                      :class="{
                        half: n <= star.item_star_rating * 2,
                        filled: n <= star.item_star_rating * 2,
                        half_position: n % 2 !== 0,
                        filled_position: n % 2 === 0,
                      }"
                    >
                      <input
                        type="radio"
                        :id="'star' + n"
                        class="rating__input"
                        name="rating"
                        :value="n"
                        v-model="rating"
                      />
                      <div class="star-icon"></div>
                    </label>
                    </div>
                  </div>
                </div>
                </button>
              </div>
            
            </div>
          </div>
    <MateFooter />
  </div>
</template>
  
  <script>
  export default {
    name: "SearchComponent",
    data() {
      return {
        // 헤더
        isVisible: false,
        ismaintain: false,
        // 본문
        best_item:[],
        image:[],
        item_id :{},
        item_discount_rate:{},
        item_tn_image_path:{},
        item_price:{},
        item_review_count:{}
      };
    },
    computed:{
     
    },
    mounted(){
      this.showBestItem();
    },

    methods: {
      limitBestItem(){
        return this.best_item.slice(0,8);
      },
      // 베스트 상품 가져오기 

      async showBestItem(){
        try{
          const requestBody = {}

          //전송한 아이템 가져오기 
          const result = await this.$api(`/bestItem`,requestBody,"GET")
          if (result.status == 200){
            this.best_item = result.best_item;
          }
          else{
            throw new Error("아이템이 없습니다.")
          }
          
        }
        catch(err){
          console.error(err);
        }
      },
      goToProductDetail(item_id) {
      this.$router.push({
        name: "productdetail",
        query: { item_id },
      });
    },

    }
  }
  </script>
  
  
  <style scoped>
  .fix-width {
    width: 1980px;
    min-width: 1980px;
    max-width: 1980px;
    margin: 0 auto;
  }
  
  /* 헤더 */
  /* 로그인 + 회원가입 + 로고 */
  #common__header-login-padding {
    margin-right: 30px;
  }
  #common__login-div-padding {
    padding: 0px;
    width: 1280px;
  }
  
  .common-header_navbar {
    background-color: #f8f8f8;
  }
  
  .common-header_overlay {
    position: relative;
  }
  
  .common-header_overlay-content {
  }
  
  /* 카테고리 + 이미지 */
  
  /* 큰 카테고리 */
  .common-header_nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    list-style: none;
    padding: 0;
    height: 80px;
    width: 1280px;
    margin: 0 auto;
  }
  
  .common-header_nav > li {
    cursor: pointer;
    transition: background-color 0.3s;
    padding-top: 10px;
    padding-bottom: 10px;
    box-sizing: border-box;
    padding: 20px;
    width: 140px;
  }
  
  .common-header_nav > li:hover {
    background-color: #ddd;
  }
  
  .common-header_image-smallcategory {
    position: relative;
  }
  /* 소카테고리 */
  .common-header_categories {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding-top: 20px;
    padding-bottom: 20px;
    z-index: 10;
  
    position: absolute;
    top: 0;
    left: 0;
  }
  
  .common-header_smallcategory-area {
    width: 1280px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    text-align: center;
  }
  
  .common-header_categories ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .common-header_categories li {
    padding: 10px 0;
    width: 140px; /* 각 항목의 너비를 140px로 고정 */
  }
  
  /* 푸터 */
  .common__footer {
    background-color: #333333;
    color: #999999;
    padding: 20px 0;
    margin-top: 100px;
    font-size: 14px;
  }
  
  .common__footer-content {
    max-width: 1280px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .common__footer-nav {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
  }
  
  .common__footer-nav a {
    color: #999999;
    text-decoration: none;
    margin: 0 10px;
  }
  
  .common__footer-nav a:hover {
    text-decoration: underline;
  }
  
  .common__footer-details {
    text-align: center;
    font-size: 14px;
  }

  .main_container { 
            max-width: 1920px;
            min-width: 1920px;
        }
        .main_image_box{
        height: 610px;
        text-align: center;
        margin-top: 0px;
        border: none ;

        }
        .main_item_line{
          display: flex;
          flex-wrap: wrap;
          /* gap: 20px; */
          justify-content: space-between;
        }

        .main_best_studio_text{
            margin-top: 190px;
            text-align: center;
            font-size: 28px;
        }

        .main_best_studio_text2{
            margin-top: 190px;
            text-align: center;
            font-size: 28px;
        }

        .main_card_box{
            margin-top: 50px;
            margin-bottom: 10px;
            margin-left: 57px;
            margin-right: 58px;
            padding: 0px;
            width: 329px;
            height: 328px;
        }

        .main_card_box2{
            margin-top: 158px;
            margin-bottom: 90px;
            margin-left: 57px;
            margin-right: 58px;
            padding: 0px;
            width: 329px;
            height: 328px;
            border: solid 1px;
        }
   
        .main_card_title{
            margin-top :10px;
            /* width: 329px; */
            font: bold;
            font-size: 16px;
        }
        /* 프로덕트 디테일 css */
        .mypage-bottom {
          display: grid;
          place-items: center;
          margin-top: 100px;
          /* border: 1px solid yellow; */
        }
        .nav-page {
          display: grid;
          place-items: center;
          grid-template-columns: repeat(9, 25px);
          margin-bottom: 30px;
          color: #888888;
          /* border: 1px solid pink; */
        }
        .notVisible {
          visibility: hidden;
        }

        .fix-width {
          width: 1980px;
          min-width: 1980px;
          max-width: 1980px;
          margin: 0 auto;
        }

        .productdetail_main_content {
          width: 1280px;
          min-width: 1280px;
          max-width: 1280px;
          margin: 0 auto;
        }

        /* visible */
        .productdetaillist-content {
        }

        .productdetaillist-content_margin {
          margin: 30px;
        }

        /* 검색 */
        .search-container-wrapper {
          display: flex;
          justify-content: flex-end;
          width: 100%;
          box-sizing: border-box;
          margin-top: 50px;
        }

        .search-container {
          display: flex;
          align-items: center;
          width: 300px;
          height: 50px;
          border: 1px solid #333333;
          border-radius: 10px;
          padding: 0 20px;
          box-sizing: border-box;
        }

        .search-input {
          border: none;
          outline: none;
          font-size: 14px;
          flex-grow: 1;
        }

        .search-icon {
          font-size: 14px;
          color: #555555;
        }

        /* 페이지 */
        .mypage-bottom {
          display: grid;
          place-items: center;
        }
        .nav-page {
          display: grid;
          place-items: center;
          grid-template-columns: repeat(9, 25px);
          margin-bottom: 30px;
          color: #888888;
        }

        .mypage-back {
          background-color: #888888;
          color: white;
          font-weight: bold;
          border: none;
          width: 120px;
          height: 40px;
        }

        /* 가격 */

        .productdetail_main_content_discount_div {
          color: #ff481e;
          display: inline;
        }

        .productdetail_main_content_origin_price_div {
          color: #888888;
          display: inline-block;
          text-decoration: line-through;
        }

        .productdetail_main_content_discount_price_div {
          font-size: 18px;
          font-weight: bold;
        }

        /* 상품들 */

        .reviewlist_container {
          width: 1280px;
          margin: 0 auto;
          margin-top: 80px;
          padding: 20px;
          background-color: #fff;
          border-radius: 10px;
          font-family: Arial, sans-serif;
        }

        .reviewlist_header {
          text-align: center;
          font-size: 30px;
          font-weight: bold;
          margin-bottom: 30px;
          border-bottom: 1px solid #ddd;
          padding-bottom: 16px;
        }

        .reviewlist_review_content {
          margin-top: 100px;
        }

        .reviewlist_review-section {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          margin-top: 50px;
        }

        .reviewlist_review-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }

        .reviewlist_review-title {
          font-size: 24px;
          font-weight: bold;
          margin: 0;
        }

        .reviewlist_write-review-btn {
          display: flex;
          align-items: center;
          background-color: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
        }

        .reviewlist_write-review-btn i {
          margin-right: 8px;
        }

        .reviewlist_review-cards {
          display: flex;
          flex-wrap: wrap;
          gap: 30px;
          justify-content: flex-start;
        }

        .reviewlist_review_card:last-child {
          /* margin-right: 0; */
        }

        .reviewlist_review-card {
          background-color: #fff;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          width: 23%;
          padding: 10px;
          margin-bottom: 60px;
        }

        .reviewlist_card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          /* margin-bottom: 10px; */
        }

        .reviewlist_card-header h5 {
          margin: 0;
          font-size: 16px;
        }

        .reviewlist_card-header span {
          font-size: 12px;
          color: #888;
        }

        .reviewlist_card-icons {
          display: flex;
          gap: 10px;
        }

        .reviewlist_card-icons i {
          cursor: pointer;
        }

        .reviewlist_card-img-top {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 8px;
        }

        .reviewlist_card-body {
          padding: 10px;
          text-align: left;
        }

        .reviewlist_card-rating {
          font-size: 14px;
          margin-bottom: 10px;
        }

        .reviewlist_review-section_title-div {
          font-size: 16px;
          font-weight: bold;
          text-align: left;

          width: 100%;
        }

        .reviewlist_review-section_sub-div {
          text-align: left;
          font-size: 14px;
          margin-bottom: 10px;
        }

        .letter-title-flex {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .letter-title-flex_title {
          /* 이부분이 flex의 80% 할당 */
          flex: 1;
        }

        .letter-title-flex-dummy {
          flex: 0 0 3%;
        }

        .letter-title-flex_per {
          /* 이부분이 flex의 20% 할당 */
          flex: 0 0 20%;
          color: #ff481e;
          font-size: 28px;
          text-align: center;

          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* 별점 */
        .rating {
          display: flex;
          justify-content: flex-start;
        }

        .rating__input {
          display: none;
        }

        .rating__label {
          width: 12px;
          overflow: hidden;
          cursor: pointer;
        }
        .rating__label .star-icon {
          width: 12px;
          height: 24px;
          display: block;
          position: relative;
          left: 0;
          background-image: url("/src/views/review/star/emptyStar.svg");
          background-repeat: no-repeat;
        }

        .rating__label.half .star-icon {
          background-image: url("/src/views/review/star/filledStar.svg");
        }

        .rating__label.filled .star-icon {
          background-image: url("/src/views/review/star/filledStar.svg");
        }

        .rating__label.half_position .star-icon {
          background-position: left;
        }
        .rating__label.filled_position .star-icon {
          background-position: right;
        }
  </style>