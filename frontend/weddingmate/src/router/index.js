import { createRouter, createWebHistory } from 'vue-router'
import ProductDetail from '../views/ProductDetail.vue'
import QnAWrite from '../views/QnA/QnAWrite.vue'
import QnAModify from '../views/QnA/QnAModify.vue'
import QnADetail from '../views/QnA/QnADetail.vue'
import QnAList from '../views/QnA/QnAList.vue'

import UserLogin from '../views/nouser/UserLogin.vue'
import MemberList from '../views/admin/MemberList'

const routes = [
  {
    path: '/productdetail',
    name: 'productdetail',
    component: ProductDetail
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
    path: '/admin/memberlist',
    name: 'memberlist',
    component: MemberList
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
