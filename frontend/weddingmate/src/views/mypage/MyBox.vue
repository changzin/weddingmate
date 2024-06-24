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
          <div class="container-top-content">
            <div class="content-boxname">더미견적함1</div>
            <hr class="column" />
            <div class="container-top-button">
              <button class="boxname_edit">수정</button>
              <button class="boxdelete">삭제</button>
            </div>
          </div>
        </div>
        <div class="container-middle">
          <div class="container-middle-category_title">
            <div class="title-font">패키지</div>
            <div>
              <hr class="title" />
            </div>
          </div>
          <table>
            <colgroup>
              <col />
              <col />
              <col />
            </colgroup>
            <tr class="tr1">
              <td>상품/옵션 정보</td>
              <td>금액</td>
              <td>변경</td>
            </tr>
            <tr>
              <td>
                <div class="container-table_col1">
                  <input type="checkbox" />
                  <img class="bookmark" src="http://localhost:8080/icon/icon.png" />
                  <div class="content-table_col1">
                    <div class="content-table_col1-name">
                      제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목
                    </div>
                    <div class="content-table_col1-option">
                      <div>
                        옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션
                      </div>
                    </div>
                    <div class="content-table_col1-option">
                      <div>
                        옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션
                      </div>
                    </div>
                    <div class="content-table_col1-option">
                      <div>
                        옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td>999,999,999,999,999</td>
              <td><button class="boxdelete">삭제</button></td>
            </tr>
            <tr>
              <td>
                <div class="container-table_col1">
                  <input type="checkbox" />
                  <img class="bookmark" src="http://localhost:8080/icon/icon.png" />
                  <div class="content-table_col1">
                    <div class="content-table_col1-name">
                      제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목
                    </div>
                    <div class="content-table_col1-option">
                      <div>
                        옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션
                      </div>
                    </div>
                    <div class="content-table_col1-option">
                      <div>
                        옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td>999,999,999</td>
              <td><button class="boxdelete">삭제</button></td>
            </tr>
          </table>
          <div class="container-middle-category_title">
            <div class="title-font">예물</div>
            <div>
              <hr class="title" />
            </div>
          </div>
          <table>
            <colgroup>
              <col />
              <col />
              <col />
            </colgroup>
            <tr class="tr1">
              <td>상품/옵션 정보</td>
              <td>금액</td>
              <td>변경</td>
            </tr>
            <tr>
              <td>
                <div class="container-table_col1">
                  <input type="checkbox" />
                  <img class="bookmark" src="http://localhost:8080/icon/icon.png" />
                  <div class="content-table_col1">
                    <div class="content-table_col1-name">
                      제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목
                    </div>
                    <div class="content-table_col1-option">
                      <div>
                        옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td>999,999,999,999,999</td>
              <td><button class="boxdelete">삭제</button></td>
            </tr>
            <tr>
              <td>
                <div class="container-table_col1">
                  <input type="checkbox" />
                  <img class="bookmark" src="http://localhost:8080/icon/icon.png" />
                  <div class="content-table_col1">
                    <div class="content-table_col1-name">
                      제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목
                    </div>
                    <div class="content-table_col1-option">
                      <div>
                        옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션
                      </div>
                    </div>
                    <div class="content-table_col1-option">
                      <div>
                        옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션
                      </div>
                    </div>
                    <div class="content-table_col1-option">
                      <div>
                        옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션
                      </div>
                    </div>
                    <div class="content-table_col1-option">
                      <div>
                        옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션
                      </div>
                    </div>
                    <div class="content-table_col1-option">
                      <div>
                        옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션옵션
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td>999,999,999</td>
              <td><button class="boxdelete">삭제</button></td>
            </tr>
          </table>
        </div>
        <div class="container_boxbutton2">
          <button class="boxallselect">전체 선택</button>
          <button class="boxdeleteall">선택 상품 삭제</button>
        </div>
        <div class="container-pay">
          <div class="paycontent">
            <div class="sellitle">판매가격</div>
            <div class="sellcost"><span>999,999,999,999</span>원</div>
          </div>
          <div><img class="icon" src="http://localhost:8080/icon/icon.png" /></div>
          <div class="paycontent">
            <div class="sellitle">배송비</div>
            <div class="sellcost"><span>100,000,0</span>원</div>
          </div>
          <div><img class="icon" src="http://localhost:8080/icon/icon.png" /></div>
          <div class="paycontent">
            <div class="sellitle">합계</div>
            <div class="sellcost"><span>999,999,999,999</span>원</div>
          </div>
        </div>
        <div class="container_boxbutton3">
          <button class="order">주문 하기</button>
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
          <button class="mypage-back">마이페이지로</button>
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
      };
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
div, table{
  font-family: 'Noto Sans KR', sans-serif;
    /* transform : rotate(0.03deg); */
}


/* font */
    
div.title-font{
display: grid;
text-align: left;
color: #333333;
font-size: 24px;
font-weight: bold;
}

/* div */

.container0{
min-width: var(--container-width);
}

