<template>
  <div>
    <MateHeader />

    <!-- 본문 -->
    <div class="reviewlist_container">
      <h2 class="reviewlist_header">리뷰 리스트</h2>

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

      <!-- 리뷰 섹션 -->
      <div class="reviewlist_review-section">
        <div class="qnalist_qna-header">
          <div></div>
          <button
            class="qnalist_write-qna-btn"
            type="button"
            @click="gotoReviewWrite"
          >
            <i class="fas fa-pen"></i> 리뷰 작성
          </button>
        </div>
        <div class="reviewlist_review-cards">
          <!-- v-for="(qna, index) in qnaList" -->
          <button
            class="reviewlist_review-card"
            v-for="review in reviewList"
            :key="review.id"
            @click="goToReviewDetail(review.review_id)"
          >
            <div class="reviewlist_card-header">
              <div class="reviewlist_review-section_title-div">
                {{
                  review.is_current_user
                    ? review.user_nickname
                    : maskNickname(review.user_nickname)
                }}
              </div>
              <div class="reviewlist_card-icons">
                <i
                  class="fas fa-bullhorn"
                  @click.stop="reviewToReport(review.review_id)"
                  v-if="!review.is_current_user"
                ></i>
                <i
                  class="fas fa-edit"
                  @click.stop="gotoReviewModify(review.review_id)"
                  v-if="review.is_current_user"
                ></i>
                <i
                  class="fas fa-trash"
                  v-if="review.is_current_user"
                  @click.stop="deleteReview(review)"
                ></i>
              </div>
            </div>
            <div class="reviewlist_review-section_title-div">
              <div class="reviewlist_card-rating">
                <div class="qnawrite_row">
                  <div class="rating">
                    <label
                      v-for="n in 10"
                      :key="n"
                      class="rating__label"
                      :class="{
                        half: n <= review.review_star * 2,
                        filled: n <= review.review_star * 2,
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
              <div class="reviewlist_review-section_date-div">
                {{ this.$dateFormat(review.review_date) }}
              </div>
            </div>
            <img
              v-if="review.review_image_path"
              :src="this.$imageFileFormat(review.review_image_path)"
              class="reviewlist_card-img-top"
              alt="Review Image"
            />
            <img
              v-else
              src="https://via.placeholder.com/300x200"
              class="reviewlist_card-img-top"
              alt="Review Image"
            />

            <div class="reviewlist_card-body">
              <div class="reviewlist_card-text">
                {{ review.review_content }}
              </div>
            </div>
          </button>
        </div>
      </div>
      <!-- 버튼 -->
    </div>

    <!-- 페이지 -->
    <div class="mypage-bottom">
      <div class="nav-page justify-content-center">
        <a :class="{ notVisible: page == 1 }" @click="prevBlock()"
          ><div>&lt;&lt;</div></a
        >
        <a :class="{ notVisible: page == 1 }" @click="prevPage()"
          ><div>&lt;</div></a
        >
        <a :class="{ notVisible: page - 2 < 1 }" @click="goToPage(page - 2)"
          ><div>{{ page - 2 }}</div></a
        >
        <a :class="{ notVisible: page - 1 < 1 }" @click="goToPage(page - 1)"
          ><div>{{ page - 1 }}</div></a
        >
        <a
          ><div style="color: pink">{{ page }}</div></a
        >
        <a
          :class="{ notVisible: page + 1 > maxPage }"
          @click="goToPage(page + 1)"
          ><div>{{ page + 1 }}</div></a
        >
        <a
          :class="{ notVisible: page + 2 > maxPage }"
          @click="goToPage(page + 2)"
          ><div>{{ page + 2 }}</div></a
        >
        <a :class="{ notVisible: page == maxPage }" @click="nextPage()"
          ><div>&gt;</div></a
        >
        <a :class="{ notVisible: page == maxPage }" @click="nextBlock()"
          ><div>&gt;&gt;</div></a
        >
      </div>
    </div>

    <!-- 푸터 -->
    <MateFooter />
  </div>
</template>



