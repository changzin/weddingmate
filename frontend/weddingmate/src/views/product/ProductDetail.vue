<template>
  <div id="productdetail_app">
    <div class="container-fluid px-0">
      <div class="content">
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
                  <div class="common-header_categories" v-if="header_isVisible">
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

        <!-- 콘텐츠 섹션 시작 -->
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
          <!-- 상품 상세 -->
          <div class="productdetail_main_content-div">
            <div class="col-md-6">
              <img
                src="https://via.placeholder.com/600x400"
                class="img-fluid"
                alt="Product Image"
              />
            </div>
            <div class="col-md-6">
              <div class="productdetail_main_content_maker_div">
                아아.. 이것은 제조사란 것이다...
              </div>
              <div class="productdetail_main_content_name_div">
                Product Name
              </div>
              <div>
                <div class="main_content_starcount_div">★★★★★</div>
                <div class="productdetail_main_content_reviewcount_div">
                  전체 리뷰 수 : (1000)
                </div>
              </div>
              <!-- 드레스 옵션 -->
              <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('dress'),
                ]"
              >
                <div>
                  <div class="productdetail_main_content_discount_div">20%</div>
                  <div class="productdetail_main_content_origin_price_div">
                    10000원
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  80,000원
                </div>
                <div class="productdetail_main_content_delivery_div">
                  <div class="productdetail_main_content_delivery_price_div">
                    배송비 3,500원
                  </div>
                  <div class="productdetail_main_content_delivery_condition">
                    (20,000원 이상 구매시 무료)
                  </div>
                  <div class="productdetail_main_content_delivery_kind">
                    기타택배
                  </div>
                </div>
                <div class="productdetail_main_content_maximum_quantity_div">
                  <div>최대구매수량</div>
                  <div>999개</div>
                </div>
                <div class="productdetail_main_selectoption-div">옵션 선택</div>
                <form>
                  <div class="my-1">
                    <select
                      v-for="(optionGroup, index) in optionGroups"
                      :key="index"
                      class="form-select my-2"
                      v-model="selectedOptions[index]"
                      @change="onOptionChange(index)"
                      :disabled="!isEnabled(index)"
                      v-show="isVisible(index)"
                    >
                      <option selected disabled value="">선택</option>
                      <option
                        v-for="option in optionGroup.options"
                        :key="option"
                        :value="option"
                      >
                        {{ option }}
                      </option>
                    </select>
                  </div>
                  <!-- - + 수량 선택에 따른 금액 표시 -->
                  <div class="collapse" :class="{ show: allOptionsSelected }">
                    <div class="productdetail_main-content_product-card">
                      <div
                        class="productdetail_main-content_product-detail p-3"
                      >
                        {{ selectedOptions.join(" + ") }}
                      </div>
                      <div
                        class="d-flex justify-content-between align-items-center bg-light p-3"
                      >
                        <div class="quantity-control d-flex align-items-center">
                          <button
                            type="button"
                            class="btn btn-outline-secondary productdetail_main-quantity-btn"
                            @click="decreaseQuantity"
                          >
                            −
                          </button>
                          <input
                            type="text"
                            class="form-control text-center mx-2"
                            v-model="quantity"
                            readonly
                          />
                          <button
                            type="button"
                            class="btn btn-outline-secondary productdetail_main-quantity-btn"
                            @click="increaseQuantity"
                          >
                            ＋
                          </button>
                        </div>
                        <div class="font-weight-bold">
                          {{ formattedTotalPrice }}원
                        </div>
                      </div>
                    </div>
                    <div class="productdetail_total-price-div">
                      <div class="productdetail_total-price-div_state-div">
                        총 금액 :
                      </div>
                      <div class="productdetail_total-price-div_price-div">
                        {{ formattedTotalPrice }}원
                      </div>
                    </div>
                  </div>

                  <!-- 맞춤 선택 후 캘린더 띄워주기-->
                  <div
                    :class="[
                      'productdetail_cal',
                      selectedItemType_dress_custom,
                    ]"
                  >
                    날짜 선택
                    <div class="common-event_calendar">
                      <div>
                        <v-date-picker
                          v-model="dateRange"
                          is-range
                          :popover="{ visibility: 'focus' }"
                          :input-props="{
                            start: { placeholder: 'Start' },
                            end: { placeholder: 'End' },
                          }"
                        />
                      </div>
                      <div class="common-event_calendar_div">
                        <label
                          >Start
                          {{
                            dateRange.start
                              ? formatDate(dateRange.start)
                              : "선택되지 않음"
                          }}</label
                        >
                        <label
                          >End
                          {{
                            dateRange.end
                              ? formatDate(dateRange.end)
                              : "선택되지 않음"
                          }}</label
                        >
                      </div>
                      <button
                        class="common-caldate_save-button"
                        type="button"
                        @click="saveEvent"
                      >
                        저장
                      </button>
                    </div>
                    <div class="productdetail_cal-div_date-div">
                      <div>선택된 날짜</div>
                      <div class="productdetail_cal-div_date">
                        2024년 12년 30일
                      </div>
                    </div>
                  </div>

                  <div class="productdetail_button-container">
                    <button class="productdetail_icon-button">
                      <i class="far fa-heart"></i>
                    </button>
                    <button class="productdetail_icon-button">
                      <i class="fas fa-share-alt"></i>
                    </button>
                    <button
                      class="productdetail_main-content_button-container_main-button"
                    >
                      물건담기
                    </button>
                  </div>
                </form>
              </div>

              <!-- 스튜디오 옵션 -->
              <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('studio'),
                ]"
              >
                <div>
                  <div class="productdetail_main_content_discount_div">20%</div>
                  <div class="productdetail_main_content_origin_price_div">
                    10000원
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  80,000원
                </div>

                <div class="productdetail_main_selectoption-div">옵션 선택</div>
                <form>
                  <div class="my-1">
                    <select
                      v-for="(optionGroup, index) in optionGroups"
                      :key="index"
                      class="form-select my-2"
                      v-model="selectedOptions[index]"
                      @change="onOptionChange(index)"
                      :disabled="!isEnabled(index)"
                      v-show="isVisible(index)"
                    >
                      <option selected disabled value="">선택</option>
                      <option
                        v-for="option in optionGroup.options"
                        :key="option"
                        :value="option"
                      >
                        {{ option }}
                      </option>
                    </select>
                  </div>
                  <!-- 캘린더 -->
                  <div :class="['productdetail_cal']">
                    날짜 선택
                    <div class="common-event_calendar">
                      <div>
                        <v-date-picker
                          v-model="dateRange"
                          is-range
                          :popover="{ visibility: 'focus' }"
                          :input-props="{
                            start: { placeholder: 'Start' },
                            end: { placeholder: 'End' },
                          }"
                        />
                      </div>
                      <div class="common-event_calendar_div">
                        <label
                          >Start
                          {{
                            dateRange.start
                              ? formatDate(dateRange.start)
                              : "선택되지 않음"
                          }}</label
                        >
                        <label
                          >End
                          {{
                            dateRange.end
                              ? formatDate(dateRange.end)
                              : "선택되지 않음"
                          }}</label
                        >
                      </div>
                      <button
                        class="common-caldate_save-button"
                        type="button"
                        @click="saveEvent"
                      >
                        저장
                      </button>
                    </div>
                    <div class="productdetail_cal-div_date-div">
                      <div>선택된 날짜</div>
                      <div class="productdetail_cal-div_date">
                        2024년 12년 30일
                      </div>
                    </div>
                  </div>

                  <div class="productdetail_total-price-div">
                    <div class="productdetail_total-price-div_state-div">
                      총 금액 :
                    </div>
                    <div class="productdetail_total-price-div_price-div">
                      {{ formattedTotalPrice }}원
                    </div>
                  </div>
                  <div class="productdetail_button-container">
                    <button class="productdetail_icon-button">
                      <i class="far fa-heart"></i>
                    </button>
                    <button class="productdetail_icon-button">
                      <i class="fas fa-share-alt"></i>
                    </button>
                    <button
                      class="productdetail_main-content_button-container_main-button"
                    >
                      물건담기
                    </button>
                  </div>
                </form>
              </div>

              <!-- 메이크업 옵션 -->
              <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('makeup'),
                ]"
              >
                <div>
                  <div class="productdetail_main_content_discount_div">20%</div>
                  <div class="productdetail_main_content_origin_price_div">
                    10000원
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  80,000원
                </div>
                <div class="productdetail_main_selectoption-div">옵션 선택</div>
                <form>
                  <div class="my-1">
                    <select
                      v-for="(optionGroup, index) in optionGroups"
                      :key="index"
                      class="form-select my-2"
                      v-model="selectedOptions[index]"
                      @change="onOptionChange(index)"
                      :disabled="!isEnabled(index)"
                      v-show="isVisible(index)"
                    >
                      <option selected disabled value="">선택</option>
                      <option
                        v-for="option in optionGroup.options"
                        :key="option"
                        :value="option"
                      >
                        {{ option }}
                      </option>
                    </select>
                  </div>
                  <!-- 캘린더 -->

                  <div class="productdetail_total-price-div">
                    <div class="productdetail_total-price-div_state-div">
                      총 금액 :
                    </div>
                    <div class="productdetail_total-price-div_price-div">
                      {{ formattedTotalPrice }}원
                    </div>
                  </div>
                  <div class="productdetail_button-container">
                    <button class="productdetail_icon-button">
                      <i class="far fa-heart"></i>
                    </button>
                    <button class="productdetail_icon-button">
                      <i class="fas fa-share-alt"></i>
                    </button>
                    <button
                      class="productdetail_main-content_button-container_main-button"
                    >
                      물건담기
                    </button>
                  </div>
                </form>
              </div>

              <!-- 스드메 -->
              <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('sdm_package'),
                ]"
              >
                <div>
                  <div class="productdetail_main_content_discount_div">20%</div>
                  <div class="productdetail_main_content_origin_price_div">
                    10000원
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  80,000원
                </div>

                <div class="productdetail_main_selectoption-div">
                  포함 상품 & 패키지 특성
                </div>
                <!-- 스튜디오 -->
                <div class="productdetail_main_content_sdmpacakge">
                  <div class="productdetail_main_content_sdmpacakge-name">
                    스튜디오 제조사 이름
                  </div>
                  <div class="productdetail_main_content_sdmpacakge-title">
                    스튜디오 제목
                  </div>
                  <div
                    class="productdetail_calproductdetail_main_content_sdmpacakge-selectdate"
                  >
                    스튜디오 날짜 선택
                  </div>
                  <div
                    :class="['productdetail_cal']"
                    :style="{ marginTop: '10px' }"
                  >
                    <div class="common-event_calendar">
                      <div>
                        <v-date-picker
                          v-model="studioDateRange"
                          is-range
                          :popover="{ visibility: 'focus' }"
                          :input-props="{
                            start: { placeholder: 'Start' },
                            end: { placeholder: 'End' },
                          }"
                        />
                      </div>
                      <div class="common-event_calendar_div">
                        <label
                          >Start
                          {{
                            studioDateRange.start
                              ? formatDate(studioDateRange.start)
                              : "선택되지 않음"
                          }}</label
                        >
                        <label
                          >End
                          {{
                            studioDateRange.end
                              ? formatDate(studioDateRange.end)
                              : "선택되지 않음"
                          }}</label
                        >
                      </div>
                      <button
                        class="common-caldate_save-button"
                        type="button"
                        @click="saveEvent"
                      >
                        저장
                      </button>
                    </div>
                    <div class="productdetail_cal-div_date-div">
                      <div>선택된 날짜</div>
                      <div class="productdetail_cal-div_date">
                        2024년 12년 30일
                      </div>
                    </div>
                  </div>
                </div>
                <div class="productdetail_divider"></div>
                <!-- 드레스 -->
             

      <!-- 드레스 -->
      <div class="productdetail_main_content_sdmpacakge">
        <div class="productdetail_main_content_sdmpacakge-name">
          드레스 제조사 이름
        </div>
        <div class="productdetail_main_content_sdmpacakge-title">
          드레스 제목
        </div>
        <div class="productdetail_calproductdetail_main_content_sdmpacakge-selectdate">
          드레스 날짜 선택
        </div>
        <div :class="['productdetail_cal']" :style="{ marginTop: '10px' }">
          <div class="common-event_calendar">
            <div>
              <v-date-picker
                v-model="dressDateRange"
                is-range
                :popover="{ visibility: 'focus' }"
                :input-props="{
                  start: { placeholder: 'Start' },
                  end: { placeholder: 'End' },
                }"
              />
            </div>
            <div class="common-event_calendar_div">
              <label>
                Start
                {{
                  dressDateRange.start
                    ? formatDate(dressDateRange.start)
                    : "선택되지 않음"
                }}
              </label>
              <label>
                End
                {{
                  dressDateRange.end
                    ? formatDate(dressDateRange.end)
                    : "선택되지 않음"
                }}
              </label>
            </div>
            <button
              class="common-caldate_save-button"
              type="button"
              @click="saveDressEvent"
            >
              저장
            </button>
          </div>
          <div class="productdetail_cal-div_date-div">
            <div>선택된 날짜</div>
            <div class="productdetail_cal-div_date">
              2024년 12년 30일
            </div>
          </div>
        </div>
      </div>
      <div class="productdetail_divider"></div>

      <!-- 메이크업 -->
      <div class="productdetail_main_content_sdmpacakge">
        <div class="productdetail_main_content_sdmpacakge-name">
          메이크업 제조사 이름
        </div>
        <div class="productdetail_main_content_sdmpacakge-title">
          메이크업 제목
        </div>
        <div class="productdetail_calproductdetail_main_content_sdmpacakge-selectdate">
          메이크업 날짜 선택
        </div>
        <div :class="['productdetail_cal']" :style="{ marginTop: '10px' }">
          <div class="common-event_calendar">
            <div>
              <v-date-picker
                v-model="makeupDateRange"
                is-range
                :popover="{ visibility: 'focus' }"
                :input-props="{
                  start: { placeholder: 'Start' },
                  end: { placeholder: 'End' },
                }"
              />
            </div>
            <div class="common-event_calendar_div">
              <label>
                Start
                {{
                  makeupDateRange.start
                    ? formatDate(makeupDateRange.start)
                    : "선택되지 않음"
                }}
              </label>
              <label>
                End
                {{
                  makeupDateRange.end
                    ? formatDate(makeupDateRange.end)
                    : "선택되지 않음"
                }}
              </label>
            </div>
            <button
              class="common-caldate_save-button"
              type="button"
              @click="saveMakeupEvent"
            >
              저장
            </button>
          </div>
          <div class="productdetail_cal-div_date-div">
            <div>선택된 날짜</div>
            <div class="productdetail_cal-div_date">
              2024년 12년 30일
            </div>
          </div>
        </div>
      </div>
      <div class="productdetail_divider"></div>


                <!-- 혜택 안내 -->
                <div class="productdetail_package-container">
                  <div class="productdetail_package-header">패키지 특전</div>
                  <div class="productdetail_package-content">
                    <div class="productdetail_package-item">
                      <span>정상가</span>
                      <span class="productdetail_price">5,825,000원</span>
                    </div>
                    <div class="productdetail_package-item">
                      <span>할인가</span>
                      <span class="productdetail_price">2,210,000원</span>
                    </div>
                    <div
                      class="productdetail_package-item productdetail_discount"
                    >
                      <span>패키지 추가 할인</span>
                      <span class="productdetail_price">-250,000원</span>
                    </div>
                    <div class="productdetail_package-item productdetail_total">
                      <span>최종 혜택가</span>
                      <span
                        class="productdetail_price productdetail_final-price"
                        >1,960,000원</span
                      >
                    </div>
                  </div>
                  <div class="productdetail_package-footer">
                    <div class="productdetail_footer-title">패키지 구매시</div>
                    <div class="productdetail_footer-total">
                      총 5,545,435원 절약
                    </div>
                  </div>
                </div>

                <div class="productdetail_button-container">
                  <button class="productdetail_icon-button">
                    <i class="far fa-heart"></i>
                  </button>
                  <button class="productdetail_icon-button">
                    <i class="fas fa-share-alt"></i>
                  </button>
                  <button
                    class="productdetail_main-content_button-container_main-button"
                  >
                    물건담기
                  </button>
                </div>
              </div>

              <!-- 예복 -->
              <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('giving_dress'),
                ]"
              >
                <div>
                  <div class="productdetail_main_content_discount_div">20%</div>
                  <div class="productdetail_main_content_origin_price_div">
                    10000원
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  80,000원
                </div>
                <div class="productdetail_main_content_delivery_div">
                  <div class="productdetail_main_content_delivery_price_div">
                    배송비 3,500원
                  </div>
                  <div class="productdetail_main_content_delivery_condition">
                    (20,000원 이상 구매시 무료)
                  </div>
                  <div class="productdetail_main_content_delivery_kind">
                    기타택배
                  </div>
                </div>
                <div class="productdetail_main_content_maximum_quantity_div">
                  <div>최대구매수량</div>
                  <div>999개</div>
                </div>
                <div class="productdetail_main_selectoption-div">옵션 선택</div>
                <form>
                  <div class="my-1">
                    <select
                      v-for="(optionGroup, index) in optionGroups"
                      :key="index"
                      class="form-select my-2"
                      v-model="selectedOptions[index]"
                      @change="onOptionChange(index)"
                      :disabled="!isEnabled(index)"
                      v-show="isVisible(index)"
                    >
                      <option selected disabled value="">선택</option>
                      <option
                        v-for="option in optionGroup.options"
                        :key="option"
                        :value="option"
                      >
                        {{ option }}
                      </option>
                    </select>
                  </div>
                  <!-- - + 수량 선택에 따른 금액 표시 -->
                  <div class="collapse" :class="{ show: allOptionsSelected }">
                    <div class="productdetail_main-content_product-card">
                      <div
                        class="productdetail_main-content_product-detail p-3"
                      >
                        {{ selectedOptions.join(" + ") }}
                      </div>
                      <div
                        class="d-flex justify-content-between align-items-center bg-light p-3"
                      >
                        <div class="quantity-control d-flex align-items-center">
                          <button
                            type="button"
                            class="btn btn-outline-secondary productdetail_main-quantity-btn"
                            @click="decreaseQuantity"
                          >
                            −
                          </button>
                          <input
                            type="text"
                            class="form-control text-center mx-2"
                            v-model="quantity"
                            readonly
                          />
                          <button
                            type="button"
                            class="btn btn-outline-secondary productdetail_main-quantity-btn"
                            @click="increaseQuantity"
                          >
                            ＋
                          </button>
                        </div>
                        <div class="font-weight-bold">
                          {{ formattedTotalPrice }}원
                        </div>
                      </div>
                    </div>
                    <div class="productdetail_total-price-div">
                      <div class="productdetail_total-price-div_state-div">
                        총 금액 :
                      </div>
                      <div class="productdetail_total-price-div_price-div">
                        {{ formattedTotalPrice }}원
                      </div>
                    </div>
                  </div>

                  <!-- 맞춤 선택 후 캘린더 띄워주기-->
                  <div
                    :class="[
                      'productdetail_cal',
                      selectedItemType_dress_custom,
                    ]"
                  >
                    날짜 선택
                    <div class="common-event_calendar">
                      <div>
                        <v-date-picker
                          v-model="dateRange"
                          is-range
                          :popover="{ visibility: 'focus' }"
                          :input-props="{
                            start: { placeholder: 'Start' },
                            end: { placeholder: 'End' },
                          }"
                        />
                      </div>
                      <div class="common-event_calendar_div">
                        <label
                          >Start
                          {{
                            dateRange.start
                              ? formatDate(dateRange.start)
                              : "선택되지 않음"
                          }}</label
                        >
                        <label
                          >End
                          {{
                            dateRange.end
                              ? formatDate(dateRange.end)
                              : "선택되지 않음"
                          }}</label
                        >
                      </div>
                      <button
                        class="common-caldate_save-button"
                        type="button"
                        @click="saveEvent"
                      >
                        저장
                      </button>
                    </div>
                    <div class="productdetail_cal-div_date-div">
                      <div>선택된 날짜</div>
                      <div class="productdetail_cal-div_date">
                        2024년 12년 30일
                      </div>
                    </div>
                  </div>

                  <div class="productdetail_button-container">
                    <button class="productdetail_icon-button">
                      <i class="far fa-heart"></i>
                    </button>
                    <button class="productdetail_icon-button">
                      <i class="fas fa-share-alt"></i>
                    </button>
                    <button
                      class="productdetail_main-content_button-container_main-button"
                    >
                      물건담기
                    </button>
                  </div>
                </form>
              </div>

              <!-- 가전 -->
              <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('giving_mechine'),
                ]"
              >
                <div class="productdetail_button-container">
                  <button class="productdetail_icon-button">
                    <i class="far fa-heart"></i>
                  </button>
                  <button class="productdetail_icon-button">
                    <i class="fas fa-share-alt"></i>
                  </button>
                  <button
                    class="productdetail_main-content_button-container_main-button"
                  >
                    물건담기
                  </button>
                </div>
              </div>

              <!-- 본식스냅 -->
              <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('snap'),
                ]"
              >
                <div>
                  <div class="productdetail_main_content_discount_div">20%</div>
                  <div class="productdetail_main_content_origin_price_div">
                    10000원
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  80,000원
                </div>

                <div class="productdetail_button-container">
                  <button class="productdetail_icon-button">
                    <i class="far fa-heart"></i>
                  </button>
                  <button class="productdetail_icon-button">
                    <i class="fas fa-share-alt"></i>
                  </button>
                  <button
                    class="productdetail_main-content_button-container_main-button"
                  >
                    물건담기
                  </button>
                </div>
              </div>

              <!-- 영상 -->
              <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('video'),
                ]"
              >
                <div>
                  <div class="productdetail_main_content_discount_div">20%</div>
                  <div class="productdetail_main_content_origin_price_div">
                    10000원
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  80,000원
                </div>

                <div class="productdetail_button-container">
                  <button class="productdetail_icon-button">
                    <i class="far fa-heart"></i>
                  </button>
                  <button class="productdetail_icon-button">
                    <i class="fas fa-share-alt"></i>
                  </button>
                  <button
                    class="productdetail_main-content_button-container_main-button"
                  >
                    물건담기
                  </button>
                </div>
              </div>

              <!-- 부케 -->
              <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('flower'),
                ]"
              >
                <div>
                  <div class="productdetail_main_content_discount_div">20%</div>
                  <div class="productdetail_main_content_origin_price_div">
                    10000원
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  80,000원
                </div>
                <div class="productdetail_main_selectoption-div">옵션 선택</div>
                <form>
                  <div class="my-1">
                    <select
                      v-for="(optionGroup, index) in optionGroups"
                      :key="index"
                      class="form-select my-2"
                      v-model="selectedOptions[index]"
                      @change="onOptionChange(index)"
                      :disabled="!isEnabled(index)"
                      v-show="isVisible(index)"
                    >
                      <option selected disabled value="">선택</option>
                      <option
                        v-for="option in optionGroup.options"
                        :key="option"
                        :value="option"
                      >
                        {{ option }}
                      </option>
                    </select>
                  </div>

                  <div class="productdetail_total-price-div">
                    <div class="productdetail_total-price-div_state-div">
                      총 금액 :
                    </div>
                    <div class="productdetail_total-price-div_price-div">
                      {{ formattedTotalPrice }}원
                    </div>
                  </div>
                  <div class="productdetail_button-container">
                    <button class="productdetail_icon-button">
                      <i class="far fa-heart"></i>
                    </button>
                    <button class="productdetail_icon-button">
                      <i class="fas fa-share-alt"></i>
                    </button>
                    <button
                      class="productdetail_main-content_button-container_main-button"
                    >
                      물건담기
                    </button>
                  </div>
                </form>
              </div>

              <!-- 연주 -->
              <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('music'),
                ]"
              >
                <div>
                  <div class="productdetail_main_content_discount_div">20%</div>
                  <div class="productdetail_main_content_origin_price_div">
                    10000원
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  80,000원
                </div>

                <div class="productdetail_button-container">
                  <button class="productdetail_icon-button">
                    <i class="far fa-heart"></i>
                  </button>
                  <button class="productdetail_icon-button">
                    <i class="fas fa-share-alt"></i>
                  </button>
                  <button
                    class="productdetail_main-content_button-container_main-button"
                  >
                    물건담기
                  </button>
                </div>
              </div>

              <!-- 사회자 -->
              <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('mc'),
                ]"
              >
                <div>
                  <div class="productdetail_main_content_discount_div">20%</div>
                  <div class="productdetail_main_content_origin_price_div">
                    10000원
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  80,000원
                </div>

                <div class="productdetail_button-container">
                  <button class="productdetail_icon-button">
                    <i class="far fa-heart"></i>
                  </button>
                  <button class="productdetail_icon-button">
                    <i class="fas fa-share-alt"></i>
                  </button>
                  <button
                    class="productdetail_main-content_button-container_main-button"
                  >
                    물건담기
                  </button>
                </div>
              </div>

              <!-- 웨딩슈즈 -->
              <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('shoes'),
                ]"
              >
                <div>
                  <div class="productdetail_main_content_discount_div">20%</div>
                  <div class="productdetail_main_content_origin_price_div">
                    10000원
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  80,000원
                </div>
                <div class="productdetail_main_content_delivery_div">
                  <div class="productdetail_main_content_delivery_price_div">
                    배송비 3,500원
                  </div>
                  <div class="productdetail_main_content_delivery_condition">
                    (20,000원 이상 구매시 무료)
                  </div>
                  <div class="productdetail_main_content_delivery_kind">
                    기타택배
                  </div>
                </div>
                <div class="productdetail_main_content_maximum_quantity_div">
                  <div>최대구매수량</div>
                  <div>999개</div>
                </div>
                <div class="productdetail_main_selectoption-div">옵션 선택</div>
                <form>
                  <div class="my-1">
                    <select
                      v-for="(optionGroup, index) in optionGroups"
                      :key="index"
                      class="form-select my-2"
                      v-model="selectedOptions[index]"
                      @change="onOptionChange(index)"
                      :disabled="!isEnabled(index)"
                      v-show="isVisible(index)"
                    >
                      <option selected disabled value="">선택</option>
                      <option
                        v-for="option in optionGroup.options"
                        :key="option"
                        :value="option"
                      >
                        {{ option }}
                      </option>
                    </select>
                  </div>
                  <!-- - + 수량 선택에 따른 금액 표시 -->
                  <div class="collapse" :class="{ show: allOptionsSelected }">
                    <div class="productdetail_main-content_product-card">
                      <div
                        class="productdetail_main-content_product-detail p-3"
                      >
                        {{ selectedOptions.join(" + ") }}
                      </div>
                      <div
                        class="d-flex justify-content-between align-items-center bg-light p-3"
                      >
                        <div class="quantity-control d-flex align-items-center">
                          <button
                            type="button"
                            class="btn btn-outline-secondary productdetail_main-quantity-btn"
                            @click="decreaseQuantity"
                          >
                            −
                          </button>
                          <input
                            type="text"
                            class="form-control text-center mx-2"
                            v-model="quantity"
                            readonly
                          />
                          <button
                            type="button"
                            class="btn btn-outline-secondary productdetail_main-quantity-btn"
                            @click="increaseQuantity"
                          >
                            ＋
                          </button>
                        </div>
                        <div class="font-weight-bold">
                          {{ formattedTotalPrice }}원
                        </div>
                      </div>
                    </div>
                    <div class="productdetail_total-price-div">
                      <div class="productdetail_total-price-div_state-div">
                        총 금액 :
                      </div>
                      <div class="productdetail_total-price-div_price-div">
                        {{ formattedTotalPrice }}원
                      </div>
                    </div>
                  </div>

                  <div class="productdetail_button-container">
                    <button class="productdetail_icon-button">
                      <i class="far fa-heart"></i>
                    </button>
                    <button class="productdetail_icon-button">
                      <i class="fas fa-share-alt"></i>
                    </button>
                    <button
                      class="productdetail_main-content_button-container_main-button"
                    >
                      물건담기
                    </button>
                  </div>
                </form>
              </div>

              <!-- 답례품 -->
              <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('gift'),
                ]"
              >
                <div>
                  <div class="productdetail_main_content_discount_div">20%</div>
                  <div class="productdetail_main_content_origin_price_div">
                    10000원
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  80,000원
                </div>
                <div class="productdetail_main_selectoption-div">옵션 선택</div>
                <form>
                  <div class="my-1">
                    <select
                      v-for="(optionGroup, index) in optionGroups"
                      :key="index"
                      class="form-select my-2"
                      v-model="selectedOptions[index]"
                      @change="onOptionChange(index)"
                      :disabled="!isEnabled(index)"
                      v-show="isVisible(index)"
                    >
                      <option selected disabled value="">선택</option>
                      <option
                        v-for="option in optionGroup.options"
                        :key="option"
                        :value="option"
                      >
                        {{ option }}
                      </option>
                    </select>
                  </div>
                  <div class="productdetail_total-price-div">
                    <div class="productdetail_total-price-div_state-div">
                      총 금액 :
                    </div>
                    <div class="productdetail_total-price-div_price-div">
                      {{ formattedTotalPrice }}원
                    </div>
                  </div>
                  <div class="productdetail_button-container">
                    <button class="productdetail_icon-button">
                      <i class="far fa-heart"></i>
                    </button>
                    <button class="productdetail_icon-button">
                      <i class="fas fa-share-alt"></i>
                    </button>
                    <button
                      class="productdetail_main-content_button-container_main-button"
                    >
                      물건담기
                    </button>
                  </div>
                </form>
              </div>

              <!-- 청첩장 -->
              <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('letter'),
                ]"
              >
                <div>
                  <div class="productdetail_main_content_discount_div">20%</div>
                  <div class="productdetail_main_content_origin_price_div">
                    10000원
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  80,000원
                </div>

                <div class="productdetail_button-container">
                  <button class="productdetail_icon-button">
                    <i class="far fa-heart"></i>
                  </button>
                  <button class="productdetail_icon-button">
                    <i class="fas fa-share-alt"></i>
                  </button>
                  <button
                    class="productdetail_main-content_button-container_main-button"
                  >
                    물건담기
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- 상세 설명 이미지 -->
          <div class="text-center productdetail_main-detail-image-div">
            <img
              src="https://via.placeholder.com/1280x800"
              class="img-fluid"
              alt="Detailed Description Image"
            />
          </div>

          <!-- 리뷰 섹션 -->
          <div class="productdetail_review-section">
            <div class="productdetail_review-cards">
              <button class="productdetail_review-card" v-for="n in 9" :key="n">
                <div class="productdetail_card-header">
                  <div class="productdetail_review-section_title-div">
                    일이삼사오육칠팔구십일이
                  </div>
                  <div class="productdetail_card-icons">
                    <i class="fas fa-bullhorn"></i>
                    <i class="fas fa-edit"></i>
                    <i class="fas fa-trash"></i>
                  </div>
                </div>
                <div class="productdetail_review-section_title-div">
                  <div class="productdetail_card-rating">★★★★★</div>
                  <div class="productdetail_review-section_date-div">
                    2024-06-11 15:54
                  </div>
                </div>
                <img
                  src="https://via.placeholder.com/300x200"
                  class="productdetail_card-img-top"
                  alt="Review Image"
                />
                <div class="productdetail_card-body">
                  <p class="productdetail_card-text">
                    인생
                    리븅으으으으으으ㅡㅡ으으으으으으으으ㅡ으으으으으으으ㅡ으으으으으으ㅡ으으으으으으으ㅡ으으ㅡ으르아라아리뷰우우우우우우우우우우우우우ㅜ우우우우우우우우우ㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅓ하ㅣㅇ러하ㅣㅇ러하ㅣㅇ러하ㅣㅓ곧ㅇ샤해ㅓㄱㄷ얗라ㅣㅓ갣이ㅓ하ㅣㅇ러하일허ㅏㄹ이라ㅓㅏㅇ니ㅣ허ㅏㅣㄹ어하ㅣㄹ어하ㅣㄹ어하ㅣㅇ러하ㅣㅇ러하하ㅓㅣ아어하ㅣㅇ라허일허ㅏㅣㅏㅇㄹ하ㅓ최대
                    10줄까지
                    가능합니다ㄹㄴㅇㄹㄴㅇㄹㅈㄱㄷㅅㄱㄷㅅㅎㄱㄷㅅㄷㄳㄷㄳ
                  </p>
                </div>
              </button>
            </div>
          </div>

          <!-- Q&A 섹션 -->
          <div class="productdetail_qna-section">
            <div class="productdetail_qna-header">
              <h2 class="productdetail_qna-title">전체 QnA &gt;</h2>
              <button class="productdetail_write-qna-btn">
                <i class="fas fa-pen"></i> QnA작성
              </button>
            </div>
            <table class="productdetail_qna-table">
              <thead>
                <tr>
                  <th>문의유형</th>
                  <th>문의/답변</th>
                  <th>작성자</th>
                  <th>작성일</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="n in 5" :key="n">
                  <td>반품/취소</td>
                  <td class="productdetail_qna-section_status-title-div">
                    <div class="productdetail_qna-status">답변 완료</div>
                    <div>
                      일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십일이삼사오육칠팔구십
                    </div>
                  </td>
                  <td>일이삼사오육칠팔구십일이</td>
                  <td>2024-06-11 15:54</td>
                </tr>
                <tr v-for="n in 1" :key="n">
                  <td>배송문의</td>
                  <td class="productdetail_qna-section_status-title-div">
                    <div class="productdetail_qna-status incomplete">
                      미완료
                    </div>
                    <div>미완료 UI 보려고 하나 더 만듦</div>
                  </td>
                  <td>일이삼사오육칠팔구십일이</td>
                  <td>2024-06-11 15:54</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!-- 콘텐츠 섹션 끝 -->

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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 헤더
      header_isVisible: false,
      ismaintain: false,

      // 본문
      selectedSize: "",
      selectedColor: "",
      showColorSelect: false,
      qnaStatus: "completed",
      quantity: 1,
      unitPrice: 9999999999,

      optionGroups: [],
      selectedOptions: [],

      selectedItemType: "",
      selectedItemType_dress_custom: "collapse",

      // 캘린더
      dateRange: {
        start: null,
        end: null,
      },

      // 스드메 캘린더
      studioDateRange: {
        start: null,
        end: null,
      },
      dressDateRange: {
        start: null,
        end: null,
      },
      makeupDateRange: {
        start: null,
        end: null,
      },
    };
  },

  mounted() {
    this.fetchOptions();
  },

  computed: {
    // 가격 계산
    totalPrice() {
      return this.unitPrice * this.quantity;
    },
    formattedTotalPrice() {
      return this.totalPrice.toLocaleString();
    },
    allOptionsSelected() {
      return (
        this.selectedOptions.length === this.optionGroups.length &&
        this.selectedOptions.every((option) => option !== "")
      );
    },
  },

  methods: {
    // 헤더
    showCategories() {
      this.header_isVisible = true;
    },
    hideCategories() {
      this.header_isVisible = false;
    },

    // 본문

    onSizeChange() {
      this.showColorSelect = this.selectedSize !== "";
    },
    // 가격 계산
    increaseQuantity() {
      this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },

    getClass(type) {
      // 드레스
      if (type === "dress") {
        return this.selectedItemType === "dress" ? "visible" : "collapse";
      }
      // 스튜디오
      else if (type === "studio") {
        return this.selectedItemType === "studio" ? "visible" : "collapse";
      }
      // 메이크업
      else if (type === "makeup") {
        return this.selectedItemType === "makeup" ? "visible" : "collapse";
      }
      // 스드메
      else if (type === "sdm_package") {
        return this.selectedItemType === "sdm_package" ? "visible" : "collapse";
      }
      // 예복
      else if (type === "giving_dress") {
        return this.selectedItemType === "giving_dress"
          ? "visible"
          : "collapse";
      }
      // 가전
      else if (type === "giving_mechine") {
        return this.selectedItemType === "giving_mechine"
          ? "visible"
          : "collapse";
      }
      // 본식스냅
      else if (type === "snap") {
        return this.selectedItemType === "snap" ? "visible" : "collapse";
      }
      // 영상
      else if (type === "video") {
        return this.selectedItemType === "video" ? "visible" : "collapse";
      }
      // 부케
      else if (type === "flower") {
        return this.selectedItemType === "flower" ? "visible" : "collapse";
      }
      // 연주
      else if (type === "music") {
        return this.selectedItemType === "music" ? "visible" : "collapse";
      }
      // 사회자
      else if (type === "mc") {
        return this.selectedItemType === "mc" ? "visible" : "collapse";
      }
      // 웨딩슈즈
      else if (type === "shoes") {
        return this.selectedItemType === "shoes" ? "visible" : "collapse";
      }
      // 답례품
      else if (type === "gift") {
        return this.selectedItemType === "gift" ? "visible" : "collapse";
      }
      // 청첩장
      else if (type === "letter") {
        return this.selectedItemType === "letter" ? "visible" : "collapse";
      }

      return "collapse";
    },

    fetchOptions() {
      setTimeout(() => {
        this.optionGroups = [
          { name: "Size", options: ["Small", "Medium", "Large", "맞춤"] },
          { name: "Color", options: ["Red", "Blue", "Green"] },
          { name: "Material", options: ["Cotton", "Wool", "Silk"] },
        ];
        this.selectedOptions = Array(this.optionGroups.length).fill("");
      }, 1000);
    },
    isEnabled(index) {
      if (index === 0) return true;
      return this.selectedOptions[index - 1] !== "";
    },

    isVisible(index) {
      if (index === 0) return true;
      if (this.selectedItemType_dress_custom === "visible" && index > 0) {
        return false;
      }
      return this.selectedOptions[index - 1] !== "";
    },

    onOptionChange(index) {
      if (this.selectedOptions[index] === "맞춤") {
        this.selectedItemType_dress_custom = "visible";
      } else {
        this.selectedItemType_dress_custom = "collapse";
      }

      // 선택이 변경되면 해당 인덱스 이후의 모든 선택을 초기화
      for (let i = index + 1; i < this.selectedOptions.length; i++) {
        this.selectedOptions[i] = "";
      }
    },

    // 캘린더
    showDateRangePicker(day) {
      this.dateRange.start = day.date;
      this.dateRange.end = day.date;
    },
    saveEvent() {
      console.log(
        `Event from ${this.dateRange.start} to ${this.dateRange.end}`
      );
    },
    formatDate(date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(d.getDate()).padStart(2, "0")}`;
    },
  },
};
</script>

<style scoped>
.productdetail_divider {
  border-top: 1px solid #ccc;
  margin: 20px 0;
}

#productdetail_app {
  width: 1980px;
  min-width: 1980px;
  max-width: 1980px;
}

.productdetail_main-image-section {
  position: relative;
  width: 100%;
  overflow: hidden;
  min-width: 1980px; /* 고정된 최소 너비 설정 */
  z-index: 2;
  filter: brightness(30%);
}

.productdetail_main-image-section img {
  width: 100%;
  height: auto;
}

#common_main-banner_div {
  width: 100%;
  height: 80px;
  padding: 0px;
}
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

/* 콘텐츠 섹션 시작 */

.productdetail_main_content {
  width: calc(100% - 700px);
  margin: 0 auto;
  margin-top: 600px;
  position: relative;
}

/* 상품 상세 */

.productdetail_cal {
  margin-top: 30px;
}

.productdetail_cal-div_date-div {
  margin-top: 18px;
}

.productdetail_cal-div_date {
  font-size: 24px;
  font-weight: bold;
}

.productdetail_cal_image-div {
  margin-top: 8px;
}

.productdetail_main_content-div {
  width: 100%;
  max-width: 1280px;
  display: flex;
  margin: 0 auto;
  margin-top: 100px;
}

.productdetail_main_content_maker_div {
  font-size: 14px;
  margin-bottom: 10px;
}

.productdetail_main_content_name_div {
  font-size: 22px;
  margin-bottom: 10px;
}

.productdetail_main_content_starcount_div {
  display: inline;
  margin-right: 10px;
}

.productdetail_main_content_reviewcount_div {
  display: inline;
}

.productdetail_main_content_discount_div {
  margin-right: 10px;
  color: #ff481e;
  display: inline;
}

.productdetail_main_content_origin_price_div {
  color: #888888;
  display: inline-block;
  text-decoration: line-through;
}

.productdetail_main_content_discount_price_div {
  font-size: 24px;
  font-weight: bold;
}

.productdetail_main_content_delivery_div {
  font-size: 16px;
  display: flex;
  margin-top: 30px;
}

.productdetail_main_content_delivery_price_div {
  margin-right: 15px;
}

.productdetail_main_content_delivery_condition {
  margin-right: 40px;
  color: #888888;
}

.productdetail_main_content_delivery_kind {
}

.productdetail_main_content_maximum_quantity_div {
  display: flex;
  color: #555555;
  gap: 20px;
}

.productdetail_main_selectoption-div {
  margin-top: 50px;
}

.productdetail_main_content_selectoption_div {
  margin-top: 0px;
}

.productdetail_total-price-div {
  flex-direction: row;
  display: flex;
  align-items: baseline;
  margin-top: 30px;
}

.productdetail_total-price-div_state-div {
  font-size: 16px;
  margin-left: auto;
}

.productdetail_total-price-div_price-div {
  font-size: 24px;
  font-weight: bold;
  margin-left: 20px;
}

.productdetail_main-content_product-card {
  width: 100%;

  border: 1px solid #ccc;
  border-radius: 6px;
  margin-top: 25px;
}

.productdetail_main-content_product-detail {
  /* background-color: #28a745; */
  border-radius: 6px;
  background-color: #ffffff;
  color: #000000;
}

.quantity-control input {
  width: 50px;
}

.productdetail_main-quantity-btn {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0; /* 패딩을 0으로 설정하여 버튼의 내부 여백 제거 */
}

.productdetail_button-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  margin-top: 50px;
}

.productdetail_icon-button {
  background-color: #f7f7f7;
  border: 1px solid #f7cac9;
  border-radius: 10px;
  width: 64px;
  height: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.productdetail_icon-button i {
  font-size: 20px;
  color: #888888;
}

.productdetail_main-content_button-container_main-button {
  font-size: 24px;
  color: #888888;
  background-color: #f5f5f5;
  border: 1px solid #f7cac9;
  border-radius: 10px;
  padding: 25px 90px;
  cursor: pointer;
}

.productdetail_main_selectoption-div {
  font-size: 24px;
  margin-top: 30px;
  margin-bottom: 10px;
  font-weight: bold;
}

/* 스드메 */
.productdetail_main_content_sdmpacakge {
  margin-bottom: 30px;
}

.productdetail_main_content_sdmpacakge-name {
  font-size: 14px;
}

.productdetail_main_content_sdmpacakge-title {
  font-size: 16px;
  font-weight: bolder;
  margin-bottom: 5px;
}

.productdetail_calproductdetail_main_content_sdmpacakge-selectdate {
  font-size: 14px;
}

/* 혜택 안내 */

.productdetail_package-container {
  background-color: #f5f5f5;
  border-radius: 10px;
  padding: 30px;
  margin: 0 auto;
  margin-top: 40px;
  text-align: left;
}

.productdetail_package-header {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 20px;
}

.productdetail_package-content {
  margin-bottom: 20px;
}

.productdetail_package-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
  color: #888888;
}

.productdetail_discount {
  color: #ff481e;
}

.productdetail_total {
  color: black;
  font-size: 1.3em;
  font-weight: bold;
}

.productdetail_package-footer {
  border: 1px solid #f5c6cb;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}

.productdetail_footer-title {
  font-size: 1.2em;
  color: #c82333;
  margin-bottom: 10px;
}

.productdetail_footer-total {
  font-size: 1.5em;
  color: #f4477b;
  font-weight: bold;
}

/* 상세 설명 이미지 */
.productdetail_main-detail-image-div {
  margin-top: 100px;
}

/* 리뷰 작성 */
.productdetail_review_content {
  margin-top: 100px;
}

.productdetail_review-section {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 100px;
}

.productdetail_review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.productdetail_review-title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.productdetail_write-review-btn {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.productdetail_write-review-btn i {
  margin-right: 8px;
}

.productdetail_review-cards {
  display: flex;
  flex-wrap: wrap;
  /* gap: 20px; */
  justify-content: space-between;
}

.productdetail_review_card:last-child {
  /* margin-right: 0; */
}

.productdetail_review-card {
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  width: 31%;
  padding: 10px;
  margin-bottom: 30px;
}

.productdetail_card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* margin-bottom: 10px; */
}

.productdetail_card-header h5 {
  margin: 0;
  font-size: 16px;
}

.productdetail_card-header span {
  font-size: 12px;
  color: #888;
}

.productdetail_card-icons {
  display: flex;
  gap: 10px;
}

.productdetail_card-icons i {
  cursor: pointer;
}

.productdetail_card-img-top {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 10px;
}

.productdetail_card-body {
  padding: 10px;
}

.productdetail_card-rating {
  font-size: 14px;
  margin-bottom: 10px;
}

.productdetail_card-text {
  font-size: 14px;
  color: #333;
  line-height: 1.5;
}

.productdetail_review-section_title-div {
  font-size: 14px;
}

.productdetail_review-section_title-div {
  display: flex;
  justify-content: space-between;
}

.productdetail_review-section_date-div {
  font-size: 12px;
}

/* QnA 작성 */

.productdetail_qna-section {
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  margin-top: 70px;
  /* background-color: green; */
  font-size: 14px;
  text-align: center;
}

.productdetail_qna-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0px;
}

.productdetail_qna-title {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
}

.productdetail_write-qna-btn {
  display: flex;
  align-items: center;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
}

.productdetail_write-qna-btn i {
  margin-right: 8px;
}

.productdetail_qna-table {
  width: 100%;
  border-collapse: collapse;
}

.productdetail_qna-table th,
.productdetail_qna-table td {
  border: 1px solid #e0e0e0;
  padding: 10px;
}

.productdetail_qna-table th {
  background-color: #f7f7f7;
}

.productdetail_qna-status {
  display: inline-block;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  width: 90px;
}

.productdetail_qna-status.incomplete {
  background-color: white;
  color: #007bff;
  border: 1px solid #007bff;
  width: 90px;
  padding: 5px 10px;
}

.productdetail_qna-section_status-title-div {
  display: flex;
  gap: 20px;
  align-items: center;
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

/* 캘린더 */
.common-event_calendar {
  display: flex;
  flex-direction: column;

  margin-top: 10px;
}

.common-event_calendar v-date-picker {
  margin-bottom: 10px;
}
.common-event_calendar button {
  margin-top: 10px;
}

.common-event_calendar_div {
  display: flex;
  margin-top: 10px;
  gap: 100px;
}

.common-caldate_save-button {
  width: 80px;
  font-size: 16px;
  color: #888888;
  background-color: #f5f5f5;
  border: 1px solid #969696;
  border-radius: 10px;
  /* padding: 25px 90px; */
  cursor: pointer;
}
</style>