

async function sevenDays() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    const todayIndex = today.getDay();
    const sevenDays = [];
    for (let i = 0; i < 7; i++) {
        sevenDays.push(days[(todayIndex + i) % 7]);
    }
    console.log("Next 7 days", sevenDays);
    return sevenDays;
}

function sevenDaysBoxes() {
    let weatherDisplay = document.querySelector(".weather-display");
    
    for(let i = 0; i < 7; i++){ 
        const dayDiv = document.createElement("div");
        dayDiv.classList.add("day");
        weatherDisplay.appendChild(dayDiv);
    }
}