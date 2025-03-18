


window.onload = async function () {
  document.getElementById("loading").style.display = "block";
  document.getElementById("content").style.display = "none";

  try {
      // Dynamically import the necessary CSS and JS files
      import('./defaultStyles.css');
      import('./javaStyles.css');

      const { appendContent } = await import('./sevenDays.js');
      const { getUserTime, getLocation, getWeather, displayWeather } = await import('./apiHandler.js');
      const { sevenDaysBoxes, sevenDays, enableDragScroll, enableDragScrollY } = await import('./functionality.js');

      // Get location and user time first
      await Promise.all([getLocation(), getUserTime()]);
      
      // Append content after location and time are fetched
      await appendContent();

      // Ensure sevenDays runs before displayWeather
      await sevenDays();

      // Initialize the rest of the functionality
      await sevenDaysBoxes();
      enableDragScroll();
      enableDragScrollY();

      // Fetch weather data and display it
      await getWeather();
      await displayWeather();  // Display weather after getting weather data

      // Call news article function if necessary
      await newsArticle();

  } catch (error) {
      console.error("Error during initialization:", error);
  }

  // Hide the loading screen and display the content
  document.getElementById("loading").style.display = "none";
  document.getElementById("content").style.display = "flex";
};

function populateNewsList() {
  const newsArticles = [
    {
      title: "Florida TV station hit by tornado during live broadcast",
      url: "https://nypost.com/2025/03/10/us-news/florida-tv-station-hit-by-tornado-in-middle-of-weather-broadcast-about-tornados-live-footage/"
    },
    {
      title: "Orlando TV anchors seek shelter live on air as tornado hits station",
      url: "https://people.com/orlando-tv-anchors-rush-to-seek-shelter-live-on-air-as-tornado-hits-news-station-under-your-desks-11694507"
    }
  ];

  const newsList = document.getElementById('news-list');
  if (newsList) {
    newsArticles.forEach(article => {
      const listItem = document.createElement('li');
      const link = document.createElement('a');
      link.href = article.url;
      link.textContent = article.title;
      link.target = '_blank';
      listItem.appendChild(link);
      newsList.appendChild(listItem);
    });
  }
}

window.addEventListener('load', () => {
  populateNewsList();

  const newsList = document.getElementById('news-list');
  if (newsList) {
      newsList.style.display = 'block';
  }
});