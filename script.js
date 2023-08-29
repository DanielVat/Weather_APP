document.addEventListener("DOMContentLoaded", () => {
    const apiKey = "59bcc1670bb963b05b8f09692979fd8a";
    const apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=";
  
    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");
  
    async function checkWeather(city) {
      const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
      if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display =  "none";
      } else {
        var data = await response.json();
  
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp - 273.15) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
  
        if (data.weather[0].main == "Clouds") {
          weatherIcon.src = "images/clouds.png";
        } else if (data.weather[0].main == "Rain") {
          weatherIcon.src = "images/rain.png";
        } else if (data.weather[0].main == "Drizzle") {
          weatherIcon.src = "images/drizzle.png";
        } else if (data.weather[0].main == "Mist") {
          weatherIcon.src = "images/mist.png";
        }
  
        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
      }
    }
  
    searchBtn.addEventListener("click", () => {
      checkWeather(searchBox.value);
    });
  });
  