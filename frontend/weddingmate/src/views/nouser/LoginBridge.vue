<template>
    <div></div>
</template>

<script>
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
            this.naverLogin = new window.naver.LoginWithNaverId({
                clientId: "FkAYkKQaYKYBZPgPFIhI",
                callbackUrl: "http://localhost:8080/loginBridge",
                isPopup: true,
                loginButton: {
                    color: "green", type: 3, height: 60
                }
            });
            this.naverLogin.init();
            this.naverLogin.getLoginStatus(async (status)=>{
                    console.log(status);
                    if(status){
                        console.log(status);
                        console.log(this.naverLogin.user);
                        var email = this.naverLogin.user.getEmail();
                        if (email == undefined || email == null){
                            alert("이메일은 필수 정보입니다. 정보 제공해줘");
                            this.naverLogin.reprompt();
                            return;
                        }
                    }
                    else{
                        console.log("callback 처리 실패");
                    }
                })
        },
        methods: {
 
        }
    };
</script>