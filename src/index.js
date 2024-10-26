import './styles.css';
import { getCityWeather, getCurrentConditions, getThisWeeksForecast } from './getWeatherData';
import { makeHourlyForecastRow, makeWeeklyForecastRow } from './uiConstructors';
import { updateCurrentConditions } from './uiUpdaters';

//API key publically available, no consequence for exposing it.
const myAPIkey = 'WXDR66S93RLSN689NRMZKADSK';

const hourlyForecastRow = document.querySelector('.hourly > .forecast');
const weeklyForecastRow = document.querySelector('.weekly');
const currentConditionsDisplay = document.querySelector('.current-conditions');

const weatherData = await getCityWeather(myAPIkey, 'Montreal');
console.log(weatherData);
const currentConditionsData = getCurrentConditions(weatherData);

makeHourlyForecastRow(hourlyForecastRow);
makeWeeklyForecastRow(weeklyForecastRow, 3);

updateCurrentConditions(currentConditionsDisplay, currentConditionsData);