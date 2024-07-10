import { createRouter, createWebHistory } from 'vue-router'
import ProductDetail from '../views/product/ProductDetail.vue'
import ProductDetailList from '../views/product/ProductDetailList.vue'
import QnAWrite from '../views/QnA/QnAWrite.vue'
import QnAModify from '../views/QnA/QnAModify.vue'
import QnADetail from '../views/QnA/QnADetail.vue'
import QnAList from '../views/QnA/QnAList.vue'
import ReviewList from '../views/review/ReviewList.vue'
import ReviewModify from '../views/review/ReviewModify.vue'
import ReviewWrite from '../views/review/ReviewWrite.vue'
import ReviewDetail from '../views/review/ReviewDetail.vue'
import Orderinfo from '../views/order_info/Orderinfo.vue'
import UserLogin from '../views/nouser/UserLogin.vue'
import SignUp from '../views/nouser/SignUp.vue'
import SignUpTerms from '../views/nouser/SignUpTerms.vue'
import MemberList from '../views/admin/MemberList'
import AdminAnswer from '../views/admin/AdminAnswer.vue'
import AdminItemAdd from '../views/admin/AdminItemAdd.vue'
import AdminItemEdit from '../views/admin/AdminItemEdit.vue'
import AdminItemList from '../views/admin/AdminItemList.vue'
import AdminQna from '../views/admin/AdminQna.vue'
import AdminReview from '../views/admin/AdminReview.vue'
import AdminAnalysis from '../views/admin/AdminAnalysis.vue'
import MySchedule from '../views/mypage/MySchedule.vue'
import TempVue from '../views/tempVue.vue'
import EmailCheck from '../views/nouser/EmailCheck.vue'

import MyPageMain from '../views/mypage/MyPageMain.vue'
import MyScheduleAdd from '../views/mypage/MyScheduleAdd.vue'
import MyBookMark from '../views/mypage/MyBookmark.vue'
import MyBoxList from '../views/mypage/MyBoxList.vue'
import MyBox from '../views/mypage/MyBox.vue'
import MyQnA from '../views/mypage/MyQnA'
import MyReview from '@/views/mypage/MyReview.vue'
import MyPayment from '@/views/mypage/MyPayment.vue'
import MyReceipt from '../views/mypage/MyReceipt.vue'
import MainPage from '../views/main/MainPage.vue'
import test from '../views/mypage/test.vue'
import OrderEnd from '../views/order_info/OrderEnd.vue'
import MyPageEdit from '../views/nouser/MyPageEdit.vue'

const routes = [
  {
    path: '/productdetail',
    name: 'productdetail',
    component: ProductDetail,
    props: route => ({ item_id: route.query.item_id })
  },
  {
    path: '/productdetaillist',
    name: 'productdetaillist',
    component: ProductDetailList,
    props: route => ({ itemType: route.query.itemType })
  },
  {
    path: '/qnawrite',
    name: 'qnawrite',
    component: QnAWrite,
    props: route => ({ item_id: route.query.item_id })
  },
  {
    path: '/qnamodify',
    name: 'qnamodify',
    component: QnAModify,
    props: route => ({ qna_id: route.query.qna_id })
  },
  {
    path: '/qnadetail',
    name: 'qnadetail',
    component: QnADetail,
    props: route => ({ qna_id: route.query.qna_id }),
    
  },

  {
    path: '/qnAlist',
    name: 'qnAlist',
    component: QnAList,
    props: route => ({ item_id: route.query.item_id })
  },
  {
    path: '/userlogin',
    name: 'userlogin',
    component: UserLogin,
    meta: {
      savedUrl: null,
    }
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignUp
  },
  {
    path: '/terms',
    name: 'terms',
    component: SignUpTerms
  },
  {
    path: '/emailcheck',
    name: 'emailcheck',
    component: EmailCheck
  },
  {
    path: '/reviewlist',
    name: 'reviewlist',
    component: ReviewList,
    props: route => ({ item_id: route.query.item_id })
  },
  {
    path: '/reviewmodify',
    name: 'reviewmodify',
    component: ReviewModify,
    props: route => ({ review_id: route.query.review_id })
  },
  {
    path: '/reviewwrite',
    name: 'reviewwrite',
    component: ReviewWrite,
    props: route => ({ item_id: route.query.item_id })
  },
  {
    path: '/reviewdetail',
    name: 'reviewdetail',
    component: ReviewDetail,
    props: route => ({ review_id: route.query.review_id })
  },
  {
    path: '/admin/memberlist',
    name: 'memberlist',
    component: MemberList
  },
  {
    path: '/admin/itemlist',
    name: 'adminitemlist',
    component: AdminItemList
  },
  {
    path: '/admin/answer/:qnaid',
    name: 'adminanswer',
    component: AdminAnswer
  },
  {
    path: '/admin/itemadd',
    name: 'adminitemadd',
    component: AdminItemAdd
  },
  {
    path: '/admin/itemedit/:itemId',
    name: 'adminitemedit',
    component: AdminItemEdit
  },
  {
    path: '/admin/qna',
    name: 'adminqna',
    component: AdminQna
  },
  {
    path: '/admin/review',
    name: 'adminreview',
    component: AdminReview
  },
  {
    path: '/admin/analysis',
    name: "adminanalysis",
    component: AdminAnalysis
  },
  {
    path: '/tempvue',
    name: "tempvue",
    component: TempVue
  },
  {
    path:'/orderinfo/:boxId',
    name:"Orderinfo",
    component: Orderinfo
  },
  {
    path: '/mypage',
    name: "mypagemain",
    component: MyPageMain
  },
  {
    path: '/mypage/schedule',
    name: "myschedule",
    component: MySchedule
  },
  {
    path: '/scheduleadd',
    name: "myscheduleadd",
    component: MyScheduleAdd
  },
  {
    path: '/mypage/bookmark',
    name: "mybookmark",
    component: MyBookMark
  },
  {
    path: '/mypage/boxlist',
    name: "myboxlist",
    component: MyBoxList
  },
  {
    path: '/mypage/boxlist/:boxId',
    name: "mybox",
    component: MyBox,
    props: true
    // props: route => ({ box_id: route.query.box_id })
  },
  {
    path: '/mypage/qna',
    name: "myqna",
    component: MyQnA
  },
  {
    path: '/mypage/review',
    name: "myreview",
    component: MyReview
  },
  {
    path: '/mypage/payment',
    name: "mypayment",
    component: MyPayment
  },
  {
    path: '/mypage/payment/receipt',
    name: "myreceipt",
    component: MyReceipt,
    // props: route => ({ orderinfo_id: route.query.orderinfo_id })
  },
  {
    path: '/test',
    name: "test",
    component: test
  },
  {
    path: '/',
    name: 'mainPage',
    component: MainPage,
  },
  {
    path: '/orderend',
    name: 'orderend',
    component: OrderEnd,
  },
  {
    path: '/mypage/edit',
    name: 'MyPageEdit',
    component: MyPageEdit
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
