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
            answers: answers,
            category: item.category,
            difficulty: item.difficulty
          }
        })
        setQuestions(questionArr)
        let num = questionArr.length
        setSelections(Array(num).fill(null))
      })
    }

    return () => (isSubscribed = false)
  }, [])

  const handleClick = (e) => {
    // reflects the index of the questions answers stored in the targets id
    let choice = e.target.id
    // finds the currently displayed question
    let current = locateCurrentQ(selections)
    setSelections((prev) => {
      const newArr = [...prev]
      newArr[current] = questions[current].answers[Number(choice)].correct
        ? 1
        : 0
      return newArr
    })
  }

  return (
    <div className="app-wrapper">
      <div className="score-div">
        SCORE:{' '}
        {selections?.reduce((a, b) => (typeof b === 'number' ? a + b : a), 0)}
      </div>
      <div className="question-wrapper">
        {questions?.map((q, i) => {
          let next = locateCurrentQ(selections)
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
  // while there remain elements to shuffle
  while (0 !== currentIndex) {
    // pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // and swap it with the current element
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

function locateCurrentQ(array) {
  const nullIndex = array.findIndex((element) => element === null)
  return nullIndex !== -1 ? nullIndex : array.length
}

export default App
