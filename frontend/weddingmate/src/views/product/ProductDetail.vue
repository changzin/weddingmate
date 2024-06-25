<template>
  <div id="productdetail_app">
    <div class="container-fluid px-0">
      <div class="content">
        <!-- 헤더 -->
        <MateHeader />

        <!-- 콘텐츠 섹션 시작 -->
        <div class="productdetail_main_content">
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
                {{ productDetail.item_factory_name }}
              </div>
              <div class="productdetail_main_content_name_div">
                {{ productDetail.item_name }}
              </div>
              <div>
                <div class="main_content_starcount_div">
                  ★★★★★ {{ productDetail.item_star_rating }}
                </div>
                <div class="productdetail_main_content_reviewcount_div">
                  전체 리뷰 수 : ({{ productDetail.item_review_count }})
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
                  <div class="productdetail_main_content_discount_div">
                    {{ productDetail.item_discount_rate }}%
                  </div>
                  <div class="productdetail_main_content_origin_price_div">
                    {{ productDetail.item_price }}원
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  {{ finally_price }}원
                </div>
                <div class="productdetail_main_content_delivery_div">
                  <div class="productdetail_main_content_delivery_price_div">
                    배송비 {{ productDetail.item_delivery_price }}원
                  </div>
                </div>
                <div class="productdetail_main_content_maximum_quantity_div">
                  <div>최대구매수량</div>
                  <div>{{ totalQuantity }}개</div>
                </div>
                <div class="productdetail_main_selectoption-div">옵션 선택</div>
                <form @submit.prevent>
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
                            required
                          />
                          <button
                            type="button"
                            class="btn btn-outline-secondary productdetail_main-quantity-btn"
                            @click="increaseQuantity"
                          >
                            ＋
                          </button>
                        </div>
                        <div class="font-weight-bold" required>
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
                  <!-- 견적함 -->

                  <div
                    class="box-div collapse"
                    :class="{ show: allOptionsSelected }"
                  >
                    <div class="box-div_header">
                      <div class="box-div_header_list">견적함 리스트</div>
                    </div>
                    <button
                      class="box-div_item"
                      v-for="(BoxItem, index) in BoxResultData"
                      :key="index"
                      :class="{ selected: selectedIndex === index }"
                      @click="
                        selectBox(index, BoxItem.box_name, BoxItem.box_id)
                      "
                      type="button"
                    >
                      {{ BoxItem.box_name }}
                    </button>

                    <div class="box-div_add">
                      <div
                        v-if="!isEditing"
                        @click="startEditing"
                        class="box-div_add-item"
                      >
                        견적함 이름을 입력하세요
                      </div>
                      <input
                        v-else
                        class="box-div_add-item"
                        v-model="newBoxName"
                        type="text"
                        placeholder="견적함 이름을 입력하세요"
                      />
                      <button
                        type="button"
                        class="btn btn-outline-secondary"
                        @click="saveBoxName"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <!-- </div> -->

                  <div class="productdetail_button-container">
                    <button class="productdetail_icon-button">
                      <i class="far fa-heart"></i>
                    </button>
                    <button class="productdetail_icon-button">
                      <i class="fas fa-share-alt"></i>
                    </button>
                    <button
                      class="productdetail_main-content_button-container_main-button"
                      type="button"
                      @click="insertItemIntoBox"
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
                  <div
                    class="productdetail_calproductdetail_main_content_sdmpacakge-selectdate"
                  >
                    드레스 날짜 선택
                  </div>
                  <div
                    :class="['productdetail_cal']"
                    :style="{ marginTop: '10px' }"
                  >
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
                  <div
                    class="productdetail_calproductdetail_main_content_sdmpacakge-selectdate"
                  >
                    메이크업 날짜 선택
                  </div>
                  <div
                    :class="['productdetail_cal']"
                    :style="{ marginTop: '10px' }"
                  >
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
                       type="button"
                      @click="insertItemIntoBox"
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
          <div class="productdetail_qna-header">
            <h2 class="productdetail_qna-title">전체 리뷰 &gt;</h2>
            <button class="productdetail_write-qna-btn">
              <i class="fas fa-pen"></i> 리뷰작성
            </button>
          </div>

          <div class="productdetail_review-cards justify-content-start">
            <button
              class="productdetail_review-card"
              v-for="(review, index) in reviewList"
              :key="index"
              style="margin-left: 20px"
            >
              fdsf
              <div class="productdetail_card-header">
                <div class="productdetail_review-section_title-div">
                  {{ review.user_nickname }}
                </div>
                <div class="productdetail_card-icons">
                  <i class="fas fa-bullhorn"></i>
                  <i class="fas fa-edit"></i>
                  <i class="fas fa-trash"></i>
                </div>
              </div>
              <div class="productdetail_review-section_title-div">
                <div class="productdetail_card-rating">
                  {{ this.makeStar(review.review_star) }}
                </div>
                <div class="productdetail_review-section_date-div">
                  {{ this.$dateFormat(review.review_date) }}
                </div>
              </div>
              <img
                src="https://via.placeholder.com/300x200"
                class="productdetail_card-img-top"
                alt="Review Image"
              />
              <div class="productdetail_card-body">
                <p class="productdetail_card-text">
                  {{ review.review_content }}
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
                <th style="width: 80px">문의유형</th>
                <th style="width: 630px">문의/답변</th>
                <th style="width: 170px">작성자</th>
                <th style="width: 130px">작성일</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(qna, index) in qnaList" :key="index">
                <td>{{ this.formatQnaType(qna.qna_type) }}</td>
                <td class="productdetail_qna-section_status-title-div">
                  <div
                    class="productdetail_qna-status"
                    v-if="qna.qna_has_answer == 'T'"
                  >
                    답변 완료
                  </div>
                  <div
                    class="productdetail_qna-status incomplete"
                    v-if="qna.qna_has_answer == 'F'"
                  >
                    미완료
                  </div>
                  <div>
                    {{ qna.qna_title }}
                  </div>
                </td>
                <td>{{ qna.user_nickname }}</td>
                <td>{{ this.$dateFormat(qna.qna_date) }}</td>
              </tr>
              <!-- <tr v-for="n in 1" :key="n">
                  <td>배송문의</td>
                  <td class="productdetail_qna-section_status-title-div">
                    <div class="productdetail_qna-status incomplete">미완료</div>
                    <div>미완료 UI 보려고 하나 더 만듦</div>
                  </td>
                  <td>일이삼사오육칠팔구십일이</td>
                  <td>2024-06-11 15:54</td>
                </tr> -->
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
</template>

