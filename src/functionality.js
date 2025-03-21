

async function sevenDays() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const today = new Date();
    if (isNaN(today.getTime())) {
        throw new Error("Invalid Date object");
    }
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
    weatherDisplay.innerHTML = ''; // Clear previous days before appending new ones

    const daysArray = await sevenDays();

    return new Promise((resolve) => { 
        daysArray.forEach((day) => {
            const dayDiv = document.createElement("div");
            dayDiv.textContent = day;
            dayDiv.classList.add("day");
            weatherDisplay.appendChild(dayDiv);

            const innerDiv = document.createElement("div");
            innerDiv.textContent = `Details for ${day}`;
            innerDiv.classList.add("innerDay");
            dayDiv.appendChild(innerDiv);
        });

        resolve(); 
    });
}

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

// Day of the week scrollable boxes y-axis
let enableDragScrollY = () => {
    const container = document.querySelector(".innerDay");
    let isDown = false;
    let startY;
    let scrollTop;

    const mouseDownHandler = (e) => {
        isDown = true;
        container.classList.add("active");
        startY = e.pageY - container.offsetTop;
        scrollTop = container.scrollTop;
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
        const y = e.pageY - container.offsetTop;
        const walk = (y - startY) * 3; 
        container.scrollTop = scrollTop - walk;
    };

    container.addEventListener("mousedown", mouseDownHandler);
    container.addEventListener("mouseleave", mouseLeaveHandler);
    container.addEventListener("mouseup", mouseUpHandler);
    container.addEventListener("mousemove", mouseMoveHandler);
}
// end of page articles
 
     



export { sevenDaysBoxes, sevenDays, enableDragScroll, enableDragScrollY};
