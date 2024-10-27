function getHour(datetime) {
  return datetime.slice(0, 2);
}

function getWeekDay(datetimeEpoch, returnShort=true) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(datetimeEpoch * 1000);

  if (returnShort) {
    return days[date.getDay()].slice(0, 3);
  } else {
    return days[date.getDay()];
  }
}

function writeTextInElement(parentContainer, querySelector, text) {
  const element = parentContainer.querySelector(querySelector);

  element.textContent = text;
} 

export function updateCurrentConditions(parentContainer, currentConditions) {
  const hour = getHour(currentConditions.datetime)
  
  writeTextInElement(parentContainer, '.temp > span', currentConditions.temp);
  writeTextInElement(parentContainer, '.wind-moisture > .precip > span', `${currentConditions.precipprob}%`);
  writeTextInElement(parentContainer, '.wind-moisture > .humidity > span', `${currentConditions.humidity}%`);
  writeTextInElement(parentContainer, '.wind-moisture > .wind > span', currentConditions.windspeed);

  writeTextInElement(parentContainer, '.time-condition > .day', getWeekDay(currentConditions.datetimeEpoch));
  writeTextInElement(parentContainer, '.time-condition > .hour', `${hour}:00`);
  writeTextInElement(parentContainer, '.time-condition > .conditions', currentConditions.conditions);
}

export function updateWeeklyForecast(parentContainer, weeklyForecast) {
  const dayCards = parentContainer.children;

  for (let i = 0; i < dayCards.length; i++) {
    const card = dayCards[i];
    const dayWeatherData = weeklyForecast[i];
    
    writeTextInElement(card, '.day', getWeekDay(dayWeatherData.datetimeEpoch));
    writeTextInElement(card, '.high', `${dayWeatherData.tempmax}°`);
    writeTextInElement(card, '.low', `${dayWeatherData.tempmin}°`);
  }
}

export function updateHourly(parentContainer, currentConditions, weeklyForecast, dayToShow=0, dataToShow='temp') {
  const hourCards = parentContainer.children;
  const intervalSize = 24 / hourCards.length;
  const dayData = weeklyForecast[dayToShow];
  const todaysData = weeklyForecast[0];
  const tomorrowsData = weeklyForecast[1];
  let currentHour = parseInt(getHour(currentConditions.datetime));

  if (dayToShow > 0) { currentHour = 0 }

  for (let i = 0; i < hourCards.length; i++) {
    const card = hourCards[i];
    const hour = currentHour + (i * intervalSize);
    let hourData = {};

    if (hour > 23 && dayToShow === 0) {
      hourData = tomorrowsData.hours[hour - 24];
      writeTextInElement(card, '.hour', `${hour - 24}:00`);
    } else if (dayToShow === 0) {
      hourData = todaysData.hours[hour];
      writeTextInElement(card, '.hour', `${hour}:00`);
    } else {
      hourData = dayData.hours[hour];
    }

    writeTextInElement(card, '.data', hourData[dataToShow]);
  }
}