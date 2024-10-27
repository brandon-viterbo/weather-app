import './styles.css';
import { getCityWeather, getCurrentConditions, getThisWeeksForecast } from './getWeatherData';
import { makeHourlyForecastRow, makeWeeklyForecastRow } from './uiConstructors';
import { updateCurrentConditions, updateWeeklyForecast, updateHourly } from './uiUpdaters';

//API key publically available, no consequence for exposing it.
const myAPIkey = 'WXDR66S93RLSN689NRMZKADSK';

const hourlyForecastRow = document.querySelector('.hourly > .forecast');
const weeklyForecastRow = document.querySelector('.weekly');
const dayCards = weeklyForecastRow.children;
const currentConditionsDisplay = document.querySelector('.current-conditions');

const weatherData = await getCityWeather(myAPIkey, 'Montreal');
const currentConditionsData = getCurrentConditions(weatherData);
const weeklyConditionsData = getThisWeeksForecast(weatherData);

console.log(weatherData)

makeHourlyForecastRow(hourlyForecastRow);
makeWeeklyForecastRow(weeklyForecastRow, 3);

updateCurrentConditions(currentConditionsDisplay, currentConditionsData);
updateHourly(hourlyForecastRow, currentConditionsDisplay, currentConditionsData, weeklyConditionsData)
updateWeeklyForecast(weeklyForecastRow, weeklyConditionsData);

for (let i = 0; i < dayCards.length; i++) {
  const card = dayCards[i];
  
  card.addEventListener('click', (e) => {
    const dayToShow = parseInt(card.dataset.index);
  
    updateHourly(hourlyForecastRow, currentConditionsDisplay, currentConditionsData, weeklyConditionsData, dayToShow);
  });
}