import { createRouter, createWebHistory } from 'vue-router'
import ProductDetail from '../views/product/ProductDetail.vue'
import ProductDetailList from '../views/product/ProductDetailList.vue'
import QnAWrite from '../views/QnA/QnAWrite.vue'
import QnAModify from '../views/QnA/QnAModify.vue'
import QnADetail from '../views/QnA/QnADetail.vue'
import QnAList from '../views/QnA/QnAList.vue'
import ReviewList from '../views/review/ReviewList.vue'
import Orderinfo from '../views/order_info/Orderinfo.vue'

import UserLogin from '../views/nouser/UserLogin.vue'
import SignUp from '../views/nouser/SignUp.vue'
import SignUpTerms from '../views/nouser/SignUpTerms.vue'
import MemberList from '../views/admin/MemberList'
import AdminAnswer from '../views/admin/AdminAnswer.vue';
// import AdminItemAdd from '../views/admin/AdminItemAdd.vue'
// import AdminItemEdit from '../views/admin/AdminItemEdit.vue'
import AdminItemList from '../views/admin/AdminItemList.vue'
import AdminQna from '../views/admin/AdminQna.vue'
import AdminReview from '../views/admin/AdminReview.vue'
import AdminAnalysis from '../views/admin/AdminAnalysis.vue'
import MySchedule from '../views/mypage/MySchedule.vue'
import TempVue from '../views/tempVue.vue'

import MyPageMain from '../views/mypage/MyPageMain.vue'
import MyScheduleAdd from '../views/mypage/MyScheduleAdd.vue'
import MyBookMark from '../views/mypage/MyBookmark.vue'
import MyBoxList from '../views/mypage/MyBoxList.vue'
import MyBox from '../views/mypage/MyBox.vue'
import MyQnA from '../views/mypage/MyQnA'
import MyReview from '@/views/mypage/MyReview.vue'
import MyPayment from '@/views/mypage/MyPayment.vue'

import test from '../views/mypage/test.vue'



const routes = [
  {
    path: '/productdetail',
    name: 'productdetail',
    component: ProductDetail
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
    component: QnAWrite
  },
  {
    path: '/qnamodify',
    name: 'qnamodify',
    component: QnAModify
  }
  ,
  {
    path: '/qnadetail',
    name: 'qnadetail',
    component: QnADetail
  },
  {
    path: '/qnAlist',
    name: 'qnAlist',
    component: QnAList
  },
  {
    path: '/userlogin',
    name: 'userlogin',
    component: UserLogin
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
    path: '/reviewlist',
    name: 'reviewlist',
    component: ReviewList
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
  // {
  //   path: '/admin/itemadd',
  //   name: 'adminitemadd',
  //   component: AdminItemAdd
  // },
  // {
  //   path: '/admin/itemedit',
  //   name: 'adminitemedit',
  //   component: AdminItemEdit
  // },
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
    path:'/orderinfo',
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
    path: '/mypage/boxlist/boxname',
    name: "mybox",
    component: MyBox
  },
  {
    path: '/mypage/QnA',
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
    path: '/test',
    name: "test",
    component: test
  },

  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
