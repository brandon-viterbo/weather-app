import './styles.css';
import { getThisWeeksForecast } from './getWeatherData';
import { makeHourlyForecastRow } from './uiConstructors';

//API key publically available, no consequence for exposing it.
const myAPIkey = 'WXDR66S93RLSN689NRMZKADSK';

const hourlyForecastRow = document.querySelector('.hourly > .forecast');

makeHourlyForecastRow(hourlyForecastRow);