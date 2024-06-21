<template>
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
        class="custom-date-picker"
      />
    </div>
    <div class="common-event_calendar_div">
      <label>
        Start
        {{ dateRange.start ? formatDate(dateRange.start) : "선택되지 않음" }}
      </label>
      <label>
        End
        {{ dateRange.end ? formatDate(dateRange.end) : "선택되지 않음" }}
      </label>
      <div class="button-container">
        <button
          class="common-caldate_save-button"
          type="button"
          @click="saveEvent"
        >
          일정등록
        </button>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  data() {
    return {
      dateRange: {
        start: null,
        end: null,
      },
    };
  },
  methods: {
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
.common-event_calendar {
  display: flex;
  flex-direction: column;
  width: 560px;
  height: 520px;
}

.custom-date-picker {
  margin-bottom: 10px;
  height: calc(100% - 60px); /* 전체 높이에서 레이블과 버튼 높이를 뺀 값 */
}

::v-deep .custom-date-picker .vc-container {
  width: 100%;
  height: 100%; /* 부모 요소의 높이에 맞추기 */
}

::v-deep .custom-date-picker .vc-pane {
  min-width: 100%; /* 부모 요소의 너비에 맞추기 */
  width: 560px;
}

::v-deep .custom-date-picker .vc-week {
  height: 60px;
}

.common-event_calendar_div {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  gap: 10px;
}

.button-container {
  display: flex;
  justify-content: center; /* 버튼을 중앙에 정렬 */
}

.common-caldate_save-button {
  font-size: 16px;
  color: #888888;
  cursor: pointer;
  margin: 0;
  background-color: #f7cac9;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  width: 100px;
  height: 40px;
}


.container-schedule-title{
    display: grid;
    grid-template-columns: 100px auto;
    align-items: center;
    width: 600px;    
    margin-top: 30px; 
    /* border: 1px solid pink; */
}




</style>
