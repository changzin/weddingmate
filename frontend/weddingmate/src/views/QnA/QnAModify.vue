<template>
  <div>
    <!-- 헤더 아래 script랑 <style scoped>까지 다 복붙해서 사용-->
    <MateHeader />

    <!-- 본문 -->
    <div class="qnawrite_container">
      <h2 class="qnawrite_header">Q&amp;A 수정</h2>
      <form @submit.prevent="handleSubmit">
        <div class="qnawrite_row">
          <label class="qnawrite_label">문의 유형</label>
          <select
            class="form-select qnawrite_chip"
            v-model="form.inquiryType"
            :style="{ color: '#555555' }"
            required
          >
            <option value="" disabled>선택하세요</option>
            <option value="상품">상품</option>
            <option value="배송">배송</option>
            <option value="반품/취소">반품/취소</option>
            <option value="기타">기타</option>
          </select>
          <label class="qnawrite_label qnawrite_label_margin">공개 유형</label>
          <select
            class="form-select qnawrite_chip"
            v-model="form.visibilityType"
            :style="{ color: '#555555' }"
            required
          >
            <option value="" disabled>선택하세요</option>
            <option value="공개">공개</option>
            <option value="비공개">비공개</option>
          </select>
        </div>
        <div class="qnawrite_row">
          <label class="qnawrite_label">제목</label>
          <div class="qnawrite_chip">
            <input
              type="text"
              class="qnawrite_input-title-content"
              :value="form.title"
              @input="updateTitle($event.target.value)"
              placeholder="문의 제목을 입력하세요"
              required
            />
            <button
              type="button"
              class="qnawrite_chip-close"
              @click="clearTitle"
            >
              ×
            </button>
          </div>
        </div>
        <div class="qnawrite_row">
          <label class="qnawrite_label">문의 내용</label>
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
      form: {
        inquiryType: "",
        visibilityType: "",
        title: "",
        content: "",
        image: "",
      },
      QnAResult: {},
      item_id: 0,
    };
  },

  props: {
    qna_id: {
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
        // 데이터 가져오기
        const result = await this.$api(
          "/qna/getselectedqnadetail",
          { access_token: "temp-token", qna_id: this.qna_id },
          "POST"
        );
        this.QnAResult = result.data[0];
        if (this.QnAResult) {
          console.log(
            "QnAResult: ",
            JSON.parse(JSON.stringify(this.QnAResult))
          );
          // form 객체 업데이트
          this.form.title = this.QnAResult.qna_title;
          this.form.content = this.QnAResult.qna_content;
          this.form.image = this.QnAResult.qna_image_path;

          this.form.inquiryType = this.QnAResult.qna_type;
          this.form.visibilityType = this.QnAResult.qna_visibility;
          if (this.QnAResult.qna_visibility === "T") {
            this.form.visibilityType = "공개";
          } else {
            this.form.visibilityType = "비공개";
          }

          console.log("this.form.visibilityType : ", this.form.visibilityType);
        } else {
          console.log("fail");
        }
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

    // 확인 버튼 클릭 시 동작
    async handleSubmit() {
      if (
        !this.form.title ||
        !this.form.content ||
        !this.form.inquiryType ||
        !this.form.visibilityType
      ) {
        alert("모든 필드를 입력하세요.");
        return;
      }

      try {
        // 데이터 가져오기
        // qna_id, user_id, item_id, qna_type, qna_content, qna_title, qna_date, qna_image_path, qna_has_answer, qna_visibility
        // 결과 : this.form.qna_visibility :  공개
        if (this.form.visibilityType === "공개") {
          this.form.visibilityType = "T";
        } else {
          this.form.visibilityType = "F";
        }

        console.log("this.form.qna_visibility : ", this.form.visibilityType);
        const result = await this.$api(
          "/qna/updateselectedqnadetail",
          {
            qna_id: this.qna_id,
            qna_type: this.form.inquiryType,
            qna_content: this.form.content,
            qna_title: this.form.title,
            qna_visibility: this.form.visibilityType,
            qna_image_path: this.form.image,
          },
          "POST"
        );

          if (result.status === 200) {
          alert("입력이 성공적으로 완료되었습니다")
          this.item_id = result.item_id; 
          this.$router.push({ name: "qnAlist", query: { item_id: this.item_id }});
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
