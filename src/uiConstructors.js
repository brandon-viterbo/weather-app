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

    data.textContent = '°15';
    hour.textContent = `${i*intervalSize}:00`;

    parentElement.appendChild(hourCard);
  }
}