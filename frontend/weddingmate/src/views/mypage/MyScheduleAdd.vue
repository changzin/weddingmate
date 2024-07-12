<template>
    <div>
      <!-- 헤더 -->
      <div class="common-header">
        <!-- 로그인 + 회원가입 + 로고 -->
        <header class="bg-light productdetail_padding_0">
          <!-- 로그인 회원가입 -->
          <div
            class="container d-flex justify-content-end align-items-center"
            id="common__login-div-padding"
          >
            <nav class="navbar-light">
              <div class="" id="navbarNav">
                <ul class="navbar-nav flex-row">
                  <li class="nav-item" id="common__header-login-padding">
                    <a href="#">로그인</a>
                  </li>
                  <li class="nav-item">
                    <a href="#">회원가입</a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <!-- 로고 -->
          <div class="text-center">
            <a class="navbar-brand" href="#">
              <img src="https://via.placeholder.com/200x50" alt="Logo" />
            </a>
          </div>
        </header>
        <!-- 카테고리 + 이미지 -->
        <nav
          class="common-header_navbar navbar-light bg-light"
          id="common_main-banner_div"
          @mouseleave="hideCategories"
        >
          <div class="common-header_overlay">
            <div class="common-header_overlay-content">
              <!-- 대카테고리 -->
              <ul class="common-header_nav" @mouseover="showCategories">
                <li class="common-header_main-title">웨딩홀</li>
                <li class="common-header_main-title">스드메</li>
                <li class="common-header_main-title">혼수</li>
                <li class="common-header_main-title">본식</li>
                <li class="common-header_main-title">촬영팀</li>
              </ul>
              <!-- 이미지랑 소카테고리 -->
              <div class="common-header_image-smallcategory">
                <!-- 이미지 -->
                <section class="productdetail_main-image-section">
                  <img
                    src="https://via.placeholder.com/1980x500"
                    class="img-fluid w-100"
                    alt="Main Image"
                  />
                </section>
  
                <!-- 소카테고리 -->
                <div class="common-header_categories" v-if="isVisible">
                  <div class="common-header_smallcategory-area">
                    <div class="common-header_category">
                      <ul>
                        <li>추천 리스트</li>
                        <li>웨딩홀 목록</li>
                      </ul>
                    </div>
                    <div class="common-header_category">
                      <ul>
                        <li>독립 패키지</li>
                        <li>스튜디오</li>
                        <li>드레스</li>
                        <li>메이크업</li>
                      </ul>
                    </div>
                    <div class="common-header_category">
                      <ul>
                        <li>예복</li>
                        <li>예물</li>
                        <li>가전</li>
                        <li>혼수 패키지</li>
                      </ul>
                    </div>
                    <div class="common-header_category">
                      <ul>
                        <li>본식스냅</li>
                        <li>영상</li>
                        <li>부케</li>
                        <li>연주</li>
                        <li>사회자</li>
                        <li>웨딩슈즈</li>
                        <li>답례품</li>
                        <li>청첩장</li>
                      </ul>
                    </div>
                    <div class="common-header_category">
                      <ul>
                        <li>스냅</li>
                        <li>본식</li>
                        <li>제주도 야외</li>
                        <li>고급 스튜디오 촬영</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
  
      <!-- 본문 -->
      <div class="container0">
        <div class="container-title">
            <div class="title-font">스케줄 추가</div>
            <hr class="title">
        </div>
        <div class="container-middle">
            <form action="" >
                <div class="container-schedule-title">
                    <div>일정 제목</div>
                        <input class="name_input" >
                    </div>
                <div class="container-schedule-date">
                    <div>일정 일시</div>
                    <input class="date_input" placeholder="날짜 선택">
                    <div>일</div>
                    <input class="time_input" placeholder="-- : --">
                    <div>분</div>
                </div>
                <div class="container-button">
                    <button class="schedule-save">일정 저장</button>
                    <button class="schedule-back">취소</button>          
                </div>
            </form>
        </div>
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
    name: "SearchComponent",
    data() {
      return {
        // 헤더
        isVisible: false,
        ismaintain: false,
        // 본문
        selectedItemType: ""
  
      };
    },
      mounted(){
      this.getMemberList();
    },
  
  
    methods: {
      // 헤더
      showCategories() {
        this.isVisible = true;
      },
      hideCategories() {
        this.isVisible = false;
      },
      // 본문
  
  
      //페이지
      async getMemberList(){
        let page = this.$route.params.page;
        let block = this.$route.params.page;
        page = (!page) ? 1 : page;
        block = (!block) ? 'F' : block;
        this.memberList = await this.$api(`/user/list?page=${page}&block=${block}`);
      //   this.memberList = await this.$api(`http://localhost:9090/user/list?page=${page}&block=${block}`);
        this.makePageSetting();      
      },
      async getBlockMemberList(){
          this.memberList = await this.$api(`/user/list?page=1&block=T`);
      //   this.memberList = await this.$api(`http://localhost:9090/user/list?page=1&block=T`);
        this.blockOption = !this.blockOption;
        this.makePageSetting();
      },
      async getUnblockMemberList(){
        this.memberList = await this.$api(`/user/list?page=1&block=F`);
      //   this.memberList = await this.$api(`http://localhost:9090/user/list?page=1&block=F`);
        this.blockOption = !this.blockOption;
        this.makePageSetting();
      }, 
      makePageSetting(){
        this.maxPage = Math.floor(this.memberList.length / 10) + 1;
        this.isFirstPage = (this.page == 1) ? true : false;
        this.isLastPage = (this.page == this.maxPage) ? true : false;
        console.log(this.maxPage);
      },
      // 이전 블록 페이지로 이동 (5번째 이전 페이지, 남은 이전 페이지가 5개 이하일 경우 마지막 페이지 이동)
      async prevBlock(){
        let targetPage = this.page;
        if (this.page <= 5){
          targetPage = 1;
        }
        else{
          targetPage = this.page - 5;
        }
        const block = (!this.blockOption) ? 'F' : 'T';
        this.memberList = await this.$api(`/user/list?page=${targetPage}&block=${block}`);
      //   this.memberList = await this.$api(`http://localhost:9090/user/list?page=${targetPage}&block=${block}`);
        this.page = targetPage;
      },
      // 다음 블록 페이지로 이동 (5번째 이후 페이지, 남은 다음 페이지가 5개 이하일 경우 마지막 페이지 이동)
      async nextBlock(){
        let targetPage = this.page;
        if (this.page > this.maxPage-5){
          targetPage = this.maxPage;
        }
        else{
          targetPage = this.page + 5;
        }
        const block = (!this.blockOption) ? 'F' : 'T';
        this.memberList = await this.$api(`/user/list?page=${targetPage}&block=${block}`);
        this.page = targetPage;
      },
      async nextPage(){
        const block = (!this.blockOption) ? 'F' : 'T';
        this.memberList = await this.$api(`/user/list?page=${this.page+1}&block=${block}`);
      //   this.memberList = await this.$api(`http://localhost:9090/user/list?page=${this.page+1}&block=${block}`);
        this.page +=1;
      },
      async prevPage(){
        const block = (!this.blockOption) ? 'F' : 'T';
        this.memberList = await this.$api(`/user/list?page=${this.page-1}&block=${block}`);
          // this.memberList = await this.$api(`http://localhost:9090/user/list?page=${this.page-1}&block=${block}`);
        this.page -=1;
      },
      async goToPage(targetPage){
        const block = (!this.blockOption) ? 'F' : 'T';
        this.memberList = await this.$api(`/user/list?page=${targetPage}&block=${block}`);
      //   this.memberList = await this.$api(`http://localhost:9090/user/list?page=${targetPage}&block=${block}`);
  
        this.page = targetPage;
      }
    },
  };
  </script>
  
  
  <style scoped>
  
  
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
  
  .temp {
    margin: 30px;
  }
  
  /* 본문 */
