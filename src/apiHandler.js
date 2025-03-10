// Purpose: Fetch weather data from the Visual Crossing Weather API
async function getWeather(location) {
    const apiKey = "SN975D2VLAZYMHV4XU3NR5LZB";
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${apiKey}&contentType=json`;
try {
    const response = await fetch(url);

    if(!response.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await response.json();
        console.log("Fetched data:", data);
    } catch(error) {
    console.error("Error with fetching weather data:", error);
    }
}

// Funtion that loads the current weather data for the location the user is in and displays it on the page

async function getLocation() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                document.getElementById("location").textContent = `Latitude: ${lat}, Longitude: ${lon}`;
                await getWeather(`${lat},${lon}`);

                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
                const data = await response.json();

                const city = data.address.city || data.address.town || data.address.village || "Unknown city";
                const zipcode = data.address.postcode || "Unknown ZIP code";

                document.getElementById("city").textContent = `${city}`;
                document.getElementById("zipcode").textContent = `${zipcode}`;
            } catch (error) {
                console.error("Error retrieving location data:", error);
                document.getElementById("location").textContent = "Unable to retrieve location.";
            }       // Need to add a way to change location based on user input
        }, 
        (error) => {
            console.error("Geolocation error:", error);
            document.getElementById("location").textContent = "Location access denied.";
        });
    } else {
        document.getElementById("location").textContent = "Geolocation not supported.";
    }
}

// This function is for displaying user time and date based on location but can be changed based on the location a user inputs

async function getUserTime(timeZoneOverride = null) {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            try {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;

                let timeZone = timeZoneOverride;  

                if (!timeZone) {
                    const response = await fetch(`https://worldtimeapi.org/api/ip`);
                    if (!response.ok) throw new Error("Failed to fetch time zone.");
                    const data = await response.json();
                    timeZone = data.timezone || "UTC";  
                }

                function updateTime() {
                    try {
                        const now = new Date();
                        const localTime = now.toLocaleTimeString("en-US", {
                            timeZone: timeZone,
                            hour: '2-digit',
                            minute: '2-digit',
                            hour12: true
                        });
                        const localDate = now.toLocaleDateString("en-US", { timeZone: timeZone });

                        document.getElementById("time").textContent = `${localTime}`;
                        document.getElementById("date").textContent = `${localDate}`;
                    } catch (error) {
                        console.error("Error updating time:", error);
                        document.getElementById("time").textContent = "Error updating time.";
                        document.getElementById("date").textContent = "Error updating date.";
                    }
                }

                updateTime();
                setInterval(updateTime, 1000);

            } catch (error) {
                console.error("Error fetching time and date:", error);
                document.getElementById("time").textContent = "Unable to retrieve time.";
                document.getElementById("date").textContent = "Unable to retrieve date.";
            }
        }, (error) => {
            console.error("Geolocation error:", error);
            document.getElementById("time").textContent = "Location access denied.";
            document.getElementById("date").textContent = "Location access denied.";
        }, { timeout: 10000 }); // Timeout for geolocation
    } else {
        document.getElementById("time").textContent = "Geolocation not supported.";
        document.getElementById("date").textContent = "Geolocation not supported.";
    }
}





export {getUserTime, getLocation, getWeather};

