<template>
  <div>
    <!-- 헤더 아래 script랑 <style scoped>까지 다 복붙해서 사용-->
    <MateHeader />

    <!-- 본문 -->
    <div class="qnawrite_container">
      <h2 class="qnawrite_header">리뷰 작성</h2>
      <form @submit.prevent="handleSubmit">
        <!-- 별점 -->
        <div class="qnawrite_row">
          <label class="qnawrite_label">별점 등록</label>

          <div class="rating" @mouseleave="resetRating">
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
              @mouseenter="hoverRating(n)"
            >
              <input
                type="radio"
                :id="'star' + n"
                class="rating__input"
                name="rating"
                :value="n"
                v-model="rating"
                @change="selectRating(n)"
              />
              <div class="star-icon"></div>
            </label>
          </div>
        </div>
        <div class="qnawrite_row">
          <label class="qnawrite_label">리뷰 내용</label>
          <div class="qnawrite_chip qnawrite_chip-content">
            <textarea
              class="qnawrite_input-title-content"
              v-model="form.content"
              placeholder="문의 내용을 입력하세요"
              required
            ></textarea>
            <button
              type="button"
              class="qnawrite_chip-close"
              @click="clearContent"
            >
              ×
            </button>
          </div>
        </div>

        <div class="qnawrite_row">
          <label class="qnawrite_label">이미지 등록</label>
          <input
            type="text"
            class="qnawrite_input"
            v-model="form.image"
            placeholder="이미지 등록"
            readonly
          />
          <input
            type="file"
            ref="fileInput"
            @change="handleFileChange"
            accept="image/*"
            style="display: none"
          />
          <button
            type="button"
            class="qnawrite_button"
            style="color: #555555"
            @click="triggerFileInput"
          >
            파일찾기
          </button>
        </div>

        <div class="qnawrite_actions">
          <button
            type="button"
            class="qnawrite_button qnawrite_cancel"
            @click="handleCancel"
          >
            취소
          </button>
          <button type="submit" class="qnawrite_button qnawrite_submit">
            확인
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
      // 본문
      form: {
        content: "",
        image: "",
      },
    //   별점
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

  // 별점
  watch: {
    rating(newRating) {
      console.log("Selected rating:", newRating);
    },
  },

  async created() {
    await this.fetchProductListData();
  },

  mounted() {
    this.resetRating();
  },

  methods: {
    async fetchProductListData() {
      if (!this.$verifiedUser()) {
        alert("로그인하세요");
      }
    },

    // 확인 버튼 클릭 시 동작
    async handleSubmit() {
      if (!this.form.content || !this.rating) {
        alert("모든 필드를 입력하세요.");
        return;
      }
      try {
        const result = await this.$api(
          "/review/insertreview",
          {
            access_token: "temp-token",
            item_id: this.item_id,
            review_content: this.form.content,
            review_star: this.currentRating / 2,
            review_image_path: this.form.image,
          },
          "POST"
        );
        if (result.status == 200) {
          alert("완료됨");
          this.$router.push({
            name: "reviewlist",
            query: { item_id: this.item_id },
          });
        }
      } catch (error) {
        console.error(
          "ProductDetail.vue fetchData Error fetching product data:",
          error
        );
      }

      // this.$router.push("/success-page");
    },

    // 별점
    hoverRating(value) {
      this.currentRating = value;
    },
    resetRating() {
      this.currentRating = this.rating;
    },
    selectRating(value) {
      this.rating = value;
      this.currentRating = value;
    },

    // 취소 버튼 클릭 시 동작
    handleCancel() {
      this.$router.go(-1);
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


/* 본문 */

.qnawrite_container {
  width: 1280px;
  margin: 0 auto;
  margin-top: 80px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  font-family: Arial, sans-serif;
}

.qnawrite_header {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 16px;
}

.qnawrite_row {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.qnawrite_label {
  width: 100px;
  font-size: 16px;
  color: #555555;
}

.qnawrite_input {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-right: 10px;
}

.qnawrite_input[readonly] {
  outline: none;
  background-color: transparent;
  cursor: default;
}

.qnawrite_input-title-content {
  flex: 1;
  padding: 10px;
  font-size: 14px;
  border: none;
  outline: none;
  background-color: transparent;
}

.qnawrite_chip {
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 5px;
  flex: 1;
}

.qnawrite_chip-content {
  height: 330px;
}

.qnawrite_chip input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
}

.qnawrite_chip-close {
  margin-left: 10px;
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
}

.qnawrite_textarea {
  flex: 1;
  padding: 10px;
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 5px;
  resize: none;
  width: 100%;
}

.qnawrite_button {
  padding: 10px 25px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  cursor: pointer;
}

.qnawrite_button.qnawrite_cancel {
  background-color: #333;
  color: #fff;
  margin-right: 20px;
}

.qnawrite_button.qnawrite_submit {
  background-color: #f5f5f5;
  color: #555555;
  border: 1px solid #f7cac9;
}

.qnawrite_actions {
  text-align: center;
  margin-top: 50px;
}

.qnawrite_label_margin {
  margin-left: 60px;
}

.qnawrite_chip textarea {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  width: 100%;
  height: 100%;
  resize: none;
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
