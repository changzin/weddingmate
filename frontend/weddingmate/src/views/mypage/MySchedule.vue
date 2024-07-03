<template>
  <div class="fix-width">
    <!-- 헤더 -->
    <MateHeader />

    <!-- 본문 -->
    <div class="container0">
      <div class="container-top">
        <div class="title-font">스케줄</div>
        <hr class="title" />
      </div>
      <div class="container-middle">
        <div class="container-middle-calander">
          <div class="calanderbox">
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
                <div class="container-schedule-title">
                  <div>일정 제목</div>
                  <input class="name_input" v-model="schedule_title" />
                </div>
                <label>
                  Start
                  {{
                    dateRange.start
                      ? formatDate(dateRange.start)
                      : "선택되지 않음"
                  }}
                </label>
                <label>
                  End
                  {{
                    dateRange.end ? formatDate(dateRange.end) : "선택되지 않음"
                  }}
                </label>
                <div class="button-container">
                  <!-- <button
                    class="common-caldate_save-button"
                    type="button"
                    @click="saveEvent"
                  >
                    일정등록
                  </button> -->
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
          </div>
        </div>
        <div class="container-middle-schedule">
          <div class="content-schedule-title">일정 상세보기</div>
          <div
            class="content-schedule-text"
            v-for="(schedule, index) in ScheduleResult"
            :key="index"
          >
            <div class="font-schedule-date">
              {{SetCalDate(schedule.schedule_start, schedule.schedule_end) }} 
            </div>
        
            <div>{{ schedule.schedule_title }}</div>
            <button class="qnalist_search-clear-button" @click="deleteSchedule(schedule.schedule_id)">
              ×
            </button>
          </div>
        </div>
      </div>
      <div class="mypage-bottom">
        <button class="mypage-back" @click="this.$router.push({path: '/mypage/'})">
          마이페이지로
        </button>
      </div>
    </div>
    <!-- 푸터 -->
    <MateFooter />
  </div>
</template>

<script>
import "./mypage.css";

