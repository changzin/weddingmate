<template>
    <div>
 <!-- 헤더 -->
 <MateHeader />    
      <!-- 본문  -->

      <div class="container0">
        <div class="container-top">
            <div class="title-font">나의 QnA</div>
            <hr class="title">
        </div>
        <div class="container-middle">
            <div class="container-middle-bar">
              <div>작성일</div>
              <div>문의 유형</div>
              <div>제목</div>
              </div>
              <hr class="bar">
              <div :class="qnaList.length == 0 ? 'no_data' : 'invisible'">등록된 QnA가 없습니다</div>
                <div v-for="(qna, index) in qnaList" :key="index">
                  <div class="container-middle-content">
                    <div>{{this.$dayFormat(qna.qna_date)}}</div>
                    <div>{{ this.formatQnaType(qna.qna_type) }}</div>
                    <div class="qna_title" @click="goToQna(qna)">{{ qna.qna_title }}</div>
                  </div>
                  <div><hr class="text"></div>
                </div>
        </div>
        <div class="mypage-bottom">
              <div class="nav-page justify-content-center">
              <a :class="{ notVisible: page == 1 }" @click="prevBlock()"><div>&lt;&lt;</div></a>
              <a :class="{ notVisible: page == 1 }" @click="prevPage()"><div>&lt;</div></a>
              <a :class="{ notVisible: page - 2 < 1 }" @click="goToPage(page - 2)"><div>{{ page - 2 }}</div></a>
              <a :class="{ notVisible: page - 1 < 1 }" @click="goToPage(page - 1)"><div>{{ page - 1 }}</div></a>
              <a><div style="color: pink">{{ page }}</div></a>
              <a :class="{ notVisible: page + 1 > maxPage }" @click="goToPage(page + 1)"><div>{{ page + 1 }}</div></a>
              <a :class="{ notVisible: page + 2 > maxPage }" @click="goToPage(page + 2)"><div>{{ page + 2 }}</div></a>
              <a :class="{ notVisible: page == maxPage }" @click="nextPage()"><div>&gt;</div></a>
              <a :class="{ notVisible: page == maxPage }" @click="nextBlock()"><div>&gt;&gt;</div></a>
            </div>
            <button class="mypage-back" @click="this.$router.push({path: '/mypage/'})">
                    마이페이지로
                </button>
            </div>
     </div>

        <!-- 푸터 -->   
        <MateFooter />     
    </div>
</template>
  
  <script>
  export default {
    name: "SearchComponent",
    data() {
      return {
        qnaList : [],
        user: "",

        //페이지
        page : 1,
        maxPage: null,  
   
      };
    },
    created(){
      this.getQnaList();
    },
    methods: {
      async getQnaList(){
        try{       
          this.user = await this.$verifiedUser();
          if(!this.user) {
            alert("로그인이 필요합니다");
            this.$router.push({
              name: "userlogin",
              query: { savedUrl: true },
            });
          } else {          
          // URL에 파라미터를 추가한다.
          await this.$router.push({path: '/mypage/qna', query:{page: this.page} });
        

          // 견적함 리스트를 가져오기 전에 파라미터 갈무리
          this.page = Number(this.$route.query.page);
          this.page = (!this.page) ? 1 : this.page;

          const requestBody = {
              access_token: this.$getAccessToken()
          }

          // 견적함 정보 다시 가저오고, maxPage를 맞추어준다.
          const response = await this.$api(`/mypage/qnalist?page=${this.page}`, requestBody, "post");      
          this.qnaList = response.qnaList;
          this.maxPage = response.maxPage;
          console.log(response);
      }

      }catch(error){
        alert("Qna 리스트를 불러올 수 없습니다");
        console.log(error);
      }   
    },

    // qna 상세로 이동
    goToQna(qna){
      this.$router.push({
        name: "qnadetail",
        query: { qna_id: qna.qna_id },
      });
    },

    formatQnaType(data) {
      if (data == "배송" && "delivery") {
        return "배송문의";
      } else if (data == "반품/취소" && "cancel" ) {
        return "반품/취소";
      } else if (data == "상품" && "item" ) {
        return "상품문의";
      } else {
        return "기타";
      }
    },

      // 페이지 네이션
    async nextPage() {
      if (!this.isLastPage) {
        this.page++;
        await this.getQnaList();
      }
    },

    async prevPage() {
      if (!this.isFirstPage) {
        this.page--;
        await this.getQnaList();
      }
    },

    async goToPage(targetPage) {
      if (targetPage >= 1 && targetPage <= this.maxPage) {
        this.page = targetPage;
        await this.getQnaList();
      }
    },

    async prevBlock() {
      let targetPage = this.page > 5 ? this.page - 5 : 1;
      await this.goToPage(targetPage);
    },

    async nextBlock() {
      let targetPage = this.page + 5 <= this.maxPage ? this.page + 5 : this.maxPage;
      await this.goToPage(targetPage);
    },

    updatePageStatus() {
      this.isFirstPage = this.page === 1;
      this.isLastPage = this.page === this.maxPage;
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

/* div */
.no_data{
  text-align: center;
  font-size: 30px;
  color:#d3d3d3;
  padding: 200px;
  /* border: 1px solid red; */
}
.invisible{
  display: none;
}

.container0{
min-width: var(--container-width);
}

.container-top{          
margin-left: var(--container-margin-left);
margin-right: var(--container-margin-right);
margin-top: 100px;
width: var(--container-width);
display: grid;          
/* border: 1px solid blue; */
}

.container-middle{          
margin-left: var(--container-margin-left);
margin-right: var(--container-margin-right);
margin-bottom: 30px;
width: var(--container-width);
display: grid;           
/* border: 1px solid blue; */
}

.container-middle-bar{
display: grid;
grid-template-columns: 150px 200px auto;
align-items: start;
width: var(--container-width);
padding: 10px;
box-sizing: border-box;
color:#888888;
/* border: 1px solid red; */
}
.container-middle-content{
display: grid;
grid-template-columns: 150px 200px auto;
width: var(--container-width);
padding: 10px;
box-sizing: border-box;
/* border: 1px solid yellow; */
}
.qna_title:hover{
  cursor:pointer;
  text-decoration: underline;
}

/* hr */

hr.title{
width: 100%;
height: 1px; 
background-color: #111111; 
border: none; 
margin-bottom: 0px;
}
hr.bar{
width: 100%;
height: 1px; 
background-color: #888888; 
border: none; 
margin: 0px;
}
hr.text{
width: 1280px;
height: 1px; 
background-color: #c2c2c2; 
border: none; 
margin: 0px;
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
    grid-template-columns: 25px 25px 25px 25px 25px 25px 25px 25px 25px;
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
.nav-page a {
    text-decoration: none; /* remove underline */
    color: inherit; /* inherit color from parent */
}
.mypage-back a {
    text-decoration: none; /* remove underline */
    color: inherit; /* inherit color from parent */
}
.notVisible{
        visibility: hidden;
      }
  </style>
  