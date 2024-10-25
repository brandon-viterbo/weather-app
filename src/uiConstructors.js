function makeHourCard() {
  const hourCard = document.createElement('div');
  const data = document.createElement('div');
  const hour =document.createElement('div');

  hourCard.appendChild(data);
  hourCard.appendChild(hour);
  hourCard.classList.add('hour-card');
  data.classList.add('data');
  hour.classList.add('hour');

  return hourCard;
}

export function makeHourlyForecastRow(parentElement, intervalSize=3) {
  const divisions = 24 / intervalSize;

  for (let i = 0; i < divisions; i++) {
    const hourCard = makeHourCard();
    const data = hourCard.querySelector('.data');
    const hour = hourCard.querySelector('.hour');

    data.textContent = '15°';
    hour.textContent = `${i*intervalSize}:00`;

    parentElement.appendChild(hourCard);
  }
}

function makeDayCard() {
  const dayCard = document.createElement('div');
  const day = document.createElement('div');
  const icon = document.createElement('div');
  const temp = document.createElement('div');
  const high = document.createElement('div');
  const low = document.createElement('div');

  dayCard.classList.add('day-card');
  day.classList.add('day');
  icon.classList.add('icon');
  temp.classList.add('temp');
  high.classList.add('high');
  low.classList.add('low');

  temp.appendChild(high);
  temp.appendChild(low);

  dayCard.appendChild(day);
  dayCard.appendChild(icon);
  dayCard.appendChild(temp);

  return dayCard;
}

function findDaysIndex(sum) {
  //Sum is starting day index plus some int between 0-6.
  if (sum >= 7) {
    return sum - 7;
  }

  return sum;
}

export function makeWeeklyForecastRow(parentElement, startingDayIndex) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  for (let i = 0; i < 7; i++) {
    const dayCard = makeDayCard();
    const day = dayCard.querySelector('.day');
    const icon = dayCard.querySelector('.icon');
    const high = dayCard.querySelector('.high');
    const low = dayCard.querySelector('.low');

    day.textContent = days[findDaysIndex(i + startingDayIndex)];
    icon.textContent = '☀️';
    high.textContent = '23°';
    low.textContent = '0°';

    parentElement.appendChild(dayCard);
  }
}