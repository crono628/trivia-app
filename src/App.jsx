import { useEffect, useState } from 'react'
import Question from './components/Question'
import getQuestions from './functions/getQuestions'

const App = () => {
  const [questions, setQuestions] = useState()
  const [selections, setSelections] = useState(Array(10).fill(null))

  useEffect(() => {
    let isSubscribed = true
    if (isSubscribed) {
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
      })
    }

    // let newArr = [...selections]
    // newArr[0] = 1
    // newArr[1] = 2

    // setSelections(newArr)
    return () => (isSubscribed = false)
  }, [])
  return (
    <div className="app-wrapper">
      <div className="question-wrapper">
        {questions?.map((q, i) => {
          let next
          if (!selections.find(Number)) {
            next = 0
          } else {
            let index = -1
            for (let i = 0; i < selections.length; i++) {
              const element = selections[i]
              if (element === null) {
                index = i
                break
              }
            }
            next = index
          }
          console.log(next)
          if (i === next) {
            return (
              <div key={q.id}>
                <Question obj={q} />
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

export default App
