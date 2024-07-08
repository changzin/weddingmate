<template>
    <div>
    <MateHeader />
      <div class="fix-width">
        <!-- 헤더 -->
        
        <!-- 본문 -->
        <div class="container receipt_container">
            <div class="row justify-content-center">
                <div class="receipt_title">
                    구매 영수증
                </div>
                <div class="receipt_box">
                    <div class="row">
                        <div class="col receipt_category1">
                            주문번호
                        </div>
                        <div class="col receipt_number">
                            111111111111111111111111111111123456
                        </div>
                    </div>
                    <div class="row">
                        <div class="col receipt_category1">
                            거래일시
                        </div>
                        <div class="col receipt_date">
                            
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4 receipt_category2">
                            상품명
                        </div>
                        <div class="col receipt_item_name">
                            에센셜 스페셜 제너럴리스트 퓨티풀 울트라 드레스, XXL, 1개
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-4 receipt_category2">
                            합계
                        </div>
                        <div class="col receipt_total">
                            530,000원
                        </div>
                    </div>
                      <div class="row">
                        <div class="col-4 receipt_category1">
                            회사명
                        </div>
                        <div class="col receipt_company">
                            WeddingMate
                        </div>
                    </div>
                    <hr class="receipt_hr">
                    <div>
                        <div class="receipt_body1">
                            ﹒구매 영수증은 세금계산서 등 세무상 증빙서류로 활용할 수 없으며, 거래내역 및 거래금액을
                        </div>
                        <div class="receipt_body2">
                            확인 하는 용도로만 사용 가능합니다. 
                        </div>
                </div>
                <button class="receipt_botten">
                    닫기
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
        receipt:{},
        box_id : {},
        order_info_id:{},
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
     
    },
    methods: {
        // 헤더
        async getReceiptList(){
            try{
                // URL 파라미터 추가 
                await this.$router.push({path:'/mypage/payment/receipt',query:{box_id : this.box_id,order_info_id : this.order_info_id} })
                const responseBody = {
                   access_token:"2c595eca-d4e3-4085-a6c7-331333eb22f0",
                   box_id : this.box_id,
                   order_info_id : this.order_info_id
                }
                const response = await this.$api(`/mypage/payment/recepit?box_id=${this.box_id}`,responseBody,"POST")
                console.log(response);
                this.receipt = response.receipt;
                console.log(this.receipt)
            }catch(error){
                console.log(error);
                }

            },
        makeOrderInfo(){
        for(let i = 0; i < this.receipt.length; i++){
          this.order_info.order_total_price += this.receipt[i].box_item_total_price;
        }

        for(let i = 0; i < this.receipt.length; i++){
          this.order_info.order_sale_price += Math.ceil((this.receipt[i].box_item_total_price * (this.receipt[i].item_discount_rate/100)));
          console.log(this.receipt[i].box_item_total_price , this.receipt[i].item_discount_rate);
        }
        this.order_info.order_price = this.order_info.order_total_price - this.order_info.order_sale_price;
      },
        }
    }
    </script>
    <style scoped>
     .receipt_container{
        background-color: #f5f5f5;
        width: 992px;
        min-height: 896px;
    }
    .receipt_title{
        margin-top: 48px;
        margin-bottom: 47px;
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
        margin-left: 17px;
        width: 959px;
        min-height: 742px;
    }
    .receipt_category1{
        font-size: 24px;
        margin-top: 44px;
        margin-left: 27px;
        color: #888888;
    }
    .receipt_category2{
        font-size: 24px;
        margin-left: 27px;
        margin-top: 61px;
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
        margin-top: 61px;
        margin-right: 28px;
        color: #888888;
        font-size: 24px
    }
    .receipt_total{
        text-align: end;
        margin-top: 61px;
        margin-right: 28px;
        color: #888888;
        font-size: 24px
    }
    .receipt_total{
        text-align: end;
        margin-top: 61px;
        margin-right: 28px;
        color: #888888;
        font-size: 24px
    }
    .receipt_total{
        font-weight: bold;
        text-align: end;
        margin-top: 61px;
        margin-right: 28px;
        color: #FF481E;
        font-size: 24px;
    }
    .receipt_company{
        text-align: end;
        margin-top: 44px;
        margin-right: 28px;
        font-size: 24px;
        color: #FF481E;
    }
    .receipt_body1{
        margin-top: 32px;
        margin-left: 62px;
        width: 820px;
        font-size: 20px;
        color: #888888;
    }
    .receipt_body2{
        margin-top: 2px;
        margin-left: 80px;
        width: 820px;
        font-size: 20px;
        color: #888888;
    }
    .receipt_botten{
        border: none;
        border-radius: 12px;
        margin-top: 70px;
        margin-left: 27px;
        margin-bottom: 23px;
        width: 904px;
        height: 97px;
        background-color: #F6C9CA;
        color: #FFFFFF;
        font-size: 30px;
        font-weight:bold;
    }
    
    </style>
    