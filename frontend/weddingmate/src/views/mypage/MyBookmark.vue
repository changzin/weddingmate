<template>
  <div class="fix-width">
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
        <div><img class="bookmark_img" :src="$imageFileFormat(bookmark.item_tn_image_path)"></div>
        <div class="container-name_cost">
          <div>{{ bookmark.item_name }}</div>
          <div class="font-cost">{{ bookmark.item_price }}</div>
        </div>
        <img class="delete-x" src="icon/deleteX.png" style ="cursor: pointer;" @click=" DelBookmark(bookmark)">
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
      result: [],
      user: "",
      

       //페이지
      page : 1,
      maxPage: 1, 
      isFirstPage: false,
      isLastPage: false,

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
      },
      deep: true // 객체 내부의 속성까지 감시
    }
  },
  methods: {
    async getBookmarkList() {
      try{       
        this.user = await this.$verifiedUser();
        if(!this.user){
          alert("로그인이 필요합니다");
          this.$router.push({
            name: "userlogin",
            query: { savedUrl: true },
          });
      } else{
      // URL에 파라미터를 추가한다.
      await this.$router.push({path: '/mypage/bookmark', query:{page: this.page} });
    
      // 북마크 리스트를 가져오기 전에 파라미터 갈무리
      this.page = Number(this.$route.query.page);
      this.page = (!this.page) ? 1 : this.page;

      const requestBody = {
          access_token: this.$getAccessToken()
        }

      // 견적함 정보 다시 가저오고, maxPage를 맞추어준다.
      const response = await this.$api(`/mypage/bookmarklist?page=${this.page}`, requestBody, "post");      
      this.bookmarkList = response.bookmarkList;
      this.maxPage = response.maxPage;
      this.updatePageStatus();

      console.log(this.bookmarkList);
    } 
    }catch(error){
      alert("북마크를 불러올 수 없습니다");
      console.error(error);

    }      
    },

    async DelBookmark(bookmark){
      try{
        const requestBody = {
        bookmark_id: bookmark.bookmark_id
        }

        const response = await this.$api("/mypage/bookmarklist/del", requestBody, "post");
        alert("북마크가 삭제되었습니다.");
 
        if (response.status === 200) {
          this.$router.go();
          await this.getBookmarkList();
      }
        
      }catch(error){
        alert("북마크를 삭제할 수 없습니다")
        console.error(error);

      }
    },

 
    async DelCBookmarkList() {
      try {
        // 체크된 북마크 ID를 서버에 전송
        const requestBody = {
          checkedbookmarkIds: this.result
        };

        const response = await this.$api("/mypage/bookmarklist/delchecked", requestBody, "post");
        alert(response.message);
        
        if (response.status === 200) {
          this.$router.go();
          await this.getBookmarkList();

          console.log(this.bookmarkList);
        }
                      
      } catch (error) {
        alert("체크한 북마크를 삭제할 수 없습니다");
        console.error(error);
      }
    },
    toggleAllSelection(event) {
      const isChecked = event.target.checked;
      this.bookmarkList.forEach(item => {
        item.checked = isChecked;
      });
    },

    // 페이지 네이션
    async nextPage() {
      if (!this.isLastPage) {
        this.page++;
        await this.getBookmarkList();
      }
    },

    async prevPage() {
      if (!this.isFirstPage) {
        this.page--;
        await this.getBookmarkList();
      }
    },

    async goToPage(targetPage) {
      if (targetPage >= 1 && targetPage <= this.maxPage) {
        this.page = targetPage;
        await this.getBookmarkList();
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
    grid-template-columns: 30px 200px 1020px 250px;
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
    width: 180px;
    height: 180px;
    border: 1px solid #333333;
}
img.delete-x{
    weight: 20px;
    height: 20px;
    /* border: 1px solid #333333; */

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
