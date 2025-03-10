

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

async function sevenDaysBoxes() {
    let weatherDisplay = document.querySelector(".sevenDays");
    const daysArray = await sevenDays();
    
    daysArray.forEach((day) => {
    const dayDiv = document.createElement("div");
    dayDiv.textContent = day;
    dayDiv.classList.add("day");
    weatherDisplay.appendChild(dayDiv);
    });
}
//sevenDays scrollable boxes
let enableDragScroll = () => {
    const container = document.querySelector(".sevenDays");
    let isDown = false;
    let startX;
    let scrollLeft;

    const mouseDownHandler = (e) => {
        isDown = true;
        container.classList.add("active");
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    };

    const mouseLeaveHandler = () => {
        isDown = false;
        container.classList.remove("active");
    };

    const mouseUpHandler = () => {
        isDown = false;
        container.classList.remove("active");
    };

    const mouseMoveHandler = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 3; 
        container.scrollLeft = scrollLeft - walk;
    };

    container.addEventListener("mousedown", mouseDownHandler);
    container.addEventListener("mouseleave", mouseLeaveHandler);
    container.addEventListener("mouseup", mouseUpHandler);
    container.addEventListener("mousemove", mouseMoveHandler);
}

export { sevenDaysBoxes, sevenDays, enableDragScroll };