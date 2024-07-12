<template>
    <div>
      <!-- 헤더 -->
      <MateHeader />
  
      <!-- 본문  -->
      <div class="container order_info_container">
        <div class="row justify-content-center">
            <div class="order_info_title">
                주문 / 결제
            </div>
            <div class="row justify-content-center">
              
              <!-- 구매자정보 -->
                <table class="order_info_table">
                    <div class="order_info_sub_title">
                        구매자정보
                    </div>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td class="order_info_first_row order_info_td_child">이름</td>
                            <td class="order_info_second_row">{{ user.user_name }}</td>                  
                        </tr>
                        <tr>
                            <td class="order_info_first_row order_info_td_child">이메일</td>
                            <td class="order_info_second_row">{{ user.user_email }}</td>                           
                        </tr>
                        <tr>
                            <td class="order_info_first_row order_info_td_child">휴대폰 번호</td>
                            <td><input class="order_info_phone_number" type="text" v-model="phoneNumber"></td>
                        </tr>
                    </tbody>
                </table>
                
                <!-- 주문상품 -->
                <table class="order_info_table2">
                    <div class="order_info_sub_title" >
                        주문 상품 (1건)
                    </div>
                    <thead></thead>
                    <tbody v-for="(boxItem,index) in boxItemList" :key="index" >
                        <tr class="order_info_td_line">
                            <td class="order_info_td col-7">{{ boxItem.item_name }}</td>
                            <td class="col-2">{{ boxItem.item_detail_type }}</td>
                            <td class="col-1">{{ (boxItem.box_item_quantity) ? boxItem.box_item_quantity : 1 }}개</td>
                            <td class="col-2">{{ this.$numberFormat(boxItem.item_price) }}원</td>
                        </tr>
                    </tbody>
                </table>

                <!-- 결제정보테이블 -->
                <table class="order_info_table">
                    <div class="order_info_sub_title">
                        결제정보
                    </div>
                    <thead></thead>
                    <tbody>
                        <tr>
                            <td class="order_info_first_row order_info_td_child">총 상품가격</td>
                            <td class="order_info_second_row">{{ this.$numberFormat(order_info.order_total_price) }}원</td>                  
                        </tr>
                        <tr>
                            <td class="order_info_first_row order_info_td_child">할인 가격</td>
                            <td class="order_info_second_row">{{ this.$numberFormat(order_info.order_sale_price) }}원</td>                           
                        </tr>
                        <tr>
                            <td class="order_info_first_row order_info_td_child">총 결제가격</td>
                            <td class="order_info_second_row">{{ this.$numberFormat(order_info.order_price) }}원</td>
                        </tr>
                    </tbody>
                </table>
            </div>
    
            <!-- 결제 수단 선택 -->
            <div class="order_info_sub_title">
                결제 수단
            </div>
            <button class="order_info_sub_box1 d-flex justify-content-start" @click="toggleKakaoActive();">
              <div class="order_info_defult_icon1" v-if="!isKakaoActive"></div>  
              <div class="order_info_active_icon2" style="margin-top:30px;" v-else-if="isKakaoActive"></div>
                <div class="order_info_icon1"></div>
                <div class="order_info_text1">카카오페이</div>
            </button>
            
            <!-- 현금 영수증 -->
            <div class="order_info_sub_title">
                현금영수증 신청
            </div>
            <button type="button" class="order_info_sub_box2 d-flex justify-content-start" @click="toggleBil();">
                <!-- <div class="order_info_defult_icon2 order_info_active_icon2" v-if="isBil"></div> -->
                <div class="order_info_defult_icon1" v-if="!isBil"></div>  
                <div class="order_info_active_icon2" style="margin-top:30px;" v-else-if="isBil"></div>
                <div class="order_info_icon2" style="margin-top:35px;"></div>
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
            <button class="order_info_button1" style="padding-bottom:25px;">
                취소
            </button>
            
            <!-- 결제 실행 -->
            <button class="order_info_button2" style="padding-bottom:25px;" @click="makeOrder();">
                결제하기
            </button>
        </div>  
    </div>    
          
    <MateFooter />
    </div>
  </template>
  
  <script>
  export default {
    name: "SearchComponent",
    data() {
      return {
        // 구매자정보
        user: {},
        phoneNumber:'',
        //주문 상품
        boxItemlist:[],
        order_info:
          {
            "order_total_price": 0,
            "order_sale_price":0,
            "order_price":0,
          }
        ,
        // 카카오결제여부
        isKakaoActive:false,
        isBil:false,
        
      };
    },
    async created(){
      await this.getBoxItemList();
      await this.toggleKakaoActive();
      this.makeOrderInfo();
    },
    methods: {
      async getBoxItemList(){
        try{
          this.user = await this.$verifiedUser();
          if (this.user == null){
            alert("로그인 상태가 아닙니다!");
            this.$router.push({
              name: "userlogin",
              query: { savedUrl: true },
            });
          }
          let requestBody = {
            "access_token": this.$getAccessToken(),
            "order_id": this.$route.params.boxId
          }
          const result = await this.$api("http://localhost:9090/order/orderdata", requestBody,"POST");
          
          if (result.status != 200 || result.boxItemList == null){
            alert("견적함 정보를 불러올 수 없습니다!");  
            this.$router.push({
              name: "MyBoxList",
            });
          }
          else if (result.boxItemList.length == 0){
            alert("견적함 정보를 불러올 수 없습니다!");  
            this.$router.push({
              name: "MyBoxList",
            });
          }
          this.boxItemList = result.boxItemList; 
        } catch(err){
          alert("견적함 정보를 불러올 수 없습니다!");
          this.$router.push({
              name: "MyBoxList",
              query: { savedUrl: true },
          });
        }
      },
      makeOrderInfo(){
        for(let i = 0; i < this.boxItemList.length; i++){
          this.order_info.order_total_price += this.boxItemList[i].box_item_total_price;
        }
        for(let i = 0; i < this.boxItemList.length; i++){
          this.order_info.order_sale_price += Math.ceil((this.boxItemList[i].box_item_total_price * (this.boxItemList[i].item_discount_rate/100)));
        }
        this.order_info.order_price = this.order_info.order_total_price - this.order_info.order_sale_price;
      },
      async makeOrder(){
        try{
          if (!this.isHpFormat(this.phoneNumber)){
            alert("전화번호는 필수로 입력해야 합니다.");
            return;
          }
          if (!this.isKakaoActive){
            alert("결제수단을 선택해야 합니다.");
            return;
          }
          let responseBody = {
            "access_token": this.$getAccessToken(),
            "cid": "TC0ONETIME",
            "partner_order_id": "unused",
            "partner_user_id": "unused",
            "item_name": `${this.boxItemList[0].item_name} 등 ${this.boxItemList.length}건`,
            "quantity": this.boxItemList.length,
            "total_amount": this.order_info.order_price,
            "tax_free_amount": this.order_info.order_price,
            // 나중에 바꾸기
            "approval_url": `http://localhost:8080/orderend?box_id=${this.$route.params.boxId}&isBill=${this.isBil}`,
            "fail_url": "http://localhost:8080/mypage/boxlist",
            "cancel_url": "http://localhost:8080/mypage/boxlist"
          }
          
          const result = await this.$api("/order/kakaopay", responseBody, "POST");
          console.log(result);
          if (result.status == 200){
            window.location.href=result.data.next_redirect_pc_url;
          }
          else{
            alert("kakaoPay가 응답하지 않습니다.")
            this.$router.push({
              name: "MyBoxList",
              query: { savedUrl: true },
            });
          }
        }
        catch(err){
          console.error(err);
          this.$router.push({
              name: "MyBoxList",
              query: { savedUrl: true },
          });
        }
        
      },
      toggleKakaoActive(){
        this.isKakaoActive = !this.isKakaoActive;
      },
      toggleBil(){
        this.isBil = !this.isBil;
      },
      isHpFormat(hp){	
        if(hp == ""){		return true;	}	
        const phoneRule = /^(01[016789]{1})[0-9]{3,4}[0-9]{4}$/;	
        return phoneRule.test(hp);
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