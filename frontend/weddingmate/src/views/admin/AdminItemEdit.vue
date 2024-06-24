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
          <li class="nav-item sidbar_box sidbar_box_active">
            <a @click="$router.push({path: '/admin/itemlist'})" class="nav-link sidbar_box_active_text">
                <svg class="bi me-2" width="16" height="16"><use xlink:href="#grid"/></svg>
              상품 리스트
            </a>
          </li>
          <li class="nav-item sidbar_box sidbar_box_inactive">            
            <a @click="$router.push({path: '/admin/analysis'})" class="nav-link sidbar_box_inactive_text">
                <svg class="bi me-2" width="16" height="16" style="fill:rgb(255,255,255);"><use xlink:href="#table"/></svg>
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
                <div class="sidbar_header_title">상품 추가</div>
            </div>
            <div class="d-flex justify-content-center admin_item_add_small_gap">
                <div class="admin_item_add_row d-flex justify-content-start">
                    <div class="admin_item_add_text">상품명</div>
                    <input class="admin_item_add_input" type="text">
                </div>
            </div>
            <div class="d-flex justify-content-center admin_item_add_small_gap">
                <div class="admin_item_add_row d-flex justify-content-start">
                    <div class="admin_item_add_text">업체명</div>
                    <input class="admin_item_add_input" type="text">
                </div>
            </div>
            <div class="d-flex justify-content-center admin_item_add_small_gap">
                <div class="admin_item_add_row d-flex justify-content-start">
                    <div class="admin_item_add_text">가격</div>
                    <input class="admin_item_add_input" type="text" style="width: 300px;">
                    <div class="admin_item_add_text">원</div>                    
                </div>
            </div>
            <div class="d-flex justify-content-center admin_item_add_big_gap">
                <div class="admin_item_add_row d-flex justify-content-start">
                    <div class="admin_item_add_text">할인율</div>
                    <input class="admin_item_add_input" type="text" style="width: 200px;">
                    <div class="admin_item_add_text">%</div>                    
                </div>
            </div>
            <!-- 카테고리 선택 -->
            <div class="d-flex justify-content-center admin_item_add_big_gap">
                <div class="admin_item_add_row d-flex justify-content-start">
                    <select class="form-select" disabled>
                        <option >웨딩홀</option>
                        <option value="">스드메 독립 패키지</option>
                        <option value="">스튜디오</option>
                        <option value="">드레스</option>
                        <option value="">메이크업</option>
                        <option value="">예복</option>
                        <option value="">예물</option>
                        <option value="">가전</option>
                        <option value="">혼수 패키지</option>
                        <option value="">본식스냅</option>
                        <option value="">영상</option>
                        <option value="">부케</option>
                        <option value="">연주</option>
                        <option value="">사회자</option>
                        <option value="">웨딩슈즈</option>
                        <option value="">답례품</option>
                        <option value="">청첩장</option>
                    </select>
                </div>
            </div>
            <!-- 옵션 추가 버튼 -->
            <div>
                <div class="d-flex justify-content-center admin_item_add_select_gap">
                    <div class="d-flex justify-content-start" style="width:600px;">
                        <div class="admin_item_add_text">사이즈</div>                        
                        <button class="admin_item_add_button">
                            <i class="fas fa-plus"></i>
                        </button>               
                    </div>                
                </div>      
            </div>
            <!-- 옵션 추가 내역 -->
            <div class="d-flex justify-content-center">
                <div class="admin_item_add_row d-flex justify-content-center admin_item_add_select_gap">
                    <input class="admin_item_add_option" type="text" style="height: 50px;">
                    <button class="admin_item_add_minus_icon">
                        <i class="fas fa-minus"></i>
                    </button>
                </div>
            </div>
            <!-- 재고 -->
            <div class="d-flex justify-content-center admin_item_add_big_gap">
                <div class="admin_item_add_row d-flex justify-content-start">
                    <div class="admin_item_add_text">재고</div>
                    <input class="admin_item_add_input" type="text" style="width: 200px;">
                </div>
            </div>
            <!-- 토글 -->
            <div class="d-flex justify-content-center admin_item_add_big_gap">
                <div class="admin_item_add_row d-flex justify-content-start">
                    <div class="admin_item_add_text">재고</div>
                    <button type="button" class="admin_item_add_input_active" style="margin-left:35px;">야외</button>
                    <button type="button" class="admin_item_add_input_inactive" style="margin-left:10px;">실내</button>
                </div>
            </div>

            <div class="d-flex justify-content-center admin_item_add_big_gap" style="margin-top: 100px;">
                <button type="button" class="admin_item_add_cancel_button" >취소</button>
                <button type="button" class="admin_item_add_ok_button" style="margin-left:10px;">등록</button>
            </div>
        </div>
      </div>
    </div>
  </div>
    </div>
</template>

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
    margin-bottom: 40px;
}
.sidbar_header_title{
  font-size: 30px;
  margin-top: 73px;
  font-weight: bold;
}

.admin_item_add_review_content {
  margin-top: 50px;
}

.admin_item_add_review-section {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 30px;
}

