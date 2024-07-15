<template>
    <div class="sidbar_content_body">
  <div>
    <div class="d-flex" >
      <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">        
        <symbol id="table" viewBox="0 0 16 16">
          <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/>
        </symbol>
        <symbol id="people-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </symbol>
        <symbol id="grid" viewBox="0 0 16 16">
          <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
        </symbol>        
        <symbol id="chat-quote-fill" viewBox="0 0 16 16">
          <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM7.194 6.766a1.688 1.688 0 0 0-.227-.272 1.467 1.467 0 0 0-.469-.324l-.008-.004A1.785 1.785 0 0 0 5.734 6C4.776 6 4 6.746 4 7.667c0 .92.776 1.666 1.734 1.666.343 0 .662-.095.931-.26-.137.389-.39.804-.81 1.22a.405.405 0 0 0 .011.59c.173.16.447.155.614-.01 1.334-1.329 1.37-2.758.941-3.706a2.461 2.461 0 0 0-.227-.4zM11 9.073c-.136.389-.39.804-.81 1.22a.405.405 0 0 0 .012.59c.172.16.446.155.613-.01 1.334-1.329 1.37-2.758.942-3.706a2.466 2.466 0 0 0-.228-.4 1.686 1.686 0 0 0-.227-.273 1.466 1.466 0 0 0-.469-.324l-.008-.004A1.785 1.785 0 0 0 10.07 6c-.957 0-1.734.746-1.734 1.667 0 .92.777 1.666 1.734 1.666.343 0 .662-.095.931-.26z"/>
        </symbol>
        <symbol id="tools" viewBox="0 0 16 16">
          <path d="M1 0L0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.356 3.356a1 1 0 0 0 1.414 0l1.586-1.586a1 1 0 0 0 0-1.414l-3.356-3.356a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0zm9.646 10.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708zM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11z"/>
        </symbol>
      </svg>
      
      <div class="d-flex flex-column sidbar_container">
        <div class="sidebar_header_box_text" style="margin-bottom:15px;">
              <img src="/icon/weddingmate_logo.png" width="260">
        </div>
        <div class="sidebar_header_box d-flex justify-content-between" style="padding: 0px 20px;">
            <div class="sidebar_header_box_text" style="margin-top:4px;">{{adminNick}}</div>
            <button class="sidebar_header_box_text" style="height:30px; border:none; color: black" @click="this.$logoutUser(); this.$router.push({path:'/'});">로그아웃</button>
        </div>
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item sidbar_box sidbar_box_inactive">
            <a @click="$router.push({path: '/admin/itemlist'})" class="nav-link sidbar_box_inactive_text">
                <svg class="bi me-2" width="16" height="16" style="fill:rgb(255,255,255);"><use xlink:href="#grid"/></svg>
              상품 리스트
            </a>
          </li>
          <li class="nav-item sidbar_box sidbar_box_inactive">            
            <a @click="$router.push({path: '/admin/analysis'})" class="nav-link sidbar_box_inactive_text">
                <svg class="bi me-2" width="16" height="16" style="fill:rgb(255,255,255);"><use xlink:href="#table"/></svg>
                판매 현황
            </a>
          </li>
          <li class="nav-item sidbar_box sidbar_box_active">            
            <a @click="$router.push({path: '/admin/qna'})" class="nav-link sidbar_box_active_text">
                <svg class="bi me-2" width="16" height="16"><use xlink:href="#tools"/></svg>
                Q & A
            </a>
          </li>
          <li class="nav-item sidbar_box sidbar_box_inactive">
            <a @click="$router.push({path: '/admin/review'})" class="nav-link sidbar_box_inactive_text">
                <svg class="bi me-2" width="16" height="16" style="fill:rgb(255,255,255);"><use xlink:href="#chat-quote-fill"/></svg>
                리뷰 관리
            </a>
          </li>
          <li class="nav-item sidbar_box sidbar_box_inactive">
            <a @click="$router.push({path: '/admin/memberlist'})" class="nav-link sidbar_box_inactive_text">
                <svg class="bi me-2" width="16" height="16" style="fill:rgb(255,255,255);"><use xlink:href="#people-circle"/></svg>
                회원 관리
            </a>
          </li>
        </ul>
      </div>
      <div class="d-flex flex-column">
        <div class="sidbar_content_container container">
            <div class="sidbar_header d-flex justify-content-center">
                <div class="sidbar_header_title">Q & A 관리</div>
            </div>

            <div class="d-flex justify-content-center">
              <div class="admin_answer_review-section">
                <div class="admin_answer_container">
                    <div class="admin_answer_row_large">
                        <label class="admin_answer_label">제목</label>
                        <div class="admin_answer_qna-status" v-if="answerId">답변 완료</div>
                        <div class="admin_answer_qna-status incomplete" v-if="!answerId">미완료</div>
                        <div class="admin_answer_qna_title">{{qna.qna_title}}</div>
                        <div class="admin_answer_qna_writer">{{qna.user_nickname}}</div>
                        <div class="admin_answer_qna_date">{{this.$dateFormat(qna.qna_date)}}</div>
                    </div>
                    
                    <div class="admin_answer_row">
                    <label class="admin_answer_label">문의 내용</label>
                    <textarea
                        class="admin_answer_textarea"
                        rows="10"
                        placeholder="문의 내용을 입력하세요..."
                        disabled
                        v-model="qna.qna_content"
                    ></textarea>
                    </div>
                    <div class="admin_answer_row_large" v-if="qna.qna_image_path">
                    <label class="admin_answer_label">이미지</label>
                    <a><div class="admin_answer_image"><img :src="this.$imageFileFormat(qna.qna_image_path)" alt="qna_image" height="300" width="300"></div></a>
                    </div>
                    <div class="admin_answer_row_large">

                    <div>
                      <label class="admin_answer_label">답변 내용 </label>
                      <div v-if="answerId" style="margin-top: 10px; margin-right: 20px;">{{this.$dateFormat(answerDate)}}</div>
                    </div>
                    <textarea
                        class="admin_answer_textarea"
                        rows="10"
                        placeholder="답변 내용을 입력하세요..."
                        v-model="answerContent"
                        :disabled="!canUpdate"
                    ></textarea>
                    </div>
                    <div class="admin_answer_row_large d-flex justify-content-center" v-if="!answerId">
                        <button type="button" class="admin_answer_cancel_button" @click="$router.push({path: '/admin/qna'})" >취소</button>
                        <button type="button " class="admin_answer_cancel_button" @click="deleteQna()" style="margin-left:10px;">상품 삭제</button>
                        <button type="button" class="admin_answer_ok_button" style="margin-left:10px;" @click="addAnswer();">등록</button>
                    </div>
                    <div class="admin_answer_row_large d-flex justify-content-center" v-if="answerId">
                      <button type="button" class="admin_answer_cancel_button" @click="$router.push({path: '/admin/qna'})" >취소</button>
                      <button type="button " class="admin_answer_cancel_button" @click="deleteQna()" style="margin-left:10px;">상품 삭제</button>
                      <button type="button" class="admin_answer_ok_button" style="margin-left:10px;" v-if="!canUpdate" @click="canUpdate = true;">수정</button>
                      <button type="button" class="admin_answer_ok_button" style="margin-left:10px;" @click="updateAnswer();" v-if="canUpdate">수정 완료</button>
                    </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  </div>
    </div>
