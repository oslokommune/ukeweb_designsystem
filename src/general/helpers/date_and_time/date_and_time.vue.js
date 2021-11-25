import Vue from "vue";
import { OsgDateTime } from "./date_and_time.js";

Vue.filter("OsgFormatDate", (date, text = false, iso = "no") => {
  return OsgDateTime.formatDate(date, text, iso);
});

Vue.filter("OsgFormatTime", (date) => {
  return OsgDateTime.formatTime(date);
});

Vue.filter("OsgFormatDateTime", (date, text = false, iso = "no") => {
  return OsgDateTime.formatDateTime(date, text, iso);
});
