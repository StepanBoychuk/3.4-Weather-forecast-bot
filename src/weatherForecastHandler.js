const getForecast = require("./getWeatherForecast");

const getWindDirection = (degrees) => {
  const direction = [
    "North",
    "Northeast",
    "East",
    "Southeast",
    "South",
    "Southwest",
    "West",
    "Northwest",
  ];
  const index = Math.round(degrees / 45) % 8;
  return direction[index];
};

const formatTime = (Unix_timestamp, timezone_offset) => {
  const date = new Date((Unix_timestamp + timezone_offset) * 1000);
  return date.toLocaleTimeString("en-US");
};

const weatherForecastHandler = async (location) => {
  const weatherData = await getForecast(location);
  if (!weatherData) {
    return "Oops, something went wrong. Please try again.";
  }
  const currentWeather = weatherData.data.current;
  const formattedText = `
    Current weather in your location: \n
    - Temperature: ${currentWeather.temp}°C
    - Feels like: ${currentWeather.feels_like}°C
    - Pressure: ${currentWeather.pressure} hPa
    - Humidity: ${currentWeather.humidity}%
    - Dew Point: ${currentWeather.dew_point}°C
    - UV Index: ${currentWeather.uvi}
    - Cloud Cover: ${currentWeather.clouds}%
    - Visibility: ${currentWeather.visibility} meters
    - Wind Speed: ${currentWeather.wind_speed} m/s
    - Wind Direction: ${currentWeather.wind_deg}° (${getWindDirection(
    currentWeather.wind_deg
  )})
    - Wind Gusts: ${currentWeather.wind_gust} m/s \n
    Time Information: \n
    - Current Time: ${formatTime(
      currentWeather.dt,
      weatherData.data.timezone_offset
    )}
    - Sunrise: ${formatTime(
      currentWeather.sunrise,
      weatherData.data.timezone_offset
    )}
    - Sunset: ${formatTime(
      currentWeather.sunset,
      weatherData.data.timezone_offset
    )}\n
    Weather Conditions:\n
    - Main Weather: ${currentWeather.weather[0].main}
    - Description: ${currentWeather.weather[0].description}
    `;
  return formattedText;
};

module.exports = weatherForecastHandler;
