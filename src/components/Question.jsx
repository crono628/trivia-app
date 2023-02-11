import React from 'react'

const Question = ({ q }) => {
  const { question, correctAnswer, incorrectAnswers } = q
  console.log(incorrectAnswers)
  return q ? (
    <div>
      <div>{question}</div>
    </div>
  ) : (
    <div></div>
  )
}

export default Question
