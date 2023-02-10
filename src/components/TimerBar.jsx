import React, { useState, useEffect } from 'react'

function TimerBar({ isActive, duration }) {
  const [time, setTime] = useState(duration)

  useEffect(() => {
    let interval

    if (isActive) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10)
      }, 10)
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isActive])

  let milliseconds = ('0' + ((time / 10) % 1000)).slice(-2)
  let seconds = ('0' + Math.floor((time / 1000) % 60)).slice(-2)
  let minutes = ('0' + Math.floor((time / 60000) % 60)).slice(-2)

  return (
    <div className="timer">
      {minutes}:{seconds}:{milliseconds}
    </div>
  )
}

export default TimerBar
