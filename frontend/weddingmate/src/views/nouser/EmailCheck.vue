<template>
    <MateHeader :user="this.$verifiedUser()"/>
    <div class="container sign_up_container" style="margin-top: 200px;">
        <div class="row justify-content-center">
            <div class="sign_up_header_text">이메일 전송 완료</div>
        </div>
        <div class="row justify-content-center">
            <div class="sign_up_header_text" style="font-size: 16px; margin-bottom: 100px;">입력하신 이메일 함을 확인해주세요</div>
        </div>

        <div class="row justify-content-center" style="margin-bottom:200px;">
            <div class="d-flex justify-content-center">
                <button class="sign_up_button_last" @click="checkEmailVerfication();">인증 확인</button>
            </div>
            <div class="row justify-content-center">
                <div class="sign_up_header_text" style="font-size: 16px; margin-bottom: 100px;">이메일 링크를 클릭해주세요!</div>
            </div>
        </div>
        
    </div>
    
</template>

<script>
import { firebaseApp } from "../../util/firebase";
import { getAuth, sendEmailVerification } from "firebase/auth";
export default{
    data(){
        return {
            userType: "",
            auth: null,
        }
    },
    mounted(){
      this.sendEmailAuth();
    },
    methods:{
        async sendEmailAuth(){
            try{
                this.auth = getAuth(firebaseApp);
                console.log(this.auth);
                await sendEmailVerification(this.auth.currentUser);
            }
            catch(err){
                console.error(err);
            }
        },
        async checkEmailVerfication() {
            try{
                await this.auth.currentUser.reload();
                console.log("리로드 완료!");
                if (this.auth.currentUser.emailVerified) {
                    console.log(this.auth.currentUser.email);
                    await this.$api("/user/emailisverified", {user_email: this.auth.currentUser.email}, "POST");
                    this.$router.push({path: '/userlogin'});
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
    font-size: 28px;
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
    width: 310px;
    height: 78px;
    border: none;
    border-radius: 12px;
    margin-bottom: 20px;
    font-size: 28px;
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