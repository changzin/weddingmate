<template>
  <div id="productdetail_app">
    <div class="container-fluid px-0">
      <div class="content">
        <!-- 헤더 -->
        <header class="bg-light productdetail_padding_0">
          <div
            class="container d-flex justify-content-end align-items-center"
            id="common__login-div-padding"
          >
            <nav class="navbar-light">
              <div class="" id="navbarNav">
                <ul class="navbar-nav flex-row">
                  <li class="nav-item" id="common__header-login-padding">
                    <a href="#">로그인</a>
                  </li>
                  <li class="nav-item">
                    <a href="#">회원가입</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div class="text-center">
            <a class="navbar-brand" href="#">
              <img src="https://via.placeholder.com/200x50" alt="Logo" />
            </a>
          </div>
        </header>

        <!-- 배너 섹션 -->
        <nav class="navbar navbar-light bg-light" id="common_main-banner_div">
          <div class="common__overlay">
            <div class="common__overlay-content">
              <div class="common__text-end">
                <ul>
                  <li class="productdetail_header_main_title">웨딩홀</li>
                  <li class="productdetail_header_sub_title">추천 리스트</li>
                  <li class="productdetail_header_sub_title">웨딩홀 목록</li>
                </ul>
              </div>
              <div class="common__text-end">
                <ul>
                  <li class="productdetail_header_main_title">스드메</li>
                  <li class="productdetail_header_sub_title">독립 패키지</li>
                  <li class="productdetail_header_sub_title">스튜디오</li>
                  <li class="productdetail_header_sub_title">드레스</li>
                  <li class="productdetail_header_sub_title">메이크업</li>
                </ul>
              </div>
              <div class="common__text-end">
                <ul>
                  <li class="productdetail_header_main_title">혼수</li>
                  <li class="productdetail_header_sub_title">예복</li>
                  <li class="productdetail_header_sub_title">예물</li>
                  <li class="productdetail_header_sub_title">가전</li>
                  <li class="productdetail_header_sub_title">혼수 패키지</li>
                </ul>
              </div>
              <div class="common__text-end">
                <ul>
                  <li class="productdetail_header_main_title">본식</li>
                  <li class="productdetail_header_sub_title">본식스냅</li>
                  <li class="productdetail_header_sub_title">영상</li>
                  <li class="productdetail_header_sub_title">부케</li>
                  <li class="productdetail_header_sub_title">연주</li>
                  <li class="productdetail_header_sub_title">사회자</li>
                  <li class="productdetail_header_sub_title">웨딩슈즈</li>
                  <li class="productdetail_header_sub_title">답례품</li>
                  <li class="productdetail_header_sub_title">청첩장</li>
                </ul>
              </div>
            </div>
          </div>
        </nav>

        <!-- 메인 이미지 섹션 -->
        <section class="productdetail_main-image-section">
          <img
            src="https://via.placeholder.com/1980x500"
            class="img-fluid w-100"
            alt="Main Image"
          />
        </section>

        <!-- 콘텐츠 섹션 시작 -->
        <div class="productdetail_main_content">
          <!-- 상품 상세 -->
          <div class="row my-5">
            <div class="col-md-6">
              <img
                src="https://via.placeholder.com/600x400"
                class="img-fluid"
                alt="Product Image"
              />
            </div>
            <div class="col-md-6">
              <div class="productdetail_main_content_maker_div">
                아아.. 이것은 제조사란 것이다...
              </div>
              <div class="productdetail_main_content_name_div">Product Name</div>
              <div>
                <div class="main_content_starcount_div">★★★★★</div>
                <div class="productdetail_main_content_reviewcount_div">
                  전체 리뷰 수 : (1000)
                </div>
              </div>
              <div>
                <div class="productdetail_main_content_discount_div">20%</div>
                <div class="productdetail_main_content_origin_price_div">10000</div>
              </div>
              <div class="productdetail_main_content_discount_price_div">80,000원</div>
              <div class="productdetail_main_content_delivery_div">
                <div class="productdetail_main_content_delivery_price_div">
                  배송비 3,500원
                </div>
                <div class="productdetail_main_content_delivery_condition">
                  (20,000원 이상 구매시 무료)
                </div>
                <div class="productdetail_main_content_delivery_kind">기타택배</div>
              </div>
              <div class="productdetail_main_content_maximum_quantity_div">
                <div>최대구매수량</div>
                <div>999개</div>
              </div>
              <div class="productdetail_main_content_selectoption_div">
                옵션 선택
                <form>
                  <div class="my-1">
                    <select
                      class="form-select"
                      v-model="selectedSize"
                      @change="onSizeChange"
                    >
                      <option selected disabled value="">사이즈</option>
                      <option>Small</option>
                      <option>Medium</option>
                      <option>Large</option>
                    </select>
                    <select
                      class="form-select my-2"
                      v-if="showColorSelect"
                      v-model="selectedColor"
                    >
                      <option selected disabled value="">색상</option>
                      <option>Red</option>
                      <option>Blue</option>
                      <option>Green</option>
                    </select>
                  </div>
                  <div class="productdetail_button-container">
                    <button class="productdetail_icon-button">
                      <i class="far fa-heart"></i>
                    </button>
                    <button class="productdetail_icon-button">
                      <i class="fas fa-share-alt"></i>
                    </button>
                    <button class="productdetail_main-content_button-container_main-button">
                      물건담기
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <!-- 상세 설명 이미지 -->
          <div class="text-center productdetail_main-detail-image-div">
            <img
              src="https://via.placeholder.com/1280x1700"
              class="img-fluid"
              alt="Detailed Description Image"
            />
          </div>

          <!-- 리뷰 섹션 -->
          <div class="productdetail_review-section">
            <div class="productdetail_review-header">
              <h2 class="productdetail_review-title">전체 리뷰 &gt;</h2>
              <button class="productdetail_write-review-btn">
                <i class="fas fa-pen"></i> 리뷰작성
              </button>
            </div>
            <div class="productdetail_review-cards">
              <div class="productdetail_review-card" v-for="n in 6" :key="n">
                <div class="productdetail_card-header">
                  <div class="productdetail_review-section_title-div">
                    일이삼사오육칠팔구십일이
                  </div>
                  <div class="productdetail_card-icons">
                    <i class="fas fa-bullhorn"></i>
                    <i class="fas fa-edit"></i>
                    <i class="fas fa-trash"></i>
                  </div>
                </div>
                <div class="productdetail_review-section_title-div">
                  <div class="productdetail_card-rating">★★★★★</div>
                  <div class="productdetail_review-section_date-div">2024-06-11 15:54</div>
                </div>
                <img
                  src="https://via.placeholder.com/300x200"
                  class="productdetail_card-img-top"
                  alt="Review Image"
                />
                <div class="productdetail_card-body">
                  <p class="productdetail_card-text">
                    인생
                    리븅으으으으으으ㅡㅡ으으으으으으으으ㅡ으으으으으으으ㅡ으으으으으으ㅡ으으으으으으으ㅡ으으ㅡ으르아라아리뷰우우우우우우우우우우우우우ㅜ우우우우우우우우우ㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅓ하ㅣㅇ러하ㅣㅇ러하ㅣㅇ러하ㅣㅓ곧ㅇ샤해ㅓㄱㄷ얗라ㅣㅓ갣이ㅓ하ㅣㅇ러하일허ㅏㄹ이라ㅓㅏㅇ니ㅣ허ㅏㅣㄹ어하ㅣㄹ어하ㅣㄹ어하ㅣㅇ러하ㅣㅇ러하하ㅓㅣ아어하ㅣㅇ라허일허ㅏㅣㅏㅇㄹ하ㅓ최대
                    10줄까지
                    가능합니다ㄹㄴㅇㄹㄴㅇㄹㅈㄱㄷㅅㄱㄷㅅㅎㄱㄷㅅㄷㄳㄷㄳ
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Q&A 섹션 -->
          <div class="productdetail_qna-section">
            <div class="productdetail_qna-header">
              <h2 class="productdetail_qna-title">전체 QnA &gt;</h2>
              <button class="productdetail_write-qna-btn">
                <i class="fas fa-pen"></i> QnA작성
              </button>
            </div>
            <table class="productdetail_qna-table">
              <thead>
                <tr>
                  <th>문의유형</th>
                  <th>문의/답변</th>
                  <th>작성자</th>
                  <th>작성일</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="n in 5" :key="n">
                  <td>반품/취소</td>
                  <td class="productdetail_qna-section_status-title-div">
                    <div class="productdetail_qna-status">답변 완료</div>
                    <div>
                      일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십
                    </div>
                  </td>
                  <td>일이삼사오육칠팔구십일이</td>
                  <td>2024-06-11 15:54</td>
                </tr>
                <tr v-for="n in 1" :key="n">
                  <td>배송문의</td>
                  <td class="productdetail_qna-section_status-title-div">
                    <div class="productdetail_qna-status incomplete">미완료</div>
                    <div>미완료 UI 보려고 하나 더 만듦</div>
                  </td>
                  <td>일이삼사오육칠팔구십일이</td>
                  <td>2024-06-11 15:54</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- 콘텐츠 섹션 끝 -->

        <!-- 푸터 -->
        <footer class="common__footer">
          <div class="common__footer-content">
            <nav class="common__footer-nav">
              <a href="#">회사소개</a> | <a href="#">서비스이용약관</a> |
              <a href="#">개인정보 취급방침</a> | <a href="#">공지사항</a> |
              <a href="#">제휴문의</a> |
              <a href="#">광고문의</a>
            </nav>
            <div class="common__footer-details">
              <p style="margin-bottom: 0px">
                (주)웨딩데이트 주소: 서울시 서대문구 개인정보 대표: 이창진 전화:
                02-123-1234 팩스: 02-111-2222
              </p>

              <p>
                해당 사이트에서 판매되는 모든 물품 및 모든 민원에 대한 책임은
                민원담당자에게 있습니다. 민원담당자: 강문정
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedSize: "",
      selectedColor: "",
      showColorSelect: false,
      qnaStatus: "completed",
    };
  },
  methods: {
    onSizeChange() {
      this.showColorSelect = this.selectedSize !== "";
    },
  },
};
</script>

