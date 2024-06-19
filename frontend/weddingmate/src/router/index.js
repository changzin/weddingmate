import { createRouter, createWebHistory } from 'vue-router'
<<<<<<< HEAD
import HomeView from '../views/HomeView.vue'
import ProductDetail from '../views/product/ProductDetail.vue'
import ProductDetailList from '../views/product/ProductDetailList.vue'
=======
import ProductDetail from '../views/ProductDetail.vue'
>>>>>>> b18b6fa539dd36f2fb9f355f935f2c6af52388e2
import QnAWrite from '../views/QnA/QnAWrite.vue'
import QnAModify from '../views/QnA/QnAModify.vue'
import QnADetail from '../views/QnA/QnADetail.vue'
import QnAList from '../views/QnA/QnAList.vue'
import ReviewList from '../views/review/ReviewList.vue'

import UserLogin from '../views/nouser/UserLogin.vue'
import MemberList from '../views/admin/MemberList'

const routes = [
  {
    path: '/productdetail',
    name: 'productdetail',
    component: ProductDetail
  },
  {
    path: '/productdetaillist',
    name: 'productdetaillist',
    component: ProductDetailList
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
<<<<<<< HEAD
    path: '/reviewlist',
    name: 'reviewlist',
    component: ReviewList
  },
=======
    path: '/admin/memberlist',
    name: 'memberlist',
    component: MemberList
  }
>>>>>>> b18b6fa539dd36f2fb9f355f935f2c6af52388e2
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
