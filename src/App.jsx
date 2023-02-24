import { useEffect, useState } from 'react'
import Question from './components/Question'
import getQuestions from './functions/getQuestions'

const App = () => {
  const [questions, setQuestions] = useState([])
  const [selections, setSelections] = useState([null])

  useEffect(() => {
    let isSubscribed = true
    if (isSubscribed && questions.length < 1) {
      const promise = getQuestions()
      promise.then((data) => {
        let questionArr = data.map((item) => {
          let answers = item.incorrectAnswers.map((item) => {
            return { answer: item, correct: false }
          })
          answers.push({ answer: item.correctAnswer, correct: true })
          shuffleArray(answers)

          return {
            id: item.id,
            question: item.question,
            answers: answers
          }
        })
        setQuestions(questionArr)
        let num = questionArr.length
        setSelections(Array(num).fill(null))
      })
    }

    return () => (isSubscribed = false)
  }, [selections])

  const handleClick = (e) => {
    let choice = e.target.innerText
    let next = locateNext(selections)
    questions[next].answers.forEach((item) => {
      setSelections((prev) => {
        const newArr = [...prev]
        newArr[next] = item.answer === choice && item.correct ? 1 : 0
        return newArr
      })
    })
  }

  return (
    <div className="app-wrapper">
      <div>SCORE: {selections?.reduce((a, b) => a + b, 0)}</div>
      <div className="question-wrapper">
        {questions?.map((q, i) => {
          let next = locateNext(selections)
          console.log(next)
          if (i === next) {
            return (
              <div key={q.id}>
                <Question handleClick={handleClick} obj={q} />
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

function shuffleArray(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

function locateNext(array) {
  const nullIndex = array.findIndex((element) => element === null)
  return nullIndex !== -1 ? nullIndex : array.length
}

export default App
