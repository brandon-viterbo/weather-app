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

export async function getCityWeather(apiKey, city, startDate='', endDate='', url=baseURL) {
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
      temp: hr.temp,
      precipprob: hr.precipprob,
      preciptype: hr.preciptype,
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
    temp: day.temp,
    tempmax: day.tempmax,
    tempmin: day.tempmin,
    hours: getHourlyForecastWithinDay(day),
  }

  return daysForecast;
}

export function getCurrentConditions(weatherData) {
  const currentConditions = weatherData.currentConditions;
  return {
    datetime: currentConditions.datetime,
    conditions: currentConditions.conditions,
    temp: currentConditions.temp,
    precipprob: currentConditions.precipprob,
    humidity: currentConditions.humidity,
    windspeed: currentConditions.windspeed,
  }
}

export function getThisWeeksForecast(weatherData) {
  console.log(weatherData);
  const days = weatherData.days;
  const weeksForecast = [];
  
  for (let i = 0; i < 7; i++) {
    const day = days[i];
    const daysData = getDaysForecast(weatherData, i);

    weeksForecast.push(daysData);
  }

  return weeksForecast;
}

