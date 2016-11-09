'use strict'
const onesEl = document.querySelector('#ones')
const tensEl = document.querySelector('#tens')
const mensEl = document.querySelector('#mens')
const tenmensEl = document.querySelector('#tenmens')
const start_stopButton = document.querySelector('#start_stop')
const lapButton = document.querySelector('#laptime')
const miliEl = document.querySelector('#mili')

let       tenmens = 0
 ,           mens = 0
 ,           tens = 0
 ,           ones = 0
 ,     intervalID = null
 ,           bool = true
 ,           laps = []


const setInnerText = (ones, tens, mens, tenmens) => {
     onesEl.innerText = ones
     tensEl.innerText = tens
     mensEl.innerText = mens
  tenmensEl.innerText = tenmens
}

const getInnerText = () => {
  return `${tenmensEl.innerText}${mensEl.innerText}:${tensEl.innerText}${onesEl.innerText}`
}

const lapTime = () => {
  laps.push(getInnerText())
  console.log('LAPS', laps)
}

const incrementEveryTenMinutes = () => {
 if(mens % 10 === 0) {
   tenmens++
   mens = 0
 }
}

const incrementEverySixtySeconds = () => {
 if(tens % 6 === 0 && ones % 10 === 0) {
   mens++
   incrementEveryTenMinutes()
   tens = 0
 }
}

const incrementEveryTenSeconds = () => {
  if(ones % 10 === 0) {
    tens++
    incrementEverySixtySeconds()
    ones = 0
  }
}

const incrementEverySecond = () => {
  intervalID = setInterval(() => {
    ones++
    incrementEveryTenSeconds()
    setInnerText(ones, tens, mens, tenmens)
  }, 1000)
}

const stopTimer = () => {
  clearInterval(intervalID)
}

const startAndStopClock = (bool) => {
  if(bool) {
    incrementEverySecond()
  } else {
    stopTimer()
  }
}

start_stopButton.addEventListener(`click`, () => {
  startAndStopClock(bool)
  bool = !bool
})

lapButton.addEventListener(`click`, () => {
  lapTime()
})
