<template>
  <div>
    <!-- 헤더 아래 script랑 <style scoped>까지 다 복붙해서 사용-->
    <div class="common-header">
      <!-- 로그인 + 회원가입 + 로고 -->
      <header class="bg-light qnalist_padding_0">
        <!-- 로그인 회원가입 -->
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
        <!-- 로고 -->
        <div class="text-center">
          <a class="navbar-brand" href="#">
            <img src="https://via.placeholder.com/200x50" alt="Logo" />
          </a>
        </div>
      </header>
      <!-- 카테고리 + 이미지 -->
      <nav
        class="common-header_navbar navbar-light bg-light"
        id="common_main-banner_div"
        @mouseleave="hideCategories"
      >
        <div class="common-header_overlay">
          <div class="common-header_overlay-content">
            <!-- 대카테고리 -->
            <ul class="common-header_nav" @mouseover="showCategories">
              <li class="common-header_main-title">웨딩홀</li>
              <li class="common-header_main-title">스드메</li>
              <li class="common-header_main-title">혼수</li>
              <li class="common-header_main-title">본식</li>
              <li class="common-header_main-title">촬영팀</li>
            </ul>
            <!-- 이미지랑 소카테고리 -->
            <div class="common-header_image-smallcategory">
              <!-- 이미지 -->
              <section class="qnalist_main-image-section">
                <img
                  src="https://via.placeholder.com/1980x500"
                  class="img-fluid w-100"
                  alt="Main Image"
                />
              </section>

              <!-- 소카테고리 -->
              <div class="common-header_categories" v-if="isVisible">
                <div class="common-header_smallcategory-area">
                  <div class="common-header_category">
                    <ul>
                      <li>추천 리스트</li>
                      <li>웨딩홀 목록</li>
                    </ul>
                  </div>
                  <div class="common-header_category">
                    <ul>
                      <li>독립 패키지</li>
                      <li>스튜디오</li>
                      <li>드레스</li>
                      <li>메이크업</li>
                    </ul>
                  </div>
                  <div class="common-header_category">
                    <ul>
                      <li>예복</li>
                      <li>예물</li>
                      <li>가전</li>
                      <li>혼수 패키지</li>
                    </ul>
                  </div>
                  <div class="common-header_category">
                    <ul>
                      <li>본식스냅</li>
                      <li>영상</li>
                      <li>부케</li>
                      <li>연주</li>
                      <li>사회자</li>
                      <li>웨딩슈즈</li>
                      <li>답례품</li>
                      <li>청첩장</li>
                    </ul>
                  </div>
                  <div class="common-header_category">
                    <ul>
                      <li>스냅</li>
                      <li>본식</li>
                      <li>제주도 야외</li>
                      <li>고급 스튜디오 촬영</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>

    <!-- 본문 -->
    <div class="qnalist_container">
      <h2 class="qnalist_header">Q&amp;A 리스트</h2>
      <!-- 검색 -->

      <div class="qnalist_search-container">
        <div class="qnalist_search-input-group">
          <label class="qnalist_search-label">검색</label>
          <div class="qnalist_search-input-wrapper">
            <input
              type="text"
              class="qnalist_search-input"
              v-model="searchTitle"
              placeholder="제목을 입력하세요"
            />
            <button class="qnalist_search-clear-button" @click="clearSearch">
              ×
            </button>
          </div>
          <button class="qnalist_search-button">검색</button>
        </div>
        <div class="qnalist_search-results">
          <span>검색결과</span>
          <span>{{ searchCount }}건</span>
        </div>
      </div>

      <!-- <div class="qnalist_search">
        <div>검색</div>

        <div class="qnalist_row">
          <label class="qnalist_label">제목</label>
          <div class="qnalist_chip">
            <input
              type="text"
              class="qnalist_input-title-content"
              placeholder="문의 제목을 입력하세요"
            />
            <button type="button" class="qnalist_chip-close">×</button>
          </div>
        </div>

         <button class="qnalist_search_button">
            확인
          </button>
      </div> -->

      <!-- QnA -->
      <div class="qnalist_qna-section">
        <div class="qnalist_qna-header">
          <h2 class="qnalist_qna-title">전체 QnA &gt;</h2>
        </div>
        <table class="qnalist_qna-table">
          <thead>
            <tr>
              <th>문의유형</th>
              <th>문의/답변</th>
              <th>작성자</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="n in 22" :key="n">
              <td>반품/취소</td>
              <td class="qnalist_qna-section_status-title-div">
                <div class="qnalist_qna-status">답변 완료</div>
                <div>
                  일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십
                </div>
              </td>
              <td>일이삼사오육칠팔구십일이</td>
              <td>2024-06-11 15:54</td>
            </tr>
            <tr v-for="n in 1" :key="n">
              <td>배송문의</td>
              <td class="qnalist_qna-section_status-title-div">
                <div class="qnalist_qna-status incomplete">미완료</div>
                <div>미완료 UI 보려고 하나 더 만듦</div>
              </td>
              <td>일이삼사오육칠팔구십일이</td>
              <td>2024-06-11 15:54</td>
            </tr>
          </tbody>
        </table>

        <div class="qnalist_qna-section_button">
          <button class="qnalist_write-qna-btn">
            <i class="fas fa-pen"></i> QnA작성
          </button>
          <button class="qnalist_write-qna-btn">
            <i class="fas fa-pen"></i> QnA수정
          </button>
          <button class="qnalist_write-qna-btn">
            <i class="fas fa-pen"></i> QnA삭제
          </button>
        </div>
      </div>
    </div>

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
</template>



