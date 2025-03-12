function appendContent() {
    let changeCity = document.querySelector('.change-city');
    
        const cityInput = document.createElement('input');
        cityInput.placeholder = "Enter city name";
        cityInput.id = "city_input";
        cityInput.type = "text";
        changeCity.appendChild(cityInput);
    
   
        const searchBtn = document.createElement('button');
        searchBtn.textContent = "Search";
        searchBtn.id = 'searchBtn';
        changeCity.appendChild(searchBtn);

    let weatherDisplay = document.querySelector('.weather-display');
        const weatherHead = document.createElement('div');
        weatherHead.textContent = "7-Day Forcast";
        weatherHead.className = "weather-head";
        weatherDisplay.appendChild(weatherHead);        
}

export {appendContent}