.container-top{
margin-left: var(--container-margin-left);
margin-right: var(--container-margin-right);
margin-top: 100px;
margin-bottom: 50px;
height: 200px;
width: var(--container-width);
display: grid;
align-items: center;   
background-color: #f5f5f5;
border-radius: 10px; 
/* border: 1px solid pink;  */
}
.container-top-content{
display: grid;
grid-template-columns: 720px 190px 200px;
align-items: center;       
margin-top: 20px; 
margin-left: 70px;
box-sizing: border-box;
color:#888888;
/* border: 1px solid blue; */
}
.container-top-button{
display: grid;
grid-template-columns:auto auto;
justify-items: center;
grid-column-gap: 10px;
}
.content-boxname{
display: grid;
justify-items: center;
font-size: 24px;
font-weight: bold;
color:#555555;
/* border: 1px solid red; */
}

.container-middle{
margin-left: var(--container-margin-left);
margin-right: var(--container-margin-right);
margin-top: 50px;
width: var(--container-width); 
/* border: 1px solid red; */
}
.container-middle-category_title{          
width: var(--container-width);
margin-top: 50px;
font-size: 24;
/* border: 1px solid green; */
}

.container-table_col1{
display: grid;
grid-template-columns: 30px 140px auto;
justify-items: start;
align-items: start;
width: 748px; /* 고정된 너비 */    
padding: 10px;
box-sizing: border-box;
/* border: 1px solid yellow; */
}
.content-table_col1{
display: flex;
flex-direction: column;
text-align: left;
/* border: 1px solid red;             */
}
.content-table_col1-name{
display: flex;
flex-direction: column;
text-align: left;
/* border: 1px solid green;             */
}
.content-table_col1-option{
display: flex;
flex-direction: column;
text-align: left;
width: 400px;
font-size: 12px;
color: #888888;
word-wrap: break-word; /* 글자가 너무 길 경우 줄 바꿈 */
word-break: break-all; /* 글자가 너무 길 경우 단어 단위로 줄 바꿈 */ 
/* border: 1px solid blue;   */         
}

.container-pay{
margin-left: var(--container-margin-left);
margin-right: var(--container-margin-right);
width: var(--container-width);
height: 200px;
display: grid;
grid-template-columns: 500px 100px 200px 100px 250px;
justify-items: end;  
align-items: center;
padding: 30px;
box-sizing: border-box;
border: 1px solid #c2c2c2;
}

.container_boxbutton2{
margin-left: var(--container-margin-left);
margin-right: var(--container-margin-right);
margin-top: 20px;
margin-bottom: 20px;
width: var(--container-width);
display: grid;
grid-template-columns: 105px 100px;
/* border: 1px solid red; */
}
.container_boxbutton3{
display: grid;
justify-items: end;
margin-left: var(--container-margin-left);
margin-right: var(--container-margin-right);
margin-top: 20px;
margin-bottom: 20px;
width: var(--container-width);
/* border: 1px solid red;; */
}

/* hr */ 
hr.title{
width: 100%;
height: 1px; /* Set the height to 1px */
background-color: #888888; /* Set a lighter color */
border: none; /* Remove border */
}

hr.column{
border: 1px solid #d3d3d3;
width: 0.1px;
height: 100px;
}

/* button */

button.boxdelete{
background-color: var(--color-buttongray);
color:white;
border: none;
border-radius: 12px;
width: 100px;
height: 30px;
font-weight: bold;
}
button.boxdeleteall{
background-color: var(--color-buttongray);
color:white;
border: none;
border-radius: 12px;
width: 120px;
height: 30px;
font-weight: bold;
}
button.boxname_edit{
background-color: var(--color-pink);
color:white;
border: none;
border-radius: 12px;
width: 100px;
height: 30px;
font-weight: bold;
}
button.boxallselect{
background-color: var(--color-pink);
color:white;
border: none;
border-radius: 12px;
width: 100px;
height: 30px;
font-weight: bold;
}
button.order{
background-color: var(--color-pink);
color:white;
border: none;
border-radius: 12px;
width: 120px;
height: 50px;
font-size:20px;
font-weight: bold;
}

/* img */ 
img.bookmark{
width: 120px;
height: 120px;
border: 1px solid #333333;
}

img.icon{
height: 30px;
width: 30px;
border: 1px solid #333333;
}

/* table */
table {
width: 1280px;
margin: auto;
border-collapse: collapse; /* 셀 간격을 없애기 위해 collapse 사용 */
table-layout: fixed; /* 고정 레이아웃 */
}

th, td {
padding: 10px; /* 각 셀의 내부 여백 */
border: 1px solid #c2c2c2; /* 각 셀의 경계선 */
}
tr.tr1{
font-weight: bold;
}

/* 각 열의 비율 설정 */
colgroup col:nth-child(1) {
width: 60%; /* 첫 번째 열의 너비 50% */
}
colgroup col:nth-child(2) {
width: 20%; /* 두 번째 열의 너비 30% */
}
colgroup col:nth-child(3) {
width: 20%; /* 세 번째 열의 너비 25% */
}

/* 첫 번째 행 중앙 정렬 */
tr, td {
text-align: center;
}

div.paycontent{
text-align: right;
}
div.sellitle{
font-size: 20px;
}
div.sellcost{
font-size: 20px;
}
.sellcost > span {
font-weight: bold;
}

/* bottom */
div.mypage-bottom{
display: grid;
place-items: center;
margin-left: 350px;
margin-right: 320px;
margin-top: 100px;
width: 1280px; /* 고정된 너비 */  
/* border: 1px solid yellow; */
}
div.nav-page{
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
  </style>
  