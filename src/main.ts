import { initializeApplication } from "@/initialization/initializeApp";
import App from "@/presentation/App.vue";
import { createApp } from "vue";

// Styles
import "@assets/styles/main.scss";
import "primeicons/primeicons.css";

// Create and initialize application
const app = createApp(App);
initializeApplication(app);
app.mount("#app");
