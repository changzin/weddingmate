<template>
  <div>
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
      <div :class="bookmarkList.length == 0 ? 'no_data' : 'invisible'">찜한 상품이 없습니다</div>
      <div v-for="(bookmark, index) in bookmarkList" :key="index" class="container-content">
        <input type="checkbox" v-model="bookmark.checked">
        <div @click="goToBookmark(bookmark)" style="cursor: pointer;"><img class="bookmark_img" :src="$imageFileFormat(bookmark.item_tn_image_path)"></div>
        <div class="container-name_cost">
          <div>{{ bookmark.item_name }}</div>
          <div class="font-cost">{{ this.$numberFormat(bookmark.item_price) }}</div>
        </div>
        <div>
        <img class="delete-x" src="/icon/deleteX.png" style ="cursor: pointer;" @click=" DelBookmark(bookmark)">
        
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
      // 본문
      bookmarkList :[],
      selectAllChecked: false,
      selectedItems: [], // 각 아이템의 선택 여부를 저장할 배열   
      result: [],
      user: "",
      
       //페이지
      page : null,
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
    goToBookmark(bookmark) {
      this.$router.push({
        name: "productdetail",
        query: { itemType: bookmark.item_detail_type, item_id: bookmark.item_id},
      });
    },

    async DelBookmark(bookmark){
      try{
        const requestBody = {
        bookmark_id: bookmark.bookmark_id
        }

        const response = await this.$api("/mypage/bookmarklist/del", requestBody, "post");
        if (response.status === 200) {
          alert("북마크가 삭제되었습니다.");
          this.$router.go();
          await this.getBookmarkList();
      } else{
        alert("북마크를 삭제 할 수 없습니다");
      }
        
      }catch(error){
        alert("잘못된 페이지 요청입니다");
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
        
        if (response.status === 200) {
          alert(response.message);
          this.$router.go();
          await this.getBookmarkList();

          console.log(this.bookmarkList);
        } else{
          alert("북마크를 삭제 할 수 없습니다")
        }
                      
      } catch (error) {
        alert("잘못된 요청입니다");
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
.invisible{
  display: none;
}

.no_data{
  text-align: center;
  font-size: 30px;
  color:#d3d3d3;
  padding: 200px;

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
    /* border: 1px solid #333333; */
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