</template>

<script>
export default{
  data(){
    return {
      answerContent: "",
      answerDate: "",
      answerAdminId: null,
      answerId: "",
      qna: {},
      accessToken: "",
      canUpdate: true,
      adminNick: "null"
    }
  },
  mounted(){
    this.getQna();
    this.getAdminInfo();
  },
  methods: {
    async getAdminInfo(){
      try{
        const result = await this.$verifiedAdmin();
        if (result.status == 200){
          this.adminNick = result.admin_nickname;
        }
        else{
          alert("관리자 로그인 상태가 아닙니다.")
        }
      }
      catch(err){
        console.error(err);
        alert("관리자 로그인 상태가 아닙니다.")
        this.$logoutUser();
        this.$router.push({name: 'mainPage'})
      }
    },
    async getQna(){
      try{
        const qnaId = this.$route.params.qnaid;
        this.accessToken = this.$getAccessToken();

        const result = await this.$api("/qna/admindetail", {access_token: this.accessToken, qna_id: qnaId}, "POST");
        if (result.status == 200 && result.qna_id){
          this.qna = result;
          if (result.answer_id){

            // 답변이 있다면, 수정 버튼을 눌러야 수정할 수 있도록 만든다.
            this.canUpdate = false;

            this.answerId = result.answer_id;
            this.answerContent = result.answer_content;
            this.answerDate = result.answer_date;
            this.answerAdminId = result.admin_id;
          }
        }
        else{
          // 에러 발생
          console.log("error!");
        }
      }
      catch(err){
        console.error(err);
        alert("QnA를 불러올 수 없습니다.")
      }
    },
    async addAnswer(){
      try{
        const requestBody = {
          access_token: this.accessToken, qna_id: this.qna.qna_id, answer_content: this.answerContent
        };

        if (!this.answerContent){
          alert("내용을 입력하세요");
          return;
        }

        const result = await this.$api("/answer/add", requestBody, "POST");
        if (result.status == 200){
            this.answerId = result.answer_id;
            this.answerContent = result.answer_content;
            this.answerDate = result.answer_date;
            this.answerAdminId = result.admin_id;        
            this.canUpdate = false;
        }
        else{
          // 에러 발생
          alert("답변을 추가할 수 없습니다. 다시 시도해주세요.")
        }
      }
      catch(err){
        console.error(err);
        alert("예기치 못한 에러로 답변을 추가할 수 없습니다.")
      }
    },
    async updateAnswer(){
      try{
        const requestBody = {access_token: this.accessToken, answer_id: this.answerId, answer_content: this.answerContent}
        const result = await this.$api("/answer/update", requestBody, "POST");

        if (!this.answerContent){
          alert("내용을 입력하세요");
          return;
        }

        if (result.status == 200){
            this.answerId = result.answer_id;
            this.answerContent = result.answer_content;
            this.answerDate = result.answer_date;
            this.answerAdminId = result.admin_id;        

            this.canUpdate = false;
            alert("답변 수정 완료하였습니다.");
        }
        else{
          // 에러 발생
          alert("답변을 수정할 수 없습니다. 다시 시도해주세요.")
        }
      }
      catch(err){
        console.error(err);
        alert("예기치 못한 에러로 답변을 수정할 수 없습니다.")
      }
    },
    async deleteQna(){
      try{
        const requestBody = {
          access_token: this.$getAccessToken(),
          qna_id: this.qna.qna_id,
          user_id: this.qna.user_id,
          prev_qna_image_path: this.qna.qna_image_path,
          upload_type: "qna"
        }
        const result = await this.$api('/qna/deleteAdminqna', requestBody, "POST");
        console.log(result);
        if (result.status == 200){
          alert("Q&A 삭제 완료하였습니다");
          this.$router.push({path:'/admin/qna'});
        }
        else{
          alert("예기치 못한 오류로 인해 리뷰를 삭제할 수 없습니다. 다시 시도해 주세요.");  
        }
      }
      catch(err){
        console.error(err);
        alert("예기치 못한 오류로 인해 리뷰를 삭제할 수 없습니다. 다시 시도해 주세요.");
      }
    }
    
  }
}
</script>

