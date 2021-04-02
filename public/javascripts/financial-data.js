function printTheChart(date, price) {
  const ctx = document.getElementById('my-chart').getContext('2d');
  ctx.clearRect(0, 0, 700, 400);
  const chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: date,
      datasets: [
        {
          label: 'Stock Chart',
          backgroundColor: 'rgb(49, 180, 210)',
          borderColor: 'rgb(49, 180, 210)',
          data: price
        }
      ]
    }
  })
}

const dateFilter = async (inicialDate, finalDaet) => {
  const baseURL = `http://api.coindesk.com/v1/bpi/historical/close.json?start=${inicialDate}&end=${finalDaet}`;
  try {
    const response = await axios.get(baseURL);

    const bitcoin = response.data.bpi
    const date = Object.keys(bitcoin)
    const price = Object.values(bitcoin)

    printTheChart(date, price);
  } catch (error) {
    console.log('Error while getting the data: ', error)
  }
}

document.getElementById('financial__button').addEventListener('click', () => {
  const dateStart = document.getElementById('financial__input__date-start').value;
  const dateEnd = document.getElementById('financial__input__date-end').value;
  dateFilter(dateStart, dateEnd);
});