<template>
  <div>
    <MateHeader />
    <!-- 본문 -->
    <div class="container0">
        <div class="container-top">
          <!-- <hr class="title"> -->
      </div>
    <div class="container-middle">
        <div class="container-middle-profile">
            <div class="content-profile">
                <div class="font-nickname"><span>{{ user }}</span>님</div>
                <button class="profile" @click="this.$router.push({path: '/mypage/edit'})">정보수정</button>
            </div>
        </div>
        <div class="container-middle-mymenu">
            <div class="content-mymenu_list">
                <div class="content-mymenu" style="cursor: pointer;" @click="this.$router.push({path:'/mypage/bookmark'})">
                  <img class="icon" src="/icon/heart-solid.svg">
                  <div class="font-menu">찜</div>
                </div>
                <div class="content-mymenu" style="cursor: pointer;" @click="this.$router.push({path:'/mypage/boxlist'})">
                    <img class="icon" src="/icon/folder-solid.svg" >
                    <div class="font-menu">견적함</div>
                </div>
                <div class="content-mymenu" style="cursor: pointer;" @click="this.$router.push({path:'/mypage/schedule'})"  >
                  <img class="icon" src="/icon/calendar-regular.svg">
                  <div class="font-menu">스케쥴</div>
                </div>
                <div class="content-mymenu" style="cursor: pointer;" @click="this.$router.push({path:'/mypage/review'})">
                  <img class="icon" src="/icon/pencil-solid.svg">
                  <div class="font-menu">나의리뷰</div>
                </div>
                <div class="content-mymenu" style="cursor: pointer;" @click="this.$router.push({path:'/mypage/qna'})">
                  <img class="icon" src="/icon/message-regular.svg">
                  <div class="font-menu">나의QnA</div>
                </div>
                <div class="content-mymenu" style="cursor: pointer;" @click="this.$router.push({path:'/mypage/payment'})">
                  <img class="icon" src="/icon/credit-card-regular.svg">
                  <div class="font-menu">결제내역</div>
                </div>   
            </div>
        </div>
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
      selectedItemType: "",
      user: ""

    };
  },
    created(){
      this.getUserName();
  },


  methods: {
    // 본문

  // 본문

  async getUserName(){
    try{

      // $verifiedUser를 통해 쿠키의 user 정보를 가져옴. 
      const user = await this.$verifiedUser();
      this.user =  user.user_nickname;

      if(!this. user){
        alert("로그인이 필요합니다");
        this.$router.push({
          name: "userlogin",
          query: { savedUrl: true },
        });
      }
    } catch(err){
      console.error(err);
      alert("잘못된 요청입니다");
      this.$router.push({
          name: "userlogin",
          query: { savedUrl: true },
        });
    }

    
    //페이지   
  },
}
}
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
.font-nickname{
    font-size: 24px;
}
.font-nickname > span{
    font-weight: bold;
}
.font-menu{
  color:#888888
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
    /* border: 1px solid BLUE; */
}

.container-middle{          
    margin-left: 350px;
    margin-right: 320px;
    margin-bottom: 20px;
    margin-top:10px;
    width: var(--container-width);
    display: grid;
    grid-template-columns: 500px auto ;
    padding: 20px;
    box-sizing: border-box;
    /* border: 1px solid red; */
}
.container-middle-profile{         
    height: 500px;
    box-sizing: border-box;
    /* border: 1px solid salmon; */

}
.content-profile {
    height: 500px;
    display: flex; 
    flex-direction: column;
    justify-content: center; 
    align-items: center; 
    box-sizing: border-box;
    /* border: 1px solid green; */

}
.container-middle-mymenu{    
    display: grid;
    align-items: center;
    padding: 20px;     
    box-sizing: border-box;
    background-color: #f5f5f5;
    /* border: 1px solid pink; */

}
.content-mymenu_list{          
    display: grid;  
    place-items: center;
    align-items: center;
    grid-row-gap: 100px;
    grid-template-columns: auto auto auto;
    /* border: 1px solid blue; */
}
.content-mymenu{
    display: flex;
    flex-direction: column;
    place-items: center;
    font-weight: bold;
    /* border: 1px solid red; */
}
.content-mymenu .icon {
    margin-bottom: 15px; /* 예시로 이미지 아래쪽에 10px의 마진을 줍니다 */
}

/* hr */

hr.title{
    width: 100%;
    height: 1px;
    background-color: #888888; 
    border: none; 
}

/* button */

button.profile{
  margin-top:5px;
  width: 90px;
  height: 30px;
    border-radius: 10px;
    background-color: var(--color-pink);
    color: white;
    border: none;
}

/* img */

img.icon{
    width: 100px;
    height: 100px;
}
</style>