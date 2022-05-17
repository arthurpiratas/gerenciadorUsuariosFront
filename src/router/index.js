import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '../views/RegisterUsers.vue'
import Login from '../views/LoginView.vue'
import Users from '../views/UsersPainel.vue'
import UserNan from '../views/UserNan.vue'
import Edit from '../views/EditView.vue'
import axios from 'axios'


function AdminAuth(to, from, next){
  if(localStorage.getItem('token') != undefined){

    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    }

    axios.post("http://127.0.0.1:8686/validate", {}, req).then(res => {
      console.log(res)
      next()
    }).catch(err => {
      console.log(err)
      next("/usernotaut")
    })

    
  }else{
    next("/login")
  }
}


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: AdminAuth
  },
  {
    path: '/usernotaut',
    name: 'UserNan',
    component: UserNan
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/users',
    name: 'Users',
    component: Users,
    beforeEnter: AdminAuth
  },
  {
    path: '/edit/:id',
    name: 'Edit',
    component: Edit,
    beforeEnter: AdminAuth
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
