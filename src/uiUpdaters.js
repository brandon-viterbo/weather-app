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