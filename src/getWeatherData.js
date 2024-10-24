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

  console.log(weatherData);
}