<template>
    <MateHeader/>
    <div class="container sign_up_container" style="margin-top: 200px;">
        <div class="row justify-content-center" v-if="!password">
            <div class="sign_up_header_text">이메일 전송 완료</div>
        </div>
        <div class="row justify-content-center" v-if="password">
            <div class="sign_up_header_text">이메일 인증 완료</div>
        </div>
        <div class="row justify-content-center" v-if="!password">
            <div class="sign_up_header_text" style="font-size: 16px; margin-bottom: 100px;">입력하신 이메일 함을 확인해주세요</div>
        </div>

        <div class="row justify-content-center" v-if="password">
            <div class="sign_up_header_text" style="font-size: 16px; margin-bottom: 100px;">비밀번호는 {{ password }} 입니다.</div>
        </div>

        <div class="row justify-content-center" style="margin-bottom:200px;">
            <div class="d-flex justify-content-center" v-if="!password">
                <button class="sign_up_button_last" @click="checkEmailVerfication();">인증 확인</button>
            </div>

            <div class="d-flex justify-content-center" v-if="password">
                <button class="sign_up_button_last" @click="this.$router.push({path:'/'});">메인으로</button>
            </div>

            <div class="row justify-content-center" v-if="!password">
                <div class="sign_up_header_text" style="font-size: 16px; margin-bottom: 10px;">이메일 링크를 클릭해주세요!</div>
            </div>
        </div>
    </div>
    <MateFooter />
</template>

<script>
import { firebaseApp } from "../../util/firebase";
import { getAuth, sendEmailVerification } from "firebase/auth";
export default{
    data(){
        return {
            userType: "",
            auth: {},
            user: {},
            findpassword: null,
            password: null,
        }
    },
    mounted(){
      this.findpassword = this.$route.query.findpassword;
      this.sendEmailAuth();
    },
    async created(){
        this.user = await this.$verifiedUser();
        if (this.user){
            alert("로그인 상태입니다. 메인 페이지로 이동합니다.")
            this.$router.push({path: '/'});   
        }
    },
    methods:{
        async sendEmailAuth(){
            try{
                this.auth = getAuth(firebaseApp);
                await sendEmailVerification(this.auth.currentUser);
            }
            catch(err){
                console.error(err);
            }
        },
        async checkEmailVerfication() {
            try{
                await this.auth.currentUser.reload();
                if (this.auth.currentUser.emailVerified) {
                    if (this.findpassword){
                        const result = await this.$api('/user/emailreverify', {user_email: this.auth.currentUser.email}, "POST");
                        if (result.status == 200){
                            this.password = result.password;
                        }
                        else{
                            alert("오류 발생! 처음부터 다시 시도해주세요.");
                        }
                    }
                    else{
                        await this.$api("/user/emailisverified", {user_email: this.auth.currentUser.email}, "POST");
                        alert("이메일 인증이 완료됐습니다. 다시 로그인해주세요.")
                        this.$router.push({path: '/userlogin'});
                    }
                    
                }else{
                    alert("이메일 인증 실패");
                } 
            }
            catch(err){
                console.error(err);
            }
        },
    
    }
}
</script>

<style scoped>
.sign_up_container{
    min-width: 1280px;
}
.sign_up_header_text{
    font-size: 35px;
    text-align: center;
    color: #111111;
    margin-bottom: 32px;
}
.sign_up_small_header_text{
    width: 160px;
    font-size: 20px;
    text-align: left;
    color: #111111;
    margin-bottom: 32px;          
    font-weight: bold;  
}
.sign_up_small_header_text_detail{
    width: 640px;
    font-size: 14px;
    text-align: left;
    color: #FF481E;
    margin-bottom: 32px;          
    font-weight: bold;  
    padding-top:7px;
}
.sign_up_small_header_text_detail2{
    width: 640px;
    font-size: 14px;
    text-align: left;
    color: #888888;
    margin-bottom: 32px;          
    font-weight: bold;  
    padding-top:7px;
}
.sign_up_middle{
    flex:none;
    height: 70px;
    width: 500px;
    padding: 0px 0px 0px 0px;
}
.sign_up_left{
    flex:none;
    height: 70px;
    width: 140px;
    padding: 0px 0px 0px 0px;
}
.sign_up_right{
    flex:none;
    height: 70px;
    width: 135px;
    padding: 0px 0px 0px 0px;
}
.sign_up_little_button{
    width: 86px;
    height: 37px;
    border: 1px solid #888888;
    border-radius: 9px;
    background-color: #FFFFFF;
    margin-top: 17px;
    margin-left: 24px;
    font-size:14px;
    color: #888888
}
.sign_up_left_text{
    margin-top: 24px;
    font-size: 16px;
    color: #555555;
}
.sign_up_input{
    height: 70px;
    width: 500px;
    border-radius: 12px;
    background-color: #f5f5f5;
    border: 1px solid #C2C2C2;
    padding-left: 13px;
}
.sign_up_emptycol{
    height: 70px;
}
.sign_up_button{
    width: 310px;
    height: 78px;
    border: none;
    border-radius: 12px;
    margin-bottom: 20px;
    font-size: 28px;
    color: #FFFFFF;
    background-color: #333333;
    margin-right: 18px;
}
.sign_up_button_last{
    width: 160px;
    height: 60px;
    border: none;
    border-radius: 12px;
    margin-bottom: 20px;
    font-size: 22px;
    color: #FFFFFF;
    background-color: #F6C9CA;
}
.sign_up_little_text{
    margin-top:10px;
    font-size: 14px;
    color: #888888;
}
.sign_up_partition{
    height: 50px;
}
.sign_up_red{
    color: red;
}
</style>