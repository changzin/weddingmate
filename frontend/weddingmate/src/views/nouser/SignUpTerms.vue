<template>
            <MateHeader />
    <div class="container terms_container" style="margin-top:200px;">
        <div class="row justify-content-center">
            <div class="terms_header_text">이용약관에 먼저 동의해주세요</div>
        </div>

        <div class="row justify-content-center">
            <div class="term_box term_all_checkbox">
                <form class="terms_form d-flex justify-content-start" @click="clickWholeCheck();">
                    <input type="checkbox" class="terms_checkbox" v-model="termsAll" :disabled="!seeTerms">
                    <span class="form-label">전체 동의</span>
                    <span class="terms_little_text" style="margin-left:10px;">(약관을 읽으셔야 동의가 가능합니다.)</span>
                </form>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="term_box term_little_checkbox">
                <form class="d-flex justify-content-start">
                    <input type="checkbox" class="terms_checkbox" v-model="termsOne" :disabled="!seeTerms">
                    <label class="terms_checkbox_text form-label">개인정보 수집 동의</label>
                    <span class="terms_little_text">(필수)</span>
                    <a class="terms_little_text terms_link"  @click="this.hideOne = !this.hideOne; seeTerms=true;">약관 보기 ></a>
                </form>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="terms_detail" style="height:390px; width:450px;"  v-if="!hideOne">
                <div class="d-flex justify-content-start">
                    <div class="terms_detail_title"><span>약관 제목</span></div>
                </div>
                <div class="d-flex justify-content-start">
                    <div class="terms_detail_little">
                        <pre>
1. 수집하는 항목 
    - 성명, 아이디, 비밀번호, 주소, 이메일
2. 수집 목적 
    - 성명, 아이디, 비밀번호, 주소 : 서비스 이용에 따른 민원사항의 
      처리를 위한 본인식별
    - 이메일 : 회원 인증, 본인식별, 고지사항 전달, 본인 의사 확인, 
      불만처리 등 의사소통 경로 확보, 새로운 원문이나 서비스, 이벤트 
      정보 등 최신 정보 안내
3. 보유 및 이용기간
    - 회원탈퇴 또는 동의철회 시 지체없이 파기하거나 법령에 따른 
      보존기간 이후 파기
    - 부정이용기록은 회원탈퇴 1년 보관 후 파기

* 위 개인정보 수집 및 이용 동의에 대해 거부할 권리가 있습니다. 
  그러나 동의를 거부할 경우에는 회원가입이 불가합니다.
                        </pre>                        
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="term_box term_little_checkbox">
                <form class="d-flex justify-content-start">
                    <input type="checkbox" class="terms_checkbox" v-model="termsTwo">
                    <label class="terms_checkbox_text form-label">만 18세 이상입니다</label>
                    <span class="terms_little_text">(필수)</span>
                </form>
            </div>
        </div>

        <div class="row justify-content-center">
            <div class="d-flex justify-content-between" style="padding: 0px 510px; margin-top:15px;">
                <button class="terms_button_black" @click="this.$router.push({path: '/userlogin'})">취소</button>
                <button class="terms_button" @click="this.$router.push({path: '/signup', query: {type: 'local'}})" v-bind:disabled="!termsAll">다음으로</button>
            </div>
        </div>
        <div class="row justify-content-center" style="margin-bottom: 100px;">
            <div class="d-flex justify-content-center">
            </div>
        </div>
    </div>
    <MateFooter />
</template>

<script>
export default{
    data(){
        return {
            hideOne: true,
            hideTwo: true,
            termsOne: false,
            termsTwo: false,
            seeTerms:false,
            user: {}
        }
    },
    async created(){
        this.user = await this.$verifiedUser();
        if (this.user){
            alert("로그인 상태입니다. 메인 페이지로 이동합니다.")
            this.$router.push({path: '/'});   
        }
    },
    methods: {
        clickWholeCheck(){
            if ((this.termsOne && this.termsTwo) || (!this.termsOne && !this.termsTwo) && this.seeTerms) {
                this.termsOne = !this.termsOne;
                this.termsTwo = !this.termsTwo;
            } 
            else if (this.seeTerms){
                this.termsOne = true; 
                this.termsTwo = true;
            }
        }
    },
    computed: {
        termsAll: function(){
            return this.termsOne && this.termsTwo;
        }
    }
}
</script>

<style scoped>
.terms_container{
    min-width: 1280px;
}
.terms_header_text{
    font-size: 28px;
    text-align: center;
    color: #111111;
    margin-bottom: 32px;
}
.term_box{
    flex:none;
    width: 500px;
}
.term_all_checkbox{
    width: 500px;
    height: 78px;
    background-color: #F5F5F5;
    border-radius: 12px;
    margin-bottom: 20px;
}
.terms_checkbox_text{
    font-size: 14px;
    color: #555555;            
}
.terms_little_text{
    margin-top:3px;
    font-size: 16px;
    color: #555555
}
.term_little_checkbox{
    margin-bottom: 14px;
}
.terms_little_text{
    font-size: 12px;
    color: #888888;
}
.terms_link{
    margin-left: 230px;
}
.terms_detail{
    background-color: #F5F5F5;
    height: 250px;
    border-radius: 12px;
    padding: 30px 20px;
    margin-bottom: 40px;
}
.terms_detail_title{
    font-size: 14px;
    color: #111111;
    margin-bottom: 20px;
}
.terms_detail_little{
    font-size: 14px;
    color: #8F8F8F;
}
.terms_checkbox{
    width: 20px;
    height: 20px;
    border-radius: 3px;
    border: 1px solid #C2C2C2;
    background-color: #FFFFFF;
}

.terms_button{
    width: 120px;
    height: 45px;
    border: none;
    border-radius: 12px;
    margin-bottom: 20px;
    font-size: 16px;
    color: #FFFFFF;
    background-color: #F6C9CA;
}

.terms_button_black{
    width: 120px;
    height: 45px;
    border: none;
    border-radius: 12px;
    margin-bottom: 20px;
    font-size: 16px;
    color: #FFFFFF;
    background-color: #888888;
}
.terms_form{
    padding: 30px 0px 0px 20px;
}
.form-label{
    margin-left: 10px;
}
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap');
pre {

  font-family: Noto Sans KR, sans-serif, Avenir, Helvetica, Arial;
  
}
</style>