export default {
  name: "SearchComponent",
  data() {
    return {
      ScheduleResult: {},

      // 캘린더
      dateRange: {
        start: null,
        end: null,
      },
      schedule_title: "",
      calendar_id: 0,
    };
  },

   async beforeRouteEnter(to, from, next) {
    next(async vm => {
      const userInfo = await vm.$verifiedUser();
      if (userInfo) {
        next();
      } else {
        alert("스케쥴 확인을 위하여 로그인하세요");
        vm.$router.push({
          name: "userlogin",
          query: { savedUrl: true }
        });
      }
    });
  },

  async created() {
    await this.fetchScheduleListData();
  },

  methods: {
    async fetchScheduleListData() {
     


      try {
        // 데이터 가져오기
        const result = await this.$api(
          "/schedule/list",
          { access_token: "temp-token" },
          "POST"
        );
        this.ScheduleResult = result.scheduleList;
        this.calendar_id = this.ScheduleResult[0].calendar_id;
        console.log("calendar_id, : ", this.calendar_id);
        if (this.ScheduleResult) {
          console.log(
            "ScheduleResult: ",
            JSON.parse(JSON.stringify(this.ScheduleResult))
          );
        } else {
          console.log("fail");
        }
      } catch (error) {
        console.error(
          "Shedule.vue fetchData Error fetching fetchSheduleListData data:",
          error
        );
      }
    },



    async saveEvent(event) {
      event.preventDefault();

      console.log(
        `Event from ${this.dateRange.start} to ${this.dateRange.end}`
      );

      if (!this.dateRange.start || !this.dateRange.end) {
        alert("모든 필드를 입력하세요.");
        return;
      }

      const formattedStartDate = this.formatDate(this.dateRange.start);
      const formattedEndDate = this.formatDate(this.dateRange.end);

      try {
        const result = await this.$api(
          "/schedule/insertschedule",
          {
            access_token: "temp-token",
            schedule_title: this.schedule_title,
            schedule_start: formattedStartDate,
            schedule_end: formattedEndDate,
            calendar_id: this.calendar_id,
          },
          "POST"
        );
        if (result.status == 200) {
          alert("완료됨");
          this.fetchScheduleListData();
        }
      } catch (error) {
        console.error(
          "ProductDetail.vue fetchData Error fetching product data:",
          error
        );
      }
    },


    async deleteSchedule(schedule_id) {
       const result = await this.$api(
        "/schedule/deleteschedule",
        { access_token: "temp-token", schedule_id: schedule_id },
        "POST"
      );

      if(result.status == 200) {
        
        alert("성공적으로 지웠습니다");
    await this.fetchScheduleListData();

      }

    },

    formatDate(date) {
      const d = new Date(date);
      return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(
        2,
        "0"
      )}-${String(d.getDate()).padStart(2, "0")}`;
    },


    SetCalDate(schedule_start, schedule_end) {
      if(this.formatDate(schedule_start) === this.formatDate(schedule_end)) {
        return this.formatDate(schedule_start);
      }
      else {
       return `${this.formatDate(schedule_start)}\n${this.formatDate(schedule_end)}`;
      }
    }

 
  },
};
</script>


<style scoped>
@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);

.fix-width {
  width: 1980px;
  min-width: 1980px;
  max-width: 1980px;
  margin: 0 auto;
}

.qnalist_search-clear-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  color: #888;
}

/* 본문 */
/* font */
.font-schedule-date {
  color: var(--color-pink);
  font-weight: bold;
}

.title-font {
  display: grid;
  place-items: center;
  color: #333333;
  font-size: 24px;
  font-weight: bold;
}

div {
  font-family: "Noto Sans KR", sans-serif;
  font-size: 16px;
  color: #555555;
}
/* font */
.font-schedule-date {
  color: var(--color-pink);
  font-weight: bold;
}

.title-font {
  display: grid;
  place-items: center;
  color: #333333;
  font-size: 24px;
  font-weight: bold;
}

/* div */

.container0 {
  min-width: var(--container-width);
}

.container-top {
  margin-left: var(--container-margin-left);
  margin-right: var(--container-margin-right);
  width: var(--container-width);
  margin-top: 100px;
  display: grid;
  font-size: 24;
  /* border: 1px solid blue; */
}

.container-middle {
  margin-left: var(--container-margin-left);
  margin-right: var(--container-margin-right);
  margin-bottom: 20px;
  margin-top: 10px;
  width: var(--container-width);
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 16px;
  /* border: 1px solid blue; */
}

.container-middle-calander {
  display: grid;
  box-sizing: border-box;
  /* border: 1px solid blue; */

  position: relative;
}

.schedule-add {
  position: absolute;
  top: 3%;
  right: 3%;
  z-index: 1;

  background-color: var(--color-pink);
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  width: 100px;
  height: 40px;
}

.container-middle-schedule {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  box-sizing: border-box;
  /* border: 1px solid red; */
}
.content-schedule-title {
  font-size: 24;
  margin-bottom: 5px;
  font-weight: bold;
  /* border: 1px solid blue; */
}
.content-schedule-text {
  display: grid;
  align-items: center;
  grid-template-columns: 120px 475px 0px;
  margin-bottom: 5px;
  /* border: 1px solid blue; */
}

/* hr */

hr.title {
  width: 100%;
  height: 1px; /* Set the height to 1px */
  background-color: #333333; /* Set a lighter color */
  border: none; /* Remove border */
}

/* button */

/* img */
img.delete-x {
  width: 20px;
  height: 20px;
  /* border: 1px solid #333333; */
}

.container0 {
  min-width: var(--container-width);
}

.container-top {
  margin-left: var(--container-margin-left);
  margin-right: var(--container-margin-right);
  width: var(--container-width);
  margin-top: 100px;
  display: grid;
  font-size: 24;
  /* border: 1px solid blue; */
}

.container-middle {
  margin-left: var(--container-margin-left);
  margin-right: var(--container-margin-right);
  margin-bottom: 20px;
  margin-top: 10px;
  width: var(--container-width);
  display: grid;
  grid-template-columns: 1fr 1fr;
  font-size: 24;
  /* border: 1px solid blue; */
}

.container-middle-calander {
  display: grid;
  box-sizing: border-box;
  /* border: 1px solid blue; */
}
.container-middle-schedule {
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  box-sizing: border-box;
  /* border: 1px solid red; */
}
.content-schedule-title {
  font-size: 24;
  margin-bottom: 5px;
  font-weight: bold;
  /* border: 1px solid blue; */
}
.content-schedule-text {
  display: grid;
  align-items: center;
  grid-template-columns: 120px 475px 0px;
  margin-bottom: 5px;
  /* border: 1px solid blue; */
}
.calanderbox {
  display: grid;
  width: 100%;
  height: 500px;
  /* border: 1px solid #888888; */
  background-color: none;
}
/* hr */

hr.title {
  width: 100%;
  height: 1px; /* Set the height to 1px */
  background-color: #333333; /* Set a lighter color */
  border: none; /* Remove border */
}

/* button */

button.schedule-add {
  justify-self: end;
  background-color: var(--color-pink);
  color: white;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 12px;
  width: 100px;
  height: 40px;
  margin-top: 30px;
  margin-right: 20px;
}

/* img */
img.delete-x {
  width: 20px;
  height: 20px;
  /* border: 1px solid #333333; */
}

/* bottom */

div.mypage-bottom {
  display: grid;
  place-items: center;
  margin-left: 350px;
  margin-right: 320px;
  margin-top: 100px;
  width: 1280px; /* 고정된 너비 */
  /* border: 1px solid yellow; */
}
div.nav-page {
  display: grid;
  place-items: center;
  grid-template-columns: 25px 25px 25px 25px 25px 25px 25px;
  margin-bottom: 30px;
  color: #888888;
  /* border: 1px solid pink; */
}

/* 캘린더 */
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

.container-schedule-title {
  display: grid;
  grid-template-columns: 100px auto;
  align-items: center;
  width: 600px;
  margin-top: 10px;
  /* border: 1px solid pink; */
}

.name_input {
  border-radius: 12px;
  border: none;
  width: 460px;
  height: 40px;
  background-color: #f5f5f5;
  outline: none; /* 포커스 시 외곽선을 없앰 */
  padding: 10px;
}

button.mypage-back {
  background-color: #888888;
  color: white;
  font-weight: bold;
  border: none;
  width: 120px;
  height: 40px;
}

div.mypage-bottom {
  display: grid;
  place-items: center;
  margin-left: 350px;
  margin-right: 320px;
  margin-top: 200px;
  width: 1280px; /* 고정된 너비 */
  /* border: 1px solid yellow; */
}
div.nav-page {
  display: grid;
  place-items: center;
  grid-template-columns: 25px 25px 25px 25px 25px 25px 25px;
  margin-bottom: 30px;
  color: #888888;
  /* border: 1px solid pink; */
}
.mypage-back a {
  text-decoration: none; /* remove underline */
  color: inherit; /* inherit color from parent */
}
</style>