.admin_item_add_review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.admin_item_add_write-review-btn i {
  margin-right: 8px;
}

.admin_item_add_review-cards {
  display: flex;
  flex-wrap: wrap;
  /* gap: 20px; */
  justify-content: space-between;
}

.admin_item_add_review-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  width: 31%;
  padding: 10px;
  margin-bottom: 30px;
}

.admin_item_add_card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-bottom: 10px; */
}

.admin_item_add_card-header h5 {
  margin: 0;
  font-size: 16px;
}

.admin_item_add_card-header span {
  font-size: 12px;
  color: #888;
}

.admin_item_add_card-icons {
  display: flex;
  gap: 10px;
}

.admin_item_add_card-icons i {
  cursor: pointer;
}

.admin_item_add_card-img-top {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.admin_item_add_card-body {
  padding: 10px;
}

.admin_item_add_card-rating {
  font-size: 14px;
  margin-bottom: 10px;
}

.admin_item_add_card-text {
  font-size: 14px;
  color: #333333;
  line-height: 1.5;
}

.admin_item_add_review-section_title-div {
  font-size: 14px;
}

.admin_item_add_review-section_title-div {
  display: flex;
  justify-content: space-between;
}

.admin_item_add_review-section_date-div {
  font-size: 12px;
}

.admin_item_add_select{
  width: 160px;
  text-align: left;
}
.admin_item_add_input{
  width:245px;
  margin-right: 5px;
}
.admin_item_add_btn_active{
  background-color: #007BFF;
  color: #FFFFFF;
  margin-right: 10px;
}
.admin_item_add_btn_inactive{
  background-color: #333333;
  color: #111111;
  margin-right: 10px;
}

.admin_item_add_qna-section {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 70px;
  /* background-color: green; */
  font-size: 14px;
  text-align: center;
}
.admin_item_add_qna-table {
  width: 100%;
  border-collapse: collapse;
}

.admin_item_add_qna-table th,
.admin_item_add_qna-table td {
  border: 1px solid #e0e0e0;
  padding: 10px;
}

.admin_item_add_qna-table th {
  background-color: #f7f7f7;
}

.admin_item_add_qna-status {
  display: inline-block;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  width: 90px;
}

.admin_item_add_qna-status.incomplete {
  background-color: white;
  color: #007bff;
  border: 1px solid #007bff;
  width: 90px;
  padding: 5px 10px;
}

.admin_item_add_qna-section_status-title-div {
  display: flex;
  gap: 20px;
  align-items: center;
}
.admin_item_add_table{
    font-size: 12px;
}
.admin_item_add_block_btn_active{
    width:65px;
    font-size: 12px;
    background-color: #007BFF;
    color: #FFFFFF
}
.admin_item_add_unblock_btn_active{
    width:65px;
    font-size: 12px;
    background-color: #FFFFFF;
    color: #111111;
    border: 1px solid #333333;
}
.admin_item_add_row{
    height: 70px;
    width: 600px;
}
.admin_item_add_small_gap{
    margin-bottom: 20px;
}
.admin_item_add_big_gap{
    margin-bottom: 40px;
}   
.admin_item_add_small_gap{
    margin-bottom: 20px;
}
.admin_item_add_select_gap{
    margin-bottom: 5px;
}            
.admin_item_add_text{
    margin-top:20px;
    font-size: 16px;
    color: #555555;
    width:70px;
} 
.admin_item_add_input{
    margin-left: 38px;
    border-radius: 12px;
    width:500px;
    border: 1px solid #888888;
    background-color: #FFFFFF;
    padding-left: 24px;
    font-size:16px;
    color: #666666;
}        
.admin_item_add_button{
    width: 30px;
    height: 30px;
    border-radius: 50px;
    background-color: #333333;
    color: #FFFFFF;
    font-weight: lighter;
    margin-top: 18px;
}
.admin_item_add_option{
    border-radius: 12px;
    width:500px;
    border: 1px solid #888888;
    background-color: #FFFFFF;
    padding-left: 24px;
    font-size:16px;
    color: #666666;
}
.admin_item_add_minus_icon{
    position: absolute;
    width: 30px;
    height: 30px;
    border-radius: 50px;
    background-color: #FFFFFF;
    color: #333333;
    font-weight: lighter;
    margin-top: 11px;
    margin-left:450px;
}
.admin_item_add_input_inactive{
    border-radius: 12px;
    width:100px;
    border: 1px solid #888888;
    background-color: #FFFFFF;
    font-size:16px;
    color: #333333;
}          
.admin_item_add_input_active{
    border-radius: 12px;
    width:100px;
    border: 1px solid #FFFFFF;
    background-color: #007BFF;
    font-size:16px;
    color: #FFFFFF;
}          
.admin_item_add_ok_button{
    width:300px;
    height:80px;
    border-radius: 12px;
    font-size:28px;
    color: #F5F5F5;
    border: none;
    background-color: #F6C9CA;
}
.admin_item_add_cancel_button{
    width:300px;
    height:80px;
    border-radius: 12px;
    font-size:28px;
    color: #F5F5F5;
    border: none;
    background-color: #333333;
}
</style>