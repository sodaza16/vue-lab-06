import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/add-news-feed',
      name: 'add-news-feed',
      component: () => import('./views/AddNewsFeed.vue')
    },
    {
      path: '/news-feed',
      name: 'news-feed',
      component: () => import('./views/NewsFeed.vue')
    }
  ]
})