@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css); 
div{
  font-family: 'Noto Sans KR', sans-serif;
    font-size: 16px;
    color:#555555;
}

/* div */
.container0{
    min-width: var(--container-width)
}

.container-title{          
    margin-left: var(--container-margin-left);
    margin-right: var(--container-margin-right);
    margin-top: 100px;
    width: 1280px;    
    /* border: 1px solid green; */
}

.container-middle{          
    margin-left: var(--container-margin-left);
    margin-right: var(--container-margin-right);
    margin-bottom: 20px;
    width: 1280px;   
    display: grid;
    align-items: center;  
    /* border: 1px solid red; */
}

.container-schedule-title{
    display: grid;
    grid-template-columns: 100px auto;
    align-items: center;
    width: 600px;    
    margin-top: 30px; 
    /* border: 1px solid pink; */
}

.container-schedule-date{
    display: grid;
    grid-template-columns: 100px auto auto auto auto ;
    align-items: center;
    width: 600px;    
    margin-top: 30px; 
    /* border: 1px solid yellow; */
}

.container-button{
    display: grid;
    justify-content: center; 
    grid-template-columns: auto auto;
    place-items: center;
    grid-gap: 10px;
    width: 600px; 
    margin-left:25px;  
    margin-top: 60px;          
    /* border: 1px solid red; */
}

hr.title{
    width: 100%;
    height: 1px;
    background-color: #555555;
    border: none;
}

.name_input{
    border-radius: 12px;
    border: none;
    width: 460px;
    height: 60px;
    background-color: #F5F5F5;
}

.date_input{
    border-radius: 12px;
    border: none;
    width: 200px;
    height: 60px;
    background-color: #F5F5F5;
}

.time_input{
    border-radius: 12px;
    border: none;
    width: 200px;
    height: 60px;
    background-color: #F5F5F5;

}

button.schedule-save{
    background-color: var(--color-pink);
    color:white;
    border: none;
    border-radius: 12px;
    width: 180px;
    height: 60px;
    font-size: 18px;
    font-weight: bold;           
}

button.schedule-back{
    background-color: var(--color-buttongray);
    color:white;
    border: none;
    border-radius: 12px;
    width: 180px;
    height: 60px;
    font-size: 18px;
    font-weight: bold;
}

input::placeholder {
    padding: 10px; 
}  

div.title-font{
    display: grid;
    place-items: center;
    color: #333333;
    font-size: 24px;
    font-weight: bold;
}

form {
    display: grid;
    place-items: center;
    width: 100%;
}
  
  /* 헤더 */
  /* 로그인 + 회원가입 + 로고 */
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
  
  .common-header_overlay-content {
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
  
  /* 푸터 */
  .common__footer {
    background-color: #333333;
    color: #999999;
    padding: 20px 0;
    margin-top: 50px;
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