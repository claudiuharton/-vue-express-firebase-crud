import Vue from 'vue'
import Router from 'vue-router'
import Movies from '@/components/Movies'
import Login from '@/components/Login'
import Register from '@/components/Register'
import MoviePage from '../components/MoviePage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      redirect: {
        name: 'Login'
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/',
      name: 'Movies',
      component: Movies
    },
    {
      path: '/movie/:id',
      name: 'MoviePage',
      component: MoviePage
    }
  ]
})
