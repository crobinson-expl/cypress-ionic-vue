import { createApp } from 'vue'
import { IonicVue } from "@ionic/vue"
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './assets/main.css'

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(window.navigator.userAgent)

const app = createApp(App)

app.use(IonicVue, {
    animated: isMobile,
    platform: {
        desktop: () => !isMobile,
    },
})

app.use(createPinia())
app.use(router)

router.isReady().then(() => {
    app.mount('#app')
})
