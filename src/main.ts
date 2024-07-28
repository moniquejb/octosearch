import '@/assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faMessage, faCircleDot, faCircleCheck } from '@fortawesome/free-regular-svg-icons'
import { faComment, faSearch, faStar, faChevronDown, faChevronLeft, faChevronRight, faCodeFork, faEye, faLink } from '@fortawesome/free-solid-svg-icons'
const solidIcons = [faComment, faSearch, faStar, faChevronDown, faChevronLeft, faChevronRight, faCodeFork, faEye, faLink]
const regularIcons = [faMessage, faCircleDot, faCircleCheck]

/* add icons to the library */
library.add(...solidIcons, ...regularIcons)

const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)
app.use(createPinia())
app.use(router)

app.mount('#app')
