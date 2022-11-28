import { createApp } from "vue";
import App from "./App.vue";

kintone.events.on("portal.show", (event) => {
  const myContainer = kintone.portal.getContentSpaceElement();
  const app = createApp(App);
  app.mount(myContainer);
  return event;
});
