<template>
    <MateHeader/>
    <div class="container login_container" style="margin-bottom:200px;">
        <div class="row justify-content-center" style="margin-top:200px; margin-bottom:50px;">
            <div class="login_text">
                찾을 이메일을 입력해주세요
            </div>
        </div>
        <div class="row d-flex justify-content-center">            
            <div class="login_errorMessage" v-if="errorMessage">아이디나 비밀번호가 잘못됐습니다</div>
        </div>
        <div class="row">
            <div class="d-flex justify-content-center mb-4">
                <input class="login_input" type="text" placeholder="이메일을 입력하세요" v-model="email">
            </div>
            <div class="d-flex justify-content-center mb-5">
                <button class="login_input_button login_button_text" @click="sendVerifyEmail()">인증 메일 보내기</button>
            </div>
        </div>
        
    </div>
    <MateFooter />
</template>
<script>
import { firebaseApp } from "../../util/firebase";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword} from "firebase/auth";
export default {
data() {
  return { 
    email: ""
  }
},
mounted(){      
},
methods: {
    async sendVerifyEmail(){
        try{
            if (!this.verifyEmail()){
                alert("이메일 형식이 올바르지 않습니다");
                return;
            }
            const auth = getAuth(firebaseApp);
            const requestBody = {
                user_email: this.email
            }
            const result = await this.$api('/user/emailreverify', requestBody, "POST");
            if (result.status == 200){
                await signInWithEmailAndPassword(auth, this.email, result.password);
                await auth.currentUser.delete();
                createUserWithEmailAndPassword(auth, this.email, result.password)
                            .then((userCredential) => {
                                const user = userCredential.user;
                                console.log(user);
                                this.$router.push({path: '/emailcheck', query: {findpassword:true}});
                            })
                            .catch((error) => {
                                console.error(error);
                                alert("firebase 오류입니다. 처음부터 다시 시도해 주십시오.");
                            });
            }
            else{
                alert("존재하지 않거나 차단된 이메일입니다.")
            }
        }
        catch(err){
            console.error(err);
            alert("오류가 발생하였습니다. 다시 시도해 주세요.")
        }
    },
    verifyEmail(){
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
            if (this.email == "" || !emailRegex.test(this.email) || this.email.length > 100){
                return false;
            }
            return true;
        },
    }
}
</script>

<style scoped>
.login_box {
  flex: none;
  width: 500px;
  padding: 0px 20px;
}

.login_icon_first {
  border-radius: 50px;
  width: 60px;
  height: 60px;
}

.login_icon {
  border-radius: 50px;
  width: 60px;
  height: 60px;
  margin-left: 30px;
}
.login_icon_last {
  width: 60px;
  height: 60px;
  margin-left: 30px;
}

.login_col_text {
  flex: none;
  font-size: 14px;
  margin-bottom: 66px;
}
.login_input {
  border-radius: 12px;
  border: 1px solid #c2c2c2;
  width: 500px;
  height: 79px;
  flex: none;
  background-color: #f5f5f5;
  padding-left: 13px;
}
.login_input_button {
  border-radius: 12px;
  border: 0px solid #c2c2c2;
  width: 500px;
  height: 79px;
  flex: none;
  background-color: #f6c9ca;
}
.login_text {
  min-width: 450px;
  text-align: center;
  font-size: 16px;
}
.login_text_last {
  margin-bottom: 50px;
}
.login_container {
  min-width: 1280px;
}
.login_button_text {
  font-size: 28px;
  color: #ffffff;
}
.login_checkbox {
    appearance: none;
}

.check_icon {
  width: 24px;
  height: 24px;
  display: block;
  position: relative;
  margin-top:2px;
  background-image: url("/public/icon/autologincheckbox.png");
  background-repeat: no-repeat;
}

.check_icon_checked {
  width: 24px;
  height: 24px;
  display: block;
  position: relative;
  margin-top:2px;
  background-image: url("/public/icon/autologincheckboxselected.png");
  background-repeat: no-repeat;
}

.login_label {
  font-size: 14px;
  color: #111111;
  margin-left: 5px;
}
.login_input_xbutton {
  position: absolute;
  border: 0.5px solid #666666;
  height: 20px;
  width: 20px;
  background-color: #d9d9d9;
  border-radius: 50px;
  margin-top: 30px;
  margin-left: 460px;
}
.login_errorMessage {
  color: red;
  margin-bottom: 10px;
  text-align: center;
}
</style>