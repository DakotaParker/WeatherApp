

window.onload = async function () {
    document.getElementById("loading").style.display = "block";
    document.getElementById("content").style.display = "none";

    try {
        import('./defaultStyles.css');
        import('./javaStyles.css');
        
        const { appendContent } = await import('./sevenDays.js');
        const { getUserTime, getLocation, getWeather } = await import('./apiHandler.js');
        const { sevenDaysBoxes, sevenDays, enableDragScroll, enableDragScrollY } = await import('./functionality.js');

        await Promise.all([getLocation(), getUserTime()]);
        appendContent();
        sevenDays(); // you may not need to await for this if it's a UI update
        sevenDaysBoxes(); // you may not need to await for this if it's a UI update
        enableDragScroll();
        enableDragScrollY();
        await getWeather();
    } catch (error) {
        console.error("Error during initialization:", error);
    }

    // Hide loading screen and show content
    document.getElementById("loading").style.display = "none";
    document.getElementById("content").style.display = "flex";
};


