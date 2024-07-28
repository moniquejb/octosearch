import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RepositoryView from '@/views/RepositoryView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      const navBar = document.querySelector('#nav') as HTMLElement
      return { el: to.hash, top: navBar?.offsetHeight || 0, behavior: 'smooth' }
    }

    if (from && Object.keys(to.query).length) {
      if (to.fullPath.split('?')[0] == from.fullPath.split('?')[0]) return
    }

    return { top: 0, behavior: 'smooth' }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/repository/:owner/:repo',
      name: 'repository',
      component: RepositoryView,
      props: true,
    },
  ],
})

export default router
