<template>
  <div class="fix-width">
  <!-- 헤더 -->
  <MateHeader />
              
    <!-- 본문  -->
     
    <div class="container0">
    <div class="container-top">
        <div class="title-font">나의 견적함</div>
        <hr class="title">
    </div>
    <div class="container-button">
                      <div
                        v-if="!isEditing"
                        @click="startEditing"
                        class="box-div_add-item"
                      >
                        견적함 이름을 입력하세요
                      </div>
                      <input
                        v-else
                        class="box-div_add-item"
                        v-model="newBoxName"
                        type="text"
                        placeholder="견적함 이름을 입력하세요"
                      />
                      <div class="plus_btn">
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        @click="boxAdd()"
                      >
                        +
                      </button>
                    </div>
                  </div>
    
    <div class="container-sort">
      <div class="sort" style="cursor: pointer;">최근 수정순</div>
      <div>｜</div>
      <div class="sort" style="cursor: pointer;" >가격 높은순</div>
      <div>｜</div>
      <div class="sort" style="cursor: pointer;">상품 많은순</div>
    </div>
 
                
    <div class="container-middle">                      
            <div v-for="(box, index) in boxList" :key="index" class="container-box">
                <div class="box-name">{{ box.box_name }}</div>
                <div class="box-count">담긴 상품 {{box.box_quantity}}개(최근 수정 {{ this.$dayFormat(box.box_date)}})</div>
                <div><hr class="box-hr"></div>
                <div class="box-cost">합계 금액 : {{this.$numberFormat(box.box_item_total_price)}}원</div>
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
      boxList: [],

      //견적함
      selectedIndex: null,
      isEditing: false, // 입력 상태를 추적하는 상태
      newBoxName: "", // 새로운 견적함 이름을 저장하는 상태

    };
  },
  mounted() {
    this.getBoxList();
  },

  methods: {
    async getBoxList() {
      const requestBody = {
          access_token: "25b8d0e3-50f3-4f39-8d7a-fd4c123f6734"
        }
      try{
        const response = await this.$api("/mypage/boxlist",requestBody, "post");
        this.boxList = response.boxList;       


      }catch(error){
        console.log(error);

      }
    },
    addBox() {
      console.log("a");
    },
    sortBox(){
      console.log("b");
    },


   // 견적함
   startEditing() {
      this.isEditing = true;
    },
    cancelEditing() {
      this.isEditing = false;
    },


    async boxAdd() {

      if (this.newBoxName.trim() !== "") {
        try {
          const requestBody = {
            access_token: "25b8d0e3-50f3-4f39-8d7a-fd4c123f6734",
            boxName : this.newBoxName
          }
          const response = await this.$api("/mypage/boxlist/add", requestBody, "post");
          console.log(response);

          if (response.status === 200) {
          await this.getBoxList();
      }
        

        } catch (error) {
          console.log(error);
        }
      }
      this.newBoxName = "";
      this.isEditing = false;
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
@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css); 
  div{
    font-family: 'Noto Sans KR', sans-serif;
      font-size: 16px;
      color:#555555;
}
/* font */ 

.title-font{
    display: grid;
    place-items: center;
    color: #333333;
    font-size: 24px;
    font-weight: bold;
    
}

.box-name{
    font-size: 20px;
    font-weight: bold;
    color: #333333;           
}
.box-count{
    font-size: 14px;         
}
.sort{
    font-size: 14px; 
    color:#888888;        
}

.box-cost{
    font-size: 20px;
    font-weight: bold;
    color:#888888;
    text-align: right; 
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
    /* border: 1px solid blue; */
}
.container-button{
    margin-left: var(--container-margin-left);
    margin-right: var(--container-margin-right);
    margin-top:30px;
    margin-bottom: 30px;
    width: var(--container-width);
    display: flex;
    justify-content: center; 
    align-items: center; 
    gap: 10px; /* 요소 간의 간격 */
    /* border: 1px solid green; */
}
.container-middle{          
    margin-left: var(--container-margin-left);
    margin-right: var(--container-margin-right);
    margin-bottom: 50px;
    margin-top:10px;
    display: grid;
    align-items: start;
    width: var(--container-width);
    /* border: 1px solid red; */

    grid-template-columns: auto auto auto;
    justify-content:space-between;
    grid-row-gap: 30px;
}
.container-sort{
  margin-left: var(--container-margin-left);
    margin-right: var(--container-margin-right);
    margin-top:30px;
    margin-bottom: 30px;
    width: var(--container-width);
    display: flex;
    justify-content: center; 
    align-items: center; 
    gap: 10px; /* 요소 간의 간격 */
    /* border: 1px solid green; */
}

.container-box_list{          
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content:space-between;
    grid-row-gap: 30px;
    width: var(--container-width); 
    margin-top: 20px; 
    box-sizing: border-box;
    color:#888888;
    /* border: 1px solid blue; */

}

.container-box{
    width: 403px;
    height: 200px;
    background-color: #f5f5f5;
    border-radius: 20px;
    padding: 30px;
    box-sizing: border-box;
    /* border: 1px solid palegreen; */
}

/* hr */

hr.title{
    width: 100%;
    height: 1px;
    background-color: #888888;; 
    border: none; 
}

hr.box-hr{
    margin-top: 20px;
    margin-bottom: 20px;
}

/* button */

button.box-add{
    background-color: var(--color-pink);
    color:white;
    border: none;
    border-radius: 12px;
    width: 130px;
    height: 50px;
    font-size: 18px;
    font-weight: bold;           
}
button.box-sort{
    background-color: var(--color-buttongray);
    color:white;
    border: none;
    border-radius: 12px;
    width: 130px;
    height: 50px;
    font-size: 18px;
    font-weight: bold;
}


/* 견적함*/ 
.box-div_header {
  display: flex;
  margin-top: 30px;
  margin-bottom: 10px;
  justify-content: space-between;
}

.box-div_header_list {
  font-size: 24px;
  font-weight: bold;
}


.box-div_item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50px;
  border: 1px solid #dddddd;
  color: #888;
  border-radius: 10px;
  width: 300px;
  background-color: white;
  padding-left: 20px;
  margin-bottom: 10px;
}

.box-div_item.selected {
  color: #f7cac9;
  font-weight: bold;
  border: 1px solid #f7cac9;
}

.box-div_add {
  display: flex;

  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
}

.box-div_add-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50px;
  border: 1px solid #dddddd;
  color: #888;
  border-radius: 10px;
  width: 300px;
  background-color: white;
  padding-left: 20px;
  margin-bottom: 10px;
} 

.plus_btn{
  /* border: 1px solid red; */
  margin-bottom: 10px;
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
.mypage-back a {
    text-decoration: none; /* remove underline */
    color: inherit; /* inherit color from parent */
}
</style>
