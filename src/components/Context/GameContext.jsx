import { createContext, useContext, useEffect, useReducer } from 'react'
import { getQuestions, shuffleArray } from '../../functions/helperFunctions'
import { initialState, reducer } from './reducer'

const GameContext = createContext()

export const useGameContext = () => {
  return useContext(GameContext)
}

export const GameWrapper = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    let isSubscribed = true
    if (isSubscribed && state.questions.length < 1) {
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
        let num = questionArr.length
        dispatch({
          type: 'set_multiple',
          payload: { questions: questionArr, selections: Array(num).fill(null) }
        })
      })
    }

    return () => (isSubscribed = false)
  }, [])

  const contextValue = { state, dispatch }

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  )
}
