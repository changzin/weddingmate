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
      <div class="container order_info_container">
        <div class="row justify-content-center">
            <div class="order_info_title">
                주문 / 결제
            </div>
            <hr class="order_info_hr">
            <div class="row justify-content-center">
              
              <!-- 구매자정보 -->
                <table class="order_info_table">
                    <div class="order_info_sub_title">
                        구매자정보
                    </div>
                    <thead></thead>
                    <tbody>
                        <tr v-for="(member,index) in memberList" :key="index">
                            <td class="order_info_first_row order_info_td_child">이름</td>
                            <td class="order_info_second_row">{{ member.user_name }}</td>                  
                        </tr>
                        <tr v-for="(member,index) in memberList" :key="index">
                            <td class="order_info_first_row order_info_td_child">이메일</td>
                            <td class="order_info_second_row">{{ member.user_email }}</td>                           
                        </tr>
                        <tr>
                            <td class="order_info_first_row order_info_td_child">휴대폰 번호</td>
                            <td><input class="order_info_phone_number" type="text" v-model="phonenumber"></td>
                        </tr>
                    </tbody>
                </table>
                
                <!-- 주문상품 -->
                <table class="order_info_table2">
                    <div class="order_info_sub_title" >
                        주문 상품 (1건)
                    </div>
                    <thead></thead>
                    <tbody v-for="(box,index) in boxlist" :key="index" >
                        <tr class="order_info_td_line">
                            <td class="order_info_td col-9">{{ box.boxitem }}</td>
                            <td class="col-3">수량 {{ box.boxquantity }}개</td>
                        </tr>
                    </tbody>
                </table>
                <!-- 배송 상품 -->
                <table class="order_info_table2">
                    <div class="order_info_sub_title">
                        배송 상품 (N건)
                    </div>
                    <thead></thead>
                    <tbody v-for="(box,index) in boxlist" :key="index">
                        <tr class="order_info_td_line">
                            <td class="order_info_td col-9 ">{{ box.boxitem }}</td>
                            <td class="col-3">수량 {{box.boxquantity }}개 / {{ box.orderdeliveryprice }}</td>
                        </tr>
                    </tbody>
                </table>
                <!-- 결제정보테이블 -->
                <table class="order_info_table">
                    <div class="order_info_sub_title">
                        결제정보
                    </div>
                    <thead></thead>
                    <tbody v-for="(orderinfo,index) in order_info_list" :key="index">
                        <tr>
                            <td class="order_info_first_row order_info_td_child">총 상품가격</td>
                            <td class="order_info_second_row">{{ orderinfo.order_total_price }}원</td>                  
                        </tr>
                        <tr>
                            <td class="order_info_first_row order_info_td_child">할인 가격</td>
                            <td class="order_info_second_row">{{ orderinfo.order_sale_price }}원</td>                           
                        </tr>
                        <tr>
                            <td class="order_info_first_row order_info_td_child">배송비</td>
                            <td class="order_info_second_row">{{ orderinfo.order_delivery_price }}원</td>
                        </tr>
                        <tr>
                            <td class="order_info_first_row order_info_td_child">총 결제가격</td>
                            <td class="order_info_second_row">{{ orderinfo.order_price }}원</td>
                        </tr>
                    </tbody>
                </table>
            </div>
    
            <!-- 결제 수단 선택 -->
            <div class="order_info_sub_title">
                결제 수단
            </div>
            <button type="button" class="order_info_sub_box1 d-flex justify-content-start" @click="toggleKakaoActive()">
              <div class="order_info_defult_icon1" v-if="!isKakaoActive"></div>  
              <div class="order_info_active_icon1" v-else-if="isKakaoActive">
                </div>
                <div class="order_info_icon1"></div>
                <div class="order_info_text1">카카오페이</div>
            </button>
            
            <!-- 트라이 1 버튼 위치가 이상해졌다 비활성화는 됬는데 이게 비활성화기능이 된게 아니라 그냥 액티브버튼이 생겼다 사라졌다로 됨  -->
            <!-- <button type="button" class="order_info_sub_box1 d-flex justify-content-start" @click="togglekakaoactive">
                <div class="order_info_defult_icon1" v-if="iskakaoactive" >
                </div> 
                <div class="order_info_active_icon1" v-if="iskakaoactive"></div>
                <div class="order_info_icon1"></div>
                
                <div class="order_info_text1">카카오페이</div>
            </button> -->
            <!-- <button class="btn admin_review_btn_active" v-if="!reportedOption" @click="getReportedReviewList()">신고된 리뷰만 보기</button>
                  <button class="btn admin_review_btn_inactive" v-if="reportedOption" @click="getUnReportedReviewList()">전체 리뷰 보기</button> -->
  

            <!-- 현금 영수증 -->
            <div class="order_info_sub_title">
                현금영수증 신청
            </div>
            <button type="button" @click="kakaopriceactive" class="order_info_sub_box2 d-flex justify-content-start">
                <div class="order_info_defult_icon2 order_info_active_icon2"></div>
                <div class="order_info_icon2"></div>
                <div class="order_info_text2">
                    현금영수증 신청
                    <p class="order_info_table_sub_text">﹒할인 시 할인 금액을 제외한 결제 가격에 한하여 현금영수증이 발행됩니다.</p>
                </div>
            </button>
    
            <div class="order_info_sub_text">
                위 주문 내용을 확인 하였으며, 회원 본인은 개인정보 이용 및 제공 및 결제에 동의합니다.
            </div>
        </div>

        <!-- 견적함상세페이지 전송 -->
        <div class="row justify-content-center">
            <button class="order_info_button1">
                취소
            </button>
            
            <!-- 결제 실행 -->
            <button class="order_info_button2" @click="requestPay">
                결제하기
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
        // 구매자정보
        memberList:[{
          "user_name" : "user1",
          "user_email" : "1234@1234.com"
        }],
        phonenumber:'01012341234',
        //주문 상품
        boxlist:[
          {
            "boxitem":"울트라드레스","boxquantity":"1","orderdeliveryprice":"무료배송"
          },
          {
            "boxitem":"울트라드레스스","boxquantity":"2","orderdeliveryprice":"3000"
          }
        ],
        order_info_list:[
          {
            "order_total_price":"27000","order_sale_price":"0","order_delivery_price":"0","order_price":"27000"
          }
        ],
        // 카카오결제여부
        isKakaoActive:false,
        
        //결제 시도 
        requestPay:[],
      };
    },
    mounted(){
      // this.getMemberList();
      this.getboxlist();
      this.toggleKakaoActive();
      this.requestPay();
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
        //멤버 가져오는건 일단 고정 값으로 집어놓기 
        // async getMemberList(){
        //   let page = this.$route.params.page;
        //   let block = this.$route.params.page;
        //   page = (!page) ? 1 : page;
        //   const result = await this.$api(`http://localhost:9090/user/list?page=`)
        // }

        //카카오페이 버튼
      toggleKakaoActive(){
        this.isKakaoActive = !this.isKakaoActive;
        console.log(this.isKakaoActive);
      },

      //결제요청
      async getPay(){
        if(!this.isKakaoActive()){
          // 로컬페이요청
          return
        }
        this.requestPay = await  this.$api()

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
  .order_info_container{
            /* max-width: 1920px; */
            min-width: 1280px;
        }
        .order_info_title{
            margin-top: 134px;
            text-align: center;
            font-size: 30px;
        }
        .order_info_hr{
            height: 2px;
            background-color: #000000;
            border: none;
            width: 1020px;
        }
        .order_info_sub_title{
            margin-top: 26px;
            padding-bottom: 8px;
            text-align: left;
            font-size: 20px;
            max-width: 1020px;
        }
        .order_info_phone_number{
            border: none;
            width: 112px;
            height: 41px;
            border-radius: 12px;
            background-color: #F5F5F5;
            font-size: 14px;
            text-align: center;
            padding: 11px;
            margin: 16px;
        }
        .order_info_table{
            vertical-align: middle; 
            max-width: 1020px;
            border-collapse: collapse; /* 셀 경계선이 겹치도록 설정 */
            border-bottom: 1px solid #555555;
            border-top: 1px solid #555555;
            height: 148px;
            
        }
        .order_info_table2{
            max-width: 1020px;
            height: 90px;
            border-collapse: collapse; /* 셀 경계선이 겹치도록 설정 */
            border: 1px solid #555555;
            border-left: none;
            border-right:none;
        }
        .order_info_first_row{
            width:142px;
            padding-right: 16px;
            padding-top: 8px;
            padding-bottom: 8px;
            text-align: right;
        }
        .order_info_second_row{
            padding-left: 16px;
            padding-top: 8px;
            padding-bottom: 8px;
            border-bottom: 1px solid #888888;
        }
        .order_info_td_child{
            background-color: #D9D9D9; /* 백그라운드 색상 설정 */
            color: #000000; /* 텍스트 색상 설정 */
            border-bottom: 1px solid #888888;
        }
        .order_info_td_line{
            border-top: 1px solid #555555;
            /* padding-left: 16px; */
        }
        .order_info_td{
            padding-left: 64px;
        }
        .order_info_sub_box1{
            background:none;
            flex: none;
            border:none;
            outline: none;
            max-height: 79px;
            max-width: 1020px;
            width: 1020px;
            border-radius: 12px;
            border: 1px solid #555555;

        }
        .order_info_sub_box2{
            background:none;
            flex: none;
            border:none;
            outline: none;
            max-height: 93px;
            width: 1020px;
            border-radius: 12px;
            border: 1px solid #555555;
        }
        .order_info_text1{
            margin-top: 27px;
            margin-left: 16px;
            margin-bottom: 27px;
            font-size: 18px;
        }
        .order_info_text2{
            text-align: start;
            margin-left: 16px;
            margin-top: 20px;
            margin-bottom: 48px; 
            font-size: 18px;
        }
        .order_info_table_sub_text{
            padding-left: 56px; /* 상단과 하단에 10px, 좌우에 5px의 여백을 추가 */
            padding-top: 5px;
            font-size: 14px;
        }
        .order_info_sub_text{
            margin-top: 62px;
            font-size: 14px;
            text-align: center;
        }
        .order_info_button1{
            border: none;
            margin-top: 26px;
            width: 300px;
            height: 60px;
            border-radius: 12px;
            background-color: #333333;
            color: #FFFFFF;
            font-size: 24px;
            text-align: center;
            padding-top: 16px;
        }
        .order_info_button2{
            border: none;
            padding-top: 14px;
            margin-top: 26px;
            margin-left: 10px;
            width: 300px;
            height: 60px;
            border-radius: 12px;
            background-color: #F7CAC9;
            color: #333333;
            font-size: 24px;
            text-align: center;
        }
        .order_info_defult_icon1 {
            margin-right:16px;
            margin-top: 30px;
            border: none;
            background-color: #888887; /* 배경색 설정 */
            border-radius: 50%; /* 원형 모양 */
            width: 20px; /* 너비 20px */
            height: 20px; /* 높이 20px */
        }.order_info_defult_icon2 {
            margin-right:16px;
            margin-top: 23px;
            border: none;
            background-color: #888887; /* 배경색 설정 */
            border-radius: 50%; /* 원형 모양 */
            width: 20px; /* 너비 20px */
            height: 20px; /* 높이 20px */
        }
        .order_info_active_icon1 {
            margin-right: 16px;
            margin-top: 30px;
            border: none;
            background-color: #007BFF; /* 배경색 설정 */
            border-radius: 50%; /* 원형 모양 */
            width: 20px; /* 너비 20px */
            height: 20px; /* 높이 20px */
            /* position: absolute; */
        }
        .order_info_active_icon2 {
            margin-right:16px;
            margin-top: 23px;
            border: none;
            background-color: #007BFF; /* 배경색 설정 */
            border-radius: 50%; /* 원형 모양 */
            width: 20px; /* 너비 20px */
            height: 20px; /* 높이 20px */
        }
        .order_info_icon1{
            position:absolute;
            margin-top: 35px;
            margin-left: 5px;
            width: 10px;
            height: 10px;
            background-color: #FFFFFF;
            border-radius: 50%;
        }
        .order_info_icon2{
            position:absolute;
            margin-top: 28px;
            margin-left: 5px;
            width: 10px;
            height: 10px;
            background-color: #FFFFFF;
            border-radius: 50%;
        }
  </style>