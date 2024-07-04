<template>
    <div class="sidbar_content_body">
  <div>
    <div class="d-flex" >
      <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">        
        <symbol id="table" viewBox="0 0 16 16">
          <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 2h-4v3h4V4zm0 4h-4v3h4V8zm0 4h-4v3h3a1 1 0 0 0 1-1v-2zm-5 3v-3H6v3h4zm-5 0v-3H1v2a1 1 0 0 0 1 1h3zm-4-4h4V8H1v3zm0-4h4V4H1v3zm5-3v3h4V4H6zm4 4H6v3h4V8z"/>
        </symbol>
        <symbol id="people-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </symbol>
        <symbol id="grid" viewBox="0 0 16 16">
          <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z"/>
        </symbol>        
        <symbol id="chat-quote-fill" viewBox="0 0 16 16">
          <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM7.194 6.766a1.688 1.688 0 0 0-.227-.272 1.467 1.467 0 0 0-.469-.324l-.008-.004A1.785 1.785 0 0 0 5.734 6C4.776 6 4 6.746 4 7.667c0 .92.776 1.666 1.734 1.666.343 0 .662-.095.931-.26-.137.389-.39.804-.81 1.22a.405.405 0 0 0 .011.59c.173.16.447.155.614-.01 1.334-1.329 1.37-2.758.941-3.706a2.461 2.461 0 0 0-.227-.4zM11 9.073c-.136.389-.39.804-.81 1.22a.405.405 0 0 0 .012.59c.172.16.446.155.613-.01 1.334-1.329 1.37-2.758.942-3.706a2.466 2.466 0 0 0-.228-.4 1.686 1.686 0 0 0-.227-.273 1.466 1.466 0 0 0-.469-.324l-.008-.004A1.785 1.785 0 0 0 10.07 6c-.957 0-1.734.746-1.734 1.667 0 .92.777 1.666 1.734 1.666.343 0 .662-.095.931-.26z"/>
        </symbol>
        <symbol id="tools" viewBox="0 0 16 16">
          <path d="M1 0L0 1l2.2 3.081a1 1 0 0 0 .815.419h.07a1 1 0 0 1 .708.293l2.675 2.675-2.617 2.654A3.003 3.003 0 0 0 0 13a3 3 0 1 0 5.878-.851l2.654-2.617.968.968-.305.914a1 1 0 0 0 .242 1.023l3.356 3.356a1 1 0 0 0 1.414 0l1.586-1.586a1 1 0 0 0 0-1.414l-3.356-3.356a1 1 0 0 0-1.023-.242L10.5 9.5l-.96-.96 2.68-2.643A3.005 3.005 0 0 0 16 3c0-.269-.035-.53-.102-.777l-2.14 2.141L12 4l-.364-1.757L13.777.102a3 3 0 0 0-3.675 3.68L7.462 6.46 4.793 3.793a1 1 0 0 1-.293-.707v-.071a1 1 0 0 0-.419-.814L1 0zm9.646 10.646a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708zM3 11l.471.242.529.026.287.445.445.287.026.529L5 13l-.242.471-.026.529-.445.287-.287.445-.529.026L3 15l-.471-.242L2 14.732l-.287-.445L1.268 14l-.026-.529L1 13l.242-.471.026-.529.445-.287.287-.445.529-.026L3 11z"/>
        </symbol>
      </svg>
      
      <div class="d-flex flex-column sidbar_container">
        <div class="sidebar_header_box d-flex justify-content-center">
            <div class="sidebar_header_box_text">로고 들어갈 자리</div>
        </div>
        <div class="sidebar_header_box d-flex justify-content-between" style="padding: 0px 20px;">
            <div class="sidebar_header_box_text" style="margin-top:4px;">로그인한 관리자 이름</div>
            <button class="sidebar_header_box_text" style="height:30px; border:none; color: black" @click="this.$logoutUser(); this.$router.push({path:'/'});">로그아웃</button>
        </div>
        <ul class="nav nav-pills flex-column mb-auto">
          <li class="nav-item sidbar_box sidbar_box_inactive">
            <a @click="$router.push({path: '/admin/itemlist'})" class="nav-link sidbar_box_inactive_text">
                <svg class="bi me-2" width="16" height="16" style="fill:rgb(255,255,255);"><use xlink:href="#grid"/></svg>
              상품 리스트
            </a>
          </li>
          <li class="nav-item sidbar_box sidbar_box_active">            
            <a @click="$router.push({path: '/admin/analysis'})" class="nav-link sidbar_box_active_text">
                <svg class="bi me-2" width="16" height="16"><use xlink:href="#table"/></svg>
                판매 현황
            </a>
          </li>
          <li class="nav-item sidbar_box sidbar_box_inactive">            
            <a @click="$router.push({path: '/admin/qna'})" class="nav-link sidbar_box_inactive_text">
                <svg class="bi me-2" width="16" height="16" style="fill:rgb(255,255,255);"><use xlink:href="#tools"/></svg>
                Q & A
            </a>
          </li>
          <li class="nav-item sidbar_box sidbar_box_inactive">
            <a @click="$router.push({path: '/admin/review'})" class="nav-link sidbar_box_inactive_text">
                <svg class="bi me-2" width="16" height="16" style="fill:rgb(255,255,255);"><use xlink:href="#chat-quote-fill"/></svg>
                리뷰 관리
            </a>
          </li>
          <li class="nav-item sidbar_box sidbar_box_inactive">
            <a @click="$router.push({path: '/admin/memberlist'})" class="nav-link sidbar_box_inactive_text">
                <svg class="bi me-2" width="16" height="16" style="fill:rgb(255,255,255);"><use xlink:href="#people-circle"/></svg>
                회원 관리
            </a>
          </li>
        </ul>
      </div>
      <div class="d-flex flex-column">
        <div class="sidbar_content_container container">
            <div class="sidbar_header d-flex justify-content-center">
                <div class="sidbar_header_title">판매 현황</div>
            </div>
            <div class="d-flex justify-content-start">
                <div style="margin-top: 50px; margin-left: 50px; font-size:23px; font-weight:bold;">품목별 판매 추이</div>
                <div style="margin-top: 50px; margin-left: 420px; font-size:23px; font-weight:bold;">총 상품별 판매 정보</div>
            </div>
            <div class="d-flex justify-content-start">
              <select @change="changePie(mode)" v-model="mode" style="margin-top:30px; margin-left:450px; width:150px; height:50px;" class="form-select">
                <option value="price" selected>매출</option>
                <option value="amount" @click="changePie(2)">판매량</option>
                <option value="review" @click="changePie(3)">리뷰 갯수</option>
              </select>
            </div>
            <div class="d-flex justyify-content-center">
              <GChart
                  type="PieChart"
                  :data="pieChartData"
                  :options="PieChartOptions"
                />
                <GChart
                  type="Table"
                  :data="itemTableData"
                  :options="itemTableDataOptions"
                  style="margin-top:-50px; margin-left: 650px; position: absolute"
                />
            </div>
            <div class="d-flex justify-content-start">
                <div style="margin-top: 50px; margin-left: 50px; font-size:23px; font-weight:bold;">이번 달 매출 분석</div>
            </div>
            <div class="d-flex justify-content-start">
                <div style="margin-top: 25px; margin-left: 50px; font-size:20px; ">총 판매금액 : {{ this.$numberFormat(dayTotalPrice) }}  , 일평균 판매금액 : {{ this.$numberFormat(dayAveragePrice) }}</div>
            </div>
            <div
             class="d-flex justyify-content-center">
              <GChart
                  type="LineChart"
                  :data="dayLineData"
                  :options="lineChartOptions"
                />
                <GChart
                  type="Table"
                  :data="dayTableData"
                  :options="tableChartOptions"
                  style="padding-top:60px; margin-left: 50px;"
                />
            </div>
            <div class="d-flex justify-content-start">
                <div style="margin-top: 50px; margin-left: 50px; font-size:23px; font-weight:bold;">올해 매출 분석</div>
            </div>
            <div class="d-flex justify-content-start">
                <div style="margin-top: 25px; margin-left: 50px; font-size:20px; ">총 판매금액 : {{ this.$numberFormat(monthTotalPrice) }}  , 월평균 판매금액 : {{ this.$numberFormat(monthAveragePrice) }}</div>
            </div>
            <div class="d-flex justyify-content-center">
              <GChart
                  type="LineChart"
                  :data="monthLineData"
                  :options="lineChartOptions"
                />
                <GChart
                  type="Table"
                  :data="monthTableData"
                  :options="tableChartOptions"
                  style="padding-top:60px; margin-left: 50px;"
                />
            </div>
            <div class="d-flex justify-content-start">
                <div style="margin-top: 50px; margin-left: 50px; font-size:23px; font-weight:bold;">최근 10년간 매출 분석</div>
            </div>
            <div class="d-flex justify-content-start">
                <div style="margin-top: 25px; margin-left: 50px; font-size:20px; ">총 판매금액 : {{ this.$numberFormat(yearTotalPrice) }}  , 연평균 판매금액 : {{ this.$numberFormat(yearAveragePrice) }}</div>
            </div>
            <div class="d-flex justyify-content-center">
              <GChart
                  type="LineChart"
                  :data="yearLineData"
                  :options="lineChartOptions"
                />
                <GChart
                  type="Table"
                  :data="yearTableData"
                  :options="tableChartOptions"
                  style="padding-top:60px; margin-left: 50px;"
                />
            </div>
        </div>
      </div>
    </div>
  </div>
    </div>
