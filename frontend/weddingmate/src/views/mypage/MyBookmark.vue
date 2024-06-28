<template>
  <div class="fix-width">
    <!-- 헤더 -->
      <!-- 헤더 -->
      <MateHeader />
    <!-- 본문  -->
    <div class="container0">
    <div class="container-title">
        <div class="font-title">나의 찜</div>
        <hr class="title">
    </div>
    <div class="container-allselect">
      <input type="checkbox" v-model="selectAllChecked" @change="toggleAllSelection">
          <div class="font-delete" style ="cursor: pointer;" @click="DelCBookmarkList()" >선택 상품 삭제</div>
        </div>        
    <div class="container-middle">
      <div v-for="(bookmark, index) in bookmarkList" :key="index" class="container-content">
        <input type="checkbox" v-model="bookmark.checked">
        <div><img class="bookmark_img" :src="bookmark.item_tn_image_path"></div>
        <div class="container-name_cost">
          <div>{{ bookmark.item_name }}</div>
          <div class="font-cost">{{ bookmark.item_price }}</div>
        </div>
        <img class="delete-x" src="icon/deleteX.png">
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
      // 본문
      bookmarkList :[],
      selectAllChecked: false,
      selectedItems: [], // 각 아이템의 선택 여부를 저장할 배열   
      result: []

    };
  },
  mounted(){  
     this.getBookmarkList();
  },
  watch: {
    bookmarkList: {
      handler(newList) {
        // 체크된 북마크들을 필터링하여 bookmark_id를 추출하고 배열에 저장
        const checkedbookmark = newList.filter(bookmark => bookmark.checked);
        const checkedbookmarkIds = checkedbookmark.map(bookmark => bookmark.bookmark_id);
        this.result = checkedbookmarkIds;
        console.log( checkedbookmarkIds);
        console.log(this.result);
      },
      deep: true // 객체 내부의 속성까지 감시
    }
  },
  methods: {
    async getBookmarkList() {
      const requestBody = {
        access_token: "7d8ce36a-98d7-47ea-b671-c8f9e5a13a97",
      };
      try {
        const response = await this.$api("/mypage/bookmarklist", requestBody, "post");
        console.log("결과", response);

        if (response.status === 200) {
          this.bookmarkList = response.bookmarkList.map(item => {
            return {
              ...item,
              checked: false // 각 아이템의 초기 체크 상태를 false로 설정
            };
          });
        }
      } catch (error) {
        console.error("Error fetching bookmark list:", error);
      }
    },
    async DelCBookmarkList() {
      // 체크된 북마크 ID를 서버에 전송
      const requestBody = {
        checkedbookmarkIds: this.result
      };
      try {
        const response = await this.$api("/mypage/bookmarklist/delchekced", requestBody, "post");
        alert(response.message);
        
        if (response.status === 200) {
          await this.getBookmarkList();
          this.$router.go();
      }
      
      } catch (error) {
        console.error("Error deleting bookmark list:", error);
      }
    },
    toggleAllSelection(event) {
      const isChecked = event.target.checked;
      this.bookmarkList.forEach(item => {
        item.checked = isChecked;
      });
    }
  }
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

.font-delete{
  color: #888888;
}

.font-cost{
    font-weight: bold;
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
    margin-top: 5px;
    margin-bottom: 50px;
    display: grid;
    width: 1280px; /* 고정된 너비 */    
    font-size: 24;
    /* border: 1px solid purple; */
}

.container-allselect{
    display: grid;
    grid-template-columns: 30px 100px;
    justify-items: start;
    margin-left: 350px;
    margin-right: 320px;
    width: 1280px; /* 고정된 너비 */     
    padding: 10px;
    margin-bottom: 15px;
    box-sizing: border-box;
    color:#888888;
    /* border: 1px solid red; */
}
.container-content{
    display: grid;
    grid-template-columns: 30px 140px 1030px 250px;
    justify-items: start;
    align-items: start;
    width: 1280px; /* 고정된 너비 */    
    padding: 10px;
    margin-bottom: 30px;
    box-sizing: border-box;
    /* border: 1px solid yellow; */
}
.container-name_cost{
    display: flex;
    flex-direction: column;
    /* border: 1px solid orange;            */
}                

/* hr */

hr.title{
    width: 100%;
    height: 1px; 
    background-color: #111111; 
    border: none; 
    margin-bottom: 0;
}
hr.bar{
    width: 100%;
    height: 1px; 
    background-color: #888888; 
    border: none; 
    margin:0;
    
}
hr.text{
    width: 100%;
    height: 1px; 
    background-color: #f5f5f5; 
    border: none; 
}


/* img */

img.bookmark_img{
    width: 120px;
    height: 120px;
    border: 1px solid #333333;
}
img.delete-x{
    weight: 20px;
    height: 20px;
    /* border: 1px solid #333333; */

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
