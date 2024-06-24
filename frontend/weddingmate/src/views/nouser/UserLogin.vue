<template>
    <div class="container login_container">
        <div class="row justify-content-center">
            <div class="login_text">
                안녕하세요
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="login_text login_text_last">
                여러분의 웨딩을 처음부터 함께하는 웨딩메이트입니다.
            </div>
        </div>
        <div class="row d-flex justify-content-center">            
                <div class="login_errorMessage" v-if="errorMessage">아이디나 비밀번호가 잘못됐습니다</div>
        </div>
        <div class="row">
            
                <div class="d-flex justify-content-center mb-4">
                    <input class="login_input" type="text" placeholder="이메일을 입력하세요" v-model="email">
                    <button class="login_input_xbutton"></button>
                </div>
                <div class="d-flex justify-content-center mb-4">
                    <input class="login_input" type="text" placeholder="비밀번호를 입력하세요" v-model="password">
                    <button class="login_input_xbutton"></button>
                </div>
                <div class="d-flex justify-content-center">
                    <div class="login_box">
                        <div class="d-flex justify-content-start">
                            
                            <input id="auto_login" type="checkbox" class="login_checkbox" v-model="autoLogin">
                            <label for="auto_login" class="login_label">자동로그인</label>                            
                        </div>
                    </div>
                </div>
                <div class="d-flex justify-content-center mb-5">
                    <button class="login_input_button login_button_text" @click="login()">login</button>
                </div>
        </div>
        <div class="row d-flex justify-content-center">
            <div class="login_box">
                <div class="d-flex justify-content-center">
                    <a class="col login_col_text" href="#">비밀번호 찾기</a> 
                    <a class="col login_col_text" href="#">회원가입</a>
                </div>
            </div>
        </div>
        <div class="row justify-content-center mb-3">
            간편 로그인
        </div>
        <div class="row justify-content-center">
            <div class="login_box">
                <div class="d-flex justify-content-center">
                    <img src="http://localhost:8080/icon/kakao_logo.jpg" alt="" class="login_icon_first">
                    <img src="http://localhost:8080/icon/google_logo.png" alt="" class="login_icon">
                    <img src="http://localhost:8080/icon/naver_logo.png" alt="" class="login_icon_last">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { firebaseApp } from "../../util/firebase";
    import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
    export default {
        data(){
            return {
                autoLogin: null,
                password: "",
                email: "",
                errorMessage: false,
            }            
        },
        methods: {
            async login(){
                 
                // 파이어베이스로 먼저 인증을 시작한다.
                try{
                    const auth = await getAuth(firebaseApp);
                    // 파이어베이스 로그인 함수 (실패하면 에러 발생)
                    await signInWithEmailAndPassword(auth, this.email, this.password);

                    // 서버 쪽에서 계정이 있는지 또 확인하고, 성공하면 DB에 저장된 accessToken을 가져온다.
                    const result = await this.$api(`/user/login`, {email: this.email, password: this.password}, "POST");                    
                    
                    if (result.status == 200){                        
                        console.log(this.autoLogin);
                        // 쿠키에 accessToken 저장하고 로그인 유지 시엔 LocalStoreage(vuex)에도 저장
                        this.$cookies.set("weddingCookie", result.accessToken);
                        if (this.autoLogin){
                            await this.$store.commit("user", {accessToken: result.accessToken})
                        }
                        if (result.type=="local"){
                            console.log("local login");
                        }
                        else if (result.type=="admin"){
                            this.$router.push({path: '/admin/itemlist'});
                        }
                    }
                    else{
                        this.errorMessage= true;    
                    }
                }
                catch(err){
                    // 파이어베이스에서 인증 실패 (signInWithEmailAndPassword)할 경우를 위한 catch문이다.
                    console.error(err);
                    this.errorMessage= true;
                }
            }
        }
    };
</script>

<style scoped>
    .login_box{
        flex:none;
        width: 500px;
    }
    .login_icon_first{
        border-radius: 50px;
        width: 60px;
        height: 60px;
    }
    .login_icon{
        border-radius: 50px;
        width: 60px;
        height: 60px;
        margin-left: 30px;
    }
    .login_icon_last{
        width: 60px;
        height: 60px;
        margin-left: 30px;
    }

    .login_col_text{
        flex:none;
        font-size: 14px;
        margin-left: 20px;
        margin-bottom: 66px;
    }
    .login_input{
        border-radius: 12px;
        border: 1px solid #C2C2C2;
        width: 500px;
        height: 79px;
        flex:none;
        background-color: #F5F5F5;
        padding-left: 13px;
    }
    .login_input_button{
        border-radius: 12px;
        border: 1px solid #C2C2C2;
        width: 500px;
        height: 79px;
        flex:none;
        background-color: #F6C9CA;
    }
    .login_text{
        min-width: 450px;
        text-align: center;
        font-size: 16px;
    }
    .login_text_last{
        margin-bottom: 50px;
    }
    .login_container{
        min-width: 1280px;
    }
    .login_button_text{
        font-size: 28px;
        color: #FFFFFF;
    }
    .login_checkbox{
        width: 22px;
        height: 22px;
        border-radius: 25px;
        border: 1px solid #C2C2C2;
        margin-bottom: 12px;
    }
    .login_label{
        font-size: 14px;
        color: #111111;
        margin-left: 6px;
    }
    .login_input_xbutton{
        position: absolute;
        border: 0.5px solid #666666;
        height: 20px;
        width: 20px;
        background-color: #D9D9D9;
        border-radius: 50px;
        margin-top: 30px;
        margin-left: 460px;
    }
    .login_errorMessage{
        color: red;
        margin-bottom: 10px;
        text-align: center;
    }
</style>