<style scoped>
#productdetail_app {
  width: 100%;
  min-width: 1980px;
}

.productdetail_main-image-section {
  position: relative;
  width: 100%;
  overflow: hidden;
  min-width: 1980px; /* 고정된 최소 너비 설정 */
  z-index: 2;
  filter: brightness(30%);
}

.productdetail_main-image-section img {
  width: 100%;
  height: auto;
}



#common_main-banner_div {
  width: 100%;
  height: 80px;
  padding: 0px;
}

.common__overlay {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  background-color: green;
  width: calc(100% - 700px);
  height: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 99;
  font-size: 18px;
}

.common__overlay-content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  transform: translate(0%, 50%);
  color: white;
}

.common__overlay ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.common__text-end ul {
  text-align: center;
}

#common__header-login-padding {
  margin-right: 30px;
}

#common__login-div-padding {
  padding: 0px;
  width: calc(100% - 700px);
}


#productdetail_padding_0 {
  padding: 0px;
}

.productdetail_header_main_title {
  color: #111111;
  margin: 0px;
  padding-bottom: 53px;
}

.productdetail_header_sub_title {
  padding-bottom: 23px;
}







/* 콘텐츠 섹션 시작 */
.productdetail_main_content {
  width: calc(100% - 700px);
  margin: 0 auto;
}

