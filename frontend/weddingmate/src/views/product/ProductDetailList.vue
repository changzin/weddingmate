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
    <div class="productdetail_main_content">
      테스트용 itemType
      <select class="form-select my-2" v-model="selectedItemType">
        <option value="" disabled selected>아이템 타입 선택</option>
        <option value="dress">dress</option>
        <option value="studio">studio</option>
        <option value="makeup">makeup</option>
        <option value="sdm_package">sdm_package</option>
        <option value="giving_dress">giving_dress</option>
        <option value="giving_mechine">giving_mechine</option>
        <option value="snap">snap</option>
        <option value="video">video</option>
        <option value="flower">flower</option>
        <option value="music">music</option>
        <option value="mc">mc</option>
        <option value="shoes">shoes</option>
        <option value="gift">gift</option>
        <option value="letter">letter</option>
      </select>
      <!-- 청첩장 -->
      <div :class="['productdetaillist-content', getClass('letter'), 'temp']">
        <img src="https://via.placeholder.com/1280x500" />
      </div>

      <!-- 검색 -->
      <div class="search-container-wrapper">
        <div class="search-container">
          <input type="text" placeholder="Search" class="search-input" />
          <i class="fas fa-search search-icon"></i>
        </div>
      </div>

      <!-- 청첩장상품 리스트 -->
      <div :class="['productdetaillist-content', getClass('letter')]">
        <!-- 상품들 -->
        <div class="reviewlist_review-section">
          <div class="reviewlist_review-cards">
            <button class="reviewlist_review-card" v-for="n in 12" :key="n">
              <img
                src="https://via.placeholder.com/300x300"
                class="reviewlist_card-img-top"
                alt="Review Image"
              />
              <div class="reviewlist_card-body">
                <div
                  class="reviewlist_review-section_title-div letter-title-flex"
                >
                  <div class="letter-title-flex_title">
                    아아 이것은 제목이란 것이다..아아 이것은 제목이란 것이다아아
                    이것은 제목이란 것이다
                  </div>
                  <div class="letter-title-flex-dummy"></div>
                  <div class="letter-title-flex_per">20%</div>
                </div>

                <p class="reviewlist_card-text">
                  아아 이것은 설명이란
                  것이다...ㅎㄹㅇㅎㄹㅇㅎㅇㅀㅎㄹㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㅎㅇㅀㄹㅇㅎㅇㅀㅇㅀㅁㄴㄹㄴㄹ
                  ㄹㄴ이ㅓㅎ라ㅣㅓ흴아희 3줄까지 가능함
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- 그외 상품 리스트 -->
      <div :class="['productdetaillist-content', getClass('')]">
        <!-- 상품들 -->
        <div class="reviewlist_review-section">
          <div class="reviewlist_review-cards">
            <button class="reviewlist_review-card" v-for="n in 12" :key="n">
              <img
                src="https://via.placeholder.com/300x300"
                class="reviewlist_card-img-top"
                alt="Review Image"
              />
              <div class="reviewlist_card-body">
                <div class="reviewlist_review-section_title-div">
                  아아 이것은 제목이란 것이다..아아 이것은 제목이란 것이다아아
                  이것은 제목이란 것이다
                </div>
                <p class="reviewlist_card-text">
                  아아 이것은 설명이란
                  것이다...ㅎㄹㅇㅎㄹㅇㅎㅇㅀㅎㄹㅇㄹㄴㅇㄹㄴㅇㄹㄴㅇㅎㅇㅀㄹㅇㅎㅇㅀㅇㅀㅁㄴㄹㄴㄹ
                  ㄹㄴ이ㅓㅎ라ㅣㅓ흴아희 3줄까지 가능함
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      
      <!-- 페이지 -->
      <!-- <div class="mypage-bottom">
        <div class="nav-page">
          <div>&lt;&lt;</div>
          <div>&lt;</div>
          <div>1</div>
          <div>2</div>
          <div style="color: pink">3</div>
          <div>4</div>
          <div>5</div>
          <div>&gt;</div>
          <div>&gt;&gt;</div>
        </div>
        <button class="mypage-back">마이페이지로</button>
      </div> -->
    </div>

     <div class="mypage-bottom">
              <div class="nav-page justify-content-center">
              <a :class="{notVisible : (page == 1)}" @click="prevBlock()"><div>&lt;&lt;</div></a>
              <a :class="{notVisible : (page == 1)}" @click="prevPage()"><div>&lt;</div></a>
              <a :class="{notVisible : (page-2 < 1)}" @click="goToPage(page-2)"><div>{{page-2}}</div></a>
              <a :class="{notVisible : (page-1 < 1)}" @click="goToPage(page-1)"><div>{{page-1}}</div></a>
              <a><div style="color: pink;">{{page}}</div></a>
              <a :class="{notVisible : (page+1 > maxPage)}" @click="goToPage(page+1)"><div>{{page+1}}</div></a>
              <a :class="{notVisible : (page+2 > maxPage)}" @click="goToPage(page+2)"><div>{{page+2}}</div></a>
              <a :class="{notVisible : (page == maxPage)}" @click="nextPage()"><div>&gt;</div></a>
              <a :class="{notVisible : (page == maxPage)}" @click="nextBlock()"><div>&gt;&gt;</div></a>
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
            (주)웨딩데이트 주소: 서울시 서대문구 개인정보 대표: 이창진 전화:
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
      selectedItemType: "",


      //페이지
      memberList: [],
      blockOption: false,
      page: 1,
      isFirstPage: false,
      isLastPage: false,
      maxPage: 0



    };
  },
    mounted(){
    this.getMemberList();
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
    getClass(type) {
      if (type === "letter") {
        return this.selectedItemType === "letter" ? "visible" : "collapse";
      } else {
        return this.selectedItemType !== "letter" ? "visible" : "collapse";
      }
    },



    //페이지
    async getMemberList(){
      let page = this.$route.params.page;
      let block = this.$route.params.page;
      page = (!page) ? 1 : page;
      block = (!block) ? 'F' : block;
      this.memberList = await this.$api(`/user/list?page=${page}&block=${block}`);
    //   this.memberList = await this.$api(`http://localhost:9090/user/list?page=${page}&block=${block}`);
      this.makePageSetting();      
    },
    async getBlockMemberList(){
        this.memberList = await this.$api(`/user/list?page=1&block=T`);
    //   this.memberList = await this.$api(`http://localhost:9090/user/list?page=1&block=T`);
      this.blockOption = !this.blockOption;
      this.makePageSetting();
    },
    async getUnblockMemberList(){
      this.memberList = await this.$api(`/user/list?page=1&block=F`);
    //   this.memberList = await this.$api(`http://localhost:9090/user/list?page=1&block=F`);
      this.blockOption = !this.blockOption;
      this.makePageSetting();
    }, 
    makePageSetting(){
      this.maxPage = Math.floor(this.memberList.length / 10) + 1;
      this.isFirstPage = (this.page == 1) ? true : false;
      this.isLastPage = (this.page == this.maxPage) ? true : false;
      console.log(this.maxPage);
    },
    // 이전 블록 페이지로 이동 (5번째 이전 페이지, 남은 이전 페이지가 5개 이하일 경우 마지막 페이지 이동)
    async prevBlock(){
      let targetPage = this.page;
      if (this.page <= 5){
        targetPage = 1;
      }
      else{
        targetPage = this.page - 5;
      }
      const block = (!this.blockOption) ? 'F' : 'T';
      this.memberList = await this.$api(`/user/list?page=${targetPage}&block=${block}`);
    //   this.memberList = await this.$api(`http://localhost:9090/user/list?page=${targetPage}&block=${block}`);
      this.page = targetPage;
    },
    // 다음 블록 페이지로 이동 (5번째 이후 페이지, 남은 다음 페이지가 5개 이하일 경우 마지막 페이지 이동)
    async nextBlock(){
      let targetPage = this.page;
      if (this.page > this.maxPage-5){
        targetPage = this.maxPage;
      }
      else{
        targetPage = this.page + 5;
      }
      const block = (!this.blockOption) ? 'F' : 'T';
      this.memberList = await this.$api(`/user/list?page=${targetPage}&block=${block}`);
      this.page = targetPage;
    },
    async nextPage(){
      const block = (!this.blockOption) ? 'F' : 'T';
      this.memberList = await this.$api(`/user/list?page=${this.page+1}&block=${block}`);
    //   this.memberList = await this.$api(`http://localhost:9090/user/list?page=${this.page+1}&block=${block}`);
      this.page +=1;
    },
    async prevPage(){
      const block = (!this.blockOption) ? 'F' : 'T';
      this.memberList = await this.$api(`/user/list?page=${this.page-1}&block=${block}`);
        // this.memberList = await this.$api(`http://localhost:9090/user/list?page=${this.page-1}&block=${block}`);
      this.page -=1;
    },
    async goToPage(targetPage){
      const block = (!this.blockOption) ? 'F' : 'T';
      this.memberList = await this.$api(`/user/list?page=${targetPage}&block=${block}`);
    //   this.memberList = await this.$api(`http://localhost:9090/user/list?page=${targetPage}&block=${block}`);

      this.page = targetPage;
    }
  },
};
</script>


