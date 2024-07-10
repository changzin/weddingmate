<template>
  <div>
    <!-- 헤더 아래 script랑 <style scoped>까지 다 복붙해서 사용-->
    <MateHeader />

    <!-- 본문 -->
    <div class="qnadetail_container">
      <!-- 신고 팝업창 -->
      <div v-if="isVisibleReport" class="report-overlay">
        <div class="report-popup">
          <!-- <div v-if="isVisibleReport" class="report-popup"> -->

          <div class="report-popup_header">
            <div></div>
            <div>신고 팝업창</div>
            <i
              class="fas fa-times popupCloseButton"
              @click="collapseReportPopup"
            ></i>
          </div>
          <div class="report-popup_content">
            <div class="report-popup_content_header">신고사유 :</div>
            <textarea
              class="report-popup_content_input"
              v-model="reportContent"
            ></textarea>
            <div class="report-popup_content_footer">
              <div class="report-popup_content_ok" @click="ToReport">전송</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 리뷰 상세보기 + 아이콘 -->
      <div class="qnadetail_header">
        <div></div>
        <h2 class="qnadetail_header_text">리뷰 상세보기</h2>
        <div class="qnadetail_header_icon">
          <!-- <i class="fas fa-edit" type="button" @click="gotoQnAModify"></i>
          <i class="fas fa-trash" type="button" @click="deleteQnA"></i> -->
          <i
            class="fas fa-bullhorn"
            @click.stop="reviewToReport()"
            v-if="!is_current_user"
          ></i>
          <i
            class="fas fa-edit"
            @click.stop="gotoReviewModify()"
            v-if="is_current_user"
          ></i>
          <i
            class="fas fa-trash"
            v-if="is_current_user"
            @click.stop="deleteReview()"
          ></i>
        </div>
      </div>
      <!-- 별점 -->
      <div class="qnawrite_row">
        <label class="qnawrite_label">별점 </label>
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
          <label class="qnadetail_label">리뷰 내용</label>
          <div class="qnadetail_chip qnadetail_chip-content">
            {{ form.content }}
          </div>
        </div>

        <div class="qnadetail_answer_row_large">
          <label class="qnadetail_answer_label">이미지</label>
          <a :href="form.image">
            <div class="qnadetail_answer_image">
              <img
                :src="this.$imageFileFormat(ReviewResult.review_image_path)"
                class="qnadetail_answer_image_src"
              />
            </div>
          </a>
        </div>

        <!-- 버튼 -->
        <div class="qnadetail_actions">
          <button
            type="button"
            class="qnadetail_button qnadetail_submit"
            @click="clickToProductDetail"
          >
            상품페이지로
          </button>
           <button
            type="button"
            class="qnadetail_button qnadetail_submit"
            @click="clickToReviewList"
          >
            리뷰리스트로
          </button>
        </div>
      </form>
    </div>

    <!-- 푸터 -->
    <MateFooter />
  </div>
</template>



