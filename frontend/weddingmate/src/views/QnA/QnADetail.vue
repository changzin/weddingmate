<template>
  <div>
    <!-- 헤더 아래 script랑 <style scoped>까지 다 복붙해서 사용-->
    <MateHeader />

    <!-- 본문 -->
    <div class="qnadetail_container">
      <!-- Q&A 상세보기 + 아이콘 -->
      <div class="qnadetail_header">
        <div></div>
        <h2 class="qnadetail_header_text">Q&A 상세보기</h2>
        <div class="qnadetail_header_icon" v-if="isVisibleEditTrash">
          <i class="fas fa-edit" type="button" @click="gotoQnAModify"></i>
          <i class="fas fa-trash" type="button" @click="deleteQnA"></i>
        </div>
        <div v-if="!isVisibleEditTrash"></div>
      </div>
      <!-- 제목 + 답변상태 + 타이틀 등등 -->
      <div class="qnadetail_answer_row_large">
        <label class="qnadetail_answer_label">제목</label>
        <div
          class="productdetail_qna-status"
          v-if="QnAResult.qna_has_answer == 'T'"
        >
          답변 완료
        </div>
        <div
          class="productdetail_qna-status incomplete"
          v-if="QnAResult.qna_has_answer == 'F'"
        >
          미완료
        </div>
        <div class="qnadetail_answer_qna_title">
          {{ form.title }}
        </div>
        <div class="qnadetail_answer_qna_writer">
          {{ this.user_nickname }}
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
          <a :href="form.image">
            <div class="qnadetail_answer_image">
              <img :src="form.image" alt="이미지" />
            </div>
          </a>
        </div>

        <!-- 답변 내용 -->
        <div class="qnadetail_row" v-if="AnswerContent">
          <label class="qnadetail_label">답변 내용</label>
          <div class="qnadetail_chip qnadetail_chip-content">
            {{ AnswerContent }}
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
    <MateFooter />
  </div>
</template>



<script>
export default {
  data() {
    return {
      isVisibleEditTrash: false,

      // 본문
      form: {
        inquiryType: "상품",
        visibilityType: "공개",
        title: "문의 제목입니다",
        content:
          "문의 내용입니다. 문의 내용입니다. 문의 내용입니다. 문의 내용입니다.",
        image: "이미지 파일 경로",
      },

      QnAResult: {},
      AnswerResult: {},
      UserResult: {},
      user_nickname: "",

      AnswerContent: "",
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

  async beforeRouteEnter(to, from, next) {
    next();
  },

  methods: {
    async fetchProductListData() {
      try {
        console.log("this.qna_id  : ", this.qna_id);

        //  qna 데이터 가져오기
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
          this.form.visibilityType = this.QnAResult.qna_visibility;
          this.form.title = this.QnAResult.qna_title;
          this.form.content = this.QnAResult.qna_content;
          this.form.image = this.QnAResult.qna_image_path;

          this.isVisibleEditTrash = result.isVisibleEditTrash;

          this.form.inquiryType = this.QnAResult.qna_type;
          this.form.visibilityType = this.QnAResult.qna_visibility;
          if (this.QnAResult.qna_visibility === "T") {
            this.form.visibilityType = "공개";
          } else {
            this.form.visibilityType = "비공개";
          }

          this.user_nickname = result.user_nickname.user_nickname;

          // answer 데이터 가져오기
          if (this.QnAResult.qna_visibility === "T") {
            const result = await this.$api(
              "/answer/getanswer",
              { qna_id: this.qna_id },
              "POST"
            );
            this.AnswerResult = result.data;
            if (this.AnswerResult) {
              console.log(
                "AnswerResult: ",
                JSON.parse(JSON.stringify(this.AnswerResult))
              );
            }
            if(result.data.answer_content)
            {

              this.AnswerContent = result.data.answer_content;
            console.log("this.AnswerContent : ", this.AnswerContent);
              }
          }
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

      if(result.status == 200) {
        alert("성공적으로 지웠습니다");
        this.$router.go(-1);
      }
    },

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
  /* justify-content: center; */
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