<style scoped>


.mypage-bottom{
            display: grid;
            place-items: center;
            margin-top: 100px;
            /* border: 1px solid yellow; */
        }
       .nav-page{
            display: grid;
            place-items: center;
            grid-template-columns: repeat(9, 25px);
            margin-bottom: 30px;
            color: #888888;
            /* border: 1px solid pink; */
        }
      .notVisible{
        visibility: hidden;
      }



















.fix-width {
  width: 1980px;
  min-width: 1980px;
  max-width: 1980px;
  margin: 0 auto;
}

.productdetail_main_content {
  width: 1280px;
  min-width: 1280px;
  max-width: 1280px;
  margin: 0 auto;
}

/* visible */
.productdetaillist-content {
}

.temp {
  margin: 30px;
}

/* 검색 */
.search-container-wrapper {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  box-sizing: border-box;
  margin-top: 50px;
}

.search-container {
  display: flex;
  align-items: center;
  width: 300px;
  height: 50px;
  border: 1px solid #333333;
  border-radius: 10px;
  padding: 0 20px;
  box-sizing: border-box;
}

.search-input {
  border: none;
  outline: none;
  font-size: 14px;
  flex-grow: 1;
}

.search-icon {
  font-size: 14px;
  color: #555555;
}



/* 페이지 */
.mypage-bottom {
  display: grid;
  place-items: center;
}
.nav-page {
  display: grid;
  place-items: center;
  grid-template-columns: repeat(9, 25px);
  margin-bottom: 30px;
  color: #888888;
}

