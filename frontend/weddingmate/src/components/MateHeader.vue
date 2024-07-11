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
            <ul class="navbar-nav flex-row" v-if="this.$getAccessToken()">
              <li class="nav-item" id="common__header-login-padding">
                <button
                  @click="
                    this.$logoutUser();
                    this.$router.push({ path: '/' });
                  "
                  style="border: none; background-color: #f8fafc"
                >
                  로그아웃
                </button>
              </li>
              <li class="nav-item">
                <button
                  @click="this.$router.push({ path: '/mypage' })"
                  style="border: none; background-color: #f8fafc"
                >
                  마이페이지
                </button>
              </li>
            </ul>
            <ul class="navbar-nav flex-row" v-if="!this.$getAccessToken()">
              <li class="nav-item" id="common__header-login-padding">
                <button
                  @click="this.$router.push({ path: '/userlogin' })"
                  style="border: none; background-color: #f8fafc"
                >
                  로그인
                </button>
              </li>
              <li class="nav-item">
                <button
                  @click="this.$router.push({ path: '/terms' })"
                  style="border: none; background-color: #f8fafc"
                >
                  회원가입
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <!-- 로고 -->
      <div class="text-center">
        <a class="navbar-brand" @click="this.$router.push({path:'/'})">
          <img src="/headerlogo.png" alt="Logo" />
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
          </ul>
          <!-- 이미지랑 소카테고리 -->
          <div class="common-header_image-smallcategory">
            <!-- 이미지 -->
            <section class="productdetail_main-image-section">
              <img
                class="img-fluid w-100 mateHeaderImage"
                src="/headerImage.png"
                alt="Main Image"
              />
            </section>

            <!-- 소카테고리 -->
            <div class="common-header_categories" v-if="isVisible">
              <div class="common-header_smallcategory-area">
                <div class="common-header_category">
                  <ul>
                    <li @click="goToProductDetailList('hall')">웨딩홀</li>
                  </ul>
                </div>
                <div class="common-header_category">
                  <ul>
                    <li @click="goToProductDetailList('sdm_package')">
                      독립 패키지
                    </li>
                    <li @click="goToProductDetailList('studio')">스튜디오</li>
                    <li @click="goToProductDetailList('dress')">드레스</li>
                    <li @click="goToProductDetailList('makeup')">메이크업</li>
                  </ul>
                </div>
                <div class="common-header_category">
                  <ul>
                    <li @click="goToProductDetailList('giving_dress')">예복</li>
                    <li @click="goToProductDetailList('giving_item')">예물</li>
                    <li @click="goToProductDetailList('giving_mechine')">
                      가전
                    </li>
                    <li @click="goToProductDetailList('giving_package')">
                      혼수 패키지
                    </li>
                  </ul>
                </div>
                <div class="common-header_category">
                  <ul>
                    <li @click="goToProductDetailList('snap')">본식스냅</li>
                    <li @click="goToProductDetailList('video')">영상</li>
                    <li @click="goToProductDetailList('flower')">부케</li>
                    <li @click="goToProductDetailList('music')">연주</li>
                    <li @click="goToProductDetailList('mc')">사회자</li>
                    <li @click="goToProductDetailList('shoes')">웨딩슈즈</li>
                    <li @click="goToProductDetailList('gift')">답례품</li>
                    <li @click="goToProductDetailList('letter')">청첩장</li>
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
    goToProductDetailList(itemType) {
      this.$router.push({ name: "productdetaillist", query: { itemType } });
    },
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
  cursor: pointer !important;
  transition: background-color 0.3s;
  padding-top: 10px;
  padding-bottom: 10px;
  box-sizing: border-box;
  padding: 20px;
  width: 140px;
}

.common-header_category ul li {
  cursor: pointer !important;
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

.mateHeaderImage {
  width: 100%;
  height: auto;
}
</style>
