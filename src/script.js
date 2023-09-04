document.addEventListener("DOMContentLoaded", () => {
  const searchBox = document.querySelector(".search input");
  const searchBtn = document.querySelector(".search button");
  const weatherIcon = document.querySelector(".weather-icon");
  const cityElement = document.querySelector(".city");
  const tempElement = document.querySelector(".temp");
  const humidityElement = document.querySelector(".humidity");
  const windElement = document.querySelector(".wind");
  const errorElement = document.querySelector(".error");
  const weatherElement = document.querySelector(".weather");

  searchBtn.addEventListener("click", async () => {
    const cityName = searchBox.value;
    try {
      const result = await checkWeather(cityName);
      // Update the UI with weather data here
      cityElement.textContent = result.city;
      tempElement.textContent = result.temp;
      humidityElement.textContent = result.humidity;
      windElement.textContent = result.wind;
      weatherIcon.src = result.weatherIcon;

      // Show weather data and hide error message
      weatherElement.style.display = "block";
      errorElement.style.display = "none";
    } catch (error) {
      // Handle errors and update the UI here
      const result = handleError(error);
      cityElement.textContent = result.city;
      tempElement.textContent = result.temp;
      humidityElement.textContent = result.humidity;
      windElement.textContent = result.wind;
      weatherIcon.src = result.weatherIcon;

      // Show error message and hide weather data
      weatherElement.style.display = "none";
      errorElement.style.display = "block";
    }
  });
});

// Function to check weather
export async function checkWeather(city) {
const apiKey = "59bcc1670bb963b05b8f09692979fd8a";
const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    if (response.status === 404) {
      throw new Error("City not found");
    } else {
      const data = await response.json();
      return transformWeatherData(data);
    }
  } catch (error) {
    return handleError(error);
  }
}

// Function for transforming weather data
export function transformWeatherData(data) {
  return {
    city: data.name,
    temp: `${Math.round(data.main.temp - 273.15)}°C`,
    humidity: `${data.main.humidity}%`,
    wind: `${data.wind.speed} km/h`,
    weatherIcon: getWeatherIcon(data.weather[0].main),
    weather: "block",
    error: "none",
  };
}

// Function for handling errors
export function handleError(error) {
  if (error === null) {
    return {
      city: "",
      temp: "",
      humidity: "",
      wind: "",
      weatherIcon: "",
      weather: "none",
      error: "", // If error is null, set error property to an empty string
    };
  } else {
    return {
      city: "",
      temp: "",
      humidity: "",
      wind: "",
      weatherIcon: "",
      weather: "none",
      error: error.message, // Use the error message provided by the Error object
    };
  }
}


// Function for getting the weather icon
export function getWeatherIcon(weatherMain) {
  switch (weatherMain) {
    case "Clouds":
      return "../images/clouds.png";
    case "Rain":
      return "../images/rain.png";
    case "Drizzle":
      return "../images/drizzle.png";
    case "Mist":
      return "../images/mist.png";
    default:
      return "../images/rain.png";
  }
}
