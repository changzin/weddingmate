<template>
    <MateHeader/>
    <div class="container login_container" style="margin-bottom:200px;">
        <div class="row justify-content-center" style="margin-top:200px;">
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
            </div>
            <div class="d-flex justify-content-center mb-4">
                <input class="login_input" type="password" placeholder="비밀번호를 입력하세요" v-model="password">
            </div>
            <!-- <div class="d-flex justify-content-center">
                <div class="login_box">
                    <div class="d-flex justify-content-start">
                        
                        
                    </div>
                </div>
            </div> -->
            <div class="d-flex justify-content-center mb-5">
                <button class="login_input_button login_button_text" @click="login()">로그인</button>
            </div>
        </div>
        <div class="row d-flex justify-content-center">
            <div class="login_box">
                    
                <div class="d-flex justify-content-between">
                    <div style="display: flex;">
                        <div :class="{
                            check_icon_checked: this.autoLogin,
                            check_icon: !this.autoLogin
                            }"
                            @click = "autoLogin = !autoLogin"
                            ></div>
                        <label class="login_label" @click = "autoLogin = !autoLogin">로그인 상태 유지</label>                            
                    </div>
                    <button class="col login_col_text" @click="this.$router.push({path: '/terms'})" style="border:none; background-color:#ffffff; margin-left: 25px;">회원가입</button>
                    <button class="col login_col_text" @click="this.$router.push({path: '/findpassword'})" style="border:none; background-color:#ffffff;">비밀번호를 잊으셨나요?</button>
                </div>
            </div>
        </div>
        <div class="row justify-content-center mb-3">
            간편 로그인
        </div>
        <div class="row justify-content-center">
            <div style="width:250px; margin-bottom:15px;">
                <button id="custom-login-btn" @click="kakaoLogin" style="border:none; padding:0px;">
                    <img src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg" width="220">
                </button>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="h-screen dark:bg-gray-800" style="width: 250px;">
                <button @click="googleLogin" style="border: none;  width:220px; height:50px; border-radius: 5px;">
                    <img class="w-6 h-6" src="https://www.svgrepo.com/show/475656/google-color.svg" loading="lazy" alt="google logo" width="25" height="25">
                    <span> Login with Google</span>
                </button>
            </div>
        </div>
        <div class="row justify-content-center">
            
            <div class="naverIdLogin " @click="naverInit()">
                <img src="/icon/naver-icon-style.png" style="height: 25px; width:25px; margin-right:15px;">
                <div>네이버로 로그인</div>
            </div>
        </div>
        
        <div id="naverIdLogin" hidden></div>
    </div>
    <MateFooter />
</template>

