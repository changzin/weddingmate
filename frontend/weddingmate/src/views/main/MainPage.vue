<template>
  <div>
    <MateHeader />
  
    
      <!-- 본문  -->
      
      <div class="container main_container">
        <div class="main_best_studio_text">
            베스트 스튜디오
        </div>
        <div class="main_item_line">
        <div class="" v-for="(star,index) in limitBestItem" :key="index">
          <!-- 메인이미지 클릭시 item_detail로 전송 -->
          <!-- 이미지는 추후에 등록 --> 
            <!-- 1번 -->
            <div class="main_card_box" @click="$router.push({path: '/productdetail'})">
              <img height="325" width="325" v-bind:src="`http://localhost:9090/${star.item_tn_image_path}`" alt="beststudioimage1">   
              <div class="main_card_title">
                    {{ star.item_name }}
              </div>
            </div>
            <!-- <div class="main_card_box" @click="$router.push({path: '/productdetail'})">
              <img src="https://via.placeholder.com/325x325" alt="beststudioimage1" class="img-fluid">
                <div class="main_card_title">
                    아아 이것은 제목이란 것이다..fdsgfdgfgdfgfdg2줄까지 가능 ㄹㅇㅎㄹㅇㅎㅇㅀㅇㄹ 
                </div>
            </div> -->
            <!-- <div class="main_card_box" @click="$router.push({path: '/productdetail'})">
              <img src="https://via.placeholder.com/325x325" alt="beststudioimage1" class="img-fluid">
                <div class="main_card_title">
                    아아 이것은 제목이란 것이다..fdsgfdgfgdfgfdg2줄까지 가능 ㄹㅇㅎㄹㅇㅎㅇㅀㅇㄹ 
                </div>
            </div> -->
            <!-- <div class="main_card_box" @click="$router.push({path: '/productdetail'})">
              <img src="https://via.placeholder.com/325x325" alt="beststudioimage1" class="img-fluid">
                <div class="main_card_title">
                    아아 이것은 제목이란 것이다..fdsgfdgfgdfgfdg2줄까지 가능 ㄹㅇㅎㄹㅇㅎㅇㅀㅇㄹ 
                </div>
            </div> -->
            <!-- <div class="main_card_box2" @click="$router.push({path: '/productdetail'})">
              <img src="https://via.placeholder.com/325x325" alt="beststudioimage1" class="img-fluid">
                <div class="main_card_title">
                    아아 이것은 제목이란 것이다..fdsgfdgfgdfgfdg2줄까지 가능 ㄹㅇㅎㄹㅇㅎㅇㅀㅇㄹ 
                </div>
            </div> -->
            <!-- <div class="main_card_box2" @click="$router.push({path: '/productdetail'})">
              <img src="https://via.placeholder.com/325x325" alt="beststudioimage1" class="img-fluid">
                <div class="main_card_title">
                    아아 이것은 제목이란 것이다..fdsgfdgfgdfgfdg2줄까지 가능 ㄹㅇㅎㄹㅇㅎㅇㅀㅇㄹ 
                </div>
            </div>
            <div class="main_card_box2" @click="$router.push({path: '/productdetail'})">
                <img src="https://via.placeholder.com/325x325" alt="beststudioimage1" class="img-fluid">
                <div class="main_card_title">
                    아아 이것은 제목이란 것이다..fdsgfdgfgdfgfdg2줄까지 가능 ㄹㅇㅎㄹㅇㅎㅇㅀㅇㄹ 
                </div>
            </div> -->
            <!-- <div class="main_card_box2" @click="$router.push({path: '/productdetail'})">
              <img src="https://via.placeholder.com/325x325" alt="beststudioimage1" class="img-fluid">
                <div class="main_card_title">
                    아아 이것은 제목이란 것이다..fdsgfdgfgdfgfdg2줄까지 가능 ㄹㅇㅎㄹㅇㅎㅇㅀㅇㄹ 
                </div>
            </div> -->
        </div>
        </div>
        <!-- <div class="main_best_studio_text">
            베스트 스튜디오
        </div> -->
        <!-- <div class="row justify-content-center">
            <div class="main_card_box" @click="$router.push({path: '/productdetail'})">
              <img src="https://via.placeholder.com/325x325" alt="beststudioimage1" class="img-fluid">
                <div class="main_card_title">
                    아아 이것은 제목이란 것이다..fdsgfdgfgdfgfdg2줄까지 가능 ㄹㅇㅎㄹㅇㅎㅇㅀㅇㄹ 
                </div>
            </div>
            <div class="main_card_box" @click="$router.push({path: '/productdetail'})">
                <img src="https://via.placeholder.com/325x325" alt="beststudioimage1" class="img-fluid">
                <div class="main_card_title">
                    아아 이것은 제목이란 것이다..fdsgfdgfgdfgfdg2줄까지 가능 ㄹㅇㅎㄹㅇㅎㅇㅀㅇㄹ 
                </div>
            </div>
            <div class="main_card_box" @click="$router.push({path: '/productdetail'})">
                <img src="https://via.placeholder.com/325x325" alt="beststudioimage1" class="img-fluid">
                <div class="main_card_title">
                    아아 이것은 제목이란 것이다..fdsgfdgfgdfgfdg2줄까지 가능 ㄹㅇㅎㄹㅇㅎㅇㅀㅇㄹ 
                </div>
            </div>
            <div class="main_card_box" @click="$router.push({path: '/productdetail'})">
              <img src="https://via.placeholder.com/325x325" alt="beststudioimage1" class="img-fluid">
                <div class="main_card_title">
                    아아 이것은 제목이란 것이다..fdsgfdgfgdfgfdg2줄까지 가능 ㄹㅇㅎㄹㅇㅎㅇㅀㅇㄹ 
                </div>
            </div>
            <div class="main_card_box2" @click="$router.push({path: '/productdetail'})">
                <img src="https://via.placeholder.com/325x325" alt="beststudioimage1" class="img-fluid">
                <div class="main_card_title">
                    아아 이것은 제목이란 것이다..fdsgfdgfgdfgfdg2줄까지 가능 ㄹㅇㅎㄹㅇㅎㅇㅀㅇㄹ 
                </div>
            </div>
            <div class="main_card_box2" @click="$router.push({path: '/productdetail'})">
                <img src="https://via.placeholder.com/325x325" alt="beststudioimage1" class="img-fluid">
                <div class="main_card_title">
                    아아 이것은 제목이란 것이다..fdsgfdgfgdfgfdg2줄까지 가능 ㄹㅇㅎㄹㅇㅎㅇㅀㅇㄹ 
                </div>
            </div>
            <div class="main_card_box2" @click="$router.push({path: '/productdetail'})">
                <img src="https://via.placeholder.com/325x325" alt="beststudioimage1" class="img-fluid">
                <div class="main_card_title">
                    아아 이것은 제목이란 것이다..fdsgfdgfgdfgfdg2줄까지 가능 ㄹㅇㅎㄹㅇㅎㅇㅀㅇㄹ 
                </div>
            </div>
            <div class="main_card_box2" @click="$router.push({path: '/productdetail'})">
                <img src="https://via.placeholder.com/325x325" alt="beststudioimage1" class="img-fluid">
                <div class="main_card_title">
                    아아 이것은 제목이란 것이다..fdsgfdgfgdfgfdg2줄까지 가능 ㄹㅇㅎㄹㅇㅎㅇㅀㅇㄹ 
                </div>
            </div>
        </div> -->

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
        best_item:[],
        image:[],

      };
    },
    computed:{
      limitBestItem(){
        return this.best_item.slice(0,9);
      }
    },
    mounted(){
      this.showBestItem();
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
      // 베스트 상품 가져오기 

        async showBestItem(){
            const requestBody = {}
            console.log(requestBody);
            await this.$api("/bestItem",requestBody,"GET")
            this.$router.push({push: "/"});

            //전송한 아이템 가져오기 
            const result = await this.$api(`http://localhost:9090/bestItem`)
            this.best_item = result.best_item;
            // this.image = result.image;
          console.log("bestitem",this.best_item);
          }


      //클릭 시 아이템 디테일의 스튜디오 카테고리를 보여주기 
      
    }
  }
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

  .main_container { 
            max-width: 1920px;
            min-width: 1920px;
        }
        .main_image_box{
        height: 610px;
        text-align: center;
        margin-top: 0px;
        border: none ;

        }
        .main_item_line{
          display: flex;
          flex-wrap: wrap;
          /* gap: 20px; */
          justify-content: space-between;
        }

        .main_best_studio_text{
            margin-top: 190px;
            text-align: center;
            font-size: 28px;
        }

        .main_best_studio_text2{
            margin-top: 190px;
            text-align: center;
            font-size: 28px;
        }

        .main_card_box{
            margin-top: 50px;
            margin-bottom: 10px;
            margin-left: 57px;
            margin-right: 58px;
            padding: 0px;
            width: 329px;
            height: 328px;
        }

        .main_card_box2{
            margin-top: 158px;
            margin-bottom: 90px;
            margin-left: 57px;
            margin-right: 58px;
            padding: 0px;
            width: 329px;
            height: 328px;
            border: solid 1px;
        }
   
        .main_card_title{
            margin-top :10px;
            /* width: 329px; */
            font: bold;
            font-size: 16px;
        }
  </style>