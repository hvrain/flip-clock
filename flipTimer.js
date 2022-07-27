

const timeDigit = ['hour1', 'hour2', 'minute1', 'minute2', 'second1', 'second2'];
const numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

const timeList = [
  [0, 1, 2],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [0, 1, 2, 3, 4, 5],
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
]

export default function makeFlipClock(element) {
  const container = document.getElementById(element);
  const flipClock = document.createElement('section');
  
  flipClock.id = "flipclock";
  flipClock.innerHTML = setTimer();
  container.appendChild(flipClock);

  setInterval(() => {
    executeTimer();
  }, 1000);

  function executeTimer() {
    const date = new Date();
    const time = [
      Number((date.getHours().toString()).padStart(2, '0')[0]),
      Number((date.getHours().toString()).padStart(2, '0')[1]),
      Number((date.getMinutes().toString()).padStart(2, '0')[0]),
      Number((date.getMinutes().toString()).padStart(2, '0')[1]),
      Number((date.getSeconds().toString()).padStart(2, '0')[0]),
      Number((date.getSeconds().toString()).padStart(2, '0')[1]),
    ]
    time.map((t, i) => {
      const element = document.getElementById(timeDigit[i]);
      const nowTag = element.querySelector(`.${numbers[timeList[i].at(t - 1)]}`)
      const prevTag = element.querySelector(`.${numbers[timeList[i].at(t - 2)]}`)
      nowTag.classList.add('active');
      prevTag.classList.remove('active');
    })
  }

  function setTimer() {
    const template = ({id}) => `
      <div id=${id}>{{__plate__}}</div>
    `
    let timeList = timeDigit.map(time => template({id: time}));
    timeList = timeList.map(time => time.replace("{{__plate__}}", createTimePlate()));

    return timeList.join('');  
  }
  
  function createTimePlate() {
    const template = ({id, number}) => `
        <article class=${id}>
          <div class="top">${number !== 9 ? number + 1 : 0}</div>
          <div class="front-plate">${number}</div>
          <div class="back-plate">${number !== 9 ? number + 1 : 0}</div>
          <div class="bottom">${number}</div>
          <div class="line"></div>
        </article>
      `
    let numberTag = numbers.map((number, index) => template({id: number, number: index}));
  
    return numberTag.join('');
  }
}

