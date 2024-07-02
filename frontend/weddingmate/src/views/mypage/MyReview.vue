<template>
    <div class="fix-width">
      <!-- 헤더 -->
      <MateHeader />  
      <!-- 본문  -->   
<div class="container0">
    <div class="container-title">
        <div class="font-title">나의 리뷰</div>
        <hr class="title">
    </div>
    <div class="container-middle">
      <div v-for="review in reviewList" :key="review.review_id" class="container-content">
            <div class="container-content-top">
                <img class="bookmark" src="{{ review.item_tn_image_path }}">
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
                                <i class="fas fa-edit"></i>
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
        reviewList : [],
        rating: 3,
        currentRating: null

      };
    },
    mounted(){
      this.getReviewList()
    },
    methods: {
      async getReviewList(){
        const requestBody = {
          access_token: "25b8d0e3-50f3-4f39-8d7a-fd4c123f6734"
        };
        try{
          const response = await this.$api("/mypage/review", requestBody, "post");
          this.reviewList = response.reviewList
          console.log("결과", this.reviewList);       
        }catch(error){
          console.log(error);

        }
      },

      async delReview(review){
        const requestBody = {
          reviewId : review.review_id
        };
        try{
          const response = await this.$api("/mypage/review/del", requestBody, "post");
          alert("리뷰가 삭제되었습니다.");
          console.log("리스폰스",response);
          console.log("리뷰리스트", this.reviewList);

          if (response.status === 200) {
          await this.getReviewList();
          this.$router.go();
      }

        }catch(error){
          console.log(error);
        }
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

img.bookmark{
    width: 60px;
    height: 60px;
    border: 1px solid #333333;
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
  