'use strict'
module.exports = function StopWatch(el1, el2, el3, el4) {
  let      tenmens = 0
  ,           mens = 0
  ,           tens = 0
  ,           ones = 0
  ,     intervalID = null
  ,           laps = []

  this.setInnerText = (ones, tens, mens, tenmens) => {
     el1.innerText = ones
     el2.innerText = tens
     el3.innerText = mens
     el4.innerText = tenmens
    }

  this.getInnerText = () => {
      return `${el4.innerText}${el3.innerText}:${el2.innerText}${el1.innerText}`
    }

  this.lapTime = () => {
      laps.push(this.getInnerText())
      console.log('LAPS', laps)
    }

  this.incrementEveryTenMinutes = () => {
     if(mens % 10 === 0) {
       tenmens++
       mens = 0
     }
    }

  this.incrementEverySixtySeconds = () => {
     if(tens % 6 === 0 && ones % 10 === 0) {
       mens++
       this.incrementEveryTenMinutes()
       tens = 0
     }
    }


  this.incrementEveryTenSeconds = () => {
    if(ones % 10 === 0) {
      tens++
      this.incrementEverySixtySeconds()
      ones = 0
    }
  }

  this.incrementEverySecond = () => {
    intervalID = setInterval(() => {
      ones++
      this.incrementEveryTenSeconds()
      this.setInnerText(ones, tens, mens, tenmens)
    }, 1000)
  }

  this.stopTimer = () => {
    clearInterval(intervalID)
  }

  this.startAndStopClock = (isStopped = true) => {
    if(isStopped) {
      // start the clock
      this.incrementEverySecond()
    } else {
      this.stopTimer()
    }
  }
}