<script>
    import { firebaseApp } from "../../util/firebase";
    import { GoogleAuthProvider, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
    export default {
        data(){
            return {
                autoLogin: null,
                password: "",
                email: "",
                errorMessage: false,
                user: {},
            };     
        },
        async created(){
            this.user = await this.$verifiedUser();
            if (this.user){
                alert("로그인 상태입니다. 메인 페이지로 이동합니다.")
                this.$router.push({path: '/'});   
            }
        },
        mounted(){
            

        },
        methods: {
            async login(){
                // 파이어베이스로 먼저 인증을 시작한다.
                try{
                    const auth = await getAuth(firebaseApp);
                    // 파이어베이스 로그인 함수 (실패하면 에러 발생)
                    await signInWithEmailAndPassword(auth, this.email, this.password);

                    // 서버 쪽에서 계정이 있는지 또 확인하고, 성공하면 DB에 저장된 accessToken을 가져온다.
                    const result = await this.$api(`/user/login`, {email: this.email, password: this.password, loginType: 'local'}, "POST");                    
                    
                    if (result.status == 200){                        
                        // 쿠키에 accessToken 저장하고 로그인 유지 시엔 LocalStoreage(vuex)에도 저장
                        this.$cookies.set("weddingCookie", result.accessToken);
                        if (this.autoLogin){
                            await this.$store.commit("user", {accessToken: result.accessToken});
                        }
                        if (result.type=="local"){
                        
                            if (this.$route.query.savedUrl){
                                this.$router.go(-1);    
                            }
                            else{
                                this.$router.push({path: '/'});
                            }
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
            },

            // 카카오 로그인 관련 함수 -> 로그인 결과로 accessToken을 받아오거나, 회원가입으로 보낸다.
            kakaoLogin(){
                try{
                    window.Kakao.Auth.login({
                        scope: 'profile_nickname account_email',
                        success: this.getKakaoAccount,
                    });
                }
                catch(err){
                    console.error(err);
                    alert("KAKAO 로그인 에러가 발생하였습니다. 다시 시도해 주세요.");
                }
            },
            async getKakaoAccount(){
                let nickname = null;
                let email = null;
                await window.Kakao.API.request({
                    url: '/v2/user/me',
                    success: res=>{
                        const kakao_account = res.kakao_account;
                        nickname = kakao_account.profile.nickname;
                        email = kakao_account.email;
                    },
                    fail: error => {
                        console.log(error);
                    }
                });
                if (nickname && email){
                    await window.Kakao.Auth.logout();
                    const requestBody = {
                        email: email, 
                        password: null, 
                        loginType: "kakao"
                    }
                    const result = await this.$api("/user/login", requestBody, "POST");
                    if (result.status == 300){
                        this.$router.push({
                            name: "signup",
                            query: { "type": "kakao", "email": email }
                        });
                    }
                    if (result.status == 200){
                        this.$cookies.set("weddingCookie", result.accessToken);
                        if (this.autoLogin){
                            await this.$store.commit("user", {accessToken: result.accessToken})
                        }
                        if (this.$route.query.savedUrl){
                            this.$router.go(-1);
                        }
                        else{
                            this.$router.push({path: '/'});
                        }
                    }
                    else{
                        alert("동일한 이메일의 계정이 존재합니다. 다른 이메일을 사용해 주세요");
                    }
                }
            },
            async googleLogin(){
                const provider = new GoogleAuthProvider();
                let auth = await getAuth(firebaseApp);
                try{
                  let email = null;
                  await signInWithPopup(auth, provider);
                  await onAuthStateChanged(auth, (user)=>{
                      if (user){
                          console.log(user.uid);
                          console.log(user.email);
                          email = user.email;
                      }
                  });
                  if(email){
                    const requestBody = {
                        email: email, 
                        password: null, 
                        loginType: "google"
                    }
                    const result = await this.$api("/user/login", requestBody, "POST");
                    if (result.status == 300){
                        this.$router.push({
                            name: "signup",
                            query: { "type": "google", "email": email }
                        });
                    }
                    if (result.status == 200){
                        this.$cookies.set("weddingCookie", result.accessToken);
                        if (this.autoLogin){
                            await this.$store.commit("user", {accessToken: result.accessToken})
                        }
                        if (this.$route.query.savedUrl){
                            this.$router.go(-1);
                        }
                        else{
                            this.$router.push({path: '/'});
                        }
                    }
                    else{
                        alert("동일한 이메일의 계정이 존재합니다. 다른 이메일을 사용해 주세요");
                    }
                  }
                  else{
                    alert("구글 이메일을 불러오지 못했습니다. 다시 시도해 주세요.")
                  }
              }
              catch(err){
                console.error(err);
                alert("예기치 못한 에러로 로그인이 실패했습니다. 다시 시도해 주세요.")
              }
            },
            async naverInit(){
                try{
                    // 
                    this.naverLogin = new window.naver.LoginWithNaverId({
                        clientId: "FkAYkKQaYKYBZPgPFIhI",
                        callbackUrl: "http://localhost:8080/loginBridge",
                        isPopup: true,
                        loginButton: {
                            color: "green", type: 3, height: 60,
                        },
                    });
                    this.naverLogin.init();
                    window.open("/loginBridge", 'test', 'width=600, height=1000', '_blank');
                    window.call = async (email)=>{
                        if(email){
                            const requestBody = {
                                email: email, 
                                password: null, 
                                loginType: "naver"
                            }
                            const result = await this.$api("/user/login", requestBody, "POST");
                            if (result.status == 300){
                                this.$router.push({
                                    name: "signup",
                                    query: { "type": "naver", "email": email }
                                });
                                return;
                            }
                            if (result.status == 200){
                                this.$cookies.set("weddingCookie", result.accessToken);
                                if (this.autoLogin){
                                    await this.$store.commit("user", {accessToken: result.accessToken})
                                }
                                if (this.$route.query.savedUrl){
                                    this.$router.go(-1);
                                    return;
                                }
                                else{
                                    this.$router.push({path: '/'});
                                    return;
                                }
                            }
                            else{
                                alert("동일한 이메일의 계정이 존재합니다. 다른 이메일을 사용해 주세요");
                                return;
                            }
                        }
                        else{
                            alert("네이버 이메일을 불러오지 못했습니다. 다시 시도해 주세요.");
                            return;
                        }
                    }
                }
                catch(err){
                    console.error(err);
                    alert("네이버가 응답하지 않습니다. 다시 시도해주세요.");
                }
            },
        }
    };
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

.naverIdLogin{
    font-weight: bold;
    border-radius: 5px;
    display:flex;
    justify-content: start;    
    padding-top:13px;
    width: 220px;
    margin-right:7px;
    margin-top: 15px;
	height :48px;
	font-size: 15px;
	background: rgb(3, 199, 90);
	color: white;
	border: solid 1px rgba(0, 0, 0, 0.06);
}
</style>