import './styles.css';
import { getCityWeather, getCurrentConditions, getThisWeeksForecast } from './getWeatherData';
import { makeHourlyForecastRow, makeWeeklyForecastRow } from './uiConstructors';
import { updateCurrentConditions, updateWeeklyForecast, updateHourly, highlightToggle } from './uiUpdaters';

//API key publically available, no consequence for exposing it.
const myAPIkey = 'WXDR66S93RLSN689NRMZKADSK';

const hourlyForecastRow = document.querySelector('.hourly > .forecast');
const weeklyForecastRow = document.querySelector('.weekly');
const dayCards = weeklyForecastRow.children;
const currentConditionsDisplay = document.querySelector('.current-conditions');
const conditionToggles = document.querySelector('.hourly > .toggle');
const conditions = conditionToggles.children;
const hoverColor = window.getComputedStyle(document.documentElement).getPropertyValue('--hover-color');

const weatherData = await getCityWeather(myAPIkey, 'Montreal');
const currentConditionsData = getCurrentConditions(weatherData);
const weeklyConditionsData = getThisWeeksForecast(weatherData);
let dayPicked = 0;

console.log(weatherData)

makeHourlyForecastRow(hourlyForecastRow);
makeWeeklyForecastRow(weeklyForecastRow, 3);

updateCurrentConditions(currentConditionsDisplay, currentConditionsData);
updateHourly(hourlyForecastRow, currentConditionsDisplay, currentConditionsData, weeklyConditionsData)
updateWeeklyForecast(weeklyForecastRow, weeklyConditionsData);
highlightToggle(conditionToggles, 0, hoverColor);

for (let i = 0; i < dayCards.length; i++) {
  const card = dayCards[i];
  
  card.addEventListener('click', (e) => {
    const dayToShow = parseInt(card.dataset.index);
    dayPicked = i;
  
    highlightToggle(conditionToggles, 0, hoverColor);
    updateHourly(hourlyForecastRow, currentConditionsDisplay, currentConditionsData, weeklyConditionsData, dayToShow);
  });
}

for (let i = 0; i < conditions.length; i++) {
  const condition = conditions[i];

  condition.addEventListener('click', (e) => {
    highlightToggle(conditionToggles, i, hoverColor);
    updateHourly(hourlyForecastRow, currentConditionsDisplay, currentConditionsData, weeklyConditionsData, dayPicked, condition.className);
  });
}