// './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
//Pediatria
import Grafica1 from './components/Pediatria/Grafica1.vue'
import Grafica2 from './components/Pediatria/Grafica2.vue'


const app = createApp(App)

app.use(router)

// Pediatria
app.component('Grafica1', Grafica1);
app.component('Grafica2', Grafica2);


app.mount('#app')
