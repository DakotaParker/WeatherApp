import { sevenDays } from "./functionality.js";
// Funtion that loads the current weather data for the location the user is in and displays it on the page

async function getLocation() {
    if ("geolocation" in navigator) {
        return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            try {

                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                
                document.getElementById("location").textContent = `Latitude: ${lat}, Longitude: ${lon}`;

                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
                const data = await response.json();

                const city = data.address.city || data.address.town || data.address.village || "Unknown city";
                const zipcode = data.address.postcode || "Unknown ZIP code";

                document.getElementById("city").textContent = `${city}`;
                document.getElementById("zipcode").textContent = `${zipcode}`;
                
                await getWeather(`${lat},${lon}`);
                resolve();
            } catch (error) {
                console.error("Error retrieving location data:", error);
                document.getElementById("location").textContent = "Unable to retrieve location.";
                reject(error);
            }       // Need to add a way to change location based on user input
        }, 
        (error) => {
            console.error("Geolocation error:", error);
            document.getElementById("location").textContent = "Location access denied.";
            reject(error);
        });

        });
    } else {
        document.getElementById("location").textContent = "Geolocation not supported.";
    }
}

// This function is for displaying user time and date based on location but can be changed based on the location a user inputs

async function getUserTime(timeZoneOverride = null) {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                try {
                    let timeZone = timeZoneOverride;  
                    if (!timeZone) {
                        try {
                            
                            const response = await fetch(`https://worldtimeapi.org/api/ip`);
                            if (!response.ok) throw new Error("Failed to fetch time zone.");
                            const data = await response.json();
                            timeZone = data.timezone || "UTC";
                        } catch (error) {
                            console.error("Error fetching time zone:", error);
                            timeZone = "UTC"; 
                        }
                    }
                    const now = new Date();
                    
                    document.getElementById("time").textContent = now.toLocaleTimeString("en-US", { timeZone });
                    document.getElementById("date").textContent = now.toLocaleDateString("en-US", { timeZone });
                    resolve();
                } catch (error) {
                    console.error("Error updating time:", error);
                    reject(error);
                }
            }, (error) => {
                console.error("Geolocation error in time function:", error);
                
                const now = new Date();
                document.getElementById("time").textContent = now.toLocaleTimeString("en-US", { timeZone: "UTC" });
                document.getElementById("date").textContent = now.toLocaleDateString("en-US", { timeZone: "UTC" });
                resolve();
            });
        } else {
            
            const now = new Date();
            document.getElementById("time").textContent = now.toLocaleTimeString("en-US", { timeZone: "UTC" });
            document.getElementById("date").textContent = now.toLocaleDateString("en-US", { timeZone: "UTC" });
            resolve();
        }
    });
}
// Purpose: Fetch weather data from the Visual Crossing Weather API
async function getWeather(location) {
    const apiKey = "SN975D2VLAZYMHV4XU3NR5LZB";
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${apiKey}&contentType=json`;
    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            console.log("Weather data:", data);
            
            return data;
        } catch (error) {
            console.error(`Attempt ${retries} failed:`, error);
            retries++;
            if (retries >= maxRetries) {
                console.error('Failed to fetch weather data');
                throw error;
            
            }
        }                
    }
}
    async function displayWeather() {
        console.log("Received data:");
        const forecast = await sevenDays(); // Assuming `sevenDays` is a function returning forecast data
        const weatherContainer = document.getElementById("weatherContainer");
        // Clear any existing content

    // Check if forecast is defined and is an array
    if (Array.isArray(forecast) && forecast.length > 0) {
        forecast.slice(0, 7).forEach((day, index) => {
            const date = new Date(day.datetime).toDateString();
            const temp = day.temp;
            const description = day.conditions;
            const icon = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/icons/${day.icon}.png`;

            const weatherCard = document.createElement('div');
            weatherCard.classList.add('weather-card');
            weatherCard.innerHTML = `
                <div><strong>Day ${index + 1} (${date})</strong></div>
                <p>Temp: ${temp}°F</p>
                <p>Description: ${description}</p>
                <img src="${icon}" alt="${description}" />
            `;

            weatherContainer.appendChild(weatherCard);
        });
    } else {
        console.error("Forecast data is unavailable or not in the expected format.");
        weatherContainer.innerHTML = '<p>Weather data is unavailable at this time.</p>';
    }
}






export { getUserTime, getLocation, getWeather, displayWeather };