<script>
export default {
  data() {
    return {
      // 헤더
      isVisible: false,
      ismaintain: false,
      searchTitle: "",
      searchCount: 0,
    };
  },
  methods: {
    // 헤더
    showCategories() {
      this.isVisible = true;
    },
    hideCategories() {
      this.isVisible = false;
    },

    // 본문
    // 검색
    clearSearch() {
      this.searchTitle = "";
    },
  },
};
</script>



<style scoped>
/* 헤더 */

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

/* 본문 */

.qnalist_container {
  width: 1280px;
  margin: 0 auto;
  margin-top: 80px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  font-family: Arial, sans-serif;
}

.qnalist_header {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 16px;
}

/* 검색 */

.qnalist_search-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 40px;
}

.qnalist_search-input-group {
  display: flex;
  align-items: center;
}

.qnalist_search-label {
  margin-right: 10px;
}

.qnalist_search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 5px;
  padding: 10px 20px;
  margin-left: 50px;
}

.qnalist_search-input {
  border: none;
  outline: none;
  background-color: transparent;
  width: 700px;
}

.qnalist_search-clear-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  color: #888;
}

.qnalist_search-button {
  margin-left: 30px;
  padding: 10px 30px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  cursor: pointer;
}

.qnalist_search-results {
  display: flex;
  align-items: center;
}

.qnalist_search-results span:first-child {
  margin-right: 5px;
}

/* QnA */
.qnalist_qna-section {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 50px;
  font-size: 14px;
  text-align: center;
}

.qnalist_qna-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0px;
}

.qnalist_qna-title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.qnalist_write-qna-btn {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.qnalist_write-qna-btn i {
  margin-right: 8px;
}

.qnalist_qna-table {
  width: 100%;
  border-collapse: collapse;
}

.qnalist_qna-table th,
.qnalist_qna-table td {
  border: 1px solid #e0e0e0;
  padding: 10px;
}

.qnalist_qna-table th {
  background-color: #f7f7f7;
}

.qnalist_qna-status {
  display: inline-block;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  width: 90px;
}

.qnalist_qna-status.incomplete {
  background-color: white;
  color: #007bff;
  border: 1px solid #007bff;
  width: 90px;
  padding: 5px 10px;
}

.qnalist_qna-section_status-title-div {
  display: flex;
  gap: 20px;
  align-items: center;
}




.qnalist_qna-section_button {
  padding: 0px 350px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
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
