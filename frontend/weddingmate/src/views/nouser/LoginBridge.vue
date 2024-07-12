<template>
    <div id="naverIdLogin" hidden></div>
</template>

<script>
    export default {
        data(){
            return {
                email: "",
                redirected: null,
            };     
        },
        mounted(){
            this.naverInit();
            this.redirected = this.$route.query.redirected;
            if (this.redirected){
                this.getNaverUser();
            }
            if (!this.redirected){
                this.executeNaverLogin();
            }
        },
        methods: {
            getUser(email){
                opener.call(email);
                window.close();
            },
            naverInit(){
                this.naverLogin = new window.naver.LoginWithNaverId({
                    clientId: "FkAYkKQaYKYBZPgPFIhI",
                    callbackUrl: "http://localhost:8080/loginBridge?redirected=true",
                    isPopup: true,
                    loginButton: {
                        color: "green", type: 3, height: 60,
                    },
                });
                this.naverLogin.init();
            },
            executeNaverLogin(){
                this.naverLogin.authorize();
            },
            getNaverUser(){
                this.naverLogin.getLoginStatus(async (status)=>{                        
                        if(status){
                            console.log(this.naverLogin.user);
                            var email = this.naverLogin.user.getEmail();
                            if (email == undefined || email == null){
                                alert("이메일은 필수 정보입니다. 정보 제공해줘");
                                this.naverLogin.reprompt();
                                return;
                            }
                            this.getUser(email);
                        }
                        else{
                            console.log("callback 처리 실패");
                            this.getUser(null);
                        }
                    })
            }
        }
    };
</script>