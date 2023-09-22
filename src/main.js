import './assets/sass/custom.scss'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import moment from 'moment'
import Paginate from "vuejs-paginate-next"
import store from './store/index'

const app = createApp(App)

app.use(store)
app.use(router)

app.use(Paginate)

app.config.globalProperties.$filters = {
  dateFormat(date) {
    return moment(date).format('YYYY/MM/DD');
  },
  }

library.add(fas, far, fab);
app.component('font-awesome-icon', FontAwesomeIcon)

app.mount('#app')
