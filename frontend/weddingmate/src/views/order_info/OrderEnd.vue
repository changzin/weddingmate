<template>
    <div class="fix-width">
      <!-- 헤더 -->
      <MateHeader />
  
      <!-- 본문  -->
      <div class="container order_info_container">
        <div class="row justify-content-center">
            <div class="order_info_title" style="border-bottom: 1px solid black; padding-bottom: 5px;">
                주문 / 결제
            </div>
        </div>
        <div class="row justify-content-center">
            <div style="text-align: center; margin-top:45px; font-size:30px;">
                <span>결제가 완료되었습니다. 감사합니다!</span>
            </div>
        </div>
        <div class="row justify-content-center">
            <div style="text-align: center; margin-top:15px; font-size:14px;">
                <span>주문일 : {{ this.$dateFormat(Date()) }}</span>
            </div>
            <div style="text-align: center; margin-top:15px; font-size:14px;  font-weight: bold;">
                <span>주문번호 : {{this.order_code}}</span>
            </div>
        </div>
        <div class="row justify-content-center">
            <button class="order_info_button2" style="padding-bottom:25px;" @click="makeOrder();">
                메인으로
            </button>
        </div>  
        <div class="row justify-content-center" >
            <div style="width:600px; background-color: #f5f5f5; height:160px; margin-top:50px;">
                <div class="row justify-content-between" style="margin-bottom:10px;">
                    <div style="width:200px; padding-left: 30px; padding-top:15px;">총 금액</div>
                    <div style="width:400px; padding-top:15px;">{{this.order_info.order_total_price}}원</div>
                </div>
                <div class="row justify-content-between" style="margin-bottom:10px;">
                    <div style="width:200px; padding-left: 30px; padding-top:15px;">할인 금액</div>
                    <div style="width:400px; padding-top:15px;">{{this.order_info.order_sale_price}}원</div>
                </div>
                <div class="row justify-content-between" style="margin-bottom:10px;">
                    <div style="width:200px; padding-left: 30px; padding-top:15px;">최종 금액</div>
                    <div style="width:400px; padding-top:15px;">{{this.order_info.order_price}}원</div>
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
  <MateFooter />
  <script>
  export default {
    data() {
      return {
        boxItemlist:[],
        order_info:
        {
        "order_total_price": 0,
        "order_sale_price":0,
        "order_price":0,
        },
        order_code: null
      };
    },
    async created(){
      await this.getBoxItemList();
      await this.makeOrderInfo();
      await this.makeOrder(); 
    },
    methods: {
       async getBoxItemList(){
        try{
          let requestBody = {
            "access_token": this.$getAccessToken(),
            "order_id": this.$route.query.box_id
          }
          console.log(requestBody);
          const result = await this.$api("http://localhost:9090/order/orderdata", requestBody,"POST");
          console.log(result);

          this.boxItemList = result.boxItemList; 
          if (result.status != 200){
            alert("견적함 정보를 불러올 수 없습니다. 견적함 리스트로 이동합니다.");  
            this.$router.push({path: "/mypage/boxlist"});
          }
        } catch(err){
          alert("견적함 정보를 불러올 수 없습니다!");
          this.$router.push({path: "/mypage/boxlist"});
        }
      },
      async makeOrderInfo(){
        for(let i = 0; i < this.boxItemList.length; i++){
          this.order_info.order_total_price += this.boxItemList[i].box_item_total_price;
        }

        for(let i = 0; i < this.boxItemList.length; i++){
          this.order_info.order_sale_price += Math.ceil((this.boxItemList[i].box_item_total_price * (this.boxItemList[i].item_discount_rate/100)));
        }
        this.order_info.order_price = this.order_info.order_total_price - this.order_info.order_sale_price;

        this.order_info.order_sale_price = this.$numberFormat(this.order_info.order_sale_price);
        this.order_info.order_total_price = this.$numberFormat(this.order_info.order_total_price);
        this.order_info.order_price = this.$numberFormat(this.order_info.order_price);
      },
      async makeOrder(){
        try{
            let requestBody = {
                access_token: this.$getAccessToken(),
                box_id: this.$route.query.box_id,
                order_info_pay_type: "kakao",
                order_info_price: this.order_info.order_price,
                order_info_total_price: this.order_info.order_total_price,
                order_info_sale_price: this.order_info.order_sale_price,
                order_info_cash_receipt: this.$route.query.isBill
            };
            const result = await this.$api("http://localhost:9090/order/makeorder", requestBody, "POST");
            console.log(result);
            if (result.status == 200){
                alert("주문 완료하였습니다.");
                this.order_code = result.order_code.toUpperCase();
            }
            else if (result.status == 300){
                alert("이미 완료된 주문 페이지입니다. 메인 페이지로 이동합니다.");
                this.$router.push({path: "/"});
            }
            else {
                alert("에러로 결제가 완료되지 못했습니다. 견적함 리스트로 이동합니다.")
                this.$router.push({path: "/mypage/boxlist"});
            }
        } catch(err){
            console.error(err);
            alert("예기치 못한 에러가 발생했습니다. 메인 페이지로 이동합니다.")
            this.$router.push({path: "/"});
        }
      },
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