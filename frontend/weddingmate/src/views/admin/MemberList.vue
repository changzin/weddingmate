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
          <li class="nav-item sidbar_box sidbar_box_inactive">            
            <a @click="$router.push({path: '/admin/qna'})" class="nav-link sidbar_box_inactive_text">
                <svg class="bi me-2" width="16" height="16" style="fill:rgb(255,255,255);"><use xlink:href="#tools"/></svg>
                Q & A
            </a>
          </li>
          <li class="nav-item sidbar_box sidbar_box_inactive">
            <a @click="$router.push({path: '/admin/review'})" class="nav-link sidbar_box_inactive_text">
                <svg class="bi me-2" width="16" height="16" style="fill:rgb(255,255,255);"><use xlink:href="#chat-quote-fill"/></svg>
                리뷰 관리
            </a>
          </li>
          <li class="nav-item sidbar_box sidbar_box_active">
            <a @click="$router.push({path: '/admin/memberlist'})" class="nav-link sidbar_box_active_text">
                <svg class="bi me-2" width="16" height="16"><use xlink:href="#people-circle"/></svg>
                회원 관리
            </a>
          </li>
        </ul>
      </div>
      <div class="d-flex flex-column">
        <div class="sidbar_content_container container">
            <div class="sidbar_header d-flex justify-content-center">
                <div class="sidbar_header_title">회원 관리</div>
            </div>
            <div class="d-flex justify-content-center">
              <div class="admin_member_review-section">
                <div class="admin_member_review-header justify-content-end">
                  <button class="btn admin_member_btn_active" @click="getBlockMemberList()">차단 회원만 보기</button>
                  <button class="btn admin_member_btn_inactive" @click="getUnblockMemberList()">모든 회원 보기</button>
                  <select class="form-select admin_member_select" v-model="mode">
                    <option selected value="all">전체</option>
                    <option value="email">이메일</option>
                    <option value="nickname">닉네임</option>
                  </select>
                  <input type="text" class="form-control admin_member_input" v-model="keyword">                  
                  <button class="btn admin_member_btn_active" @click="search()">검색</button>
                </div>

                <div class="admin_member_qna-section">
                  <table class="admin_member_qna-table admin_member_table">
                    <thead>
                      <tr>
                        <th>이름</th>
                        <th>닉네임</th>
                        <th>이메일</th>
                        <th>가입일</th>
                        <th>회원 유형</th>
                        <th>누적 구매금액</th>
                        <th>구매량 / 댓글 / 문의량</th>
                        <th>상태 변경</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(member, index) in memberList" :key="index">
                        <td>{{ member.user_name }}</td>
                        <td>{{ member.user_nickname }}</td>
                        <td>
                            {{member.user_email}}
                        </td>
                        <td>{{this.$dateFormat(member.user_create_date)}}</td>
                        <td>{{member.user_type}}</td>
                        <td>{{this.$numberFormat(member.user_total_price)}}</td>
                        <td>{{member.user_buy_count}} / {{member.user_review_count}} / {{ member.user_qna_count }} </td>
                        <td>
                            <button class="btn admin_member_block_btn_active" v-if="member.user_block === 'F'" @click="blockUser(member, member.user_id)">block</button>
                            <button class="btn admin_member_unblock_btn_active" v-if="member.user_block === 'T'" @click="unblockUser(member, member.user_id)">unblock</button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <div class="mypage-bottom mypage-bottom-fix">
                <div class="nav-page justify-content-center">
                <a :class="{notVisible : (page == 1)}" @click="prevBlock()"><div>&lt;&lt;</div></a>
                <a :class="{notVisible : (page == 1)}" @click="prevPage()"><div>&lt;</div></a>
                <a :class="{notVisible : (page-2 < 1)}" @click="goToPage(page-2)"><div>{{page-2}}</div></a>
                <a :class="{notVisible : (page-1 < 1)}" @click="goToPage(page-1)"><div>{{page-1}}</div></a>
                <a><div style="color: pink;">{{page}}</div></a>
                <a :class="{notVisible : (page+1 > maxPage)}" @click="goToPage(page+1)"><div>{{page+1}}</div></a>
                <a :class="{notVisible : (page+2 > maxPage)}" @click="goToPage(page+2)"><div>{{page+2}}</div></a>
                <a :class="{notVisible : (page >= maxPage)}" @click="nextPage()"><div>&gt;</div></a>
                <a :class="{notVisible : (page >= maxPage)}" @click="nextBlock()"><div>&gt;&gt;</div></a>
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
export default {
  data() {
    return {
      memberList: [],
      blockOption: false,
      page: 1,
      maxPage: 0,
      keyword: "",
      prevKeyword: "",
      mode: "all",
      prevMode: "all",
      block: 'F',
      adminNick: "null"
    }
  },
  mounted(){      
      this.getMemberList();
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
    // 멤버 정보 받아오기
    async getMemberList(){
      try{
        // URL에 파라미터를 추가한다.
        await this.$router.push({path: '/admin/memberlist', query:{page: this.page, block: this.block, mode: this.prevMode, keyword: this.prevKeyword} });

        // 멤버 정보를 가져오기 전에 파라미터 갈무리
        this.page = Number(this.$route.query.page);
        this.block = this.$route.query.block;
        this.prevMode = this.$route.query.mode;
        this.prevKeyword = this.$route.query.keyword
        this.page = (!this.page) ? 1 : this.page;
        this.block = (this.block == 'T') ? this.block : 'F';
        this.mode = (!this.mode) ? 'all' : this.mode;
        this.prevKeyword = (!this.prevKeyword) ? "" : this.prevKeyword;

        // memberList 정보 다시 가저오고, maxPage를 맞추어준다.
        const result = await this.$api(`http://localhost:9090/user/list?page=${this.page}&block=${this.block}&mode=${this.mode}&keyword=${this.prevKeyword}`);      
        this.memberList = result.memberList;
        this.maxPage = result.maxPage;
      }
      catch(err){
        console.error(err);
        alert("멤버 정보를 불러올 수 없습니다!");
      }
    },
    // 차단 회원 불러오기(현재 리스트에서 필터만 하면 간단함)
    async getBlockMemberList(){
      this.blockOption = true;
      this.block = 'T';
      this.page = 1;
      this.getMemberList();
    },
    // 전체 회원 불러오기(검색한 상태라면 검색 키워드는 유지하면서 전체 회원을 불러와야 하기 때문에 키워드를 넣었다.)
    async getUnblockMemberList(){
      this.blockOption = false;
      this.block = 'F';
      this.page = 1;
      this.getMemberList();
    }, 
    async search(){
      this.prevKeyword = this.keyword;
      this.prevMode = this.mode;
      this.page = 1;
      this.getMemberList();
    },
    // 이전 블록 페이지로 이동 (5번째 이전 페이지, 남은 이전 페이지가 5개 이하일 경우 마지막 페이지 이동)
    async prevBlock(){
      if (this.page <= 5){
        this.page = 1;
      }
      else{
        this.page = this.page - 5;
      }
      this.getMemberList();
    },
    // 다음 블록 페이지로 이동 (5번째 이후 페이지, 남은 다음 페이지가 5개 이하일 경우 마지막 페이지 이동)
    async nextBlock(){
      if (this.page > this.maxPage-5){
        this.page = this.maxPage;
      }
      else{
        this.page = this.page + 5;
      }
      this.getMemberList();
    },
    async nextPage(){
      this.page+=1;
      this.getMemberList();
    },
    async prevPage(){
      this.page-=1;
      this.getMemberList();
    },
    async goToPage(targetPage){
      this.page = targetPage;
      this.getMemberList();
    },
    // 유저 차단 
    async blockUser(member, user_id){
      try{
        const accessToken = this.$getAccessToken();
        const result = await this.$api(`http://localhost:9090/user/block`, {user_id: user_id, access_token: accessToken}, "POST");
        if (result.status == 200){
          member.user_block = "T";
        }
        else{
          alert("서버 에러로 작업을 완료하지 못했습니다. 다시 시도하세요.")
        }
      } 
      catch(err){
        console.error(err);
        alert("서버 에러로 작업을 완료하지 못했습니다. 다시 시도하세요.")
      }
    },
    // 유저 차단 해제
    async unblockUser(member, user_id){
      try{
        const accessToken = this.$getAccessToken();
        const result = await this.$api(`http://localhost:9090/user/unblock`, {user_id: user_id, access_token: accessToken}, "POST");
        if (result.status == 200){
          member.user_block = "F";
        }
        else{
          alert("서버 에러로 작업을 완료하지 못했습니다. 다시 시도하세요.")
        }
      }
      catch(err){
        console.error(err);
        alert("서버 에러로 작업을 완료하지 못했습니다. 다시 시도하세요.")
      }
    },
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

.admin_member_review_content {
  margin-top: 50px;
}

.admin_member_review-section {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 30px;
}

.admin_member_review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.admin_member_write-review-btn i {
  margin-right: 8px;
}

.admin_member_review-cards {
  display: flex;
  flex-wrap: wrap;
  /* gap: 20px; */
  justify-content: space-between;
}

.admin_member_review-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  width: 31%;
  padding: 10px;
  margin-bottom: 30px;
}

.admin_member_card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-bottom: 10px; */
}

