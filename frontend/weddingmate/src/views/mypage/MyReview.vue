<template>
    <div>
      <!-- 헤더 -->
      <MateHeader />  
      <!-- 본문  -->   
<div class="container0">
    <div class="container-title">
        <div class="font-title">나의 리뷰</div>
        <hr class="title">
    </div>
    <div class="container-middle">
      <div :class="reviewList.length === 0 ? 'no_data' : 'invisible'">등록된 리뷰가 없습니다</div>
      <div v-for="review in reviewList" :key="review.review_id" class="container-content">
            <div class="container-content-top">
                <img class="reivew" :src="$imageFileFormat(review.item_tn_image_path)">
                <div class="container-name_option">
                    <div class="font-option">{{ review.item_name }}</div>
                </div>
            </div>
            <div><hr class="text"></div>
            <div class="container-content-middle">
                <div class="container-star_edit">           
                    <div class="star">
                      <div class="qnawrite_row">
                        <label class="qnawrite_label"></label>
                        <div class="rating">
                          <label
                            v-for="n in 10"
                            :key="n"
                            class="rating__label"
                            :class="{
                              half: n <= review.review_star * 2,
                              filled: n <= review.review_star * 2,
                              half_position: n % 2 !== 0,
                              filled_position: n % 2 === 0,
                            }"
                          >
                            <input
                              type="radio"
                              :id="'star' + n"
                              class="rating__input"
                              name="rating"
                              :value="n"
                              v-model="rating"
                            />                           
                              <div class="star-icon"></div>
                            </label>
                            <div class="edit">
                                <div style="cursor: pointer;" @click="gotoReviewModify(review)"><i class="fas fa-edit"></i></div>
                                <div style="cursor: pointer;" @click="delReview(review)"><i class="fas fa-trash"></i></div>
                            </div>
                          </div>
                        </div>
                      </div>
                </div>
                <div class="review">
                    <p>
                      {{ review.review_content }}
                    </p>
                </div>
                <!-- <div class="more">
                    더보기
                </div> -->
                <div><hr class="content"></div>
            </div>
        </div>
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
      
        <!-- 푸터 -->   
        <MateFooter />     
    </div>
</template>
  
  <script>
  export default {
    name: "SearchComponent",
    data() {
      return {
        reviewList : [],
        rating: 3,
        currentRating: null,
        user: "",

       //페이지
      page : 1,
      maxPage: 1, 
      isFirstPage: false,
      isLastPage: false,

      };
    },
    mounted(){
      this.getReviewList()
    },
    methods: {
      async getReviewList(){
        try{
          this.user = await this.$verifiedUser();
          if(! this.user) {
            alert("로그인이 필요합니다");
            this.$router.push({
              name: "userlogin",
              query: { savedUrl: true },
            });
          } else  {
          // URL에 파라미터를 추가한다
          await this.$router.push({path:'/mypage/review', query:{page: this.page} });

          // 리뷰 리스트를 가져오기 전에파라미터 갈무리
          this.page = Number(this.$route.query.page);
          this.page = (!this.page) ? 1: this.page;

          const requestBody = {
          access_token: this.$getAccessToken()
          };

          // 리뷰 리스트를 다시 가져오고 maxPage를 맞춰준다.
          const response = await this.$api(`/mypage/review?page=${this.page}`, requestBody, "post");
          this.reviewList = response.reviewList;  
          this.maxPage = response.maxPage;
          this.updatePageStatus();
          console.log(this.reviewList)
          } 
        }catch(error){
          alert("리뷰를 불러올 수 없습니다.")
          console.log(error);
        }
      },

    gotoReviewModify(review) {
      this.$router.push({
        name: "reviewmodify",
        query: { review_id: review.review_id},
      });
    },

      async delReview(review){
        console.log("리뷰",review);
        console.log("리뷰아이디",review.review_id);
        try{
          const requestBody = {
          reviewId : review.review_id
          };
          const response = await this.$api("/mypage/review/del", requestBody, "post");
          alert("리뷰가 삭제되었습니다.");

          if (response.status === 200) {
            if (this.reviewList.length == 1){
              this.$router.go();
            }
            await this.getReviewList();
          }   

        }catch(error){
          alert("리뷰를 삭제할 수 없습니다");
          console.log(error);
        }
      },

    // 페이지 네이션
    async nextPage() {
      if (!this.isLastPage) {
        this.page++;
        await this.getReviewList();
      }
    },

    async prevPage() {
      if (!this.isFirstPage) {
        this.page--;
        await this.getReviewList();
      }
    },

    async goToPage(targetPage) {
      if (targetPage >= 1 && targetPage <= this.maxPage) {
        this.page = targetPage;
        await this.getReviewList();
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
    },
  };
  </script>
  
  
  <style scoped>

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

.font-option{
    color: #888888;
    font-size: 14px;
}
.review{
    color: #888888;
    font-size: 14px;
    /* border: 1px solid saddlebrown; */
    
}
.more{
    font-size:14px;
    margin-bottom: 40px;
    /* border: 1px solid red; */
}
.star{
    font-size:20px;
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
    display: grid;
    width: 1280px; /* 고정된 너비 */    
    font-size: 24;
    /* border: 1px solid purple; */
}

.container-content{
    /* border: 1px solid pink; */

}
.container-content-top{
    display: grid;
    grid-template-columns:70px 1030px;
    justify-items: start;
    align-items: start;
    width: 1280px; /* 고정된 너비 */    
    padding: 10px;
    box-sizing: border-box;
    /* border: 1px solid green; */
}

.container-name_option{
    display: flex;
    flex-direction: column;
    /* border: 1px solid orange;            */
}  

.container-content-middle{
    display: grid;

}
.container-star_edit{
    display: grid;
    grid-template-columns: auto auto auto;
    /* border: 1px solid orange;            */
}  
.edit{
    display: grid;
    align-items: center;
    margin-left : 10px;
    grid-template-columns: 30px auto;
    /* border: 1px solid gray; */
}

      

/* hr */

hr.title{
width: 100%;
height: 1px; 
background-color: #111111; 
border: none; 
margin-bottom: 0px;
}
hr.text{
    width: 100%;
    height: 1px; 
    background-color: #c2c2c2; 
    border: none; 
    margin: 0px;
}
hr.content{
    width: 100%;
    height: 1px; 
    background-color: #555555; 
    border: none; 
}

/* img */

img.reivew{
    width: 60px;
    height: 60px;
}

/* 별점 */
.rating {
  display: flex;
  justify-content: flex-start;
}

.rating__input {
  display: none;
}

.rating__label {
  width: 12px;
  overflow: hidden;
  cursor: pointer;
}
.rating__label .star-icon {
  width: 12px;
  height: 24px;
  display: block;
  position: relative;
  left: 0;
  background-image: url("/src/views/review/star/emptyStar.svg");
  background-repeat: no-repeat;
}

.rating__label.half .star-icon {
  background-image: url("/src/views/review/star/filledStar.svg");
}

.rating__label.filled .star-icon {
  background-image: url("/src/views/review/star/filledStar.svg");
}

.rating__label.half_position .star-icon {
  background-position: left;
}
.rating__label.filled_position .star-icon {
  background-position: right;
}
.qnawrite_row {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
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
  