<script>
export default {
  data() {
    return {
      searchTitle: "",
      searchCount: 0,

      // 페이지
      page: 1,
      productList: [],
      isFirstPage: false,
      isLastPage: false,
      maxPage: 0,

      reviewList: {},
      // 신고팝업
      isVisibleReport: false,
      reportContent: "",
      currentReviweIndex: 0,

      // 별점
      rating: 0,
      currentRating: 0,
    };
  },

  props: {
    item_id: {
      type: String,
      required: true,
    },
  },

  async created() {
    await this.fetchProductListData();
  },

  methods: {
    async fetchProductListData() {
      try {
        const reviewResult = await this.$api(
          `/review/wholereview/${this.item_id}?page=${this.page}`,
          // { access_token: "temp-token" },
          { access_token: this.$getAccessToken() },
          "POST"
        );

        if (reviewResult.status == 200) {
          this.reviewList = reviewResult.reviewList;
          this.maxPage = reviewResult.maxPage;
          this.updatePageStatus();
        }
      } catch (error) {
        console.error(
          "ReviewList.vue fetchData Error fetching product data:",
          error
        );
      }
    },

    maskNickname(nickname) {
      if (nickname.length <= 4) {
        return nickname;
      }
      return nickname.slice(0, 4) + "*".repeat(4);
    },

    gotoReviewWrite() {
      this.$router.push({
        name: "reviewwrite",
        query: { item_id: this.item_id },
      });
    },

    gotoReviewModify(review_id) {
      this.$router.push({
        name: "reviewmodify",
        query: { review_id: review_id },
      });
    },

    goToReviewDetail(review_id) {
      this.$router.push({
        name: "reviewdetail",
        query: { review_id: review_id },
      });
    },

    async deleteReview(review) {
      try {
        const reviewResult = await this.$api(
          `/review/delete`,
          {
            access_token: this.$getAccessToken(),
            review_id: review.review_id,
            prev_review_image_path: review.review_image_path,
            upload_type: "review",
          },
          "POST"
        );

        if (reviewResult.status == 200) {
          await this.fetchProductListData();
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

    // 본문
    // 검색
    clearSearch() {
      this.searchTitle = "";
    },

    // 페이지
    async nextPage() {
      if (!this.isLastPage) {
        this.page++;
        await this.fetchProductListData();
      }
    },

    async prevPage() {
      if (!this.isFirstPage) {
        this.page--;
        await this.fetchProductListData();
      }
    },

    async goToPage(targetPage) {
      if (targetPage >= 1 && targetPage <= this.maxPage) {
        this.page = targetPage;
        await this.fetchProductListData();
      }
    },

    async prevBlock() {
      let targetPage = this.page > 5 ? this.page - 5 : 1;
      await this.goToPage(targetPage);
    },

    async nextBlock() {
      let targetPage =
        this.page + 5 <= this.maxPage ? this.page + 5 : this.maxPage;
      await this.goToPage(targetPage);
    },

    updatePageStatus() {
      this.isFirstPage = this.page === 1;
      this.isLastPage = this.page === this.maxPage;
    },
  },
};
</script>



<style scoped>
/* 리뷰 */

.qnalist_qna-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0px;
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
  margin-top: 30px;
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
  gap: 20px;
  justify-content: start;
}

.reviewlist_review_card:last-child {
  /* margin-right: 0; */
}

.reviewlist_review-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  width: 31%;
  padding: 10px;
  margin-bottom: 30px;
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
  margin-bottom: 10px;
}

.reviewlist_card-body {
  padding: 10px;
}

.reviewlist_card-rating {
  font-size: 14px;
  margin-bottom: 10px;
}

.reviewlist_card-text {
  font-size: 14px;
  color: #333;
  /* line-height: 1.5; */
  text-align: left; /* 텍스트를 왼쪽 정렬 */
}

.reviewlist_review-section_title-div {
  font-size: 14px;
}

.reviewlist_review-section_title-div {
  display: flex;
  justify-content: space-between;
}

.reviewlist_review-section_date-div {
  font-size: 12px;
}

/* 버튼 */

.reviewlist_qna-section_button {
  padding: 0px 350px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 40px;
}

.reviewlist_write-qna-btn {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.reviewlist_write-qna-btn i {
  margin-right: 8px;
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

/* 페이지 */
.notVisible {
  visibility: hidden;
}

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
</style>