.admin_member_card-header h5 {
  margin: 0;
  font-size: 16px;
}

.admin_member_card-header span {
  font-size: 12px;
  color: #888;
}

.admin_member_card-icons {
  display: flex;
  gap: 10px;
}

.admin_member_card-icons i {
  cursor: pointer;
}

.admin_member_card-img-top {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.admin_member_card-body {
  padding: 10px;
}

.admin_member_card-rating {
  font-size: 14px;
  margin-bottom: 10px;
}

.admin_member_card-text {
  font-size: 14px;
  color: #333333;
  line-height: 1.5;
}

.admin_member_review-section_title-div {
  font-size: 14px;
}

.admin_member_review-section_title-div {
  display: flex;
  justify-content: space-between;
}

.admin_member_review-section_date-div {
  font-size: 12px;
}

.admin_member_select{
  width: 160px;
  text-align: left;
}
.admin_member_input{
  width:245px;
  margin-right: 5px;
  margin-left: 10px;
}
.admin_member_btn_active{
  background-color: #007BFF;
  color: #FFFFFF;
  margin-right: 10px;
}
.admin_member_btn_inactive{
  background-color: #333333;
  color: #FFFFFF;
  margin-right: 10px;
}

.admin_member_qna-section {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 70px;
  /* background-color: green; */
  font-size: 14px;
  text-align: center;
}
.admin_member_qna-table {
  width: 100%;
  border-collapse: collapse;
}

.admin_member_qna-table th,
.admin_member_qna-table td {
  border: 1px solid #e0e0e0;
  padding: 10px;
}

.admin_member_qna-table th {
  background-color: #f7f7f7;
}

.admin_member_qna-status {
  display: inline-block;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  width: 90px;
}

.admin_member_qna-status.incomplete {
  background-color: white;
  color: #007bff;
  border: 1px solid #007bff;
  width: 90px;
  padding: 5px 10px;
}

.admin_member_qna-section_status-title-div {
  display: flex;
  gap: 20px;
  align-items: center;
}
.admin_member_table{
    font-size: 12px;
}
.admin_member_block_btn_active{
    width:65px;
    font-size: 12px;
    background-color: #007BFF;
    color: #FFFFFF
}
.admin_member_unblock_btn_active{
    width:65px;
    font-size: 12px;
    background-color: #FFFFFF;
    color: #111111;
    border: 1px solid #333333;
}
div.mypage-bottom{
            display: grid;
            place-items: center;
            margin-top: 100px;
            /* border: 1px solid yellow; */
        }
        div.nav-page{
            display: grid;
            place-items: center;
            grid-template-columns: repeat(9, 25px);
            margin-bottom: 30px;
            color: #888888;
        }
      .notVisible{
        visibility: hidden;
      }
</style>