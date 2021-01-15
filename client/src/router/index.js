import { createWebHistory, createRouter } from "vue-router";
import Movies from '@/components/Movies'
import Login from '@/components/Login'
import Register from '@/components/Register'
import MoviePage from '@/components/MoviePage'

const routes = [
    
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
    } ];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;