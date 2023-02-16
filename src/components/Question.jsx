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

  return (
    <div>
      <div className="question">{obj.question}</div>
      {choices?.map((item, index) => {
        return <span key={index}> {item.answer} </span>
      })}
    </div>
  )
}

export default Question
