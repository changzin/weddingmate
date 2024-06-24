<template>
            <MateHeader />
    <div class="container terms_container" style="margin-top:200px;">
        <div class="row justify-content-center">
            <div class="terms_header_text">이용약관에 먼저 동의해주세요</div>
        </div>

        <div class="row justify-content-center">
            <div class="term_box term_all_checkbox">
                <form class="terms_form d-flex justify-content-start" @click="termsOne = true; termsTwo = true;">
                    <input type="checkbox" class="terms_checkbox" v-model="termsAll">
                    <span class="form-label">전체 동의</span>
                </form>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="term_box term_little_checkbox">
                <form class="d-flex justify-content-start">
                    <input type="checkbox" class="terms_checkbox" v-model="termsOne">
                    <label class="terms_checkbox_text form-label">만 14세 이상입니다</label>
                    <span class="terms_little_text">(필수)</span>
                    <a class="terms_little_text terms_link"  @click="this.hideOne = !this.hideOne">보기 ></a>
                </form>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="terms_detail term_box"  v-if="!hideOne">
                <div class="d-flex justify-content-start">
                    <div class="terms_detail_title"><span>약관 제목</span></div>
                </div>
                <div class="d-flex justify-content-start">
                    <div class="terms_detail_little">약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역</div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="term_box term_little_checkbox">
                <form class="d-flex justify-content-start">
                    <input type="checkbox" class="terms_checkbox" v-model="termsTwo">
                    <label class="terms_checkbox_text form-label">만 14세 이상입니다</label>
                    <span class="terms_little_text">(필수)</span>
                    <a class="terms_little_text terms_link" @click="this.hideTwo = !this.hideTwo">보기 ></a>
                </form>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="terms_detail term_box" v-if="!hideTwo">
                <div class="d-flex justify-content-start">
                    <div class="terms_detail_title"><span>약관 제목</span></div>
                </div>
                <div class="d-flex justify-content-start">
                    <div class="terms_detail_little">약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역 약관 상세내역</div>
                </div>
            </div>
        </div>

        <div class="row justify-content-center">
            <div class="d-flex justify-content-center">
                    <button class="terms_button" @click="this.$router.push({path: '/signup', query: {type: 'local'}})" v-bind:disabled="!termsAll">다음으로</button>
            </div>
        </div>
        <div class="row justify-content-center" style="margin-bottom: 200px;">
            <div class="d-flex justify-content-center">
                <button class="terms_button_black" @click="console.log(termsAll)">취소</button>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    data(){
        return {
            hideOne: true,
            hideTwo: true,
            termsOne: false,
            termsTwo: false,
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
    width: 500px;
    height: 80px;
    background-color: #F6C9CA;
    border: none;
    border-radius: 12px;
    margin-bottom: 20px;
    font-size: 28px;
    color: #FFFFFF;
}

.terms_button_black{
    width: 500px;
    height: 80px;
    background-color: #333333;
    border: none;
    border-radius: 12px;
    margin-bottom: 20px;
    font-size: 28px;
    color: #FFFFFF;
}
.terms_form{
    padding: 30px 0px 0px 20px;
}
.form-label{
    margin-left: 10px;
}
</style>