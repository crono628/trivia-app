import React, { useEffect, useState } from 'react'

const Question = ({ obj }) => {
  const handleClick = (e) => {
    console.log('click')
  }

  return (
    <>
      <div className="question">{obj.question}</div>
      <span className="choice-wrapper">
        {obj?.answers.map((item, index) => {
          return (
            <div className="choice-style" onClick={handleClick} key={index}>
              {item.answer}
            </div>
          )
        })}
      </span>
    </>
  )
}

export default Question
