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
            weatherDisplay.insertBefore(weatherHead, weatherDisplay.firstChild);

        let weatherNews = document.querySelector('#weather-news');
            const liveWeatherNews = document.createElement('h2');
            liveWeatherNews.textContent = 'Live Weather Today!'
            const listOfLinks = document.createElement('ul');
            listOfLinks.id = 'news-list';
            weatherNews.appendChild(liveWeatherNews);
            weatherNews.appendChild(listOfLinks);
        

}

export {appendContent}