.productdetail_main_content_maker_div {
  font-size: 14px;
  margin-bottom: 10px;
}

.productdetail_main_content_name_div {
  font-size: 22px;
  margin-bottom: 10px;
}

.productdetail_main_content_starcount_div {
  display: inline;
  margin-right: 10px;
}

.productdetail_main_content_reviewcount_div {
  display: inline;
}

.productdetail_main_content_discount_div {
  margin-right: 10px;
  color: #ff481e;
  display: inline;
}

.productdetail_main_content_origin_price_div {
  color: #888888;
  display: inline;
}

.productdetail_main_content_discount_price_div {
  font-size: 24px;
  font-weight: bold;
}

.productdetail_main_content_delivery_div {
  font-size: 16px;
  display: flex;
  margin-top: 30px;
}

.productdetail_main_content_delivery_price_div {
  margin-right: 15px;
}

.productdetail_main_content_delivery_condition {
  margin-right: 40px;
  color: #888888;
}

.productdetail_main_content_delivery_kind {
}

.productdetail_main_content_maximum_quantity_div {
  display: flex;
  color: #555555;
  gap: 20px;
}

.productdetail_main_content_selectoption_div {
  margin-top: 50px;
}

.productdetail_button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-top: 50px;
}

.productdetail_icon-button {
  background-color: #f7f7f7;
  border: 1px solid #f7cac9;
  border-radius: 10px;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.productdetail_icon-button i {
  font-size: 20px;
  color: #888888;
}

.productdetail_main-content_button-container_main-button {
  font-size: 24px;
  color: #888888;
  background-color: #f5f5f5;
  border: 1px solid #f7cac9;
  border-radius: 10px;
  padding: 25px 90px;
  cursor: pointer;
}

/* 상세 설명 이미지 */
.productdetail_main-detail-image-div {
  margin-top: 100px;
}

/* 리뷰 작성 */
.productdetail_review_content {
  margin-top: 100px;
}

.productdetail_review-section {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 100px;
}

.productdetail_review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.productdetail_review-title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.productdetail_write-review-btn {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.productdetail_write-review-btn i {
  margin-right: 8px;
}

.productdetail_review-cards {
  display: flex;
  flex-wrap: wrap;
  /* gap: 20px; */
  justify-content: space-between;
}

.productdetail_review_card:last-child {
  /* margin-right: 0; */
}

.productdetail_review-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  width: 31%;
  padding: 10px;
  margin-bottom: 30px;
}

.productdetail_card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-bottom: 10px; */
}