</template>
<script>
import { GChart } from 'vue-google-charts'

export default {
  components: {
    GChart
  },
  data () {
    return {
      mode: "price",
      dayTotalPrice: 0,
      monthTotalPrice: 0,
      yearTotalPrice: 0,
      dayAveragePrice: 0,
      monthAveragePrice: 0,
      yearAveragePrice: 0,
      
      dayLineData: [
        ['날짜', '판매량'],
        ['YYYY-MM-DD', 0],
      ],
      dayTableData: [
        ['날짜', '판매량', '판매 금액'],
        ['YYYY-MM-DD', 0, 0],
      ],
      monthLineData: [
        ['날짜', '판매량'],
        ['YYYY-MM', 0],
      ],
      monthTableData: [
        ['날짜', '판매량', '판매 금액'],
        ['YYYY-MM', 0, 0],
      ],
      yearLineData: [
        ['날짜', '판매량'],
        ['YYYY', 0],
      ],
      yearTableData: [
        ['날짜', '판매량', '판매 금액'],
        ['#', 0, 0],
      ],
      itemTableData:[
        ['상품명', '회사', '판매 금액', '판매 수량', '가격', '별점', '리뷰 수'],
        ['#', '#', '#', '#', 0, 0, 0],
      ],
      pieChartData:[
        ['카테고리', '금액']
      ],
      categoryPiePriceData: [],
      categoryPieAmountData: [],
      categoryPieReviewData: [],
      lineChartOptions: {
        width:730,
        height:400
      },
      tableChartOptions: {
        width:500,
        height:300
      },
      itemTableDataOptions: {
        width:650,
        height:400
      },
      PieChartOptions:{
        width:600,
        height:400
      }
    }
  },
  async created(){
    await this.getAnalysisData();
  },
  methods: {
    async getAnalysisData(){
      try{
        const requestBody = {
          "access_token": this.$getAccessToken()
        }
        const result = await this.$api("/order/analysis", requestBody, "POST");
        if (result.status == 200){
          this.dayLineData = result.day_line_data;
          this.dayTableData = result.day_table_data;
          this.monthLineData = result.month_line_data;
          this.monthTableData = result.month_table_data;
          this.yearLineData = result.year_line_data;
          this.yearTableData = result.year_table_data;
          this.itemTableData = result.item_table_data;
          this.categoryPiePriceData = result.category_pie_price_data;
          this.categoryPieAmountData = result.category_pie_amount_data;
          this.categoryPieReviewData = result.category_pie_review_data;
          this.pieChartData = this.categoryPiePriceData;
          for(let i in this.dayLineData){
            if (i==0){
              continue;
            }
            this.dayTotalPrice += Number(this.dayLineData[i][1]);  
          }
          for(let i in this.dayLineData){
            if (i==0){
              continue;
            }
            this.monthTotalPrice += this.monthLineData[i][1];  
          }
          for(let i in this.dayLineData){
            if (i==0){
              continue;
            }
            this.yearTotalPrice += this.yearLineData[i][1];  
          }
          this.dayAveragePrice = Math.ceil(this.dayTotalPrice / 30);
          this.monthAveragePrice = Math.ceil(this.monthTotalPrice / 12);
          this.yearAveragePrice = Math.ceil(this.yearTotalPrice / 10);
        }
        else{
          alert("분석 정보를 불러오는 데 실패하였습니다. 다시 시도하세요.");
          console.log(result.message);
        }
      }
      catch(err){
        console.error(err);
        alert("분석 정보를 불러오는 데 실패하였습니다. 다시 시도하세요.");
      }
    },
    changePie(mode){
      console.log(mode);
      if (mode == "price"){
        this.pieChartData = this.categoryPiePriceData;
      }
      if (mode == "amount"){
        this.pieChartData = this.categoryPieAmountData;
      }
      if (mode == "review"){
        this.pieChartData = this.categoryPieReviewData;
      }
      console.log(this.pieChartData);
    }

  }
  
}
</script>
<style scoped>
.sidbar_content_body{
  min-height: 100vh;
}
.sidbar_content_container{
    min-width: 1320px;      
    margin-left: 50px;
    min-height: 100vh;
}
.sidbar_container{
    width: 260px;
    background-color: #333333;
}
.sidebar_header_box{
    width:260px;
    height: 50px;
    padding-top: 15px;
}
.sidebar_header_box_text{
    font-size: 14px;
    color: #FFFFFF;
}
.sidbar_box{
    width:260px;
    height: 50px;
}
.sidbar_box_active{
    background-color: #F6C9CA;            
    font-size: 16px;
}
.sidbar_box_active_text{
    color: #111111;
    height: 50px;
    padding-top:11px;
}
.sidbar_box_inactive{
    background-color: #333333;            
    font-size: 16px;
}
.sidbar_box_inactive_text{
    color: #F5F5F5;
    height: 50px;
    padding-top:11px;
}
.sidbar_header{
    height: 130px;
    border-bottom: 1px solid #888888;
}
.sidbar_header_title{
  font-size: 30px;
  margin-top: 73px;
  font-weight: bold;
}

