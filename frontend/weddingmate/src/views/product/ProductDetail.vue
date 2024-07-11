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
            <div class="col-md-6 productdetail_main_content-div-img_div">
              <img
                :src="this.$imageFileFormat(productDetail.item_main_image_path)"
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
                  <!-- 별점 -->
                  <div class="rating">
                    <label
                      v-for="n in 10"
                      :key="n"
                      class="rating__label"
                      :class="{
                        half: n <= productDetail.item_star_rating * 2,
                        filled: n <= productDetail.item_star_rating * 2,
                        half_position: n % 2 !== 0,
                        filled_position: n % 2 === 0,
                      }"
                    >
                      <input
                        type="radio"
                        :id="'star' + n"
                        class="rating__input"
                        name="rating"
                        :value="n"
                        v-model="rating"
                      />
                      <div class="star-icon"></div>
                    </label>
                  </div>
                  {{ productDetail.item_star_rating }}
                </div>
                <div
                  class="productdetail_main_content_reviewcount_div"
                  type="button"
                  @click="goToReviewList"
                >
                  전체 리뷰 수 : ({{ productDetail.item_review_count }})
                </div>
              </div>

              <!-- 웨딩홀 -->
              <div
                v-if="isVisibleItemType('hall')"
                class="productdetail_main_content_selectoption_div"
              >
                <!-- <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('hall'),
                ]"
              > -->
                <div
                  style="margin-top: 30px"
                  v-if="
                    productDetail.item_discount_rate !== undefined &&
                    productDetail.item_discount_rate !== null &&
                    productDetail.item_price !== undefined &&
                    productDetail.item_price !== null
                  "
                >
                  <div class="productdetail_main_content_discount_div">
                    {{ productDetail.item_discount_rate }}%
                  </div>
                  <div class="productdetail_main_content_origin_price_div">
                    <span>
                      {{ productDetail.item_price.toLocaleString() }}원
                    </span>
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  <span
                    v-if="finally_price !== undefined && finally_price !== null"
                  >
                    {{ finally_price.toLocaleString() }}원
                  </span>
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
                  <!-- - + 가격 -->
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
                    <div
                      class="productdetail_main-content_item_detail_quantity-div"
                    ></div>
                    <div class="productdetail_total-price-div">
                      <div class="productdetail_total-price-div_state-div">
                        총 금액 :
                      </div>
                      <div class="productdetail_total-price-div_price-div">
                        {{ formattedTotalPrice }}원
                      </div>
                    </div>
                  </div>
                  <!-- 캘린더 -->
                  <div
                    class="productdetail_cal collapse"
                    :class="{ show: allOptionsSelected }"
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
                        {{
                          dateRange.start && dateRange.end
                            ? formatDate(dateRange.start) +
                              " ~ " +
                              formatDate(dateRange.end)
                            : "선택되지 않음"
                        }}
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
                  <!-- 물건담기 -->
                  <div class="productdetail_button-container">
                    <button
                      class="productdetail_icon-button"
                      type="button"
                      @click="savetoBookmark"
                    >
                      <i class="fas fa-heart" v-if="bookmarkResult"></i>
                      <i class="far fa-heart" v-if="!bookmarkResult"></i>
                    </button>
                    <button
                      class="productdetail_icon-button"
                      type="button"
                      @click="copyCurrentLink"
                    >
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

              <!-- 드레스 옵션 -->
              <div
                v-if="isVisibleItemType('dress')"
                class="productdetail_main_content_selectoption_div"
              >
                <div
                  style="margin-top: 30px"
                  v-if="
                    productDetail.item_discount_rate !== undefined &&
                    productDetail.item_discount_rate !== null &&
                    productDetail.item_price !== undefined &&
                    productDetail.item_price !== null
                  "
                >
                  <div class="productdetail_main_content_discount_div">
                    {{ productDetail.item_discount_rate }}%
                  </div>
                  <div class="productdetail_main_content_origin_price_div">
                    <span>
                      {{ productDetail.item_price.toLocaleString() }}원
                    </span>
                  </div>
                </div>

                <div class="productdetail_main_content_discount_price_div">
                  <span
                    v-if="finally_price !== undefined && finally_price !== null"
                  >
                    {{ finally_price.toLocaleString() }}원
                  </span>
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
                    <div
                      class="productdetail_main-content_item_detail_quantity-div"
                    >
                      남은 재고 수량 : {{ visibleItemDetailQuantity }}
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
                        {{
                          dateRange.start && dateRange.end
                            ? formatDate(dateRange.start) +
                              " ~ " +
                              formatDate(dateRange.end)
                            : "선택되지 않음"
                        }}
                      </div>
                    </div>
                  </div>
                  <!-- 견적함 -->

                  <div
                    class="box-div collapse"
                    :class="{ show: showCustomOptions || allOptionsSelected }"
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
                    <button
                      class="productdetail_icon-button"
                      type="button"
                      @click="savetoBookmark"
                    >
                      <i class="fas fa-heart" v-if="bookmarkResult"></i>
                      <i class="far fa-heart" v-if="!bookmarkResult"></i>
                    </button>
                    <button
                      class="productdetail_icon-button"
                      type="button"
                      @click="copyCurrentLink"
                    >
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
                v-if="isVisibleItemType('studio')"
                class="productdetail_main_content_selectoption_div"
              >
                <!-- <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('studio'),
                ]"
              > -->
                <div
                  style="margin-top: 30px"
                  v-if="
                    productDetail.item_discount_rate !== undefined &&
                    productDetail.item_discount_rate !== null &&
                    productDetail.item_price !== undefined &&
                    productDetail.item_price !== null
                  "
                >
                  <div class="productdetail_main_content_discount_div">
                    {{ productDetail.item_discount_rate }}%
                  </div>
                  <div class="productdetail_main_content_origin_price_div">
                    <span>
                      {{ productDetail.item_price.toLocaleString() }}원
                    </span>
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  <span
                    v-if="finally_price !== undefined && finally_price !== null"
                  >
                    {{ finally_price.toLocaleString() }}원
                  </span>
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
                    <div
                      class="productdetail_main-content_item_detail_quantity-div"
                    >
                      남은 재고 수량 : {{ visibleItemDetailQuantity }}
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
                  <div
                    class="productdetail_cal collapse"
                    :class="{ show: allOptionsSelected }"
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
                        {{
                          dateRange.start && dateRange.end
                            ? formatDate(dateRange.start) +
                              " ~ " +
                              formatDate(dateRange.end)
                            : "선택되지 않음"
                        }}
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
                    <button
                      class="productdetail_icon-button"
                      type="button"
                      @click="savetoBookmark"
                    >
                      <i class="fas fa-heart" v-if="bookmarkResult"></i>
                      <i class="far fa-heart" v-if="!bookmarkResult"></i>
                    </button>
                    <button
                      class="productdetail_icon-button"
                      type="button"
                      @click="copyCurrentLink"
                    >
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

              <!-- 메이크업 옵션 -->
              <div
                v-if="isVisibleItemType('makeup')"
                class="productdetail_main_content_selectoption_div"
              >
                <!-- <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('makeup'),
                ]"
              > -->
                <div
                  style="margin-top: 30px"
                  v-if="
                    productDetail.item_discount_rate !== undefined &&
                    productDetail.item_discount_rate !== null &&
                    productDetail.item_price !== undefined &&
                    productDetail.item_price !== null
                  "
                >
                  <div class="productdetail_main_content_discount_div">
                    {{ productDetail.item_discount_rate }}%
                  </div>
                  <div class="productdetail_main_content_origin_price_div">
                    <span>
                      {{ productDetail.item_price.toLocaleString() }}원
                    </span>
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  <span
                    v-if="finally_price !== undefined && finally_price !== null"
                  >
                    {{ finally_price.toLocaleString() }}원
                  </span>
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
                    <div
                      class="productdetail_main-content_item_detail_quantity-div"
                    >
                      남은 재고 수량 : {{ visibleItemDetailQuantity }}
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
                  <!-- 캘린더 -->
                  <div
                    class="productdetail_cal collapse"
                    :class="{ show: allOptionsSelected }"
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
                        {{
                          dateRange.start && dateRange.end
                            ? formatDate(dateRange.start) +
                              " ~ " +
                              formatDate(dateRange.end)
                            : "선택되지 않음"
                        }}
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
                    <button
                      class="productdetail_icon-button"
                      type="button"
                      @click="savetoBookmark"
                    >
                      <i class="fas fa-heart" v-if="bookmarkResult"></i>
                      <i class="far fa-heart" v-if="!bookmarkResult"></i>
                    </button>
                    <button
                      class="productdetail_icon-button"
                      type="button"
                      @click="copyCurrentLink"
                    >
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

              <!-- 스드메 -->
              <div
                v-if="isVisibleItemType('sdm_package')"
                class="productdetail_main_content_selectoption_div"
              >
                <!-- <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('sdm_package'),
                ]"
              > -->
                <div
                  style="margin-top: 30px"
                  v-if="
                    productDetail.item_discount_rate !== undefined &&
                    productDetail.item_discount_rate !== null &&
                    productDetail.item_price !== undefined &&
                    productDetail.item_price !== null
                  "
                >
                  <div class="productdetail_main_content_discount_div">
                    {{ productDetail.item_discount_rate }}%
                  </div>
                  <div class="productdetail_main_content_origin_price_div">
                    <span>
                      {{ productDetail.item_price.toLocaleString() }}원
                    </span>
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  <span
                    v-if="finally_price !== undefined && finally_price !== null"
                  >
                    {{ finally_price.toLocaleString() }}원
                  </span>
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
                  <!-- - + 가격 -->
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
                    <div
                      class="productdetail_main-content_item_detail_quantity-div"
                    ></div>
                    <div class="productdetail_total-price-div">
                      <div class="productdetail_total-price-div_state-div">
                        총 금액 :
                      </div>
                      <div class="productdetail_total-price-div_price-div">
                        {{ formattedTotalPrice }}원
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
                  <!-- 물건담기 -->
                  <div class="productdetail_button-container">
                    <button
                      class="productdetail_icon-button"
                      type="button"
                      @click="savetoBookmark"
                    >
                      <i class="fas fa-heart" v-if="bookmarkResult"></i>
                      <i class="far fa-heart" v-if="!bookmarkResult"></i>
                    </button>
                    <button
                      class="productdetail_icon-button"
                      type="button"
                      @click="copyCurrentLink"
                    >
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

              <!-- 예복 -->
              <div
                v-if="isVisibleItemType('giving_dress')"
                class="productdetail_main_content_selectoption_div"
              >
                <!-- <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('giving_dress'),
                ]"
              > -->
                <div
                  style="margin-top: 30px"
                  v-if="
                    productDetail.item_discount_rate !== undefined &&
                    productDetail.item_discount_rate !== null &&
                    productDetail.item_price !== undefined &&
                    productDetail.item_price !== null
                  "
                >
                  <div class="productdetail_main_content_discount_div">
                    {{ productDetail.item_discount_rate }}%
                  </div>
                  <div class="productdetail_main_content_origin_price_div">
                    <span>
                      {{ productDetail.item_price.toLocaleString() }}원
                    </span>
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  <span
                    v-if="finally_price !== undefined && finally_price !== null"
                  >
                    {{ finally_price.toLocaleString() }}원
                  </span>
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
                    <div
                      class="productdetail_main-content_item_detail_quantity-div"
                    >
                      남은 재고 수량 : {{ visibleItemDetailQuantity }}
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
                        {{
                          dateRange.start && dateRange.end
                            ? formatDate(dateRange.start) +
                              " ~ " +
                              formatDate(dateRange.end)
                            : "선택되지 않음"
                        }}
                      </div>
                    </div>
                  </div>
                  <!-- 견적함 -->

                  <div
                    class="box-div collapse"
                    :class="{ show: showCustomOptions || allOptionsSelected }"
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
                    <button
                      class="productdetail_icon-button"
                      type="button"
                      @click="savetoBookmark"
                    >
                      <i class="fas fa-heart" v-if="bookmarkResult"></i>
                      <i class="far fa-heart" v-if="!bookmarkResult"></i>
                    </button>
                    <button
                      class="productdetail_icon-button"
                      type="button"
                      @click="copyCurrentLink"
                    >
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

              <!-- 예물 -->
              <div
                v-if="isVisibleItemType('giving_item')"
                class="productdetail_main_content_selectoption_div"
              >
                <!-- <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('giving_item'),
                ]"
              > -->
                <div
                  style="margin-top: 30px"
                  v-if="
                    productDetail.item_discount_rate !== undefined &&
                    productDetail.item_discount_rate !== null &&
                    productDetail.item_price !== undefined &&
                    productDetail.item_price !== null
                  "
                >
                  <div class="productdetail_main_content_discount_div">
                    {{ productDetail.item_discount_rate }}%
                  </div>
                  <div class="productdetail_main_content_origin_price_div">
                    <span>
                      {{ productDetail.item_price.toLocaleString() }}원
                    </span>
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  <span
                    v-if="finally_price !== undefined && finally_price !== null"
                  >
                    {{ finally_price.toLocaleString() }}원
                  </span>
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
                    <div
                      class="productdetail_main-content_item_detail_quantity-div"
                    >
                      남은 재고 수량 : {{ visibleItemDetailQuantity }}
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
                    <button
                      class="productdetail_icon-button"
                      type="button"
                      @click="savetoBookmark"
                    >
                      <i class="fas fa-heart" v-if="bookmarkResult"></i>
                      <i class="far fa-heart" v-if="!bookmarkResult"></i>
                    </button>
                    <button
                      class="productdetail_icon-button"
                      type="button"
                      @click="copyCurrentLink"
                    >
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

              <!-- 가전 -->
              <div
                v-if="isVisibleItemType('giving_mechine')"
                class="productdetail_main_content_selectoption_div"
              >
                <!-- <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('giving_mechine'),
                ]"
              > -->
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
                    @click="selectBox(index, BoxItem.box_name, BoxItem.box_id)"
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
                <div class="productdetail_button-container">
                  <button
                    class="productdetail_icon-button"
                    type="button"
                    @click="copyCurrentLink"
                  >
                    <i class="fas fa-heart" v-if="bookmarkResult"></i>
                      <i class="far fa-heart" v-if="!bookmarkResult"></i>
                  </button>
                  <button
                    class="productdetail_icon-button"
                    type="button"
                    @click="copyCurrentLink"
                  >
                    <i class="fas fa-share-alt"></i>
                  </button>
                  <button
                    class="productdetail_main-content_button-container_main-button"
                    @click="insertItemIntoBox"
                  >
                    물건담기
                  </button>
                </div>
              </div>

              <!-- 혼수 패키지 -->
              <div
                v-if="isVisibleItemType('giving_package')"
                class="productdetail_main_content_selectoption_div"
              >
                <!-- <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('giving_package'),
                ]"
              > -->
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
                    @click="selectBox(index, BoxItem.box_name, BoxItem.box_id)"
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
                <div class="productdetail_button-container">
                  <button
                    class="productdetail_icon-button"
                    type="button"
                    @click="saveToBookmark"
                  >
                    <i class="fas fa-heart" v-if="bookmarkResult"></i>
                      <i class="far fa-heart" v-if="!bookmarkResult"></i>
                  </button>
                  <button
                    class="productdetail_icon-button"
                    type="button"
                    @click="copyCurrentLink"
                  >
                    <i class="fas fa-share-alt"></i>
                  </button>
                  <button
                    class="productdetail_main-content_button-container_main-button"
                    @click="insertItemIntoBox"
                  >
                    물건담기
                  </button>
                </div>
              </div>

              <!-- 본식스냅 -->
              <div
                v-if="isVisibleItemType('snap')"
                class="productdetail_main_content_selectoption_div"
              >
                <!-- <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('snap'),
                ]"
              > -->
                <div
                  style="margin-top: 30px"
                  v-if="
                    productDetail.item_discount_rate !== undefined &&
                    productDetail.item_discount_rate !== null &&
                    productDetail.item_price !== undefined &&
                    productDetail.item_price !== null
                  "
                >
                  <div class="productdetail_main_content_discount_div">
                    {{ productDetail.item_discount_rate }}%
                  </div>
                  <div class="productdetail_main_content_origin_price_div">
                    <span>
                      {{ productDetail.item_price.toLocaleString() }}원
                    </span>
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  <span
                    v-if="finally_price !== undefined && finally_price !== null"
                  >
                    {{ finally_price.toLocaleString() }}원
                  </span>
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
                    <div
                      class="productdetail_main-content_item_detail_quantity-div"
                    >
                      남은 재고 수량 : {{ visibleItemDetailQuantity }}
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
                    <button
                      class="productdetail_icon-button"
                      type="button"
                      @click="savetoBookmark"
                    >
                      <i class="fas fa-heart" v-if="bookmarkResult"></i>
                      <i class="far fa-heart" v-if="!bookmarkResult"></i>
                    </button>
                    <button
                      class="productdetail_icon-button"
                      type="button"
                      @click="copyCurrentLink"
                    >
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

              <!-- 영상 -->
              <div
                v-if="isVisibleItemType('video')"
                class="productdetail_main_content_selectoption_div"
              >
                <!-- <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('video'),
                ]"
              > -->
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
                    @click="selectBox(index, BoxItem.box_name, BoxItem.box_id)"
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
                <div class="productdetail_button-container">
                  <button
                    class="productdetail_icon-button"
                    type="button"
                    @click="saveToBookmark"
                  >
                    <i class="fas fa-heart" v-if="bookmarkResult"></i>
                      <i class="far fa-heart" v-if="!bookmarkResult"></i>
                  </button>
                  <button
                    class="productdetail_icon-button"
                    type="button"
                    @click="copyCurrentLink"
                  >
                    <i class="fas fa-share-alt"></i>
                  </button>
                  <button
                    class="productdetail_main-content_button-container_main-button"
                    @click="insertItemIntoBox"
                  >
                    물건담기
                  </button>
                </div>
              </div>

              <!-- 부케 -->
              <div
                v-if="isVisibleItemType('flower')"
                class="productdetail_main_content_selectoption_div"
              >
                <!-- <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('flower'),
                ]"
              > -->
                <div
                  style="margin-top: 30px"
                  v-if="
                    productDetail.item_discount_rate !== undefined &&
                    productDetail.item_discount_rate !== null &&
                    productDetail.item_price !== undefined &&
                    productDetail.item_price !== null
                  "
                >
                  <div class="productdetail_main_content_discount_div">
                    {{ productDetail.item_discount_rate }}%
                  </div>
                  <div class="productdetail_main_content_origin_price_div">
                    <span>
                      {{ productDetail.item_price.toLocaleString() }}원
                    </span>
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  <span
                    v-if="finally_price !== undefined && finally_price !== null"
                  >
                    {{ finally_price.toLocaleString() }}원
                  </span>
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
                  <!-- - + 가격 -->
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
                    <div
                      class="productdetail_main-content_item_detail_quantity-div"
                    ></div>
                    <div class="productdetail_total-price-div">
                      <div class="productdetail_total-price-div_state-div">
                        총 금액 :
                      </div>
                      <div class="productdetail_total-price-div_price-div">
                        {{ formattedTotalPrice }}원
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
                  <!-- 물건담기 -->
                  <div class="productdetail_button-container">
                    <button
                      class="productdetail_icon-button"
                      type="button"
                      @click="savetoBookmark"
                    >
                      <i class="fas fa-heart" v-if="bookmarkResult"></i>
                      <i class="far fa-heart" v-if="!bookmarkResult"></i>
                    </button>
                    <button
                      class="productdetail_icon-button"
                      type="button"
                      @click="copyCurrentLink"
                    >
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
                v-if="isVisibleItemType('music')"
                class="productdetail_main_content_selectoption_div"
              >
                <!-- <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('music'),
                ]"
              > -->
                <div
                  style="margin-top: 30px"
                  v-if="
                    productDetail.item_discount_rate !== undefined &&
                    productDetail.item_discount_rate !== null &&
                    productDetail.item_price !== undefined &&
                    productDetail.item_price !== null
                  "
                >
                  <div class="productdetail_main_content_discount_div">
                    {{ productDetail.item_discount_rate }}%
                  </div>
                  <div class="productdetail_main_content_origin_price_div">
                    <span>
                      {{ productDetail.item_price.toLocaleString() }}원
                    </span>
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  <span
                    v-if="finally_price !== undefined && finally_price !== null"
                  >
                    {{ finally_price.toLocaleString() }}원
                  </span>
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
                    <div
                      class="productdetail_main-content_item_detail_quantity-div"
                    >
                      남은 재고 수량 : {{ visibleItemDetailQuantity }}
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
                    <button
                      class="productdetail_icon-button"
                      type="button"
                      @click="savetoBookmark"
                    >
                      <i class="fas fa-heart" v-if="bookmarkResult"></i>
                      <i class="far fa-heart" v-if="!bookmarkResult"></i>
                    </button>
                    <button
                      class="productdetail_icon-button"
                      type="button"
                      @click="copyCurrentLink"
                    >
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

              <!-- 사회자 -->
              <div
                v-if="isVisibleItemType('mc')"
                class="productdetail_main_content_selectoption_div"
              >
                <!-- <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('mc'),
                ]"
              > -->
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
                    @click="selectBox(index, BoxItem.box_name, BoxItem.box_id)"
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
                <div class="productdetail_button-container">
                  <button
                    class="productdetail_icon-button"
                    type="button"
                    @click="saveToBookmark"
                  >
                    <i class="fas fa-heart" v-if="bookmarkResult"></i>
                      <i class="far fa-heart" v-if="!bookmarkResult"></i>
                  </button>
                  <button
                    class="productdetail_icon-button"
                    type="button"
                    @click="copyCurrentLink"
                  >
                    <i class="fas fa-share-alt"></i>
                  </button>
                  <button
                    class="productdetail_main-content_button-container_main-button"
                    @click="insertItemIntoBox"
                  >
                    물건담기
                  </button>
                </div>
              </div>

              <!-- 웨딩슈즈 -->
              <div
                v-if="isVisibleItemType('shoes')"
                class="productdetail_main_content_selectoption_div"
              >
                <!-- <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('shoes'),
                ]"
              > -->
                <div
                  style="margin-top: 30px"
                  v-if="
                    productDetail.item_discount_rate !== undefined &&
                    productDetail.item_discount_rate !== null &&
                    productDetail.item_price !== undefined &&
                    productDetail.item_price !== null
                  "
                >
                  <div class="productdetail_main_content_discount_div">
                    {{ productDetail.item_discount_rate }}%
                  </div>
                  <div class="productdetail_main_content_origin_price_div">
                    <span>
                      {{ productDetail.item_price.toLocaleString() }}원
                    </span>
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  <span
                    v-if="finally_price !== undefined && finally_price !== null"
                  >
                    {{ finally_price.toLocaleString() }}원
                  </span>
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
                  <!-- - + 가격 -->
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
                    <div
                      class="productdetail_main-content_item_detail_quantity-div"
                    ></div>
                    <div class="productdetail_total-price-div">
                      <div class="productdetail_total-price-div_state-div">
                        총 금액 :
                      </div>
                      <div class="productdetail_total-price-div_price-div">
                        {{ formattedTotalPrice }}원
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
                  <!-- 물건담기 -->
                  <div class="productdetail_button-container">
                    <button
                      class="productdetail_icon-button"
                      type="button"
                      @click="savetoBookmark"
                    >
                      <i class="fas fa-heart" v-if="bookmarkResult"></i>
                      <i class="far fa-heart" v-if="!bookmarkResult"></i>
                    </button>
                    <button
                      class="productdetail_icon-button"
                      type="button"
                      @click="copyCurrentLink"
                    >
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

              <!-- 답례품 -->
              <div
                v-if="isVisibleItemType('gift')"
                class="productdetail_main_content_selectoption_div"
              >
                <!-- <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('gift'),
                ]"
              > -->
                <div
                  style="margin-top: 30px"
                  v-if="
                    productDetail.item_discount_rate !== undefined &&
                    productDetail.item_discount_rate !== null &&
                    productDetail.item_price !== undefined &&
                    productDetail.item_price !== null
                  "
                >
                  <div class="productdetail_main_content_discount_div">
                    {{ productDetail.item_discount_rate }}%
                  </div>
                  <div class="productdetail_main_content_origin_price_div">
                    <span>
                      {{ productDetail.item_price.toLocaleString() }}원
                    </span>
                  </div>
                </div>
                <div class="productdetail_main_content_discount_price_div">
                  <span
                    v-if="finally_price !== undefined && finally_price !== null"
                  >
                    {{ finally_price.toLocaleString() }}원
                  </span>
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
                    <div
                      class="productdetail_main-content_item_detail_quantity-div"
                    >
                      남은 재고 수량 : {{ visibleItemDetailQuantity }}
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
                    <button
                      class="productdetail_icon-button"
                      type="button"
                      @click="saveToBookmark"
                    >
                      <i class="fas fa-heart" v-if="bookmarkResult"></i>
                      <i class="far fa-heart" v-if="!bookmarkResult"></i>
                    </button>
                    <button
                      class="productdetail_icon-button"
                      type="button"
                      @click="saveToBookmark"
                    >
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

              <!-- 청첩장 -->
              <div
                v-if="isVisibleItemType('letter')"
                class="productdetail_main_content_selectoption_div"
              >
                <!-- <div
                :class="[
                  'productdetail_main_content_selectoption_div',
                  getClass('letter'),
                ]"
              > -->
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
                    @click="selectBox(index, BoxItem.box_name, BoxItem.box_id)"
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
                <div class="productdetail_button-container">
                  <button
                    class="productdetail_icon-button"
                    type="button"
                    @click="saveToBookmark"
                  >
                    <i class="fas fa-heart" v-if="bookmarkResult"></i>
                      <i class="far fa-heart" v-if="!bookmarkResult"></i>
                  </button>
                  <button
                    class="productdetail_icon-button"
                    type="button"
                    @click="copyCurrentLink"
                  >
                    <i class="fas fa-share-alt"></i>
                  </button>
                  <button
                    class="productdetail_main-content_button-container_main-button"
                    @click="insertItemIntoBox"
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
            :src="this.$imageFileFormat(productDetail.item_detail_image_path)"
            class="img-fluid"
            alt="Detailed Description Image"
          />
        </div>

        <!-- 신고 팝업창 -->
        <div v-if="isVisibleReport" class="report-overlay">
          <div class="report-popup">
            <!-- <div v-if="isVisibleReport" class="report-popup"> -->

            <div class="report-popup_header">
              <div></div>
              <div>신고 팝업창</div>
              <i
                class="fas fa-times popupCloseButton"
                @click="collapseReportPopup"
              ></i>
            </div>
            <div class="report-popup_content">
              <div class="report-popup_content_header">신고사유 :</div>
              <textarea
                class="report-popup_content_input"
                v-model="reportContent"
              ></textarea>
              <div class="report-popup_content_footer">
                <div class="report-popup_content_ok" @click="ToReport">
                  전송
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 리뷰 섹션 -->
        <div class="productdetail_review-section">
          <div class="productdetail_qna-header">
            <h2
              class="productdetail_qna-title"
              type="button"
              @click="goToReviewList"
            >
              전체 리뷰 &gt;
            </h2>
            <button
              class="productdetail_write-qna-btn"
              type="button"
              @click="goToReviewWrite"
            >
              <i class="fas fa-pen"></i> 리뷰작성
            </button>
          </div>

          <div
            class="productdetail_review-cards justify-content-start"
            v-if="reviewList && reviewList.length"
          >
            <div
              class="productdetail_review-card"
              v-for="(review, index) in reviewList"
              :key="index"
              style="margin-left: 20px"
              @click="goToReviewDetail(review.review_id)"
            >
              <div class="productdetail_card-header">
                <div class="productdetail_review-section_title-div">
                  {{
                    review.is_current_user
                      ? review.user_nickname
                      : maskNickname(review.user_nickname)
                  }}
                </div>
                <div class="productdetail_card-icons">
                  <i
                    class="fas fa-bullhorn"
                    @click.stop="reviewToReport(review.review_id)"
                    v-if="!review.is_current_user"
                  ></i>
                  <i
                    class="fas fa-edit"
                    @click.stop="gotoReviewModify(review.review_id)"
                    v-if="review.is_current_user"
                  ></i>
                  <i
                    class="fas fa-trash"
                    @click.stop="deleteReview(review)"
                    v-if="review.is_current_user"
                  ></i>
                </div>
              </div>
              <div class="productdetail_review-section_title-div">
                <div class="productdetail_card-rating">
                  <!-- 별점 -->
                  <div class="qnawrite_row">
                    <div class="rating">
                      <label
                        v-for="n in 10"
                        :key="n"
                        class="rating__label"
                        :class="{
                          half: n <= review.review_star * 2,
                          filled: n <= review.review_star * 2,
                          half_position: n % 2 !== 0,
                          filled_position: n % 2 === 0,
                        }"
                      >
                        <input
                          type="radio"
                          :id="'star' + n"
                          class="rating__input"
                          name="rating"
                          :value="n"
                          v-model="rating"
                        />
                        <div class="star-icon"></div>
                      </label>
                    </div>
                  </div>
                </div>
                <div class="productdetail_review-section_date-div">
                  {{ this.$dateFormat(review.review_date) }}
                </div>
              </div>
              <img
                v-if="review.review_image_path"
                :src="this.$imageFileFormat(review.review_image_path)"
                class="productdetail_card-img-top"
                alt="Review Image"
              />
              <img
                v-else
                src="https://via.placeholder.com/300x200"
                class="productdetail_card-img-top"
                alt="Review Image"
              />

              <div class="productdetail_card-body">
                <p class="productdetail_card-text">
                  {{ review.review_content }}
                </p>
              </div>
            </div>
          </div>
          <div v-else>현재 등록된 리뷰가 없습니다</div>
        </div>

        <!-- Q&A 섹션 -->
        <div class="productdetail_qna-section">
          <div class="productdetail_qna-header">
            <h2
              class="productdetail_qna-title"
              type="button"
              @click="gotoQnAList"
            >
              전체 QnA &gt;
            </h2>
            <button
              class="productdetail_write-qna-btn"
              type="button"
              @click="gotoQnaWrite"
            >
              <i class="fas fa-pen"></i> QnA작성
            </button>
          </div>
          <table
            class="productdetail_qna-table"
            v-if="qnaList && qnaList.length"
          >
            <thead>
              <tr>
                <th style="width: 80px">문의유형</th>
                <th style="width: 630px">문의/답변</th>
                <th style="width: 170px">작성자</th>
                <th style="width: 130px">작성일</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(qna, index) in qnaList"
                :key="index"
                @click="gotoQnaDetail(qna.qna_id)"
              >
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
                    <i v-if="qna.qna_visibility == 'F'" class="fas fa-lock"></i>
                  </div>
                </td>
                <td class="productdetail_qna-section_status-nickname-div">
                  {{ maskNickname(qna.user_nickname) }}
                </td>
                <td>{{ this.$dateFormat(qna.qna_date) }}</td>
              </tr>
            </tbody>
          </table>
          <div v-else style="text-align: left; font-size: 16px">
            현재 등록된 QnA가 없습니다
          </div>
        </div>
      </div>
      <!-- 콘텐츠 섹션 끝 -->

      <!-- 푸터 -->
      <MateFooter />
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

      showCustomOptions: false, // 맞춤 옵션 표시 여부

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

      // 옵션
      Option2: {},
      Option3: {},

      // 신고팝업
      isVisibleReport: false,
      reportContent: "",
      currentReviweIndex: 0,

      // 별점
      rating: 0,
      currentRating: 0,

      reviewList: {},
      qnaList: {},

      itemType: "",

      // 북마크
      bookmarkResult: "",
    };
  },

  props: {
    // itemType: {
    //   type: String,
    //   required: true,
    // },
    item_id: {
      type: String,
      required: true,
    },
  },

  watch: {
    allOptionsSelected(newValue) {
      if (newValue) {
        this.updateSelectedItemDetailId();
      }
    },
  },

  async created() {
    await this.fetchData();
    this.setOptionsFromProductDetails();
  },

  computed: {
    // 가격 계산
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
      return this.productDetail.item_price;
    },
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

    // item 총 재고
    totalQuantity() {
      return this.productDetailItemDetail.reduce(
        (sum, item) => sum + item.item_detail_quantity,
        0
      );
    },
    //  item_detail 별 재고
    visibleItemDetailQuantity() {
      if (this.selectedItemDetailId !== null) {
        const selectedItem = this.productDetailItemDetail.find(
          (item) => item.item_detail_id === this.selectedItemDetailId
        );
        if (selectedItem) {
          return selectedItem.item_detail_quantity;
        }
      }
      return null;
    },
  },

  methods: {
    async fetchData() {
      try {
        const startTime = performance.now();

        // 해당 페이지 item + itemDetail 데이터 가져오기
        const totalResult = await this.$api(
          `/product/totalproductdetail/${this.item_id}`,
          { access_token: this.$getAccessToken() },
          "POST"
        );

        const totalproductdetailData = totalResult.data;

        if (totalproductdetailData) {
          this.productDetail = totalproductdetailData.item;
          console.log(
            "productDetail.item_name : ",
            this.productDetail.item_name
          );
          this.productDetailItemDetail = totalproductdetailData.itemDetails;
          this.itemType = this.productDetailItemDetail[0].item_detail_type;
          this.reviewList = totalproductdetailData.reviewList;
          this.qnaList = totalproductdetailData.qnaList;
          this.BoxResultData = totalproductdetailData.data || [];
          this.bookmarkResult = totalproductdetailData.bookmarkResult.bookmark_id;
        } else {
          console.log("fail");
        }

        // 로딩 시간 측정 끝
        const endTime = performance.now();
        this.loadingTime = endTime - startTime;
        console.log(`데이터 로딩 시간: ${this.loadingTime} ms`);
      } catch (error) {
        console.error(
          "ProductDetail.vue fetchData Error fetching product data:",
          error
        );
      }
    },

    // - + 버튼 눌렀을 때 가격 계산
    increaseQuantity() {
      if (this.quantity < this.visibleItemDetailQuantity) {
        this.quantity++;
      } else {
        alert(`최대 수량은 ${this.visibleItemDetailQuantity}개 입니다.`);
      }
    },
    decreaseQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },

    // 타입별로 보여줄 DOM 설정

    isVisibleItemType(type) {
      return this.itemType === type;
    },

    // 옵션 관련
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

    //  created 할때 실행됨
    setOptionsFromProductDetails() {
      if (this.itemType === "dress") {
        // const sizes
        // ex:  ["L", "M", "XL", "XS", "S", "맞춤"] 추출
        const sizes = [
          ...new Set(
            this.productDetailItemDetail.map((item) => item.item_detail_size)
          ),
        ];

        // colorsBySize
        //   {
        //   "L": ["Red", "Pink"],
        //   "M": ["Green", "Red"],
        //   "XL": ["Blue"],
        //   "XS": ["Blue"],
        //   "S": ["Yellow"],
        //   "맞춤": [null]
        // }

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
        // this.optionGroups
        // [
        //   { name: "Size", options: ["L", "M", "XL", "XS", "S", "맞춤"] },
        //   { name: "Color", options: [] }
        // ]
        this.optionGroups = [
          { name: "Size", options: sizes },
          { name: "Color", options: [] },
        ];
        this.selectedOptions = Array(this.optionGroups.length).fill("");

        // this.colorsBySize
        // {
        //   "L": ["Red", "Pink"],
        //   "M": ["Green", "Red"],
        //   "XL": ["Blue"],
        //   "XS": ["Blue"],
        //   "S": ["Yellow"],
        //   "맞춤": [null]
        // }
        this.colorsBySize = colorsBySize;
      } else if (this.itemType === "flower") {
        // flowerLives
        // ex: ["생화조화", "생화", "조화"]

        const flowerLives = [
          ...new Set(
            this.productDetailItemDetail
              .map((item) => item.item_detail_flower_life)
              .filter((life) => life !== null)
          ),
        ];

        const colorsByFlowerLife = {};

        // colorsByFlowerLife
        // ex: {
        //   "생화조화": ["Red"],
        //   "생화": ["Green", "Blue", "Pink", "lime"],
        //   "조화": ["Red", "Blue", "Yellow", "lime"]
        // }

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

        // sizesByFlowerLifeAndColor
        // ex: {
        //   "생화조화": { "Red": ["L"] },
        //   "생화": { "Green": ["M"], "Blue": ["M"], "Pink": ["L"], "lime": ["L"] },
        //   "조화": { "Red": ["S"], "Blue": ["L"], "Yellow": ["S"], "lime": ["S"] }
        // }

        const sizesByFlowerLifeAndColor = {};

        this.productDetailItemDetail.forEach((item) => {
          // 현재 item의 item_detail_flower_life와 item_detail_color가 null이 아닌 경우에만 실행
          if (
            item.item_detail_flower_life !== null &&
            item.item_detail_color !== null
          ) {
            // sizesByFlowerLifeAndColor 객체에 item_detail_flower_life 키가 존재하지 않는 경우 빈 객체로 초기화
            //  item_detail_flower_life가 "생화"인 경우, sizesByFlowerLifeAndColor["생화"] = {}
            if (!sizesByFlowerLifeAndColor[item.item_detail_flower_life]) {
              sizesByFlowerLifeAndColor[item.item_detail_flower_life] = {};
            }
            // sizesByFlowerLifeAndColor[item.item_detail_flower_life] 객체에 item_detail_color 키가 존재하지 않는 경우, 빈 배열로 초기화
            //  item_detail_flower_life가 "생화"이고 item_detail_color가 "Red"인 경우, sizesByFlowerLifeAndColor["생화"]["Red"] = []
            if (
              !sizesByFlowerLifeAndColor[item.item_detail_flower_life][
                item.item_detail_color
              ]
            ) {
              sizesByFlowerLifeAndColor[item.item_detail_flower_life][
                item.item_detail_color
              ] = [];
            }
            // item_detail_size가 null이 아니고, sizesByFlowerLifeAndColor[item.item_detail_flower_life][item.item_detail_color] 배열에 현재 item_detail_size가 포함되어 있지 않은 경우, 배열에 추가
            // item_detail_flower_life가 "생화"이고 item_detail_color가 "Red"이며 item_detail_size가 "L"인 경우, sizesByFlowerLifeAndColor["생화"]["Red"].push("L")
            if (
              item.item_detail_size !== null &&
              !sizesByFlowerLifeAndColor[item.item_detail_flower_life][
                item.item_detail_color
              ].includes(item.item_detail_size)
            ) {
              sizesByFlowerLifeAndColor[item.item_detail_flower_life][
                item.item_detail_color
              ].push(item.item_detail_size);
            }
          }
        });

        // this.optionGroups
        // ex: [
        //   { name: "Flower Life", options: ["생화조화", "생화", "조화"] },
        //   { name: "Color", options: [] },
        //   { name: "Size", options: [] }
        // ]

        this.optionGroups = [
          { name: "Flower Life", options: flowerLives },
          { name: "Color", options: [] },
          { name: "Size", options: [] },
        ];

        // this.selectedOptions
        // ex: ["", "", ""]
        this.selectedOptions = Array(this.optionGroups.length).fill("");

        // this.flowerLifeByColor
        // ex: {
        //   "생화조화": ["Red"],
        //   "생화": ["Green", "Blue", "Pink", "lime"],
        //   "조화": ["Red", "Blue", "Yellow", "lime"]
        // }
        this.flowerLifeByColor = colorsByFlowerLife;

        // this.sizesByFlowerLifeAndColor
        // ex: {
        //   "생화조화": { "Red": ["L"] },
        //   "생화": { "Green": ["M"], "Blue": ["M"], "Pink": ["L"], "lime": ["L"] },
        //   "조화": { "Red": ["S"], "Blue": ["L"], "Yellow": ["S"], "lime": ["S"] }
        // }
        this.sizesByFlowerLifeAndColor = sizesByFlowerLifeAndColor;
      } else if (this.itemType === "hall") {
        const sizes = [
          ...new Set(
            this.productDetailItemDetail.map((item) => item.item_detail_size)
          ),
        ];

        const ticketsBySize = {};
        const locsBySizeAndTicket = {};
        const localsBySizeAndLoc = {};

        sizes.forEach((size) => {
          ticketsBySize[size] = [
            ...new Set(
              this.productDetailItemDetail
                .filter((item) => item.item_detail_size === size)
                .map((item) => item.item_detail_ticket)
            ),
          ];
        });

        this.productDetailItemDetail.forEach((item) => {
          if (
            item.item_detail_size !== null &&
            item.item_detail_ticket !== null
          ) {
            if (!locsBySizeAndTicket[item.item_detail_size]) {
              locsBySizeAndTicket[item.item_detail_size] = {};
            }
            if (
              !locsBySizeAndTicket[item.item_detail_size][
                item.item_detail_ticket
              ]
            ) {
              locsBySizeAndTicket[item.item_detail_size][
                item.item_detail_ticket
              ] = [];
            }
            if (
              item.item_detail_loc !== null &&
              !locsBySizeAndTicket[item.item_detail_size][
                item.item_detail_ticket
              ].includes(item.item_detail_loc)
            ) {
              locsBySizeAndTicket[item.item_detail_size][
                item.item_detail_ticket
              ].push(item.item_detail_loc);
            }
          }

          if (item.item_detail_size !== null && item.item_detail_loc !== null) {
            if (!localsBySizeAndLoc[item.item_detail_size]) {
              localsBySizeAndLoc[item.item_detail_size] = {};
            }
            if (
              !localsBySizeAndLoc[item.item_detail_size][item.item_detail_loc]
            ) {
              localsBySizeAndLoc[item.item_detail_size][item.item_detail_loc] =
                [];
            }
            if (
              item.item_detail_local !== null &&
              !localsBySizeAndLoc[item.item_detail_size][
                item.item_detail_loc
              ].includes(item.item_detail_local)
            ) {
              localsBySizeAndLoc[item.item_detail_size][
                item.item_detail_loc
              ].push(item.item_detail_local);
            }
          }
        });

        // 설정된 옵션 그룹
        this.optionGroups = [
          { name: "Size", options: sizes },
          { name: "Ticket", options: [] },
          { name: "Location", options: [] },
          { name: "Local", options: [] },
        ];

        // 선택된 옵션 초기화
        this.selectedOptions = Array(this.optionGroups.length).fill("");

        // 각 기준별로 필터링된 데이터 저장
        this.ticketsBySize = ticketsBySize;
        this.locsBySizeAndTicket = locsBySizeAndTicket;
        this.localsBySizeAndLoc = localsBySizeAndLoc;
      } else if (this.itemType === "sdm_package") {
        // Option1
        // ex: ["생화조화", "생화", "조화"]
        console.log("fsdgfdfgdf");

        const Option1 = [
          ...new Set(
            this.productDetailItemDetail
              .map((item) => item.item_detail_quality)
              .filter((life) => life !== null)
          ),
        ];

        const Option2 = {};

        // Option2
        // ex: {
        //   "생화조화": ["Red"],
        //   "생화": ["Green", "Blue", "Pink", "lime"],
        //   "조화": ["Red", "Blue", "Yellow", "lime"]
        // }

        Option1.forEach((life) => {
          Option2[life] = [
            ...new Set(
              this.productDetailItemDetail
                .filter((item) => item.item_detail_quality === life)
                .map((item) => item.item_detail_local)
                .filter((color) => color !== null)
            ),
          ];
        });

        // Option3
        // ex: {
        //   "생화조화": { "Red": ["L"] },
        //   "생화": { "Green": ["M"], "Blue": ["M"], "Pink": ["L"], "lime": ["L"] },
        //   "조화": { "Red": ["S"], "Blue": ["L"], "Yellow": ["S"], "lime": ["S"] }
        // }

        const Option3 = {};

        this.productDetailItemDetail.forEach((item) => {
          // 현재 item의 item_detail_quality와 item_detail_local가 null이 아닌 경우에만 실행
          if (
            item.item_detail_quality !== null &&
            item.item_detail_local !== null
          ) {
            // Option3 객체에 item_detail_quality 키가 존재하지 않는 경우 빈 객체로 초기화
            //  item_detail_quality "생화"인 경우, Option3["생화"] = {}
            if (!Option3[item.item_detail_quality]) {
              Option3[item.item_detail_quality] = {};
            }
            // Option3[item.item_detail_quality] 객체에 item_detail_local 키가 존재하지 않는 경우, 빈 배열로 초기화
            //  item_detail_quality "생화"이고 item_detail_local "Red"인 경우, Option3["생화"]["Red"] = []
            if (!Option3[item.item_detail_quality][item.item_detail_local]) {
              Option3[item.item_detail_quality][item.item_detail_local] = [];
            }
            // item_detail_makeup null이 아니고, Option3[item.item_detail_quality][item.item_detail_local] 배열에 현재 item_detail_makeup 포함되어 있지 않은 경우, 배열에 추가
            // item_detail_quality "생화"이고 item_detail_local "Red"이며 item_detail_makeup "L"인 경우, Option3["생화"]["Red"].push("L")
            if (
              item.item_detail_makeup !== null &&
              !Option3[item.item_detail_quality][
                item.item_detail_local
              ].includes(item.item_detail_makeup)
            ) {
              Option3[item.item_detail_quality][item.item_detail_local].push(
                item.item_detail_makeup
              );
            }
          }
        });

        // this.optionGroups
        // ex: [
        //   { name: "Flower Life", options: ["생화조화", "생화", "조화"] },
        //   { name: "Color", options: [] },
        //   { name: "Size", options: [] }
        // ]

        this.optionGroups = [
          { name: "item_detail_quality", options: Option1 },
          { name: "Color", options: [] },
          { name: "Size", options: [] },
        ];

        // this.selectedOptions
        // ex: ["", "", ""]
        this.selectedOptions = Array(this.optionGroups.length).fill("");

        // this.flowerLifeByColor
        // ex: {
        //   "생화조화": ["Red"],
        //   "생화": ["Green", "Blue", "Pink", "lime"],
        //   "조화": ["Red", "Blue", "Yellow", "lime"]
        // }
        this.Option2 = Option2;

        // this.Option3
        // ex: {
        //   "생화조화": { "Red": ["L"] },
        //   "생화": { "Green": ["M"], "Blue": ["M"], "Pink": ["L"], "lime": ["L"] },
        //   "조화": { "Red": ["S"], "Blue": ["L"], "Yellow": ["S"], "lime": ["S"] }
        // }
        this.Option3 = Option3;
      } else if (this.itemType === "studio") {
        // const sizes
        // ex:  ["L", "M", "XL", "XS", "S", "맞춤"] 추출
        const Option1 = [
          ...new Set(
            this.productDetailItemDetail.map((item) => item.item_detail_quality)
          ),
        ];

        // Option2
        //   {
        //   "L": ["Red", "Pink"],
        //   "M": ["Green", "Red"],
        //   "XL": ["Blue"],
        //   "XS": ["Blue"],
        //   "S": ["Yellow"],
        //   "맞춤": [null]
        // }

        const Option2 = {};
        Option1.forEach((size) => {
          Option2[size] = [
            ...new Set(
              this.productDetailItemDetail
                .filter((item) => item.item_detail_quality === size)
                .map((item) => item.item_detail_local)
            ),
          ];
        });
        // this.optionGroups
        // [
        //   { name: "Size", options: ["L", "M", "XL", "XS", "S", "맞춤"] },
        //   { name: "Color", options: [] }
        // ]
        this.optionGroups = [
          { name: "Size", options: Option1 },
          { name: "Color", options: [] },
        ];
        this.selectedOptions = Array(this.optionGroups.length).fill("");

        // this.Option2
        // {
        //   "L": ["Red", "Pink"],
        //   "M": ["Green", "Red"],
        //   "XL": ["Blue"],
        //   "XS": ["Blue"],
        //   "S": ["Yellow"],
        //   "맞춤": [null]
        // }
        this.Option2 = Option2;
      } else if (this.itemType === "makeup") {
        // const sizes
        //  -- item_detail_quality // item_detail_makeup
        // ex:  ["L", "M", "XL", "XS", "S", "맞춤"] 추출
        const Option1 = [
          ...new Set(
            this.productDetailItemDetail.map((item) => item.item_detail_quality)
          ),
        ];

        // Option2
        //   {
        //   "L": ["Red", "Pink"],
        //   "M": ["Green", "Red"],
        //   "XL": ["Blue"],
        //   "XS": ["Blue"],
        //   "S": ["Yellow"],
        //   "맞춤": [null]
        // }

        const Option2 = {};
        Option1.forEach((size) => {
          Option2[size] = [
            ...new Set(
              this.productDetailItemDetail
                .filter((item) => item.item_detail_quality === size)
                .map((item) => item.item_detail_makeup)
            ),
          ];
        });
        // this.optionGroups
        // [
        //   { name: "Size", options: ["L", "M", "XL", "XS", "S", "맞춤"] },
        //   { name: "Color", options: [] }
        // ]
        this.optionGroups = [
          { name: "Size", options: Option1 },
          { name: "Color", options: [] },
        ];
        this.selectedOptions = Array(this.optionGroups.length).fill("");

        // this.Option2
        // {
        //   "L": ["Red", "Pink"],
        //   "M": ["Green", "Red"],
        //   "XL": ["Blue"],
        //   "XS": ["Blue"],
        //   "S": ["Yellow"],
        //   "맞춤": [null]
        // }
        this.Option2 = Option2;
      } else if (this.itemType === "giving_dress") {
        // const sizes
        // ex:  ["L", "M", "XL", "XS", "S", "맞춤"] 추출
        const Option1 = [
          ...new Set(
            this.productDetailItemDetail.map((item) => item.item_detail_size)
          ),
        ];

        // Option2
        //   {
        //   "L": ["Red", "Pink"],
        //   "M": ["Green", "Red"],
        //   "XL": ["Blue"],
        //   "XS": ["Blue"],
        //   "S": ["Yellow"],
        //   "맞춤": [null]
        // }

        const Option2 = {};
        Option1.forEach((size) => {
          Option2[size] = [
            ...new Set(
              this.productDetailItemDetail
                .filter((item) => item.item_detail_size === size)
                .map((item) => item.item_detail_color)
            ),
          ];
        });
        // this.optionGroups
        // [
        //   { name: "Size", options: ["L", "M", "XL", "XS", "S", "맞춤"] },
        //   { name: "Color", options: [] }
        // ]
        this.optionGroups = [
          { name: "Size", options: Option1 },
          { name: "Color", options: [] },
        ];
        this.selectedOptions = Array(this.optionGroups.length).fill("");

        // this.Option2
        // {
        //   "L": ["Red", "Pink"],
        //   "M": ["Green", "Red"],
        //   "XL": ["Blue"],
        //   "XS": ["Blue"],
        //   "S": ["Yellow"],
        //   "맞춤": [null]
        // }
        this.Option2 = Option2;
      } else if (this.itemType === "giving_item") {
        const Option1 = [
          ...new Set(
            this.productDetailItemDetail.map((item) => item.item_detail_kind)
          ),
        ];

        this.optionGroups = [{ name: "Size", options: Option1 }];
        this.selectedOptions = Array(this.optionGroups.length).fill("");
      } else if (this.itemType === "snap") {
        const Option1 = [
          ...new Set(
            this.productDetailItemDetail.map((item) => item.item_detail_quality)
          ),
        ];

        this.optionGroups = [{ name: "Size", options: Option1 }];
        this.selectedOptions = Array(this.optionGroups.length).fill("");
      } else if (this.itemType === "music") {
        const Option1 = [
          ...new Set(
            this.productDetailItemDetail.map((item) => item.item_detail_quality)
          ),
        ];

        this.optionGroups = [{ name: "Size", options: Option1 }];
        this.selectedOptions = Array(this.optionGroups.length).fill("");
      } else if (this.itemType === "gift") {
        const Option1 = [
          ...new Set(
            this.productDetailItemDetail.map((item) => item.item_detail_kind)
          ),
        ];

        this.optionGroups = [{ name: "Size", options: Option1 }];
        this.selectedOptions = Array(this.optionGroups.length).fill("");
      } else if (this.itemType === "shoes") {
        // Option1
        // ex: ["생화조화", "생화", "조화"]
        // item_detail_size // item_detail_color // item_detail_heel_height
        console.log("fsdgfdfgdf");

        const Option1 = [
          ...new Set(
            this.productDetailItemDetail
              .map((item) => item.item_detail_size)
              .filter((life) => life !== null)
          ),
        ];

        const Option2 = {};

        // Option2
        // ex: {
        //   "생화조화": ["Red"],
        //   "생화": ["Green", "Blue", "Pink", "lime"],
        //   "조화": ["Red", "Blue", "Yellow", "lime"]
        // }

        Option1.forEach((life) => {
          Option2[life] = [
            ...new Set(
              this.productDetailItemDetail
                .filter((item) => item.item_detail_size === life)
                .map((item) => item.item_detail_color)
                .filter((color) => color !== null)
            ),
          ];
        });

        // Option3
        // ex: {
        //   "생화조화": { "Red": ["L"] },
        //   "생화": { "Green": ["M"], "Blue": ["M"], "Pink": ["L"], "lime": ["L"] },
        //   "조화": { "Red": ["S"], "Blue": ["L"], "Yellow": ["S"], "lime": ["S"] }
        // }

        const Option3 = {};

        this.productDetailItemDetail.forEach((item) => {
          // 현재 item의 item_detail_quality와 item_detail_local가 null이 아닌 경우에만 실행
          if (
            item.item_detail_size !== null &&
            item.item_detail_color !== null
          ) {
            // Option3 객체에 item_detail_size 키가 존재하지 않는 경우 빈 객체로 초기화
            //  item_detail_size "생화"인 경우, Option3["생화"] = {}
            if (!Option3[item.item_detail_size]) {
              Option3[item.item_detail_size] = {};
            }
            // Option3[item.item_detail_size] 객체에 item_detail_color 키가 존재하지 않는 경우, 빈 배열로 초기화
            //  item_detail_size "생화"이고 item_detail_color "Red"인 경우, Option3["생화"]["Red"] = []
            if (!Option3[item.item_detail_size][item.item_detail_color]) {
              Option3[item.item_detail_size][item.item_detail_color] = [];
            }
            // item_detail_heel_height null이 아니고, Option3[item.item_detail_size][item.item_detail_color] 배열에 현재 item_detail_heel_height 포함되어 있지 않은 경우, 배열에 추가
            // item_detail_size "생화"이고 item_detail_color "Red"이며 item_detail_heel_height "L"인 경우, Option3["생화"]["Red"].push("L")
            if (
              item.item_detail_heel_height !== null &&
              !Option3[item.item_detail_size][item.item_detail_color].includes(
                item.item_detail_heel_height
              )
            ) {
              Option3[item.item_detail_size][item.item_detail_color].push(
                item.item_detail_heel_height
              );
            }
          }
        });

        // this.optionGroups
        // ex: [
        //   { name: "Flower Life", options: ["생화조화", "생화", "조화"] },
        //   { name: "Color", options: [] },
        //   { name: "Size", options: [] }
        // ]

        this.optionGroups = [
          { name: "item_detail_quality", options: Option1 },
          { name: "Color", options: [] },
          { name: "Size", options: [] },
        ];

        // this.selectedOptions
        // ex: ["", "", ""]
        this.selectedOptions = Array(this.optionGroups.length).fill("");

        // this.flowerLifeByColor
        // ex: {
        //   "생화조화": ["Red"],
        //   "생화": ["Green", "Blue", "Pink", "lime"],
        //   "조화": ["Red", "Blue", "Yellow", "lime"]
        // }
        this.Option2 = Option2;

        // this.Option3
        // ex: {
        //   "생화조화": { "Red": ["L"] },
        //   "생화": { "Green": ["M"], "Blue": ["M"], "Pink": ["L"], "lime": ["L"] },
        //   "조화": { "Red": ["S"], "Blue": ["L"], "Yellow": ["S"], "lime": ["S"] }
        // }
        this.Option3 = Option3;
      }
    },

    // 사용자가 옵션을 고를 때 선택됨
    onOptionChange(index) {
      if (this.itemType === "dress") {
        this.handleDressOptionChange(index);
      } else if (this.itemType === "flower") {
        this.handleFlowerOptionChange(index);
      } else if (this.itemType === "hall") {
        this.handleHallOptionChange(index);
      } else if (this.itemType === "sdm_package") {
        this.handleSdm_packageOptionChange(index);
      } else if (this.itemType === "studio") {
        this.handleStudioOptionChange(index);
      } else if (this.itemType === "makeup") {
        this.handleMakeupOptionChange(index);
      } else if (this.itemType === "giving_dress") {
        this.handleOption2Change(index);
      } else if (this.itemType === "shoes") {
        this.handleShoesOptionChange(index);
      }
      console.log("selectedOptions : ", this.selectedOptions);

      // 맞춤 옵션 처리
      if (this.selectedOptions[index] === "맞춤") {
        this.selectedItemType_dress_custom = "visible";
        this.showCustomOptions = true;
      } else {
        this.selectedItemType_dress_custom = "collapse";
        this.showCustomOptions = false;
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
        // selectedOptions[0]가 "생화"인 경우,
        // this.flowerLifeByColor["생화"]는 ["Green", "Blue", "Pink", "lime"]
        // optionGroups[1].options는 ["Green", "Blue", "Pink", "lime"]로 설정
        this.optionGroups[1].options =
          this.flowerLifeByColor[this.selectedOptions[0]] || [];
      } else if (index === 1) {
        // Color 선택 시 Size 옵션 설정
        const flowerLife = this.selectedOptions[0];
        const color = this.selectedOptions[1];
        if (flowerLife && color) {
          // selectedOptions가 ["생화", "Green"]인 경우,
          // this.sizesByFlowerLifeAndColor["생화"]["Green"]는 ["M"] 입니다.
          this.optionGroups[2].options =
            this.sizesByFlowerLifeAndColor[flowerLife][color] || [];
          //  optionGroups[2].options는 ["M"]로 설정
        }
      }
    },

    handleHallOptionChange(index) {
      if (index === 0) {
        // Size 선택 시 Ticket 옵션 설정
        this.optionGroups[1].options =
          this.ticketsBySize[this.selectedOptions[0]] || [];
      } else if (index === 1) {
        // Ticket 선택 시 Location 옵션 설정
        const size = this.selectedOptions[0];
        const ticket = this.selectedOptions[1];
        if (size && ticket) {
          this.optionGroups[2].options =
            this.locsBySizeAndTicket[size][ticket] || [];
        }
      } else if (index === 2) {
        // Location 선택 시 Local 옵션 설정
        const size = this.selectedOptions[0];
        const loc = this.selectedOptions[2];
        if (size && loc) {
          this.optionGroups[3].options =
            this.localsBySizeAndLoc[size][loc] || [];
        }
      }
    },

    handleSdm_packageOptionChange(index) {
      if (index === 0) {
        this.optionGroups[1].options =
          this.Option2[this.selectedOptions[0]] || [];
      } else if (index === 1) {
        // Color 선택 시 Size 옵션 설정
        const SelectedOption1 = this.selectedOptions[0];
        const SelectedOption2 = this.selectedOptions[1];
        if (SelectedOption1 && SelectedOption2) {
          this.optionGroups[2].options =
            this.Option3[SelectedOption1][SelectedOption2] || [];
        }
      }
    },

    handleStudioOptionChange(index) {
      if (index === 0) {
        this.optionGroups[1].options =
          this.Option2[this.selectedOptions[0]] || [];
      }
    },

    handleMakeupOptionChange(index) {
      if (index === 0) {
        this.optionGroups[1].options =
          this.Option2[this.selectedOptions[0]] || [];
      }
    },

    handleOption2Change(index) {
      if (index === 0) {
        this.optionGroups[1].options =
          this.Option2[this.selectedOptions[0]] || [];
      }
    },

    handleShoesOptionChange(index) {
      if (index === 0) {
        this.optionGroups[1].options =
          this.Option2[this.selectedOptions[0]] || [];
      } else if (index === 1) {
        // Color 선택 시 Size 옵션 설정
        const SelectedOption1 = this.selectedOptions[0];
        const SelectedOption2 = this.selectedOptions[1];
        if (SelectedOption1 && SelectedOption2) {
          this.optionGroups[2].options =
            this.Option3[SelectedOption1][SelectedOption2] || [];
        }
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
    startEditing() {
      this.isEditing = true;
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
      const userInfo = await this.$verifiedUser();
      if (!userInfo) {
        alert("로그인이 필요합니다");
        this.$router.push({
          name: "userlogin",
          query: { savedUrl: true },
        });
        return;
      }

      if (this.newBoxName.trim() !== "") {
        this.BoxResultData.push({ box_name: this.newBoxName });

        try {
          const BoxResult = await this.$api(
            "/product/addbox",
            { access_token: this.$getAccessToken(), box_name: this.newBoxName },
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

    // 물건 담기
    // selectedItemDetailId 구하기
    updateSelectedItemDetailId() {
      if (this.itemType === "dress") {
        const selectedSize = this.selectedOptions[0];
        const selectedColor = this.selectedOptions[1];
        let selectedItem;

        if (this.showCustomOptions) {
          selectedItem = this.productDetailItemDetail.find(
            (item) => item.item_detail_size === selectedSize
          );
        } else {
          selectedItem = this.productDetailItemDetail.find(
            (item) =>
              item.item_detail_size === selectedSize &&
              item.item_detail_color === selectedColor
          );
        }

        if (selectedItem) {
          this.selectedItemDetailId = selectedItem.item_detail_id;
          console.log("Selected Item Detail ID: ", this.selectedItemDetailId);
        } else {
          this.selectedItemDetailId = null;
          console.log("No matching item found.");
        }
      } else if (this.itemType === "flower") {
        const selectedFlowerLife = this.selectedOptions[0];
        const selectedColor = this.selectedOptions[1];
        const selectedSize = this.selectedOptions[2];

        const selectedItem = this.productDetailItemDetail.find(
          (item) =>
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
      } else if (this.itemType === "hall") {
        const selectedSize = this.selectedOptions[0];
        const selectedTicket = this.selectedOptions[1];
        const selectedloc = this.selectedOptions[2];
        const selectedlocal = this.selectedOptions[3];

        const selectedItem = this.productDetailItemDetail.find(
          (item) =>
            item.item_detail_size === selectedSize &&
            item.item_detail_ticket === selectedTicket &&
            item.item_detail_loc === selectedloc &&
            item.item_detail_local === selectedlocal
        );

        if (selectedItem) {
          this.selectedItemDetailId = selectedItem.item_detail_id;
          console.log("Selected Item Detail ID: ", this.selectedItemDetailId);
        } else {
          this.selectedItemDetailId = null;
          console.log("No matching item found.");
        }
      } else if (this.itemType === "sdm_package") {
        // item_detail_quality // _item_detail_local // _item_detail_makeup
        const selected_item_detail_quality = this.selectedOptions[0];
        const selected_item_detail_local = this.selectedOptions[1];
        const selected_item_detail_makeup = this.selectedOptions[2];

        const selectedItem = this.productDetailItemDetail.find(
          (item) =>
            item.item_detail_quality === selected_item_detail_quality &&
            item.item_detail_local === selected_item_detail_local &&
            item.item_detail_makeup === selected_item_detail_makeup
        );

        if (selectedItem) {
          this.selectedItemDetailId = selectedItem.item_detail_id;
          console.log("Selected Item Detail ID: ", this.selectedItemDetailId);
        } else {
          this.selectedItemDetailId = null;
          console.log("No matching item found.");
        }
      } else if (this.itemType === "studio") {
        //item_detail_quality // item_detail_local
        const selected_item_detail_quality = this.selectedOptions[0];
        const selected_item_detail_local = this.selectedOptions[1];

        const selectedItem = this.productDetailItemDetail.find(
          (item) =>
            item.item_detail_quality === selected_item_detail_quality &&
            item.item_detail_local === selected_item_detail_local
        );

        if (selectedItem) {
          this.selectedItemDetailId = selectedItem.item_detail_id;
          console.log("Selected Item Detail ID: ", this.selectedItemDetailId);
        } else {
          this.selectedItemDetailId = null;
          console.log("No matching item found.");
        }
      } else if (this.itemType === "makeup") {
        //item_detail_quality // item_detail_local
        // const selected_item_detail_quality = this.selectedOptions[0];
        // const selected_item_detail_local = this.selectedOptions[1];

        const selectedItem = this.productDetailItemDetail.find(
          (item) =>
            item.item_detail_quality === this.selectedOptions[0] &&
            item.item_detail_makeup === this.selectedOptions[1]
        );

        if (selectedItem) {
          this.selectedItemDetailId = selectedItem.item_detail_id;
          console.log("Selected Item Detail ID: ", this.selectedItemDetailId);
        } else {
          this.selectedItemDetailId = null;
          console.log("No matching item found.");
        }
      } else if (this.itemType === "giving_dress") {
        // giving_dress
        // item_detail_size // item_detail_color // item_detail_quantity
        let selectedItem;

        if (this.showCustomOptions) {
          selectedItem = this.productDetailItemDetail.find(
            (item) => item.item_detail_size === this.selectedOptions[0]
          );
        } else {
          selectedItem = this.productDetailItemDetail.find(
            (item) =>
              item.item_detail_size === this.selectedOptions[0] &&
              item.item_detail_color === this.selectedOptions[1]
          );
        }

        // const selectedItem = this.productDetailItemDetail.find(
        //   (item) =>
        //     item.item_detail_size === this.selectedOptions[0] &&
        //     item.item_detail_color === this.selectedOptions[1]
        // );

        if (selectedItem) {
          this.selectedItemDetailId = selectedItem.item_detail_id;
          console.log("Selected Item Detail ID: ", this.selectedItemDetailId);
        } else {
          this.selectedItemDetailId = null;
          console.log("No matching item found.");
        }
      } else if (this.itemType === "giving_item") {
        // giving_dress
        // item_detail_size // item_detail_color // item_detail_quantity

        const selectedItem = this.productDetailItemDetail.find(
          (item) => item.item_detail_kind === this.selectedOptions[0]
        );

        if (selectedItem) {
          this.selectedItemDetailId = selectedItem.item_detail_id;
          console.log("Selected Item Detail ID: ", this.selectedItemDetailId);
        } else {
          this.selectedItemDetailId = null;
          console.log("No matching item found.");
        }
      } else if (this.itemType === "giving_mechine") {
        this.selectedItemDetailId =
          this.productDetailItemDetail[0].item_detail_id;
        console.log("No matching item found.");
      } else if (this.itemType === "giving_package") {
        this.selectedItemDetailId =
          this.productDetailItemDetail[0].item_detail_id;
        console.log("No matching item found.");
      } else if (this.itemType === "snap") {
        // giving_dress
        // item_detail_size // item_detail_color // item_detail_quantity

        const selectedItem = this.productDetailItemDetail.find(
          (item) => item.item_detail_quality === this.selectedOptions[0]
        );

        if (selectedItem) {
          this.selectedItemDetailId = selectedItem.item_detail_id;
          console.log("Selected Item Detail ID: ", this.selectedItemDetailId);
        } else {
          this.selectedItemDetailId = null;
          console.log("No matching item found.");
        }
      } else if (this.itemType === "video") {
        this.selectedItemDetailId =
          this.productDetailItemDetail[0].item_detail_id;
      } else if (this.itemType === "mc") {
        this.selectedItemDetailId =
          this.productDetailItemDetail[0].item_detail_id;
      } else if (this.itemType === "letter") {
        this.selectedItemDetailId =
          this.productDetailItemDetail[0].item_detail_id;
      } else if (this.itemType === "music") {
        // giving_dress
        // item_detail_size // item_detail_color // item_detail_quantity

        const selectedItem = this.productDetailItemDetail.find(
          (item) => item.item_detail_quality === this.selectedOptions[0]
        );

        if (selectedItem) {
          this.selectedItemDetailId = selectedItem.item_detail_id;
          console.log("Selected Item Detail ID: ", this.selectedItemDetailId);
        } else {
          this.selectedItemDetailId = null;
          console.log("No matching item found.");
        }
      } else if (this.itemType === "gift") {
        // giving_dress
        // item_detail_size // item_detail_color // item_detail_quantity

        const selectedItem = this.productDetailItemDetail.find(
          (item) => item.item_detail_kind === this.selectedOptions[0]
        );

        if (selectedItem) {
          this.selectedItemDetailId = selectedItem.item_detail_id;
          console.log("Selected Item Detail ID: ", this.selectedItemDetailId);
        } else {
          this.selectedItemDetailId = null;
          console.log("No matching item found.");
        }
      } else if (this.itemType === "shoes") {
        //item_detail_size // item_detail_color // item_detail_heel_height

        const selectedItem = this.productDetailItemDetail.find(
          (item) =>
            item.item_detail_size === this.selectedOptions[0] &&
            item.item_detail_color === this.selectedOptions[1] &&
            item.item_detail_heel_height === this.selectedOptions[2]
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

    // 물건 담기 버튼 눌렀을 때
    async insertItemIntoBox() {
      const userInfo = await this.$verifiedUser();
      if (!userInfo) {
        alert("로그인이 필요합니다");
        this.$router.push({
          name: "userlogin",
          query: { savedUrl: true },
        });
        return;
      } else if (
        !this.$dateFormat(this.dateRange.start) &&
        this.showCustomOptions
      ) {
        alert("캘린더 날짜를 선택해주세요");
      } else if (!this.selectedBoxId) {
        alert("견적함 박스를 선택해주세요");
      } else if (this.allOptionsSelected || this.showCustomOptions) {
        try {
          this.updateSelectedItemDetailId();
          await this.$api(
            "/product/insertitemintobox",
            {
              access_token: this.$getAccessToken(),
              box_id: this.selectedBoxId,
              item_detail_id: this.selectedItemDetailId,
              box_item_quantity: this.quantity,
              box_item_total_price: this.finally_price,
              box_item_schedule_start: this.$dateFormat(this.dateRange.start),
              box_item_schedule_end: this.$dateFormat(this.dateRange.end),
            },
            "POST"
          );
          alert("상품 넣기 성공");
        } catch (error) {
          console.error(
            "ProductDetail.vue fetchData Error fetching product data:",
            error
          );
        }
      }
    },

    copyCurrentLink() {
      const currentUrl = window.location.href;
      navigator.clipboard
        .writeText(currentUrl)
        .then(() => {
          alert("링크가 복사되었습니다!");
          console.log("currentUrl  : ", currentUrl);
        })
        .catch((err) => {
          console.error("링크 복사에 실패했습니다: ", err);
        });
    },

    async savetoBookmark() {
      const userInfo = await this.$verifiedUser();
      if (!userInfo) {
        alert("찜을 이용하고싶으시다면 로그인하세요");
        this.$router.push({
          name: "userlogin",
          query: { savedUrl: true },
        });
        return;
      }

      // 북마크가 이미 존재할 경우 -> 북마크 delete
      if (this.bookmarkResult) {
        try {
          console.log("delete해야됨 this.bookmarkResult : ", this.bookmarkResult);
          const response = await this.$api(
            "/mypage/bookmarklist/del",
            { bookmark_id: this.bookmarkResult },
            "post"
          );
          alert(response.message);
          if(response.status == 200) {
             this.bookmarkResult = null;
             console.log("성공적으로 지움");
          }
        } catch (error) {
          console.error(
            "ProductDetail.vue savetoBookmark Error : if (this.bookmarkResult.length > 0) {",
            error
          );
        }
      }
      // 북마크가 존재하지 않은 경우 -> 북마크 insert
      else {
        try {
          console.log("bookmark insert해야됨 ");
          const bookmarkResult = await this.$api(
            "/product/bookmark",
            {
              access_token: this.$getAccessToken(),
              item_id: this.item_id,
            },
            "POST"
          );

          
          if (bookmarkResult.status === 200) {
            alert("찜 넣기 성공");
            this.bookmarkResult = bookmarkResult.data;
            console.log("this.bookmarkResult : ", bookmarkResult.data);
          } else {
            alert("찜 이미 있음 찜 더 못넣음")
            alert(bookmarkResult.message);
            console.log("this.bookmarkResult : ", this.bookmarkResult);
          }
        } catch (error) {
          console.error(
            "ProductDetail.vue savetoBookmark Error else {:",
            error
          );
        }
      }
    },

    // 리뷰
    maskNickname(nickname) {
      if (nickname.length <= 4) {
        return nickname;
      }
      return nickname.slice(0, 4) + "*".repeat(4);
    },

    goToReviewList() {
      this.$router.push({
        name: "reviewlist",
        query: { item_id: this.item_id },
      });
    },

    async goToReviewWrite() {
      this.$router.push({
        name: "reviewwrite",
        query: { item_id: this.item_id },
      });
    },

    gotoReviewModify(review_id) {
      this.$router.push({
        name: "reviewmodify",
        query: { review_id: review_id },
      });
    },

    goToReviewDetail(review_id) {
      this.$router.push({
        name: "reviewdetail",
        query: { review_id: review_id },
      });
    },

    async deleteReview(review) {
      try {
        const reviewResult = await this.$api(
          `/review/delete`,
          {
            access_token: this.$getAccessToken(),
            review_id: review.review_id,
            prev_review_image_path: review.review_image_path,
            upload_type: "review",
          },
          "POST"
        );

        if (reviewResult.status == 200) {
          await this.fetchReviewData();
        }
      } catch (error) {
        console.error(
          "ReviewList.vue fetchData Error fetching product data:",
          error
        );
      }
    },

    async fetchReviewData() {
      try {
        const result = await this.$api(
          `/review/itemdetail/${this.item_id}`,
          { access_token: this.$getAccessToken() },
          "POST"
        );
        if (result.status == 200) {
          this.reviewList = result.reviewList;
        }
      } catch (error) {
        console.error(
          "ReviewList.vue fetchData Error fetching product data:",
          error
        );
      }
    },

    // 리뷰 신고
    async reviewToReport(review_id) {
      const userInfo = await this.$verifiedUser();
      if (!userInfo) {
        alert("신고 작성을 위하여 로그인하세요");
        this.$router.push({
          name: "userlogin",
          query: { savedUrl: true },
        });
        return;
      }

      this.isVisibleReport = true;
      this.currentReviweIndex = review_id;
    },

    collapseReportPopup() {
      this.isVisibleReport = false;
    },

    async ToReport() {
      if (this.reportContent == "") {
        alert("신고내용을 입력해주세요");
      }

      try {
        const result = await this.$api(
          "/review/reviewreport",
          {
            access_token: this.$getAccessToken(),
            review_id: this.currentReviweIndex,
            report_content: this.reportContent,
          },
          "POST"
        );
        if (result.status == 200) {
          alert("신고 완료");
          this.isVisibleReport = false;
        }
      } catch (error) {
        console.error(
          "ProductDetail.vue fetchData Error fetching product data:",
          error
        );
      }
    },

    //QnA

    gotoQnaWrite() {
      this.$router.push({
        name: "qnawrite",
        query: { item_id: this.item_id },
      });
    },

    async gotoQnaDetail(index) {
      //  this.$router.push({ name: "qnadetail" });
      const result = await this.$api(
        "/qna/isselectedqnavisibility",
        { access_token: this.$getAccessToken(), qna_id: index },
        "POST"
      );
      console.log("result.status : ", result.status);
      if (result.status === 201) {
        alert("비밀글입니다");
      } else {
        this.$router.push({ name: "qnadetail", query: { qna_id: index } });
      }
    },

    gotoQnAList() {
      this.$router.push({ name: "qnAlist", query: { item_id: this.item_id } });
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

.productdetail_main_content-div-img_div {
  width: 640px;
  max-width: 640px;
  min-width: 640px;
  padding-right: 15px;
}

.productdetail_main_content_maker_div {
  font-size: 12px;
  color: #888;
  /* margin-bottom: 10px; */
}

.productdetail_main_content_name_div {
  font-size: 22px;
  margin-bottom: 5px;
  line-height: 0.8;
}

.productdetail_main_content_starcount_div {
  display: inline;
  margin-right: 10px;
}

.main_content_starcount_div {
  display: flex;
  margin-right: 10px;
  gap: 10px;
}

.productdetail_main_content_reviewcount_div {
  display: inline;
}

.productdetail_main_content_discount_div {
  /* margin-right: 10px; */
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

.productdetail_main-content_item_detail_quantity-div {
  margin-top: 5px;
  color: #888;
  font-size: 14px;
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
  /* font-size: 24px; */
  color: #888888;
  background-color: #f5f5f5;
  border: 1px solid #f7cac9;
  border-radius: 10px;
  padding: 25px 50px;
  cursor: pointer;

  height: 64px;
    align-items: center;
    display: flex;
    /* text-align: center; */
    font-size: 21px;
    font-weight: bold;
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

.productdetail_qna-table tbody tr {
  cursor: pointer !important;
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
  /* justify-content: center; */
}

.productdetail_qna-section_status-nickname-div {
  text-align: left;
}

/* 견적함 */
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

/* 신고 */
.report-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px); /* 블러 효과 추가 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999; /* 배경을 덮도록 z-index 설정 */
}

.report-popup {
  position: fixed;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 400px;
  background-color: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  border-radius: 12px;

  padding: 20px;
  /* visibility: collapse; */
  flex-direction: column;
}

.report-popup_header {
  display: flex;
  align-items: center; /* Vertically centers the content */
  height: 50px;
  width: 100%;
  justify-content: space-between;
}

.popupCloseButton {
  cursor: pointer;
}

.report-popup_content {
  width: 100%;
  flex-grow: 1; /* This makes the content take up the remaining space */
  display: flex;
  flex-direction: column;
}
.report-popup_content_header {
  width: 100%;
  margin-bottom: 10px;
}
.report-popup_content_input {
  width: 100%;
  flex-grow: 1;
  padding: 10px;
  box-sizing: border-box;
  resize: none;
}

.report-popup_content_footer {
  display: flex;
  justify-content: center; /* 버튼을 가운데 정렬 */
}

.report-popup_content_ok {
  margin-top: 10px;
  border: 1px solid black;
  border-radius: 12px;
  display: flex;
  width: 70px;
  justify-content: center;
  padding: 10px;
  cursor: pointer;
}

/* 별점 */
.rating {
  display: flex;
  justify-content: flex-start;
}

.rating__input {
  display: none;
}

.rating__label {
  width: 12px;
  overflow: hidden;
}
.rating__label .star-icon {
  width: 12px;
  height: 24px;
  display: block;
  position: relative;
  left: 0;
  background-image: url("/src/views/review/star/emptyStar.svg");
  background-repeat: no-repeat;
}

.rating__label.half .star-icon {
  background-image: url("/src/views/review/star/filledStar.svg");
}

.rating__label.filled .star-icon {
  background-image: url("/src/views/review/star/filledStar.svg");
}

.rating__label.half_position .star-icon {
  background-position: left;
}
.rating__label.filled_position .star-icon {
  background-position: right;
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