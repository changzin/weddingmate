<template>
  <div>
    <!-- 헤더 아래 script랑 <style scoped>까지 다 복붙해서 사용-->
    <div class="common-header">
      <!-- 로그인 + 회원가입 + 로고 -->
      <header class="bg-light productdetail_padding_0">
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
              <section class="productdetail_main-image-section">
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
    <div class="qnadetail_container">
      <!-- Q&A 상세보기 + 아이콘 -->
      <div class="qnadetail_header">
        <div></div>
        <h2 class="qnadetail_header_text">Q&A 상세보기</h2>
        <div class="qnadetail_header_icon">
          <i class="fas fa-edit"></i>
          <i class="fas fa-trash"></i>
        </div>
      </div>
      <!-- 제목 + 답변상태 + 타이틀 등등 -->
      <div class="qnadetail_answer_row_large">
        <label class="qnadetail_answer_label">제목</label>
        <div class="qnadetail_answer_qna-status">답변 완료</div>
        <div class="qnadetail_answer_qna_title">
          일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십
        </div>
        <div class="qnadetail_answer_qna_writer">
          일이삼사오육칠팔구십************
        </div>
        <div class="qnadetail_answer_qna_date">2024-06-12 20:32</div>
      </div>

      <form @submit.prevent="handleSubmit">
        <!-- 문의 내용 -->
        <div class="qnadetail_row">
          <label class="qnadetail_label">문의 내용</label>
          <div class="qnadetail_chip qnadetail_chip-content">
            {{ form.content }}
          </div>
        </div>

        <div class="qnadetail_answer_row_large">
          <label class="qnadetail_answer_label">이미지</label>
          <a href="#">
            <div class="qnadetail_answer_image">
              <img src="https://via.placeholder.com/300x300" alt="Logo" />
            </div>
          </a>
        </div>

        <!-- 답변 내용 -->
        <div class="qnadetail_row">
          <label class="qnadetail_label">답변 내용</label>
          <div class="qnadetail_chip qnadetail_chip-content">
            {{ form.content }}
          </div>
        </div>

        <!-- 버튼 -->
        <div class="qnadetail_actions">
          <button type="submit" class="qnadetail_button qnadetail_submit">
            돌아가기
          </button>
        </div>
      </form>
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

      // 본문
      form: {
        inquiryType: "상품",
        visibilityType: "공개",
        title: "문의 제목입니다",
        content:
          "문의 내용입니다. 문의 내용입니다. 문의 내용입니다. 문의 내용입니다.",
        image: "이미지 파일 경로",
      },
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
    // 확인 버튼 클릭 시 동작
    handleSubmit() {
      if (
        !this.form.title ||
        !this.form.content ||
        !this.form.inquiryType ||
        !this.form.visibilityType
      ) {
        alert("모든 필드를 입력하세요.");
        return;
      }
      this.$router.push("/success-page");
    },

    // 취소 버튼 클릭 시 동작
    handleCancel() {
      alert("취소되었습니다.");
    },

    // 제목 X 버튼 클릭 시 동작
    clearTitle() {
      this.form.title = "";
    },

    // 내용 X 버튼 클릭 시 동작
    clearContent() {
      this.form.content = "";
    },
    // 파일 찾기 클릭 시 동작
    triggerFileInput() {
      this.$refs.fileInput.click();
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.image = file.name;
      }
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

.qnadetail_container {
  width: 1280px;
  margin: 0 auto;
  margin-top: 80px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  font-family: Arial, sans-serif;
}

.qnadetail_header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 16px;
}

.qnadetail_header_text {
  font-weight: bold;
}

.qnadetail_header_icon {
  display: flex;
  gap: 10px;
}

.qnadetail_row {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.qnadetail_label {
  width: 100px;
  font-size: 16px;
  color: #555555;
}

.qnadetail_input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
}

.qnadetail_input[readonly] {
  outline: none;
  background-color: transparent;
  cursor: default;
}

.qnadetail_input-title-content {
  flex: 1;
  padding: 10px;
  font-size: 14px;
  border: none;
  outline: none;
  background-color: transparent;
}

.qnadetail_chip {
  display: flex;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 5px;
  flex: 1;
  align-items: flex-start;
}

.qnadetail_chip-content {
  height: 330px;
}

.qnadetail_chip input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
}

.qnadetail_chip-close {
  margin-left: 10px;
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
}

.qnadetail_textarea {
  flex: 1;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
  width: 100%;
}

.qnadetail_button {
  padding: 10px 25px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
}

.qnadetail_button.qnadetail_cancel {
  background-color: #333;
  color: #fff;
  margin-right: 20px;
}

.qnadetail_button.qnadetail_submit {
  background-color: #F7CAC9;
  color: #555555;
  font-size: 24px;
  padding: 20px 50px
}

.qnadetail_actions {
  text-align: center;
  margin-top: 50px;
}

.qnadetail_label_margin {
  margin-left: 60px;
}

.qnadetail_chip textarea {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  height: 100%;
  resize: none;
}



.qnadetail_answer_row_large {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.qnadetail_answer_label {
  width: 100px;
  font-size: 1em;
  color: #333;
}

.qnadetail_answer_qna-status {
  display: inline-block;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  width: 90px;
}

.qnadetail_answer_qna_title {
  font-size: 14px;
  margin-left: 30px;
  width: 600px;
}

.qnadetail_answer_qna_writer {
  font-size: 14px;
  margin-left: 10px;
  width: 270px;
}

.qnadetail_answer_qna_date {
  font-size: 14px;
  margin-left: 10px;
}

.qnadetail_answer_image {
  width: 300px;
  height: 300px;
  background-color: #007bff;
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
