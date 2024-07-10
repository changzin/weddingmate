<template>
  <div>
    <!-- 헤더 아래 script랑 <style scoped>까지 다 복붙해서 사용-->
    <MateHeader />

    <!-- 본문 -->
    <div class="qnalist_container">
      <h2 class="qnalist_header">Q&amp;A 리스트</h2>
      <!-- 검색 -->

      <div class="qnalist_search-container">
        <div class="qnalist_search-input-group">
          <div class="qnalist_search-input-wrapper">
            <input
              type="text"
              class="qnalist_search-input"
              v-model="searchTitle"
              placeholder="제목을 입력하세요"
              @keyup.enter="clickSearch"
            />
            <button class="qnalist_search-clear-button" @click="clearSearch">
              ×
            </button>
          </div>
          <button class="qnalist_search-button" @click="clickSearch">
            검색
          </button>
        </div>
        <div class="qnalist_search-results">
          <span>검색결과</span>
          <span>{{ searchCount }}건</span>
        </div>
      </div>

      <!-- QnA -->
      <div class="qnalist_qna-section">
        <div class="qnalist_qna-header">
          <div></div>
          <button
            class="qnalist_write-qna-btn"
            type="button"
            @click="gotoQnaWrite"
          >
            <i class="fas fa-pen"></i> QnA 작성
          </button>
        </div>
        <!-- QnA 데이터 -->
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
            <tr
              v-for="(qna, index) in qnaList"
              :key="index"
              @click="gotoQnaDetail(qna.qna_id)"
            >
              <td>{{ this.formatQnaType(qna.qna_type) }}</td>
              <td class="productdetail_qna-section_status-title-div">
                <div
                  class="productdetail_qna-status"
                  v-if="qna.qna_has_answer == 'T'"
                >
                  답변 완료
                </div>
                <div
                  class="productdetail_qna-status incomplete"
                  v-if="qna.qna_has_answer == 'F'"
                >
                  미완료
                </div>
                <div>
                  {{ qna.qna_title }} 
                  <i v-if="qna.qna_visibility == 'F'" class="fas fa-lock"></i>
                </div>
              </td>
              <td class="productdetail_qna-section_status-nickname-div">
                {{ maskNickname(qna.user_nickname) }}
              </td>
              <td>{{ this.$dateFormat(qna.qna_date) }}</td>
            </tr>
          </tbody>
        </table>
        <!-- 버튼 -->
        <div class="qnalist_qna-section_button"></div>
      </div>
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

      qnaList: {},
    };
  },

  computed: {
    paginationRange() {
      const range = [];
      const startPage = Math.max(1, this.page - 2);
      const endPage = Math.min(this.maxPage, this.page + 2);

      for (let i = startPage; i <= endPage; i++) {
        range.push(i);
      }
      return range;
    },
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
        const QnAResult = await this.$api(
          `/qna/searchitemdetail/${this.item_id}?page=${this.page}`,
          { qna_title: this.searchTitle },
          "POST"
        );

        if (QnAResult.status == 200) {
          this.qnaList = QnAResult.qnaList;
          this.maxPage = QnAResult.maxPage;
          console.log("maxPage : ", this.maxPage);
          this.updatePageStatus();
        }
      } catch (error) {
        console.error(
          "ProductDetail.vue fetchData Error fetching product data:",
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

    clearSearch() {
      this.searchTitle = "";
    },

    async clickSearch() {
      console.log("this.searchTitle : ", this.searchTitle);
      try {
        const QnAResult = await this.$api(
          `/qna/searchitemdetail/${this.item_id}?page=${this.page}`,
          { qna_title: this.searchTitle },
          "POST"
        );

        if (QnAResult.status == 200) {
          this.qnaList = QnAResult.qnaList;
          this.maxPage = QnAResult.maxPage;
          this.searchCount = QnAResult.searchCount[0].total;
          console.log("maxPage : ", this.maxPage);
          console.log(
            "searchitemdetail: ",
            JSON.parse(JSON.stringify(this.qnaList))
          );
          this.updatePageStatus();
        }
      } catch (error) {
        console.error(
          "ProductDetail.vue fetchData Error fetching product data:",
          error
        );
      }
    },

    // 페이지 네이션
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

    // QnA
    gotoQnaWrite() {
      this.$router.push({ name: "qnawrite", query: { item_id: this.item_id } });
    },

    async gotoQnaDetail(index) {


      const result = await this.$api(
        "/qna/isselectedqnavisibility",
        { access_token: this.$getAccessToken(), qna_id: index },
        "POST"
      );
      console.log("result.status : ",result.status);
      if (result.status === 201) {
        alert("비밀글입니다");
      } else {
        this.$router.push({ name: "qnadetail", query: { qna_id: index } });
      }
    },

    formatQnaType(data) {
      if (data == "delivery") {
        return "배송문의";
      } else if (data == "cancel") {
        return "반품/취소";
      } else if (data == "item") {
        return "상품문의";
      } else {
        return "기타";
      }
    },
  },
};
</script>



<style scoped>


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

/* 엥 */
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

.productdetail_qna-table tbody tr {
  cursor: pointer !important;
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
  /* justify-content: center; */
}

.productdetail_qna-section_status-nickname-div {
  text-align: left;
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
