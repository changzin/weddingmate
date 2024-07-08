<template>
  <div>
    <!-- 헤더 아래 script랑 <style scoped>까지 다 복붙해서 사용-->
    <MateHeader />

    <!-- 본문 -->
    <div class="qnawrite_container">
      <h2 class="qnawrite_header">리뷰 수정</h2>
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
              placeholder="리뷰 내용을 입력하세요"
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
      form: {
        content: "",
        image: "",
      },
      ReviewResult: {},
      item_id: 0,

      //   별점
      rating: 0,
      currentRating: 0,

      // 이미지
      itemTnImage: null,
      itemTnImageExt: null,
      review_image_change: false,
    };
  },

  props: {
    review_id: {
      type: String,
      required: true,
    },
  },

   async beforeRouteEnter(to, from, next) {
    next(async vm => {
      const userInfo = await vm.$verifiedUser();
      if (userInfo) {
        next();
      } else {
        alert("리뷰 수정을 위하여 로그인하세요");
        vm.$router.push({
          name: "userlogin",
          query: { savedUrl: true }
        });
      }
    });
  },

  async created() {
    await this.fetchProductListData();
  },

  methods: {
    async fetchProductListData() {
      console.log("review_id : ", this.review_id);
      try {
        // 데이터 가져오기

       const result = await this.$api(
          `/review/getselectedreviewdetail?review_id=${this.review_id}`,
          // { access_token: "temp-token" },
          { access_token: this.$getAccessToken() },
          "POST"
        );

        this.ReviewResult = result.data[0];
        if (this.ReviewResult) {
          console.log(
            "ReviewResult: ",
            JSON.parse(JSON.stringify(this.ReviewResult))
          );
        } else {
          //   console.log("fail");
        }

        this.currentRating = this.ReviewResult.review_star * 2;
        this.rating = this.currentRating;
        // form 객체 업데이트
        this.form.content = this.ReviewResult.review_content;
        this.form.image = this.ReviewResult.review_image_path;
      } catch (error) {
        console.error(
          "ProductDetail.vue fetchData Error fetching product data:",
          error
        );
      }
    },

    updateTitle(value) {
      this.form.title = value;
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

    // 확인 버튼 클릭 시 동작
    async handleSubmit() {
      if (!this.form.content) {
        alert("모든 필드를 입력하세요.");
        return;
      }

      try {
        console.log("this.ReviewResult.review_image_path : ", this.ReviewResult.review_image_path);
        const result = await this.$api(
          "/review/updateselectedreviewdetail",
          {
            access_token: this.$getAccessToken(),
            review_id: this.review_id,
            review_content: this.form.content,
            review_star: this.currentRating / 2,
            review_image_change: this.review_image_change,
            review_image: this.itemTnImage,
            review_image_ext: this.itemTnImageExt,
            prev_review_image_path: this.ReviewResult.review_image_path,
            upload_type: "review",
          },
          "POST"
        );

        if (result.status === 200) {
          alert("입력이 성공적으로 완료되었습니다");
          this.$router.go(-1);
        }
      } catch (error) {
        console.error(
          "ProductDetail.vue fetchData Error fetching product data:",
          error
        );
      }
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

    async handleFileChange(file) {
      this.review_image_change = true;
      this.itemTnImage = file;
      const files = event.target?.files;
      if (files.length > 0) {
        const file = files[0];

        // 확장자 추출하는 부분이요
        const filename = files[0].name;
        this.form.image = filename;
        var _lastDot = filename.lastIndexOf(".");
        this.itemTnImageExt = filename
          .substring(_lastDot, filename.length)
          .toLowerCase();

        // FileReader 객체 : 웹 애플리케이션이 데이터를 읽고, 저장하게 해줌
        const reader = new FileReader();

        reader.onload = (e) => {
          this.itemTnImage = e.target.result;
          console.log("itemTnImage : ", this.itemTnImage);
          console.log("itemTnImageExt : ", this.itemTnImageExt);
        };
        // ref previewImage 값 변경
        // 컨텐츠를 특정 file에서 읽어옴. 읽는 행위가 종료되면 loadend 이벤트 트리거함
        // & base64 인코딩된 스트링 데이터가 result 속성에 담김
        this.itemTnImage = await reader.readAsDataURL(file);
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
</style>