<script>
export default {
  data() {
    return {
      isVisibleEditTrash: false,
      is_current_user: false,

      // 본문
      form: {
        content: "",
        image: "",
      },
      rating: 0,
      currentRating: 0,

      ReviewResult: {},

      // 신고팝업
      isVisibleReport: false,
      reportContent: "",
      currentReviweIndex: 0,

      item_id: "",
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
        //  review 데이터 가져오기
        const result = await this.$api(
          `http://localhost:9090/review/getselectedreviewdetail?review_id=${this.review_id}`,
          // { access_token: "temp-token" },
          { access_token: this.$getAccessToken() },
          "POST"
        );
        if (!result.data[0]) {
          return false;
        }

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
          this.is_current_user = this.ReviewResult.is_current_user;

          console.log(
            "this.ReviewResult.is_current_user : ",
            this.ReviewResult.is_current_user
          );
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
        { access_token: this.$getAccessToken(), qna_id: this.qna_id },
        "POST"
      );

      if (result.status == 200) {
        alert("성공적으로 지웠습니다");
        this.$router.go(-1);
      }
    },

    // 상품페이지로 이동
    clickToProductDetail() {
      this.$router.push({
        name: "productdetail",
        query: { item_id: this.ReviewResult.item_id },
      });
    },

    // 리뷰리스트로 이동
    clickToReviewList() {
      this.$router.push({
        name: "reviewlist",
        query: { item_id: this.ReviewResult.item_id },
      });
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

    gotoReviewModify() {
      this.$router.push({
        name: "reviewmodify",
        query: { review_id: this.review_id },
      });
    },

    async deleteReview() {
      try {
        const reviewResult = await this.$api(
          `/review/delete`,
          {
            access_token: this.$getAccessToken(),
            review_id: this.review_id,
            prev_review_image_path: this.ReviewResult.review_image_path,
            upload_type: "review",
          },
          "POST"
        );

        if (reviewResult.status == 200) {
          alert("성공적으로 삭제되었습니다");
        } else if (reviewResult.status <= 400) {
          alert("삭제에 실패되었습니다");
        }
      } catch (error) {
        console.error(
          "ReviewList.vue fetchData Error fetching product data:",
          error
        );
      }
    },

    // 리뷰 신고
    async reviewToReport() {
      const userInfo = await this.$verifiedUser();
      if (!userInfo) {
        alert("로그인이 필요한 서비스입니다");
        this.$router.push({
          name: "userlogin",
          query: { savedUrl: true },
        });

        return;
      }
      this.isVisibleReport = true;
      this.currentReviweIndex = this.review_id;
    },

    collapseReportPopup() {
      this.isVisibleReport = false;
    },

    async ToReport() {
      if (this.reportContent == "") {
        alert("신고내용을 입력해주세요");
      }

      try {
        const result = await this.$api(
          "/review/reviewreport",
          {
            access_token: this.$getAccessToken(),
            review_id: this.currentReviweIndex,
            report_content: this.reportContent,
          },
          "POST"
        );
        if (result.status == 200) {
          alert("신고 완료");
          this.isVisibleReport = false;
        }
      } catch (error) {
        console.error(
          "ProductDetail.vue fetchData Error fetching product data:",
          error
        );
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

.qnawrite_row {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.qnawrite_label {
  width: 100px;
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
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
  color: #555555;
  padding: 10px 30px;


}

.qnadetail_button.qnadetail_cancel {
  background-color: #333;
  color: #fff;
  margin-right: 20px;
}

.qnadetail_button.qnadetail_submit {
}

.qnadetail_actions {
  text-align: center;
  margin-top: 50px;
  display: flex;
  gap: 30px;
  justify-content: center;
  
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
}

.qnadetail_answer_image_src {
  width: 300px;
  height: 300px;
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

/* 신고 */
.report-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px); /* 블러 효과 추가 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 배경을 덮도록 z-index 설정 */
}

.report-popup {
  position: fixed;
  bottom: 70px;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 400px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  border-radius: 12px;

  padding: 20px;
  /* visibility: collapse; */
  flex-direction: column;
}

.report-popup_header {
  display: flex;
  align-items: center; /* Vertically centers the content */
  height: 50px;
  width: 100%;
  justify-content: space-between;
}

.popupCloseButton {
  cursor: pointer;
}

.report-popup_content {
  width: 100%;
  flex-grow: 1; /* This makes the content take up the remaining space */
  display: flex;
  flex-direction: column;
}
.report-popup_content_header {
  width: 100%;
  margin-bottom: 10px;
}
.report-popup_content_input {
  width: 100%;
  flex-grow: 1;
  padding: 10px;
  box-sizing: border-box;
  resize: none;
}

.report-popup_content_footer {
  display: flex;
  justify-content: center; /* 버튼을 가운데 정렬 */
}

.report-popup_content_ok {
  margin-top: 10px;
  border: 1px solid black;
  border-radius: 12px;
  display: flex;
  width: 70px;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
}
</style>
