function getHour(datetime) {
  return datetime.slice(0, 2);
}

function getWeekDay(datetimeEpoch) {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const date = new Date(datetimeEpoch * 1000);

  return days[date.getDay()];
}

function writeTextInElement(parentContainer, querySelector, text) {
  const element = parentContainer.querySelector(querySelector);

  element.textContent = text;
} 

export function updateCurrentConditions(parentContainer, currentConditions) {
  
  
  writeTextInElement(parentContainer, '.temp > span', currentConditions.temp);
  writeTextInElement(parentContainer, '.wind-moisture > .precip > span', currentConditions.precipprob);
  writeTextInElement(parentContainer, '.wind-moisture > .humidity > span', currentConditions.humidity);
  writeTextInElement(parentContainer, '.wind-moisture > .wind > span', currentConditions.windspeed);

  writeTextInElement(parentContainer, '.time-condition > .day', getWeekDay(currentConditions.datetimeEpoch));
  writeTextInElement(parentContainer, '.time-condition > .hour', getHour(currentConditions.datetime));
  writeTextInElement(parentContainer, '.time-condition > .conditions', currentConditions.conditions);
}