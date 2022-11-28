import { createApp } from "vue";
import App from "./App.vue";
import installElementPlus from "@/libs/element";

/* eslint-disable */
kintone.events.on("portal.show", (event) => {
  const myContainer = kintone.portal.getContentSpaceElement();
  const app = createApp(App);
  installElementPlus(app);
  app.mount(myContainer);
  return event;
});
/* eslint-enable */
