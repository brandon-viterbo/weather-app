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
const searchBar = document.querySelector('input');
const cityDisplay = document.querySelector('.city');
const unitToggle = document.querySelector('.temp > .toggle');
const units = unitToggle.children;
const windUnitDisplay = document.querySelector('.wind .unit');

let weatherData = {};
let currentConditionsData = {};
let weeklyConditionsData = {};
let dayPicked = 0;

async function initializeDisplay(cityName, dayToShow=0, selectedUnitIndex=0, dataToShow=0) {
  const isMetric = (selectedUnitIndex === 0);
  const selectedCond = conditions[dataToShow]; 
  const hourlyDataName = selectedCond.classList[0];
  
  cityDisplay.textContent = cityName;
  weatherData = await getCityWeather(myAPIkey, cityName, isMetric);
  currentConditionsData = getCurrentConditions(weatherData);
  weeklyConditionsData = getThisWeeksForecast(weatherData);
  dayPicked = dayToShow;
  updateCurrentConditions(currentConditionsDisplay, currentConditionsData);
  updateHourly(hourlyForecastRow, currentConditionsDisplay, currentConditionsData, weeklyConditionsData, dayToShow, hourlyDataName);
  updateWeeklyForecast(weeklyForecastRow, weeklyConditionsData);
  highlightToggle(conditionToggles, dataToShow);
  highlightToggle(unitToggle, selectedUnitIndex);
}

makeHourlyForecastRow(hourlyForecastRow);
makeWeeklyForecastRow(weeklyForecastRow, 3);

await initializeDisplay('Montreal');

for (let i = 0; i < dayCards.length; i++) {
  const card = dayCards[i];
  
  card.addEventListener('click', (e) => {
    const dayToShow = parseInt(card.dataset.index);
    dayPicked = i;
  
    highlightToggle(conditionToggles, 0);
    updateHourly(hourlyForecastRow, currentConditionsDisplay, currentConditionsData, weeklyConditionsData, dayToShow);
  });
}

for (let i = 0; i < conditions.length; i++) {
  const condition = conditions[i];
  
  condition.addEventListener('click', (e) => {
    highlightToggle(conditionToggles, i);
    updateHourly(hourlyForecastRow, currentConditionsDisplay, currentConditionsData, weeklyConditionsData, dayPicked, condition.classList[0]);
  });
}

const windUnits = ['km/h', 'mph'];
for (let i = 0; i < units.length; i++) {
  const element = units[i];
  
  element.addEventListener('click', (e) => {
    windUnitDisplay.textContent = windUnits[i];
    highlightToggle(unitToggle, i);
    
    const cityName = cityDisplay.textContent;
    const selectedCondition = document.querySelector('.hourly .selected');
    const conditionIndex = parseInt(selectedCondition.dataset.index);

    initializeDisplay(cityName, dayPicked, i, conditionIndex);
  });
}

searchBar.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    const cityName = searchBar.value;
    initializeDisplay(cityName);
    searchBar.value = '';
  }
});
