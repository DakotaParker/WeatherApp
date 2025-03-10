import { getLocation, getUserTime, getWeather } from "./apiHandler.js";
import { sevenDaysBoxes, sevenDays, enableDragScroll } from "./functionality.js";
import "./defaultStyles.css";
import "./javaStyles.css";



getWeather();
await getLocation();
await getUserTime();
document.addEventListener('DOMContentLoaded', () => {
    sevenDaysBoxes();
});
enableDragScroll();
