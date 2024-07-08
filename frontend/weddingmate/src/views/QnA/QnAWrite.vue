<template>
  <div>
    <!-- 헤더 아래 script랑 <style scoped>까지 다 복붙해서 사용-->
    <MateHeader />

    <!-- 본문 -->
    <div class="qnawrite_container">
      <h2 class="qnawrite_header">Q&amp;A 작성</h2>
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
            <option value="item">상품문의</option>
            <option value="cancel">반품/취소</option>
            <option value="etc">기타</option>
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
              v-model="form.title"
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
    <MateFooter />
  </div>
</template>



<script>
export default {
  data() {
    return {
        // 이미지
      itemTnImage: null,
      itemTnImageExt: null,

      // 본문
      form: {
        inquiryType: "",
        visibilityType: "",
        title: "",
        content: "",
        image: "",
      },
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

  // async beforeRouteEnter(to, from, next) {
  //   next(async vm => {
  //     const userInfo = await vm.$verifiedUser();
  //     if (userInfo) {
  //       next();
  //     } else {
  //       alert("QnA 작성을 위하여 로그인하세요");
  //       vm.$router.push({
  //         name: "userlogin",
  //         query: { savedUrl: true }
  //       });
  //     }
  //   });
  // },
  

  methods: {
    async fetchProductListData() {
      // if (!this.$verifiedUser()) {
      //   alert("로그인하세요");
      // }
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
        if(this.form.visibilityType === "공개")
        {
          this.form.visibilityType = 'T'
        }
        else {
          this.form.visibilityType = 'F'
        }


        console.log("this.form.qna_visibility : ", this.form.visibilityType);
        const result = await this.$api(
          "/qna/insertqna",
          {
            access_token: this.$getAccessToken(),
            item_id: this.item_id,
            qna_type: this.form.inquiryType,
            qna_content: this.form.content,
            qna_title: this.form.title,
            qna_visibility: this.form.visibilityType,
             qna_image: this.itemTnImage,
            qna_image_ext: this.itemTnImageExt,
            upload_type: "qna",
          },
          "POST"
        );
        if(result.status == 200) {
          alert("완료됨");
      this.$router.push({ name: "qnAlist", query: { item_id: this.item_id } });
        }
        
      } catch (error) {
        console.error(
          "ProductDetail.vue fetchData Error fetching product data:",
          error
        );
      }

      // this.$router.push("/success-page");
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
      this.itemTnImage = file;
      const files = event.target?.files
      if (files.length > 0){
        const file = files[0];

        // 확장자 추출하는 부분이요
        const filename = files[0].name;
        this.form.image = filename;
        var _lastDot = filename.lastIndexOf('.');
        this.itemTnImageExt = filename.substring(_lastDot, filename.length).toLowerCase();

        // FileReader 객체 : 웹 애플리케이션이 데이터를 읽고, 저장하게 해줌
        const reader = new FileReader() 
  
        reader.onload = (e) => {
          this.itemTnImage = e.target.result 
        console.log("itemTnImage : ", this.itemTnImage);
        console.log("itemTnImageExt : ", this.itemTnImageExt);


        } 
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


</style>
