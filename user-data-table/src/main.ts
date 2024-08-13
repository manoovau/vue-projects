import { createApp } from "vue";
import "./style.scss";
import App from "./App.vue";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";

library.add(fas, far);

const app = createApp(App);

// Register a global custom directive called `v-focus`
// For accessibility purposes, move focus to first input element in form (modals).
app.directive("focus", {
  // When the bound element (modal) is mounted into the DOM
  mounted(el) {
    // Focus on the selected element
    el.focus();
  },
});

app.component("font-awesome-icon", FontAwesomeIcon).mount("#app");
