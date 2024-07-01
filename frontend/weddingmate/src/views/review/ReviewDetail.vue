<template>
  <div>
    <!-- 헤더 아래 script랑 <style scoped>까지 다 복붙해서 사용-->
    <MateHeader />

    <!-- 본문 -->
    <div class="qnadetail_container">
      <!-- Q&A 상세보기 + 아이콘 -->
      <div class="qnadetail_header">
        <div></div>
        <h2 class="qnadetail_header_text">리뷰 상세보기</h2>
        <div class="qnadetail_header_icon" v-if="isVisibleEditTrash">
          <i class="fas fa-edit" type="button" @click="gotoQnAModify"></i>
          <i class="fas fa-trash" type="button" @click="deleteQnA"></i>
        </div>
      </div>
      <!-- 별점 -->
      <div class="qnawrite_row">
        <label class="qnawrite_label">별점 표시</label>

        <div class="rating">
          <label
            v-for="n in 10"
            :key="n"
            class="rating__label"
            :class="{
              half: n <= currentRating,
              filled: n <= currentRating,
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

      <form @submit.prevent="handleSubmit" class="form_margin">
        <!-- 문의 내용 -->
        <div class="qnadetail_row">
          <label class="qnadetail_label">문의 내용</label>
          <div class="qnadetail_chip qnadetail_chip-content">
            {{ form.content }}
          </div>
        </div>

        <div class="qnadetail_answer_row_large">
          <label class="qnadetail_answer_label">이미지</label>
          <a :href="form.image">
            <div class="qnadetail_answer_image">
              <img :src="form.image" alt="이미지" />
            </div>
          </a>
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
      isVisibleEditTrash: false,

      // 본문
      form: {
        content: "",
        image: "",
      },
      rating: 0,
      currentRating: 0,


      ReviewResult: {},
    };
  },
  props: {
    review_id: {
      type: String,
      required: true,
    },
  },

  async created() {
    await this.fetchProductListData();
  },

  // async beforeRouteEnter(to, from, next) {
  //   next();
  // },

  methods: {
    async fetchProductListData() {
      try {
        console.log("this.reiview_id  : ", this.review_id);
        


        //  qna 데이터 가져오기
        const result = await this.$api(`http://localhost:9090/review/getselectedreviewdetail?review_id=${this.review_id}`);  


        this.ReviewResult = result.data[0];
        if (this.ReviewResult) {
          console.log(
            "ReviewResult: ",
            JSON.parse(JSON.stringify(this.ReviewResult))
          );

          this.currentRating = this.ReviewResult.review_star * 2;
          this.rating = this.currentRating;

          // form 객체 업데이트
          this.form.content = this.ReviewResult.review_content;
          this.form.image = this.ReviewResult.review_image_path;
        } else {
          console.log("fail");
        }
      } catch (error) {
        console.error("QnADetail.vue fetchData Error fetching  data:", error);
      }
    },

    gotoQnAModify() {
      this.$router.push({ name: "qnamodify", query: { qna_id: this.qna_id } });
    },
    async deleteQnA() {
      const result = await this.$api(
        "/qna/deleteqna",
        { access_token: "temp-token", qna_id: this.qna_id },
        "POST"
      );

      if (result.status == 200) {
        alert("성공적으로 지웠습니다");
        this.$router.go(-1);
      }
    },

    // 확인 버튼 클릭 시 동작
    handleSubmit() {
      this.$router.go(-1);
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

.form_margin {
  margin-top: 20px;
}






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
  justify-content: center;
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
  background-color: #f7cac9;
  color: #555555;
  font-size: 24px;
  padding: 20px 50px;
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

.productdetail_qna-status {
  display: inline-block;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  width: 90px;
  text-align: center;
  align-items: center;
}

.productdetail_qna-status.incomplete {
  background-color: white;
  color: #007bff;
  border: 1px solid #007bff;
  width: 90px;
  padding: 5px 10px;
  text-align: center;
  align-items: center;
}

.productdetail_qna-section_status-title-div {
  display: flex;
  gap: 20px;
  align-items: center;
  /* justify-content: center; */
}

.productdetail_qna-section_status-nickname-div {
  text-align: left;
}
</style>
