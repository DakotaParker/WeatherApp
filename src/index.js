import { getLocation, getUserTime, getWeather } from "./apiHandler.js";
import { sevenDaysBoxes, sevenDays, enableDragScroll, enableDragScrollY } from "./functionality.js";
import "./defaultStyles.css";
import "./javaStyles.css";

window.onload = async function () {
    
    document.getElementById("loading").style.display = "block";
    document.getElementById("content").style.display = "none";

    try {
    
        await Promise.all([getLocation(), getUserTime()]);
        await sevenDays();
        await sevenDaysBoxes();
        enableDragScroll();
        enableDragScrollY();
        await getWeather();
    } catch (error) {
        console.error("Error during initialization:", error);
    }

    
    document.getElementById("loading").style.display = "none";
    document.getElementById("content").style.display = "block";
};

