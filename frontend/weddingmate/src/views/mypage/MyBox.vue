<template>
  <div>
  <MateHeader />
    <div class="fix-width">
      <!-- 헤더 -->
      
      <!-- 본문 -->
      <div class="container0" >
        <div class="container-top">
          <div class="container-top-content" >
            <div class="content-boxname" v-if="!editingBoxName">{{ box.box_name }}</div>
            <textarea class="content-boxname2" v-if="editingBoxName" v-model="box.box_name"></textarea>
         
            <hr class="column" />
            <div class="container-top-button">
              <!-- 버튼 클릭시 수정 DB 업데이트 -->
              <!-- 수정 버튼 클릭 시 견적함이름이 인풋으로 변환 -> 이름 수정 -> 다시 수정 누르면 백단으로 이름 송신 -->
              <button class="boxname_edit" @click="editBoxName" v-if="!editingBoxName">수정</button>
              <button type="submit" class="boxname_edit2" @click="updateBoxName(box.box_name)" v-if="editingBoxName">저장
            
              </button>
              <button class="boxdelete" @click="deleteBox(box.boxId)">삭제</button>
            </div>
          </div>
        </div>
        <div class="container-middle" v-for="item in itemDetails" :key="item" >
          <div class="container-middle-category_title">
            <div class="title-font">
             {{ getClass(item.item_detail_type) }}
            </div>
            <div>
              <hr class="title" />
            </div>
          </div>
          <table>
            <colgroup>
              <col />
              <col />
              <col />
            </colgroup>
            <tr class="tr1">
              <td>상품/옵션 정보</td>
              <td>금액</td>
              <td>변경</td>
            </tr>
            <tr>
              <td>
                <div class="container-table_col1">
                  <!-- <input type="checkbox" /> -->
                  <img class="bookmark" src="http://localhost:8080/icon/icon.png" />
                  <div class="content-table_col1">
                    <div class="content-table_col1-name">
                      <!-- 제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목제목 -->
                      {{ item.item_name }}
                    </div>
                    <div class="content-table_col1-option">
                      <div>
                        {{ optionKorean(item) }}
                      </div>
                    </div>
                    
                  </div>
                </div>
              </td>
              <td>{{$numberFormat(item.box_item_total_price)}}</td>
              <!-- <td>999,999,999,999,999</td> -->
              <td><button class="boxdelete" @click="DelItem(item.box_item_id)">삭제</button></td>
            </tr>
           
          </table>
         
        </div>
       
        <div class="container-pay">
          <div class="paycontent">
            <div class="sellitle">판매가격</div>
            <div class="sellcost"><span>{{ this.$numberFormat(order_info.order_total_price) }}</span>원</div>
            <!-- <div class="sellcost"><span>선택된 체크리스트 금액 합계</span>원</div> -->
          </div>
          <div><img class="icon" src="http://localhost:8080/icon/icon.png" /></div>
          <div class="paycontent">
            <div class="sellitle">할인금액</div>
            <div class="sellcost"><span>{{ this.$numberFormat(order_info.order_sale_price) }}</span>원</div>
          </div>
          <div><img class="icon" src="http://localhost:8080/icon/icon.png" /></div>
          <div class="paycontent">
            <div class="sellitle">합계</div>
            <div class="sellcost"><span>{{ this.$numberFormat(order_info.order_price) }}</span>원</div>
          </div>
        </div>
        <div class="container_boxbutton3">
          <!-- <button class="order" >주문 하기</button> -->
          <button class="order" @click="goToOrder_info(box.box_id)">주문 하기</button>
        </div>
        <div class="mypage-bottom">
          <button class="mypage-back" @click="$router.push({path:`/mypage`})">마이페이지로</button>
        </div>
      </div> 
      <!-- 푸터 -->
      
    </div>
    <MateFooter />
  </div>
  </template>
  
  
  <script>
  export default {

    data() {
      return {
        // 헤더
        isVisible: false,
        ismaintain: false,
        // 본문
        itemList:[],
        page: 1,
        maxPage: 0,
        boxId:{},
        iType:[],
        categories: [],
        itemDetails:[],
        box_item_id:{},
        box_name : {},
        box : {},
        order: {},
        //박스 이름 수정 여부 
        editableBoxName:'',
        editingBoxName: false,
        //박스 이름 수정 모달창
        updateBoxModal: false,
      itemTnImage: null,
      itemTnImageExt: null,
      itemMainImage: null,
      itemMainImageExt: null,
      itemDetailImage: null,
      itemDetailImageExt: null,
      order_info:
          {
            "order_total_price": 0,
            "order_sale_price":0,
            "order_price":0,
          }
      };
    },
    computed:{
    },
    mounted(){
      this.fetchItem();
      // this.goOrderInfo();
    },
    methods: {
      
      //개별 상품 제거 
      async DelItem(box_item_id){
      const requestBody = {
        access_token: this.$getAccessToken(),
        box_item_id: box_item_id
      }
      try{
        const resId = await this.$api("/mybox/del",requestBody,"POST");
        console.log(resId);

        if(resId.status === 200){
          await this.fetchItem();
          this.$router.go();
        }
      }catch(error){
        console.error(error);
      }
    },
    //견적함 지우기
    async deleteBox(boxId){
      
     const requestBody = {
        access_token: this.$getAccessToken(),
        boxId:this.$route.params.boxId
      }
      console.log(requestBody)
      console.log(boxId);
      try{
        const delectbox = await this.$api("/mybox/delectbox",requestBody,"POST")
        console.log(delectbox);
        if(delectbox.status === 200){
          await this.fetchItem();
          this.$router.go();
        }
      }catch(error){
        console.log(error);
      }
    },


    async updateBoxName(box_name){
      const requestBody = {
        box_name : box_name,
        boxId:this.boxId
      }
      const update = await this.$api("/mybox/update",requestBody,"POST")
      // this.box_name = update.boxNameUpdate;
      
      try{
        if(update.status === 200){
          await this.fetchItem();
          this.$router.go();
        }
        // if(editingBoxName == true){
          
        // }
      }catch(error){
        console.error(error);
      }
    },
      editBoxName(){
        //저장버튼 생성
        this.editableBoxName = this.box_name;
        this.editingBoxName = true; 
      },
      saveBoxName(){
        this.box_name = this.editableBoxName
        this.editingBoxName = false;
      },
         //견적함 상세 정보 가져오기 
      async fetchItem(){
        try{
        this.boxId = this.$route.params.boxId
          const responseBody  ={
            access_token : this.$getAccessToken(),
            boxId:this.boxId
          }
          const response = await this.$api(`/mybox/name`,responseBody,"POST")
          console.log(response);
          const iName = response.box_itemName.map((item_name)=> item_name);
          //아이템 이름을 담고 있는 배열 iName
          this.itemDetails = iName.reduce((item_name, now)=>{
            if(!item_name.some (obj => obj.item_detail_id === now.item_detail_id)){
              item_name.push(now);
            }
            return item_name;
          },[])
          

          // 각 아이템들을 하나의 카테고리에 합치기 
          console.log(this.itemDetails);
          this.box = response.box_itemObj;
          console.log(this.box);
          this.makeOrderInfo();
          
          }catch(err){
            console.error(err)
          }
        },
       optionKorean(item){
           let resultString = "";
            for ( let key in item ){
              if (key=='box_item_id' || key=='user_id' || key == 'box_id' || key == 'item_id' || key == 'item_detail_type' || key == 'item_name' || key == 'item_price' || key == 'box_item_total_price' || key == 'item_detail_id' || key == 'box_name'){
              continue 
              }
              if(!item[key]){
                continue
              }
              let keyKorenName = this.func(key);
              if (!keyKorenName){
                console.log("conversion error : " + key)
              }
              resultString += keyKorenName +  " : " + item[key] + "    ";
            }
            //아이템 카테고리에 맞게 속성을 넣어주겠금한다. 
            
            console.log(resultString);
           return resultString;
       },
       //아이템 옵션 한글화
       func(item){
        if (item == 'item_detail_color'){
          return "색상";
        }else if(item == 'item_detail_size') { 
           return "사이즈"
        }else if(item == 'item_detail_quantity'){
          return "재고"
        }else if(item == 'item_detail_local'){
          return "지역"
        }else if(item == 'item_detail_loc'){
          return "야외-실내"
        }else if(item == 'item_detail_makeup'){
          return "메이크업"
        }else if(item == 'item_detail_heel_height'){
          return "힐 높이"
        }else if(item == 'item_detail_flower_life'){
          return "부케 생,조화"
        }else if(item == 'item_detail_quality'){
          return "퀄리티"
        }else if(item == 'item_detail_kind'){
          return "종류"
        }else if(item == 'item_detail_ticket'){
          return "식권인원"
        }else if(item == 'item_discount_rate'){
          return "할인율"
        }   
      },
    //아이템 카테고리 한글화 
    getClass(item) {    
      // 웨딩홀
      if (item === "hall") {
        return "웨딩홀"
      }
      // 드레스
      else if (item === "dress") {
        return "드레스"
      }
      // 스튜디오
      else if (item === "studio") {
        return "스튜디오";
      }
      // 메이크업
      else if (item === "makeup") {
        return "메이크업";
      }
      // 스드메
      else if (item === "sdm_package") {
        return "스드메";
      }
      // 예복
      else if (item === "giving_dress") {
        return "예복";
      }
      // 예복
      else if (item === "giving_item") {
        return "예물";
      }
      // 가전
      else if (item === "giving_mechine") {
        return "가전";
      }
      // 혼수 패키지
      else if (item === "giving_package") {
        return  "혼수패키지";
      }
      // 본식스냅
      else if (item === "snap") {
        return "본식스냅";
      }
      // 영상
      else if (item === "video") {
        return "영상";
      }
      // 부케
      else if (item === "flower") {
        return "부케";
      }
      // 연주
      else if (item === "music") {
        return "연주"
      }
      // 사회자
      else if (item === "mc") {
        return "사회자"
      }
      // 웨딩슈즈
      else if (item === "shoes") {
        return "웨딩슈즈"
      }
      // 답례품
      else if (item === "gift") {
        return "답례품"
      }
      // 청첩장
      else if (item === "letter") {
        return "청첩장"
      }
    },
    //아이템 가격 계산
    makeOrderInfo(){
        for(let i = 0; i < this.itemDetails.length; i++){
          this.order_info.order_total_price += this.itemDetails[i].box_item_total_price;
        }

        for(let i = 0; i < this.itemDetails.length; i++){
          this.order_info.order_sale_price += Math.ceil((this.itemDetails[i].box_item_total_price * (this.itemDetails[i].item_discount_rate/100)));
          console.log(this.itemDetails[i].box_item_total_price , this.itemDetails[i].item_discount_rate);
        }
        this.order_info.order_price = this.order_info.order_total_price - this.order_info.order_sale_price;
    },

    async goToOrder_info(boxId)
    {
      // const requestBody={
      //   access_token: this.$getAccessToken(),
      //   boxId:this.$route.params.boxId
      // }
      // const response = await this.$api(`/mybox/order`,requestBody,"POST")
      // console.log(response)
      try{
        this.$router.push({name:'Orderinfo',
                           params:{boxId:this.itemDetails[boxId].box_id}             })
      
        
        //status 상태로 200이면 route  Else 일시 얼럿으로 주문을 할 수 없습니다. 이면 버튼 잠그기
      }catch(err){
        console.log(err);
        
      }
    }
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
div, table{
  font-family: 'Noto Sans KR', sans-serif;
    /* transform : rotate(0.03deg); */
}


/* font */
    
div.title-font{
display: grid;
text-align: left;
color: #333333;
font-size: 24px;
font-weight: bold;
}

/* div */

.container0{
min-width: var(--container-width);
}

.container-top{
margin-left: var(--container-margin-left);
margin-right: var(--container-margin-right);
margin-top: 100px;
margin-bottom: 50px;
height: 200px;
width: var(--container-width);
display: grid;
align-items: center;   
background-color: #f5f5f5;
border-radius: 10px; 
/* border: 1px solid pink;  */
}
.container-top-content{
display: grid;
grid-template-columns: 720px 190px 200px;
align-items: center;       
margin-top: 20px; 
margin-left: 70px;
box-sizing: border-box;
color:#888888;
/* border: 1px solid blue; */
}
.container-top-button{
display: grid;
grid-template-columns:auto auto;
justify-items: center;
grid-column-gap: 10px;
}
.content-boxname{
display: grid;
justify-items: center;
font-size: 24px;
font-weight: bold;
color:#555555;
/* border: 1px solid red; */
}
.content-boxname2{
display: grid;
justify-items: center;
font-size: 24px;
font-weight: bold;
color:#555555;
/* border: 1px solid red; */
}

.container-middle{
margin-left: var(--container-margin-left);
margin-right: var(--container-margin-right);
margin-top: 50px;
width: var(--container-width); 
/* border: 1px solid red; */
}
.container-middle-category_title{          
width: var(--container-width);
margin-top: 50px;
font-size: 24;
/* border: 1px solid green; */
}

.container-table_col1{
display: grid;
grid-template-columns: 30px 140px auto;
justify-items: start;
align-items: start;
width: 748px; /* 고정된 너비 */    
padding: 10px;
box-sizing: border-box;
/* border: 1px solid yellow; */
}
.content-table_col1{
display: flex;
flex-direction: column;
text-align: left;
margin-left:120px ;
/* border: 1px solid red;             */
}
.content-table_col1-name{
display: flex;
flex-direction: column;
text-align: left;
/* border: 1px solid green;             */
}
.content-table_col1-option{
display: flex;
flex-direction: column;
text-align: left;
width: 400px;
font-size: 12px;
color: #888888;
word-wrap: break-word; /* 글자가 너무 길 경우 줄 바꿈 */
word-break: break-all; /* 글자가 너무 길 경우 단어 단위로 줄 바꿈 */ 
/* border: 1px solid blue;   */         
}

.container-pay{
margin-left: var(--container-margin-left);
margin-right: var(--container-margin-right);
width: var(--container-width);
height: 200px;
display: grid;
grid-template-columns: 500px 100px 200px 100px 250px;
justify-items: end;  
align-items: center;
padding: 30px;
box-sizing: border-box;
border: 1px solid #c2c2c2;
}

.container_boxbutton2{
margin-left: var(--container-margin-left);
margin-right: var(--container-margin-right);
margin-top: 20px;
margin-bottom: 20px;
width: var(--container-width);
display: grid;
grid-template-columns: 105px 100px;
/* border: 1px solid red; */
}
.container_boxbutton3{
display: grid;
justify-items: end;
margin-left: var(--container-margin-left);
margin-right: var(--container-margin-right);
margin-top: 20px;
margin-bottom: 20px;
width: var(--container-width);
/* border: 1px solid red;; */
}

/* hr */ 
hr.title{
width: 100%;
height: 1px; /* Set the height to 1px */
background-color: #888888; /* Set a lighter color */
border: none; /* Remove border */
}

hr.column{
border: 1px solid #d3d3d3;
width: 0.1px;
height: 100px;
}

/* button */

button.boxdelete{
background-color: var(--color-buttongray);
color:white;
border: none;
border-radius: 12px;
width: 100px;
height: 30px;
font-weight: bold;
}
button.boxdeleteall{
background-color: var(--color-buttongray);
color:white;
border: none;
border-radius: 12px;
width: 120px;
height: 30px;
font-weight: bold;
}
button.boxname_edit{
background-color: var(--color-pink);
color:white;
border: none;
border-radius: 12px;
width: 100px;
height: 30px;
font-weight: bold;
}
button.boxname_edit2{
background-color: var(--color-pink);
color:white;
border: none;
border-radius: 12px;
width: 100px;
height: 30px;
font-weight: bold;
}
button.boxallselect{
background-color: var(--color-pink);
color:white;
border: none;
border-radius: 12px;
width: 100px;
height: 30px;
font-weight: bold;
}
button.order{
background-color: var(--color-pink);
color:white;
border: none;
border-radius: 12px;
width: 120px;
height: 50px;
font-size:20px;
font-weight: bold;
}

/* img */ 
img.bookmark{
width: 120px;
height: 120px;
border: 1px solid #333333;
}

img.icon{
height: 30px;
width: 30px;
border: 1px solid #333333;
}

/* table */
table {
width: 1280px;
margin: auto;
border-collapse: collapse; /* 셀 간격을 없애기 위해 collapse 사용 */
table-layout: fixed; /* 고정 레이아웃 */
}

th, td {
padding: 10px; /* 각 셀의 내부 여백 */
border: 1px solid #c2c2c2; /* 각 셀의 경계선 */
}
tr.tr1{
font-weight: bold;
}

/* 각 열의 비율 설정 */
colgroup col:nth-child(1) {
width: 60%; /* 첫 번째 열의 너비 50% */
}
colgroup col:nth-child(2) {
width: 20%; /* 두 번째 열의 너비 30% */
}
colgroup col:nth-child(3) {
width: 20%; /* 세 번째 열의 너비 25% */
}

/* 첫 번째 행 중앙 정렬 */
tr, td {
text-align: center;
}

div.paycontent{
text-align: right;
}
div.sellitle{
font-size: 20px;
}
div.sellcost{
font-size: 20px;
}
.sellcost > span {
font-weight: bold;
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
/* 수정 모달 창 */
.black-bg {
  width: 100%; height:100%;
  background: rgba(0,0,0,0.5);
  position: fixed; padding: 20px;
}
.white-bg {
  width: 100%; background: white;
  border-radius: 8px;
  padding: 20px;
} 
  </style>
  