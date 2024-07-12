<template>
    <MateHeader />
    <div class="container sign_up_container" style="margin-top: 200px;">
        <div class="row justify-content-center">
            <div class="sign_up_header_text">회원 정보를 입력해주세요</div>
        </div>
        <div class="row justify-content-center">
            <div class="sign_up_small_header_text">회원 정보 입력</div>
            <div class="sign_up_small_header_text_detail"></div>
        </div>
        <div>
            <div class="row justify-content-center">
                <div class="col sign_up_left">
                    <div class="sign_up_left_text">이메일</div>
                </div>
                <div class="col sign_up_middle">
                    <input class="sign_up_input" type="text" placeholder="이메일을 입력하세요" v-model="user.user_email" disabled>
                </div>
                <div class="col sign_up_right">
                </div>
            </div>
            <div class="row justify-content-center sign_up_emptycol">
                <div class="col sign_up_left"></div>
                <div class="col sign_up_middle">
                    <div class="sign_up_little_text sign_up_red" v-if="!userEmailVerify">올바르지 않은 이메일입니다.</div>
                </div>
                <div class="col sign_up_right"></div>
            </div>

            <div class="row justify-content-center">
                <div class="col sign_up_left">
                    <div class="sign_up_left_text">이름</div>
                </div>
                <div class="col sign_up_middle">
                    <input class="sign_up_input" type="text" placeholder="이름을 입력하세요" v-model="user.user_name">
                </div>
                <div class="col sign_up_right">
                </div>
            </div>
            <div class="row sign_up_emptycol justify-content-center">
                <div class="col sign_up_left"></div>
                <div class="col sign_up_middle">
                    <div class="sign_up_little_text sign_up_red" v-if="!userNameVerify">올바르지 않은 이름입니다.</div>
                </div>
                <div class="col sign_up_right"></div>
            </div>

            <div class="row justify-content-center">
                <div class="col sign_up_left">
                    <div class="sign_up_left_text">닉네임</div>
                </div>
                <div class="col sign_up_middle">
                    <input class="sign_up_input" type="text" placeholder="닉네임을 입력하세요" v-model="user.user_nickname">
                </div>
                <div class="col sign_up_right">
                </div>
            </div>
            <div class="row sign_up_emptycol justify-content-center">
                <div class="col sign_up_left"></div>
                <div class="col sign_up_middle">
                    <div class="sign_up_little_text sign_up_red" v-if="!userNicknameVerify">닉네임 좀 똑바로 적어라</div>
                </div>
                <div class="col sign_up_right"></div>
            </div>

            <div class="row sign_up_partition"></div>

            <div class="row justify-content-center">
                <div class="sign_up_small_header_text">개인 정보 입력</div>
                <div class="sign_up_small_header_text_detail2"></div>
            </div>

            <div class="row justify-content-center">
                <div class="col sign_up_left">
                    <div class="sign_up_left_text">주소</div>
                </div>
                <div class="col sign_up_middle">
                    <input class="sign_up_input" type="text" v-model="user.user_addr1" placeholder="오른쪽 버튼으로 주소를 검색하세요" disabled>
                </div>
                <div class="col sign_up_right">
                    <button class="sign_up_little_button" @click="zipload();">검색</button>
                </div>
            </div>
            <div class="row justify-content-center sign_up_emptycol">

            </div>

            <div class="row justify-content-center">
                <div class="col sign_up_left">
                    <div class="sign_up_left_text">상세 주소</div>
                </div>
                <div class="col sign_up_middle">
                    <input class="sign_up_input" type="text" placeholder="상세 주소를 입력하세요" v-model="user.user_addr2">
                </div>
                <div class="col sign_up_right">
                </div>
            </div>
            <div class="row sign_up_emptycol justify-content-center">
                <div class="col sign_up_left"></div>
                <div class="col sign_up_middle">
                </div>
                <div class="col sign_up_right">
                </div>
            </div>
            <div class="row sign_up_partition"></div>
            <div class="row justify-content-center" style="margin-bottom:200px;">
                <div class="d-flex justify-content-center">
                    <button class="sign_up_button">취소</button>
                    <button class="sign_up_button_last" @click="editUser();">
                        정보 수정
                    </button>
                </div>
            </div>
        </div>
    </div>
    <MateFooter />
</template>

<script>
export default{
    data(){
        return {
            user: {},
            userEmailVerify: true,
            userPasswordVerify: true,
            userNameVerify: true,
            userNicknameVerify: true,
            userEmailDuplicateCheck: false,
        }
    },
    mounted(){
    },
    async created(){
        this.user = await this.$verifiedUser();
        console.log(this.user);
        if (!this.user){
            alert("로그인 상태가 아닙니다. 메인 페이지로 이동합니다.")
            this.$router.push({path: '/'});   
        }
    },
    methods:{
        // 회원가입 정보 검증
        verifyUser(){
            if (this.userType == 'local'){
                if (this.user.user_name == "" || this.user.user_name.length < 2 || this.user.user_name.length > 12){
                    this.userNameVerify = false;
                }
                else{
                    this.userNameVerify = true;
                }
                if (this.user.user_nickname == "" || this.user.user_nickname.length < 2 || this.user.user_nickname.length > 12){
                    this.userNicknameVerify = false;
                }
                else{
                    this.userNicknameVerify = true;
                }
                return this.userEmailVerify && this.userPasswordVerify && this.userNameVerify && this.userNicknameVerify
            }
            else{
                if (this.user.user_name == "" || this.user.user_name.length < 2 || this.user.user_name.length > 12){
                    this.userNameVerify = false;
                }
                if (this.user.user_nickname == "" || this.user.user_nickname.length < 2 || this.user.user_nickname.length > 12){
                    this.userNicknameVerify = false;
                }    
                return this.userNameVerify && this.userNicknameVerify;
            }
            
        },
        zipload() {
            new window.daum.Postcode({
                oncomplete: (data) => {
                    // 각 주소의 노출 규칙에 따라 주소를 조합한다.
                    // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
                    let addr = ''; // 주소 변수
                    let extraAddr = '';
                    //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
                    if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                        addr = data.roadAddress;
                    } else { // 사용자가 지번 주소를 선택했을 경우(J)
                        addr = data.jibunAddress;
                    }
                    // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
                    if (data.userSelectedType === 'R') {
                        // 법정동명이 있을 경우 추가한다. (법정리는 제외)
                        // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
                        if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
                            // addr += ' ';
                            extraAddr += data.bname;
                        }
                        // 건물명이 있고, 공동주택일 경우 추가한다.
                        if (data.buildingName !== '' && data.apartment === 'Y') {
                            // addr += ' ';
                            extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                        }
                    }
                    this.user.user_addr1 = addr + ' ' + extraAddr;
                    this.zipinput = true;
                }
            }).open();
        },
        async editUser(){
            try{
                if (this.verifyUser()){
                    const requestBody = {
                        access_token: this.$getAccessToken(),
                        user_name: this.user.user_name,
                        user_nickname: this.user.user_nickname,
                        user_addr1: this.user.user_addr1,
                        user_addr2: this.user.user_addr2,
                    }
                    const result = await this.$api("http://localhost:9090/user/edit", requestBody, "POST");
                    if(result.status == 200){
                        alert("정보 수정 성공");
                        this.$router.push({path:'/mypage'});
                    }
                    else{
                        alert("회원 정보를 수정할 수 없습니다. 다시 시도해주세요");
                    }
                }
            }
            catch(err){
                console.error(err);
                alert("회원 정보를 수정할 수 없습니다. 메인 화면으로 이동합니다.");
                this.$router.push({path:'/'});
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