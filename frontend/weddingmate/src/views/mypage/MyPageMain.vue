<template>
  <div class="fix-width">
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
        <div class="container-top">
          <!-- <hr class="title"> -->
      </div>
    <div class="container-middle">
        <div class="container-middle-profile">
            <div class="content-profile">
                <div class="font-nickname"><span>{{ user }}</span>님</div>
                <button class="profile">정보수정</button>
            </div>
        </div>
        <div class="container-middle-mymenu">
            <div class="content-mymenu_list">
                <div class="content-mymenu">
                    <a href="/mypage/bookmark">
                      <img class="icon" src="http://localhost:8080/icon/icon.png">
                      <div class="font-menu">찜</div>
                    </a>
                </div>
                <div class="content-mymenu">
                    <a href="/mypage/boxlist">
                      <img class="icon" src="http://localhost:8080/icon/icon.png">
                      <div class="font-menu">견적함</div>
                    </a>
                </div>
                <div class="content-mymenu">
                  <a href="/mypage/schedule">
                    <img class="icon" src="http://localhost:8080/icon/icon.png">
                    <div class="font-menu">스케쥴</div>
                  </a>
                </div>
                <div class="content-mymenu">
                  <a href="/mypage/review">
                    <img class="icon" src="http://localhost:8080/icon/icon.png">
                    <div class="font-menu">나의리뷰</div>
                  </a>
                </div>
                <div class="content-mymenu">
                  <a href="/mypage/qna">
                    <img class="icon" src="http://localhost:8080/icon/icon.png">
                    <div class="font-menu">나의QnA</div>
                  </a>
                </div>
                <div class="content-mymenu">
                  <a href="/mypage/payment">
                    <img class="icon" src="http://localhost:8080/icon/icon.png">
                    <div class="font-menu">결제내역</div>
                  </a>
                </div>   
            </div>
        </div>
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
      selectedItemType: "",
      user: ""

    };
  },
    mounted(){
     this.getUserName();
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

    async getUserName(){
      const user = await this.$verifiedUser();
      console.log("user",user);
      this.user =  user.user_nickname;
      // console.log("this", this.user);
      // console.log("just user", user);
    }

    //페이지   
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

/* 본문 */
@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css); 
  div{
    font-family: 'Noto Sans KR', sans-serif;
      font-size: 16px;
      color:#555555;
}
/* font */
.font-nickname{
    font-size: 24px;
}
.font-nickname > span{
    font-weight: bold;
}
.font-menu{
  color:#888888
}

/* div */
.container0{
    min-width: var(--container-width);
}

.container-top{          
    margin-left: var(--container-margin-left);
    margin-right: var(--container-margin-right);
    margin-top: 100px;
    display: grid;
    width: var(--container-width);
    font-size: 24;
    /* border: 1px solid BLUE; */
}

.container-middle{          
    margin-left: 350px;
    margin-right: 320px;
    margin-bottom: 20px;
    margin-top:10px;
    width: var(--container-width);
    display: grid;
    grid-template-columns: 500px auto ;
    padding: 20px;
    box-sizing: border-box;
    /* border: 1px solid red; */
}
.container-middle-profile{         
    height: 500px;
    box-sizing: border-box;
    /* border: 1px solid salmon; */

}
.content-profile {
    height: 500px;
    display: flex; 
    flex-direction: column;
    justify-content: center; 
    align-items: center; 
    box-sizing: border-box;
    /* border: 1px solid green; */

}
.container-middle-mymenu{    
    display: grid;
    align-items: center;
    padding: 20px;     
    box-sizing: border-box;
    background-color: #f5f5f5;
    /* border: 1px solid pink; */

}
.content-mymenu_list{          
    display: grid;  
    place-items: center;
    align-items: center;
    grid-row-gap: 100px;
    grid-template-columns: auto auto auto;
    /* border: 1px solid blue; */
}
.content-mymenu{
    display: flex;
    flex-direction: column;
    place-items: center;
    font-weight: bold;
    /* border: 1px solid red; */
}
.content-mymenu a {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none; /* remove underline */
    color: inherit; /* inherit color from parent */
}

/* hr */

hr.title{
    width: 100%;
    height: 1px;
    background-color: #888888; 
    border: none; 
}

/* button */

button.profile{
    border-radius: 20px;
    background-color: var(--color-pink);
    color: white;
    border: none;
}

/* img */

img.icon{
    width: 120px;
    height: 120px;
}
</style>