<template>
    <div>
    <MateHeader />
      <div>
        <!-- 헤더 -->
        
        <!-- 본문 -->
        <div class="container receipt_container">
            <div class="row justify-content-center">
                <div class="receipt_title">
                    구매 영수증
                    <hr class="receipt_hr">
                </div>
                <div class="receipt_box">
                    <div class="row">
                        <div class="col-2 receipt_category1">
                            주문번호
                        </div>
                        <div class="col receipt_number">
                            {{ order_code }}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col receipt_category1">
                            거래일시
                        </div>
                        <div class="col receipt_date">
                            {{ $dateFormat(receipt.order_info_end_date) }}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4 receipt_category2">
                            견적함명
                        </div>
                        <div class="col receipt_item_name">
                            {{ receipt.box_name }}
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4 receipt_category2">
                            합계
                        </div>
                        <div class="col receipt_total">
                           {{ $numberFormat(receipt.order_info_price)}}
                        </div>
                    </div>
                      <div class="row">
                        <div class="col-4 receipt_category1">
                            제조사명
                        </div>
                        <div class="col receipt_company">
                            WeddingMate
                        </div>
                    </div>
                    <hr class="receipt_hr">
                    <div>
                        <div class="receipt_body1">
                            <p>﹒구매 영수증은 세금계산서 등 세무상 증빙서류로 활용할 수 없으며, 거래내역 및 거래금액을
                                 확인 하는 용도로만 사용 가능합니다. 
                            </p>
                        </div>
                </div>
                <button type="submit" class="receipt_botten" @click="this.$router.go(-1);">
                    돌아가기
                </button>
            </div>
        </div>
    </div>
             

           
         
        <!-- 푸터 -->
        
      </div>
      <MateFooter />
    </div>
    </template>
    
    
<script>
    export default {
    // props: {
    // order_id: {
    //   type: String,
    //   required: true,
    //     },
    // },
    data() {
        return {
        boxItemList : [],
        receipt:{},
        box_id : {},
        
        // order_info_id:{},
        order_info:
        {
        "order_total_price": 0,
        "order_sale_price":0,
        "order_price":0,
        },
        order_code: null
        };
    },
    async created(){
       
        // await this.makeOrder();
    },
    // props: {
    //     order_info_id: {
    //     type: String,
    //     required: true,
    //     }
    // },
    computed:{
    },
    mounted(){
        this.getReceiptList();
        //  this.makeOrder();
    },
    methods: {
        // 헤더
        async getReceiptList(){
            try{
                // URL 파라미터 추가 
                const requestBody = {
                    access_token: this.$getAccessToken(),
                    orderId : this.$route.params.orderId,
                }
                const response = await this.$api(`mypage/payment/receipt`,requestBody,"POST")
                this.receipt = response.receiptList;
                //주문번호 받아오기 
                this.order_code = this.receipt.order_info_name.toUpperCase();
            } catch(error){
                console.log(error);
            }
        },        
    }
}
    </script>
    <style scoped>
     .receipt_container{
        margin-top: 30px;
        /* background-color: #f5f5f5; */
        width: 952px;
        min-height: 896px;
    }
    .receipt_title{
        margin-top: 48px;
        margin-bottom: 10px;
        text-align: center;
        font-size: 30px;
        font: bold;
    }
    .receipt_hr{
        margin-top: 47px;
        margin-left: 27px;
        max-width: 904px;
        height: 2px;
        background-color: #888888;
        border: none;
        width: 1020px;
    }
    .receipt_box{
        background-color: #FFFFFF ;
        margin-top: 0px;
        margin-left: 0px;
        width: 959px;
        min-height: 742px;
        padding: 0px;
    }
    .receipt_category1{
        font-size: 20px;
        margin-top: 40px;
        margin-left: 30px;
        padding-left:20px;
        color: #888888;
    }
    .receipt_category2{
        font-size: 20px;
        margin-left: 27px;
        margin-top: 40px;
        padding-left:20px;
        color: #888888;
    }
    .receipt_number{
        text-align: end;
        margin-top: 44px;
        margin-right: 28px;
        color: #888888;
        font-size: 24px
    }
    .receipt_date{
        text-align: end;
        margin-top: 44px;
        margin-right: 28px;
        width: 155px;
        font-size: 24px;
        color: #888888;
    }
    .receipt_item_name{
        text-align: end;
        margin-top: 40px;
        margin-right: 28px;
        color: #888888;
        font-size: 24px
    }
    .receipt_total{
        text-align: end;
        margin-top: 40px;
        margin-right: 28px;
        color: #888888;
        font-size: 24px
    }
    .receipt_total{
        text-align: end;
        margin-top: 40px;
        margin-right: 28px;
        /* color: #888888; */
        font-size: 24px
    }
    .receipt_total{
        font-weight: bold;
        text-align: end;
        margin-top: px;
        margin-right: 28px;
        color: #FF481E;
        font-size: 24px;
    }
    .receipt_company{
        text-align: end;
        margin-top: 40px;
        margin-right: 28px;
        font-size: 24px;
        color: #FF481E;
    }
    .receipt_body1{
        margin-top: 12px;
        margin-left: 32px;
        width: 850px;
        font-size: 14px;
        /* color: #88888; */
    }
    .receipt_body2{
        margin-top: 2px;
        margin-left: 80px;
        width: 820px;
        font-size: 20px;
        /* color: #888888; */
    }
    .receipt_botten{
        border: none;
        border-radius: 12px;
        margin-top: 70px;
        margin-left: 400px;
        margin-bottom: 23px;
        width: 200px;
        height: 60px;
        background-color: #F6C9CA;
        color: #FFFFFF;
        font-size: 20px;
        font-weight:bold;
    }
    
    </style>
    