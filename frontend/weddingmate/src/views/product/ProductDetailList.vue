<template>
  <div class="fix-width">
    <!-- 헤더 -->
    <MateHeader />

    <!-- 본문 -->
    <div class="productdetail_main_content">
      <!-- 청첩장 -->
      <div
        :class="[
          'productdetaillist-content',
          getClass('letter'),
          'productdetaillist-content_margin',
        ]"
      >
        <img src="https://via.placeholder.com/1280x500" />
      </div>

      <!-- 검색 -->
      <div class="search-container-wrapper">
        <div class="search-container">
          <input
            type="text"
            placeholder="Search"
            class="search-input"
            v-model="searchTitle"
          />
          <i
            class="fas fa-search search-icon"
            @click="fetchProductListData"
          ></i>
        </div>
      </div>

      <!-- 청첩장상품 리스트 -->
      <div :class="['productdetaillist-content', getClass('letter')]">
        <!-- 상품들 -->
        <div class="reviewlist_review-section">
          <div class="reviewlist_review-cards">
            <button
              class="reviewlist_review-card"
              v-for="(product, index) in productList"
              :key="index"
              @click="goToProductDetail(product.item_id)"
            >
              <img
                :src="this.$imageFileFormat(product.item_tn_image_path)"
                class="reviewlist_card-img-top"
                alt="Review Image"
              />
              <div class="reviewlist_card-body">
                <div
                  class="reviewlist_review-section_title-div letter-title-flex"
                >
                  <div class="letter-title-flex_title">
                    {{ product.item_name }}
                  </div>
                  <div class="letter-title-flex-dummy"></div>
                  <div class="letter-title-flex_per">
                    {{ product.item_discount_rate }}%
                  </div>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- 그외 상품 리스트 -->
      <div :class="['productdetaillist-content', getClass('')]">
        <!-- 상품들 -->
        <div class="reviewlist_review-section">
          <div class="reviewlist_review-cards">
            <button
              class="reviewlist_review-card"
              v-for="(product, index) in productList"
              :key="index"
              @click="goToProductDetail(product.item_id)"
            >
              <img
                :src="this.$imageFileFormat(product.item_tn_image_path)"
                class="reviewlist_card-img-top"
                alt="Review Image"
              />
              <div class="reviewlist_card-body">
                <div class="reviewlist_review-section_title-div">
                  {{ product.item_name }}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>

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
  props: {
    itemType: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      searchTitle: "",

      // 페이지
      page: 1,
      productList: [],
      isFirstPage: false,
      isLastPage: false,
      maxPage: 0,
    };
  },

  async created() {
    await this.fetchProductListData();
  },

  watch: {
    itemType: {
      immediate: true,
      handler() {
        this.page = 1;
        this.fetchProductListData();
      },
    },
  },

  methods: {
    async fetchProductListData() {
      try {
        const response = await this.$api(
          `/product/list/${this.itemType}?page=${this.page}&keyword=${this.searchTitle}`
        );

        const productData = response.data;
        const maxPage = response.maxPage;

        if (productData) {
          this.productList = productData;
          this.maxPage = maxPage;

          console.log("Max page:", this.maxPage);
        } else {
          console.error(
            "ProductDetailList.vue fetchProductListData : No product data"
          );
        }
        this.updatePageStatus();
      } catch (error) {
        console.error(
          "ProductDetailList.vue fetchProductListData Error fetching product data:",
          error
        );
      }
    },

    async clickSearch() {
      try {
        const response = await this.$api(
          `/product/list/${this.itemType}?page=${this.page}&keyword=${this.searchTitle}`
        );

        const productData = response.data;
        const maxPage = response.maxPage;

        if (productData) {
          this.productList = productData;
          this.maxPage = maxPage;
        } else {
          console.error(
            "ProductDetailList.vue fetchProductListData : No product data"
          );
        }
        this.updatePageStatus();
      } catch (error) {
        console.error(
          "ProductDetailList.vue fetchProductListData Error fetching product data:",
          error
        );
      }
    },

    getClass(type) {
      if (type === "letter") {
        return this.itemType === "letter" ? "visible" : "collapse";
      } else {
        return this.itemType !== "letter" ? "visible" : "collapse";
      }
    },

    goToProductDetail(item_id) {
      this.$router.push({
        name: "productdetail",
        query: { item_id },
      });
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
  },
};
</script>


<style scoped>
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
}

.reviewlist_card-rating {
  font-size: 14px;
  margin-bottom: 10px;
}

.reviewlist_review-section_title-div {
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 10px;
  width: 100%;
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
</style>
