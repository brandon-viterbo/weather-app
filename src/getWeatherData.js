// API request formatted as: 
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/[location]/[date1]/[date2]?key=YOUR_API_KEY 
const baseURL = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/';

function makeRequestURL(apiKey, city, startDate, endDate, url) {
  let requestURL = `${url}${city}`;
  
  if (startDate !=='') { requestURL = `${requestURL}/${startDate}`; }
  if (startDate !=='' && endDate !== '') { requestURL = `${requestURL}/${endDate}`; }
  requestURL = `${requestURL}?key=${apiKey}`;

  return requestURL;
}

async function getCityWeather(apiKey, city, startDate='', endDate='', url=baseURL) {
  const requestURL = makeRequestURL(apiKey, city, startDate, endDate, url);
  const response = await fetch(requestURL);
  const weatherData = await response.json();

  return weatherData;
}

function getHourlyForecastWithinDay(dailyWeatherData) {
  const hours = dailyWeatherData.hours;
  const cleanedHourlyData = hours.map((hr) => {
    return {
      datetime: hr.datetime,
      feelslike: hr.feelslike,
      humidity: hr.humidity,
      precipprob: hr.precipprob,
      preciptype: hr.preciptype,
      temp: hr.temp,
      winddir: hr.winddir,
      windspeed: hr.windspeed,
    }
  });

  return cleanedHourlyData;
}

function getDaysForecast(weatherData, dayIndex) {
  const day = weatherData.days[dayIndex];
  const daysForecast = {
    datetime: day.datetime,
    conditions: day.conditions,
    feelslike: day.feelslike,
    hours: getHourlyForecastWithinDay(day),
  }

  return daysForecast;
}

export async function getThisWeeksForecast(apiKey, city) {
  const weatherData = await getCityWeather(apiKey, city);
  const days = weatherData.days;
  const weeksForecast = [];
  
  for (let i = 0; i < 7; i++) {
    const day = days[i];
    const daysData = getDaysForecast(weatherData, i);

    weeksForecast.push(daysData);
  }

  return weeksForecast;
}