.productdetail_card-header h5 {
  margin: 0;
  font-size: 16px;
}

.productdetail_card-header span {
  font-size: 12px;
  color: #888;
}

.productdetail_card-icons {
  display: flex;
  gap: 10px;
}

.productdetail_card-icons i {
  cursor: pointer;
}

.productdetail_card-img-top {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.productdetail_card-body {
  padding: 10px;
}

.productdetail_card-rating {
  font-size: 14px;
  margin-bottom: 10px;
}

.productdetail_card-text {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
}

.productdetail_review-section_title-div {
  font-size: 14px;
}

.productdetail_review-section_title-div {
  display: flex;
  justify-content: space-between;
}

.productdetail_review-section_date-div {
  font-size: 12px;
}

/* QnA 작성 */

.productdetail_qna-section {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 70px;
  /* background-color: green; */
  font-size: 14px;
  text-align: center;
}

.productdetail_qna-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0px;
}

.productdetail_qna-title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.productdetail_write-qna-btn {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.productdetail_write-qna-btn i {
  margin-right: 8px;
}

.productdetail_qna-table {
  width: 100%;
  border-collapse: collapse;
}

.productdetail_qna-table th,
.productdetail_qna-table td {
  border: 1px solid #e0e0e0;
  padding: 10px;
}

.productdetail_qna-table th {
  background-color: #f7f7f7;
}

.productdetail_qna-status {
  display: inline-block;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  width: 90px;
}

.productdetail_qna-status.incomplete {
  background-color: white;
  color: #007bff;
  border: 1px solid #007bff;
  width: 90px;
  padding: 5px 10px;
}

.productdetail_qna-section_status-title-div {
  display: flex;
  gap: 20px;
  align-items: center;
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
</style>