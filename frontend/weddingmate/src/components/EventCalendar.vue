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
          />
        </div>
        <div class="common-event_calendar_div">
          <label
            >Start 
            {{
              dateRange.start ? formatDate(dateRange.start) : "선택되지 않음"
            }}</label>
          <label
            >End 
            {{
              dateRange.end ? formatDate(dateRange.end) : "선택되지 않음"
            }}</label>
        </div>
      <button class= "common-caldate_save-button" type="button"  @click="saveEvent">저장</button>
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
  margin-top: 10px ;
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