<style scoped>
.sidbar_content_body{
  min-height: 100vh;
}
.sidbar_content_container{
    min-width: 1320px;      
    margin-left: 50px;
    min-height: 100vh;
}
.sidbar_container{
    width: 260px;
    background-color: #333333;
}
.sidebar_header_box{
    width:260px;
    height: 50px;
    padding-top: 15px;
}
.sidebar_header_box_text{
    font-size: 14px;
    color: #FFFFFF;
}
.sidbar_box{
    width:260px;
    height: 50px;
}
.sidbar_box_active{
    background-color: #F6C9CA;            
    font-size: 16px;
}
.sidbar_box_active_text{
    color: #111111;
    height: 50px;
    padding-top:11px;
}
.sidbar_box_inactive{
    background-color: #333333;            
    font-size: 16px;
}
.sidbar_box_inactive_text{
    color: #F5F5F5;
    height: 50px;
    padding-top:11px;
}
.sidbar_header{
    height: 130px;
    border-bottom: 1px solid #888888;
}
.sidbar_header_title{
  font-size: 30px;
  margin-top: 73px;
  font-weight: bold;
}

.admin_answer_review_content {
  margin-top: 50px;
}

.admin_answer_review-section {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 30px;
}

.admin_answer_review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.admin_answer_write-review-btn i {
  margin-right: 8px;
}

.admin_answer_review-cards {
  display: flex;
  flex-wrap: wrap;
  /* gap: 20px; */
  justify-content: space-between;
}

.admin_answer_review-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  width: 31%;
  padding: 10px;
  margin-bottom: 30px;
}

.admin_answer_card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-bottom: 10px; */
}

.admin_answer_card-header h5 {
  margin: 0;
  font-size: 16px;
}

.admin_answer_card-header span {
  font-size: 12px;
  color: #888;
}

.admin_answer_card-icons {
  display: flex;
  gap: 10px;
}

.admin_answer_card-icons i {
  cursor: pointer;
}

