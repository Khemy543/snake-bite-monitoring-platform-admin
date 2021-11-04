import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import './css/main.css'
import API from './directives/axios'
import VueCookies from 'vue3-cookies'

/* Fetch sample data */
/* store.dispatch('fetch', 'clients')
store.dispatch('fetch', 'history') */

/* Dark mode */
// store.dispatch('darkMode')

/* Collapse mobile aside menu on route change */
router.beforeEach(to => {
  store.dispatch('asideMobileToggle', false)
  store.dispatch('asideLgToggle', false)
})

/* Default title tag */
const defaultDocumentTitle = 'Admin One Vue 3 Tailwind'

router.afterEach(to => {
  /* Set document title from route meta */
  if (to.meta && to.meta.title) {
    document.title = `${to.meta.title} — ${defaultDocumentTitle}`
  } else {
    document.title = defaultDocumentTitle
  }

  /* Full screen mode */
  store.dispatch('fullScreenToggle', !!to.meta.fullScreen)
})
const app = createApp(App)
app.use(store)
app.use(router)
app.use(VueCookies)
app.config.globalProperties.$axios = API
app.mount('#app')
// createApp(App).use(store).use(router).mount('#app')
