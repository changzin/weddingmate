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

    <!-- 본문  -->
    <div class="container0">
    <div class="container-title">
        <div class="font-title">나의 찜</div>
        <hr class="title">
    </div>
    <div class="container-allselect">
            <input type="checkbox">
            <div class="font-delete">선택 상품 삭제</div>
        </div>        
    <div class="container-middle">
      <div v-for="(bookmark, index) in bookmarkList" :key="index" class="container-content">
        <input type="checkbox">
        <img class="bookmark" :src="bookmark.item_tn_image_path">
        <div class="container-name_cost">
          <div>{{ bookmark.item_name }}</div>
          <div class="font-cost">{{ bookmark.item_price }}</div>
        </div>
        <img class="delete-x" src="icon/deleteX.png">
      </div>
    </div>
    <div class="mypage-bottom">
    <div class="nav-page">
      <div>&lt;&lt;</div>
        <div>&lt;</div>
        <div>1</div>
        <div style="color: pink;">2</div>
        <div>3</div>
        <div>&gt;</div>
        <div>&gt;&gt;</div>
    </div>
    <button class="mypage-back">
      <a href="/mypage">
        마이페이지로
      </a>
    </button>
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
            (주)웨딩메이트 주소: 서울시 서대문구 개인정보 대표: 이창진 전화:
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
      bookmarkList :[],

    };
  },
  mounted(){  
     this.getBookmarkList();
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
    async getBookmarkList() {
      const requestBody = {
        access_token: "620f1288-02f2-4a86-88f5-3a40c6726c63"
      };
      try {
        const response = await this.$api("/mypage/bookmarklist", requestBody, "post");
        console.log("북막", response);

        if (response.status === 200) {
          this.bookmarkList = response.bookmarkList; // 응답에서 북마크 리스트 할당
        }
      } catch (error) {
        console.error("Error fetching bookmark list:", error);
      }
    }
  }
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

.font-title{
    display: grid;
    place-items: center;
    color: #333333;
    font-size: 24px;
    font-weight: bold;
}

.font-delete{
  color: #888888;
}

.font-cost{
    font-weight: bold;
}

/* div */
.container0{
    min-width: var(--container-width)
}
.container-title{          
    margin-left: 350px;
    margin-right: 320px;
    margin-top: 100px;

    display: grid;
    width: 1280px; /* 고정된 너비 */    
    font-size: 24;
    /* border: 1px solid blue; */
}

.container-middle{          
    margin-left: 350px;
    margin-right: 320px;
    margin-top: 5px;
    margin-bottom: 50px;
    display: grid;
    width: 1280px; /* 고정된 너비 */    
    font-size: 24;
    /* border: 1px solid purple; */
}

.container-allselect{
    display: grid;
    grid-template-columns: 30px 100px;
    justify-items: start;
    margin-left: 350px;
    margin-right: 320px;
    width: 1280px; /* 고정된 너비 */     
    padding: 10px;
    margin-bottom: 15px;
    box-sizing: border-box;
    color:#888888;
    /* border: 1px solid red; */
}
.container-content{
    display: grid;
    grid-template-columns: 30px 140px 1030px 250px;
    justify-items: start;
    align-items: start;
    width: 1280px; /* 고정된 너비 */    
    padding: 10px;
    margin-bottom: 30px;
    box-sizing: border-box;
    /* border: 1px solid yellow; */
}
.container-name_cost{
    display: flex;
    flex-direction: column;
    /* border: 1px solid orange;            */
}                

/* hr */

hr.title{
    width: 100%;
    height: 1px; 
    background-color: #111111; 
    border: none; 
    margin-bottom: 0;
}
hr.bar{
    width: 100%;
    height: 1px; 
    background-color: #888888; 
    border: none; 
    margin:0;
    
}
hr.text{
    width: 100%;
    height: 1px; 
    background-color: #f5f5f5; 
    border: none; 
}


/* img */

img.bookmark{
    width: 120px;
    height: 120px;
    border: 1px solid #333333;
}
img.delete-x{
    weight: 20px;
    height: 20px;
    /* border: 1px solid #333333; */

}

/* bottom */

.mypage-bottom{
    display: grid;
    place-items: center;
    margin-left: 350px;
    margin-right: 320px;
    margin-top: 100px;
    width: 1280px; /* 고정된 너비 */  
    /* border: 1px solid yellow; */
}
.nav-page{
    display: grid;
    place-items: center;
    grid-template-columns: 25px 25px 25px 25px 25px 25px 25px;
    margin-bottom: 30px;
    color: #888888;
    /* border: 1px solid pink; */
}

button.mypage-back{
    background-color: #888888;
    color:white;
    font-weight: bold;
    border: none;
    width: 120px;
    height: 40px;
}
.mypage-back a {
    text-decoration: none; /* remove underline */
    color: inherit; /* inherit color from parent */
}
</style>