.admin_answer_card-img-top {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.admin_answer_card-body {
  padding: 10px;
}

.admin_answer_card-rating {
  font-size: 14px;
  margin-bottom: 10px;
}

.admin_answer_card-text {
  font-size: 14px;
  color: #333333;
  line-height: 1.5;
}

.admin_answer_review-section_title-div {
  font-size: 14px;
}

.admin_answer_review-section_title-div {
  display: flex;
  justify-content: space-between;
}

.admin_answer_review-section_date-div {
  font-size: 12px;
}

.admin_answer_select{
  width: 160px;
  text-align: left;
}
.admin_answer_input{
  width:245px;
  margin-right: 5px;
}
.admin_answer_btn_active{
  background-color: #007BFF;
  color: #FFFFFF;
  margin-right: 10px;
}
.admin_answer_btn_inactive{
  background-color: #333333;
  color: #111111;
  margin-right: 10px;
}

.admin_answer_qna-section {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 70px;
  /* background-color: green; */
  font-size: 14px;
  text-align: center;
}
.admin_answer_qna-table {
  width: 100%;
  border-collapse: collapse;
}

.admin_answer_qna-table th,
.admin_answer_qna-table td {
  border: 1px solid #e0e0e0;
  padding: 10px;
}

.admin_answer_qna-table th {
  background-color: #f7f7f7;
}

.admin_answer_qna-status {
  display: inline-block;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  width: 90px;
}

.admin_answer_qna-status.incomplete {
  background-color: white;
  color: #007bff;
  border: 1px solid #007bff;
  width: 90px;
  padding: 5px 10px;
}

.admin_answer_qna-section_status-title-div {
  display: flex;
  gap: 20px;
  align-items: center;
}

.admin_answer_container {
    width: 1280px;
    margin: 0 auto;
    margin-top: 30px;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    font-family: Arial, sans-serif;
    }

    .admin_answer_header {
    text-align: center;
    font-size: 1.5em;
    font-weight: bold;
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
    padding-bottom: 10px;
    }

    .admin_answer_row {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    }

    .admin_answer_label {
    width: 100px;
    font-size: 1em;
    color: #333;
    }

    .admin_answer_input {
    flex: 1;
    padding: 10px;
    font-size: 1em;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-right: 10px;
    }

    .admin_answer_chip {
    display: flex;
    align-items: center;
    padding: 10px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 5px;
    flex: 1;
    }

    .admin_answer_chip-close {
    margin-left: auto;
    background: none;
    border: none;
    font-size: 1.2em;
    cursor: pointer;
    }

    .admin_answer_textarea {
    flex: 1;
    padding: 10px;
    font-size: 1em;
    border: 1px solid #ddd;
    border-radius: 5px;
    resize: none;
    width: 100%;
    }

    .admin_answer_button {
    padding: 10px 20px;
    font-size: 1em;
    border: 1px solid #ddd;
    border-radius: 5px;
    background-color: #fff;
    cursor: pointer;
    }

    .admin_answer_button.admin_answer_cancel {
    background-color: #333;
    color: #fff;
    margin-right: 10px;
    }

    .admin_answer_button.admin_answer_submit {
    background-color: #f5c6cb;
    color: #c82333;
    }

    .admin_answer_actions {
        text-align: center;
        margin-top: 20px;
    }

    .admin_answer_qna-status {
        display: inline-block;
        padding: 5px 10px;
        background-color: #007bff;
        color: white;
        border-radius: 5px;
        width: 90px;
        text-align: center;
    }

    .admin_answer_qna-status.incomplete {
        background-color: white;
        color: #007bff;
        border: 1px solid #007bff;
        width: 90px;
        padding: 5px 10px;
    }
    .admin_answer_image{
        width: 300px;
        height: 300px;
    }
    .admin_answer_qna_title{
        font-size:14px;
        margin-left: 30px;
        width: 600px;
    }
    .admin_answer_qna_writer{
        font-size:14px;
        margin-left: 10px;
        width: 270px;
    }
    .admin_answer_qna_date{
        font-size:14px;
        margin-left: 10px;
    }
    .admin_answer_row_large{
        display: flex;
        align-items: center;
        margin-bottom: 70px;
    }
.admin_answer_ok_button{
  width:150px;
  height:60px;
  border-radius: 12px;
  font-size:18px;
  color: #888888;
  border: none;
  background-color: #F6C9CA;
}

.admin_answer_cancel_button{
  width:150px;
  height:60px;
  border-radius: 12px;
  font-size:18px;
  color: #F5F5F5;
  border: none;
  background-color: #888888;
}
</style>