.admin_analysis_review_content {
  margin-top: 50px;
}

.admin_analysis_review-section {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 30px;
}

.admin_analysis_review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.admin_analysis_write-review-btn i {
  margin-right: 8px;
}

.admin_analysis_review-cards {
  display: flex;
  flex-wrap: wrap;
  /* gap: 20px; */
  justify-content: space-between;
}

.admin_analysis_review-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  width: 31%;
  padding: 10px;
  margin-bottom: 30px;
}

.admin_analysis_card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-bottom: 10px; */
}

.admin_analysis_card-header h5 {
  margin: 0;
  font-size: 16px;
}

.admin_analysis_card-header span {
  font-size: 12px;
  color: #888;
}

.admin_analysis_card-icons {
  display: flex;
  gap: 10px;
}

.admin_analysis_card-icons i {
  cursor: pointer;
}

.admin_analysis_card-img-top {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.admin_analysis_card-body {
  padding: 10px;
}

.admin_analysis_card-rating {
  font-size: 14px;
  margin-bottom: 10px;
}

.admin_analysis_card-text {
  font-size: 14px;
  color: #333333;
  line-height: 1.5;
}

.admin_analysis_review-section_title-div {
  font-size: 14px;
}

.admin_analysis_review-section_title-div {
  display: flex;
  justify-content: space-between;
}

.admin_analysis_review-section_date-div {
  font-size: 12px;
}

.admin_analysis_select{
  width: 160px;
  text-align: left;
}
.admin_analysis_input{
  width:245px;
  margin-right: 5px;
}
.admin_analysis_btn_active{
  background-color: #007BFF;
  color: #FFFFFF;
  margin-right: 10px;
}
.admin_analysis_btn_inactive{
  background-color: #333333;
  color: #111111;
  margin-right: 10px;
}

.admin_analysis_qna-section {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 70px;
  /* background-color: green; */
  font-size: 14px;
  text-align: center;
}
.admin_analysis_qna-table {
  width: 100%;
  border-collapse: collapse;
}

.admin_analysis_qna-table th,
.admin_analysis_qna-table td {
  border: 1px solid #e0e0e0;
  padding: 10px;
}

.admin_analysis_qna-table th {
  background-color: #f7f7f7;
}

.admin_analysis_qna-status {
  display: inline-block;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  width: 90px;
}

.admin_analysis_qna-status.incomplete {
  background-color: white;
  color: #007bff;
  border: 1px solid #007bff;
  width: 90px;
  padding: 5px 10px;
}

.admin_analysis_qna-section_status-title-div {
  display: flex;
  gap: 20px;
  align-items: center;
}
.admin_analysis_table{
    font-size: 12px;
}
.admin_analysis_block_btn_active{
    width:65px;
    font-size: 12px;
    background-color: #007BFF;
    color: #FFFFFF
}
.admin_analysis_unblock_btn_active{
    width:65px;
    font-size: 12px;
    background-color: #FFFFFF;
    color: #111111;
    border: 1px solid #333333;
}
</style>