<template>
<!-- 헤더 아래 script랑 <style scoped>까지 다 복붙해서 사용-->
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
                  <li >독립 패키지</li>
                  <li @click="goToProductDetailList('Dress')">스튜디오</li>
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
</template>


<script>
export default {
  data() {
    return {
      isVisible: false,
      ismaintain: false,
    };
  },
  methods: {
    showCategories() {
      this.isVisible = true;
    },
    hideCategories() {
      this.isVisible = false;
    },
      goToItemPage(itemType) {
      this.$router.push({ name: 'productdetaillist', params: { itemType } });
    }
  },
};
</script>


<style scoped>
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
</style>
