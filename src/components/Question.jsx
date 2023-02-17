import React, { useEffect, useState } from 'react'

const Question = ({ obj }) => {
  console.log(obj)
  const [choices, setChoices] = useState()

  useEffect(() => {
    if (obj) {
      let answers = obj.incorrectAnswers.map((item) => {
        return { answer: item, correct: false }
      })
      answers.push({ answer: obj.correctAnswer, correct: true })
      // console.log(answers)
      setChoices(answers)
    }
  }, [])

  const choiceStyle = {
    fontSize: '0.9rem',
    cursor: 'pointer',
    '&:hover': {
      background: 'red'
    }
  }

  const handleClick = (e) => {
    console.log('click')
  }

  return (
    <>
      <div className="question">{obj.question}</div>
      <span className="choice-wrapper">
        {choices?.map((item, index) => {
          return (
            <div onClick={handleClick} style={choiceStyle} key={index}>
              {item.answer}
            </div>
          )
        })}
      </span>
    </>
  )
}

export default Question