.mypage-back {
  background-color: #888888;
  color: white;
  font-weight: bold;
  border: none;
  width: 120px;
  height: 40px;
}












/* 상품들 */

.reviewlist_container {
  width: 1280px;
  margin: 0 auto;
  margin-top: 80px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  font-family: Arial, sans-serif;
}

.reviewlist_header {
  text-align: center;
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 30px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 16px;
}

.reviewlist_review_content {
  margin-top: 100px;
}

.reviewlist_review-section {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 50px;
}

.reviewlist_review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.reviewlist_review-title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.reviewlist_write-review-btn {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.reviewlist_write-review-btn i {
  margin-right: 8px;
}

.reviewlist_review-cards {
  display: flex;
  flex-wrap: wrap;
  /* gap: 20px; */
  justify-content: space-between;
}

.reviewlist_review_card:last-child {
  /* margin-right: 0; */
}

.reviewlist_review-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  width: 23%;
  padding: 10px;
  margin-bottom: 60px;
}

.reviewlist_card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-bottom: 10px; */
}

.reviewlist_card-header h5 {
  margin: 0;
  font-size: 16px;
}

.reviewlist_card-header span {
  font-size: 12px;
  color: #888;
}

.reviewlist_card-icons {
  display: flex;
  gap: 10px;
}

.reviewlist_card-icons i {
  cursor: pointer;
}

.reviewlist_card-img-top {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
}

.reviewlist_card-body {
  padding: 10px;
}

.reviewlist_card-rating {
  font-size: 14px;
  margin-bottom: 10px;
}

.reviewlist_card-text {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
  text-align: left;
  margin-bottom: 0px;
}

.reviewlist_review-section_title-div {
  font-size: 16px;
  font-weight: bold;
  text-align: left;
  margin-bottom: 10px;
  width: 100%;
}

.letter-title-flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.letter-title-flex_title {
  /* 이부분이 flex의 80% 할당 */
  flex: 1;
}

.letter-title-flex-dummy {
  flex: 0 0 3%;
}

.letter-title-flex_per {
  /* 이부분이 flex의 20% 할당 */
  flex: 0 0 20%;
  color: #ff481e;
  font-size: 28px;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;
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
  margin-top: 50px;
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
</style>
