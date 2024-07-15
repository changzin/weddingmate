<template>
    <div>
      <div>
        <div class="container receipt_container">
            <div class="row justify-content-center">
                <div class="font-title">
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
                            <p>﹒구매 영수증은 세금계산서 등 세무상 증빙서류로 활용할 수 없으며,거래내역 및 거래금액을
                                  확인 하는 용도로만 &nbsp; &nbsp; 사용 가능합니다. 
                            </p>
                        </div>
                </div>
                <button type="submit" class="receipt_botten" @click="closeReceipt();">
                    닫기
                </button>
                </div>
            </div>
        </div>        
      </div>
    </div>
</template>
    
    
<script>
    export default {
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
    computed:{
    },
    mounted(){
        this.getReceiptList();
        //  this.makeOrder();
    },
    methods: {
      
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
        async closeReceipt(){
            try{
                window.close()
            }catch(err){
                console.log(err);
            }
        }
    }
}
    </script>
    <style scoped>
    @import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css); 
    div{
    font-family: 'Noto Sans KR', sans-serif;
        font-size: 16px;
        color:#555555;
    }
    /* font */
    .font-title{
    margin-top: 48px;
    display: grid;
    place-items: center;
    color: #333333;
    font-size: 24px;
    font-weight: bold;
    }
    .font-bar{
    color:#888888;
}
     .receipt_container{
        /* margin-top: 30px; */
        /* background-color: #f5f5f5; */
        width: 888px;
        max-height: 650;
    }
    .receipt_hr{
        margin-top: 47px;
        margin-left: 10px;
        max-width: 720px;
        height: 2px;
        background-color: #888888;
        border: none;
        width: 1020px;
    }
    .receipt_box{
        background-color: #FFFFFF ;
        margin-top: 0px;
        margin-left: 0px;
        width: 800px;
        max-height: 742px;
        padding: 0px;
    }
    .receipt_category1{
        font-size: 16px;
        margin-top: 30px;
        margin-left: 30px;
        padding-left:16px;
        color: #888888;
    }
    .receipt_category2{
        font-size: 16px;
        margin-left: 27px;
        margin-top: 30px;
        padding-left:16px;
        color: #888888;
    }
    .receipt_number{
        text-align: end;
        margin-top: 30px;
        margin-right: 28px;
        color: #888888;
        font-size: 16px
    }
    .receipt_date{
        text-align: end;
        margin-top: 30px;
        margin-right: 28px;
        width: 155px;
        font-size: 16px;
        color: #888888;
    }
    .receipt_item_name{
        text-align: end;
        margin-top: 30px;
        margin-right: 28px;
        color: #888888;
        font-size: 16px
    }
    .receipt_total{
        text-align: end;
        margin-top: 30px;
        margin-right: 28px;
        color: #888888;
        font-size: 16px
    }
    .receipt_total{
        font-weight: bold;
        text-align: end;
        margin-top: px;
        margin-right: 28px;
        color: #FF481E;
        font-size: 16px;
    }
    .receipt_company{
        text-align: end;
        margin-top: 40px;
        margin-right: 28px;
        font-size: 16px;
        color: #FF481E;
    }
    .receipt_body1{
        margin-top: 12px;
        margin-left: 32px;
        width: 650px;
        font-size: 14px;
        /* color: #88888; */
    }
    .receipt_body2{
        margin-top: 2px;
        margin-left: 80px;
        width: 820px;
        font-size: 16px;
        /* color: #888888; */
    }
    .receipt_botten{
        border: none;
        border-radius: 12px;
        margin-top: 50px;
        margin-left: 300px;
        margin-bottom: 23px;
        width: 120px;
        height: 40px;
        background-color: #F6C9CA;
        color: #FFFFFF;
        font-size: 20px;
        font-weight:bold;
    }
    
    </style>
    