<script>
export default {
  data() {
    return {
      selectedSize: "",
      selectedColor: "",
      showColorSelect: false,
      qnaStatus: "completed",
      quantity: 1,
      unitPrice: 9999999999,

      optionGroups: [],
      selectedOptions: [],

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

      productDetail: [],
      productDetailItemDetail: [],
      sizesByColor: {}, // 추가된 부분

      accessToken: "",
      BoxResultData: [],

      selectedIndex: null,
      isEditing: false, // 입력 상태를 추적하는 상태
      newBoxName: "", // 새로운 견적함 이름을 저장하는 상태

      // 견적함 데이터
      selectedBoxName: "",
      selectedBoxId: null,

      selectedItemDetailId: null,
    };
  },

  props: {
    itemType: {
      type: String,
      required: true,
    },
    item_id: {
      type: String,
      required: true,
    },
  },

  async created() {
    await this.fetchData();
    this.setOptionsFromProductDetails();
  },

  // mounted() {
  //   this.fetchOptions();
  // },

  computed: {
    // 가격 계산
    totalPrice() {
      return this.finally_price * this.quantity;
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
    finally_price() {
      if (
        this.productDetail.item_price &&
        this.productDetail.item_discount_rate
      ) {
        return (
          this.productDetail.item_price -
          this.productDetail.item_price *
            (this.productDetail.item_discount_rate / 100)
        );
      }
      return 0;
    },
    totalQuantity() {
      return this.productDetailItemDetail.reduce(
        (sum, item) => sum + item.item_detail_quantity,
        0
      );
    },
  },

  methods: {
    async fetchData() {
      try {
        // 해당 페이지 item + itemDetail 데이터 가져오기
        const response = await this.$api(`/product/detail/${this.item_id}`);
        const productDetail = response.data;

        if (productDetail) {
          this.productDetail = productDetail.item;
          this.productDetailItemDetail = productDetail.itemDetails;
          // console.log("productDetail.item_name : ", this.productDetail.item_name);
          console.log(
            "productDetailItemDetail: ",
            JSON.parse(JSON.stringify(this.productDetailItemDetail))
          );
          // console.log("productDetail.item_name:", JSON.parse(JSON.stringify(productDetail.map((product) => product.item_name))));
        } else {
          console.error("ProductDetail.vue fetchData : No product data");
        }

        // 리뷰 데이터 가져오기
        const result = await this.$api(`/review/itemdetail/${this.item_id}`);
        if (result.status == 200) {
          this.reviewList = result.reviewList;
          // console.log("this.reviewList : ", this.reviewList);
        }

        // QnA 데이터 가져오기
        const QnAResult = await this.$api(`/qna/itemdetail/${this.item_id}`);
        if (QnAResult.status == 200) {
          this.qnaList = QnAResult.qnaList;
          // console.log(this.qnaList);
        }

        // Box 데이터 가져오기

        const BoxResult = await this.$api(
          "/product/boxlist",
          { access_token: "temp-token" },
          "POST"
        );
        this.BoxResultData = BoxResult.data;
        if (this.BoxResultData) {
          console.log(
            "BoxResultData: ",
            JSON.parse(JSON.stringify(this.BoxResultData))
          );
        } else {
          console.log("fail");
        }
      } catch (error) {
        console.error(
          "ProductDetail.vue fetchData Error fetching product data:",
          error
        );
      }
    },

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
        return this.itemType === "dress" ? "visible" : "collapse";
      }
      // 스튜디오
      else if (type === "studio") {
        return this.itemType === "studio" ? "visible" : "collapse";
      }
      // 메이크업
      else if (type === "makeup") {
        return this.itemType === "makeup" ? "visible" : "collapse";
      }
      // 스드메
      else if (type === "sdm_package") {
        return this.itemType === "sdm_package" ? "visible" : "collapse";
      }
      // 예복
      else if (type === "giving_dress") {
        return this.itemType === "giving_dress" ? "visible" : "collapse";
      }
      // 가전
      else if (type === "giving_mechine") {
        return this.itemType === "giving_mechine" ? "visible" : "collapse";
      }
      // 본식스냅
      else if (type === "snap") {
        return this.itemType === "snap" ? "visible" : "collapse";
      }
      // 영상
      else if (type === "video") {
        return this.itemType === "video" ? "visible" : "collapse";
      }
      // 부케
      else if (type === "flower") {
        return this.itemType === "flower" ? "visible" : "collapse";
      }
      // 연주
      else if (type === "music") {
        return this.itemType === "music" ? "visible" : "collapse";
      }
      // 사회자
      else if (type === "mc") {
        return this.itemType === "mc" ? "visible" : "collapse";
      }
      // 웨딩슈즈
      else if (type === "shoes") {
        return this.itemType === "shoes" ? "visible" : "collapse";
      }
      // 답례품
      else if (type === "gift") {
        return this.itemType === "gift" ? "visible" : "collapse";
      }
      // 청첩장
      else if (type === "letter") {
        return this.itemType === "letter" ? "visible" : "collapse";
      }

      return "collapse";
    },

    fetchOptions() {
      setTimeout(() => {
        this.optionGroups = [
          { name: "Size", options: ["Small", "Medium", "Large", "맞춤"] },
          { name: "Color", options: ["Red", "Blue", "Green"] },
        ];
        this.selectedOptions = Array(this.optionGroups.length).fill("");
      }, 1000);
    },
    // isEnabled(index) {
    //   if (index === 0) return true;
    //   return this.selectedOptions[index - 1] !== "";
    // },

    // isVisible(index) {
    //   if (index === 0) return true;
    //   if (this.selectedItemType_dress_custom === "visible" && index > 0) {
    //     return false;
    //   }
    //   return this.selectedOptions[index - 1] !== "";
    // },

    // onOptionChange(index) {
    //   if (this.selectedOptions[index] === "맞춤") {
    //     this.selectedItemType_dress_custom = "visible";
    //   } else {
    //     this.selectedItemType_dress_custom = "collapse";
    //   }

    //   // 선택이 변경되면 해당 인덱스 이후의 모든 선택을 초기화
    //   for (let i = index + 1; i < this.selectedOptions.length; i++) {
    //     this.selectedOptions[i] = "";
    //   }
    // },

    // setOptionsFromProductDetails() {
    //   //  [{item_detail_color: 'Red'}, {item_detail_color: 'Green'}, {item_detail_color: 'Red'}]인 경우, 결과는 ['Red', 'Green']
    //   const colors = [
    //     ...new Set(
    //       this.productDetailItemDetail.map((item) => item.item_detail_color)
    //     ),
    //   ];
    //   // { Red: ['M', 'L'], Green: ['M'] }
    //   const sizesByColor = {};
    //   colors.forEach((color) => {
    //     sizesByColor[color] = [
    //       ...new Set(
    //         this.productDetailItemDetail
    //           .filter((item) => item.item_detail_color === color)
    //           .map((item) => item.item_detail_size)
    //       ),
    //     ];
    //   });
    //   // optionGroups의 길이만큼 배열을 생성하여 각 요소를 ""로 초기화
    //   this.optionGroups = [
    //     { name: "Color", options: colors },
    //     { name: "Size", options: [] },
    //   ];
    //   this.selectedOptions = Array(this.optionGroups.length).fill("");

    //   // sizesByColor 객체를 this.sizesByColor에 저장하여 나중에 색상 선택에 따라 사이즈를 필터링할 때 사용
    //   this.sizesByColor = sizesByColor;
    // },

    // setOptionsFromProductDetails() {
    //   const sizes = [
    //     ...new Set(
    //       this.productDetailItemDetail.map((item) => item.item_detail_size)
    //     ),
    //   ];
    //   const colorsBySize = {};

    //   sizes.forEach((size) => {
    //     colorsBySize[size] = [
    //       ...new Set(
    //         this.productDetailItemDetail
    //           .filter((item) => item.item_detail_size === size)
    //           .map((item) => item.item_detail_color)
    //       ),
    //     ];
    //   });

    //   this.optionGroups = [
    //     { name: "Size", options: sizes },
    //     { name: "Color", options: [] },
    //   ];
    //   this.selectedOptions = Array(this.optionGroups.length).fill("");
    //   this.colorsBySize = colorsBySize;
    // },

    setOptionsFromProductDetails() {
      if (this.itemType === "dress") {
        this.setDressOptions();
      } else if (this.itemType === "flower") {
        this.setFlowerOptions();
      }
    },

    setDressOptions() {
      const sizes = [
        ...new Set(
          this.productDetailItemDetail.map((item) => item.item_detail_size)
        ),
      ];
      const colorsBySize = {};

      sizes.forEach((size) => {
        colorsBySize[size] = [
          ...new Set(
            this.productDetailItemDetail
              .filter((item) => item.item_detail_size === size)
              .map((item) => item.item_detail_color)
          ),
        ];
      });

      this.optionGroups = [
        { name: "Size", options: sizes },
        { name: "Color", options: [] },
      ];
      this.selectedOptions = Array(this.optionGroups.length).fill("");
      this.colorsBySize = colorsBySize;
    },

    setFlowerOptions() {
      const flowerLives = [
        ...new Set(
          this.productDetailItemDetail
            .map((item) => item.item_detail_flower_life)
            .filter((life) => life !== null)
        ),
      ];
      const colorsByFlowerLife = {};
      const sizesByColor = {};

      flowerLives.forEach((life) => {
        colorsByFlowerLife[life] = [
          ...new Set(
            this.productDetailItemDetail
              .filter((item) => item.item_detail_flower_life === life)
              .map((item) => item.item_detail_color)
              .filter((color) => color !== null)
          ),
        ];
      });

      this.productDetailItemDetail.forEach((item) => {
        if (item.item_detail_color !== null) {
          if (!sizesByColor[item.item_detail_color]) {
            sizesByColor[item.item_detail_color] = [];
          }
          if (
            item.item_detail_size !== null &&
            !sizesByColor[item.item_detail_color].includes(
              item.item_detail_size
            )
          ) {
            sizesByColor[item.item_detail_color].push(item.item_detail_size);
          }
        }
      });

      this.optionGroups = [
        { name: "Flower Life", options: flowerLives },
        { name: "Color", options: [] },
        { name: "Size", options: [] },
      ];
      this.selectedOptions = Array(this.optionGroups.length).fill("");
      this.flowerLifeByColor = colorsByFlowerLife;
      this.sizesByColor = sizesByColor;
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

    // onOptionChange(index) {
    //   if (index === 0) {
    //     this.optionGroups[1].options =
    //       this.sizesByColor[this.selectedOptions[0]] || [];
    //   }
    //   if (this.selectedOptions[index] === "맞춤") {
    //     this.selectedItemType_dress_custom = "visible";
    //   } else {
    //     this.selectedItemType_dress_custom = "collapse";
    //   }

    //   for (let i = index + 1; i < this.selectedOptions.length; i++) {
    //     this.selectedOptions[i] = "";
    //   }
    // },

    // onOptionChange(index) {
    //   // 첫 번째 옵션(사이즈) 선택 처리
    //   if (index === 0) {
    //     this.optionGroups[1].options =
    //       this.colorsBySize[this.selectedOptions[0]] || [];
    //   }

    //   // 맞춤 옵션 처리 (필요한 경우)
    //   if (this.selectedOptions[index] === "맞춤") {
    //     this.selectedItemType_dress_custom = "visible";
    //   } else {
    //     this.selectedItemType_dress_custom = "collapse";
    //   }

    //   // 이후 옵션 초기화
    //   for (let i = index + 1; i < this.selectedOptions.length; i++) {
    //     this.selectedOptions[i] = "";
    //   }
    // },

    onOptionChange(index) {
      if (this.itemType === "dress") {
        this.handleDressOptionChange(index);
      } else if (this.itemType === "flower") {
        this.handleFlowerOptionChange(index);
      }
      console.log("selectedOptions : ", this.selectedOptions);

      // 맞춤 옵션 처리
      if (this.selectedOptions[index] === "맞춤") {
        this.selectedItemType_dress_custom = "visible";
      } else {
        this.selectedItemType_dress_custom = "collapse";
      }

      // 이후 옵션 초기화
      for (let i = index + 1; i < this.selectedOptions.length; i++) {
        this.selectedOptions[i] = "";
      }
    },

    handleDressOptionChange(index) {
      if (index === 0) {
        this.optionGroups[1].options =
          this.colorsBySize[this.selectedOptions[0]] || [];
      }
    },

    handleFlowerOptionChange(index) {
      if (index === 0) {
        // Flower Life 선택 시 Color 옵션 설정
        this.optionGroups[1].options =
          this.flowerLifeByColor[this.selectedOptions[0]] || [];
      } else if (index === 1) {
        // Color 선택 시 Size 옵션 설정
        this.optionGroups[2].options =
          this.sizesByColor[this.selectedOptions[1]] || [];
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

    makeStar(num) {
      let star = "";
      for (let i = 0; i < num; i++) {
        star += "★";
      }
      return star;
    },
    formatQnaType(data) {
      if (data == "delivery") {
        return "배송문의";
      } else if (data == "cancel") {
        return "반품/취소";
      } else if (data == "item") {
        return "상품문의";
      } else {
        return "기타";
      }
    },

    // 견적함
    async addBox() {
      console.log("addbox클릭");
      this.isEditing = true;

      // Box 데이터 가져오기
      //  try{
      //     const BoxResult = await this.$api(
      //       "/product/boxlist",
      //       { access_token: "temp-token" },
      //       "POST"
      //     );
      //     this.BoxResultData = BoxResult.data;
      //     if (this.BoxResultData) {
      //       console.log(
      //         "BoxResultData: ",
      //         JSON.parse(JSON.stringify(this.BoxResultData))
      //       );
      //     } else {
      //       console.log("fail");
      //     }
      //   } catch (error) {
      //     console.error(
      //       "ProductDetail.vue fetchData Error fetching product data:",
      //       error
      //     );
      //   }
    },
    cancelEditing() {
      this.isEditing = false;
    },

    selectBox(index, boxName, boxId) {
      this.selectedIndex = index;
      this.selectedBoxName = boxName;
      this.selectedBoxId = boxId;
    },

    async saveBoxName() {
      if (this.newBoxName.trim() !== "") {
        this.BoxResultData.push({ box_name: this.newBoxName });

        try {
          const BoxResult = await this.$api(
            "/product/addbox",
            { access_token: "temp-token", box_name: this.newBoxName },
            "POST"
          );
          this.BoxResultData = BoxResult.data;
          if (this.BoxResultData) {
            console.log(
              "BoxResultData: ",
              JSON.parse(JSON.stringify(this.BoxResultData))
            );
          } else {
            console.log("fail");
          }
        } catch (error) {
          console.error(
            "ProductDetail.vue fetchData Error fetching product data:",
            error
          );
        }
      }
      this.newBoxName = "";
      this.isEditing = false;
    },

    updateSelectedItemDetailId() {
      // const selectedSize = this.selectedOptions[0];
      // const selectedColor = this.selectedOptions[1];

      // const selectedItem = this.productDetailItemDetail.find(
      //   (item) =>
      //     item.item_detail_size === selectedSize &&
      //     item.item_detail_color === selectedColor
      // );

      // if (selectedItem) {
      //   this.selectedItemDetailId = selectedItem.item_detail_id;
      //   console.log("Selected Item Detail ID: ", this.selectedItemDetailId);
      // } else {
      //   this.selectedItemDetailId = null;
      //   console.log("No matching item found.");
      // }
      if (this.itemType === 'dress') {
        const selectedSize = this.selectedOptions[0];
        const selectedColor = this.selectedOptions[1];
        
        const selectedItem = this.productDetailItemDetail.find(item => 
          item.item_detail_size === selectedSize && item.item_detail_color === selectedColor
        );

        if (selectedItem) {
          this.selectedItemDetailId = selectedItem.item_detail_id;
          console.log("Selected Item Detail ID: ", this.selectedItemDetailId);
        } else {
          this.selectedItemDetailId = null;
          console.log("No matching item found.");
        }
      } else if (this.itemType === 'flower') {
        const selectedFlowerLife = this.selectedOptions[0];
        const selectedColor = this.selectedOptions[1];
        const selectedSize = this.selectedOptions[2];

        const selectedItem = this.productDetailItemDetail.find(item =>
          item.item_detail_flower_life === selectedFlowerLife &&
          item.item_detail_color === selectedColor &&
          item.item_detail_size === selectedSize
        );

        if (selectedItem) {
          this.selectedItemDetailId = selectedItem.item_detail_id;
          console.log("Selected Item Detail ID: ", this.selectedItemDetailId);
        } else {
          this.selectedItemDetailId = null;
          console.log("No matching item found.");
        }
      }
    },

    // 물건 담기
    async insertItemIntoBox() {
      this.updateSelectedItemDetailId();
      //보일 때
      // if (this.allOptionsSelected) {
      //   // try {
      //   //    await this.$api(
      //   //     "/product/insertitemintobox",
      //   //     { access_token: "temp-token", box_id: this.selectedBoxId, box_name: this.selectedBoxName, box_item_quantity:this.quantity },
      //   //     "POST"
      //   //   );
      //   // } catch (error) {
      //   //   console.error(
      //   //     "ProductDetail.vue fetchData Error fetching product data:",
      //   //     error
      //   //   );
      //   // }
      //    // 드레스
      // if (this.itemType === "dress") {
      //   console.log("엥 dress");
      //   try {
      //      await this.$api(
      //       "/product/insertitemintobox",
      //       { access_token: "temp-token", box_id: this.selectedBoxId, box_name: this.selectedBoxName, box_item_quantity:this.quantity },
      //       "POST"
      //     );
      //   } catch (error) {
      //     console.error(
      //       "ProductDetail.vue fetchData Error fetching product data:",
      //       error
      //     );
      //   }
      // }
      // // 스튜디오
      // else if (this.itemType === "studio") {
      //   console.log("엥 studio");
      // }
      // // 메이크업
      // else if (this.itemType === "makeup") {
      //   console.log("엥 studio");

      // }
      // // 스드메
      // else if (this.itemType === "sdm_package") {
      //   console.log("엥 studio");

      // }
      // // 예복
      // else if (this.itemType === "giving_dress") {
      //   console.log("엥 studio");
      // }
      // // 가전
      // else if (this.itemType === "giving_mechine") {
      //   console.log("엥 studio");
      // }
      // // 본식스냅
      // else if (this.itemType === "snap") {
      //   console.log("엥 studio");
      // }
      // // 영상
      // else if (this.itemType === "video") {
      //   console.log("엥 studio");
      // }
      // // 부케
      // else if (this.itemType === "flower") {
      //   console.log("엥 studio");
      // }
      // // 연주
      // else if (this.itemType === "music") {
      //   console.log("엥 studio");
      // }
      // // 사회자
      // else if (this.itemType === "mc") {
      //   console.log("엥 studio");
      // }
      // // 웨딩슈즈
      // else if (this.itemType === "shoes") {
      //   console.log("엥 studio");
      // }
      // // 답례품
      // else if (this.itemType === "gift") {
      //   console.log("엥 studio");
      // }
      // // 청첩장
      // else if (this.itemType === "letter") {
      //   console.log("엥 studio");
      // }

      // } else {
      //   console.log("f");
      // }
    },

    startEditing() {
      this.isEditing = true;
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

/* 콘텐츠 섹션 시작 */

.productdetail_main_content {
  width: calc(100% - 700px);
  margin: 0 auto;
  margin-top: 0px;
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
  justify-content: center;
}

.box-div_header {
  display: flex;
  margin-top: 30px;
  margin-bottom: 10px;
  justify-content: space-between;
}

.box-div_header_list {
  font-size: 24px;
  font-weight: bold;
}

.box-div_add-box {
  border: none;
  background-color: #f7cac9;
  border-radius: 10px;
  padding: 10px;
  color: #555555;
  font-size: 12px;
}

.box-div_item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50px;
  border: 1px solid #dddddd;
  color: #888;
  border-radius: 10px;
  width: 300px;
  background-color: white;
  padding-left: 20px;
  margin-bottom: 10px;
}

.box-div_item.selected {
  color: #f7cac9;
  font-weight: bold;
  border: 1px solid #f7cac9;
}

.box-div_add {
  display: flex;

  margin-bottom: 10px;
  justify-content: space-between;
  align-items: center;
}

.box-div_add-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 50px;
  border: 1px solid #dddddd;
  color: #888;
  border-radius: 10px;
  width: 300px;
  background-color: white;
  padding-left: 20px;
  margin-bottom: 10px;
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