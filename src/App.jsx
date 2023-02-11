import { useEffect, useState } from 'react'
import Question from './components/Question'
import getQuestions from './functions/getQuestions'

const App = () => {
  const [questions, setQuestions] = useState()

  useEffect(() => {
    let isSubscribed = true

    let apiCall = async () => {
      let called = await getQuestions()

      if (isSubscribed) {
        setQuestions(called)
      }
    }

    apiCall().catch(console.error)

    return () => (isSubscribed = false)
  }, [])

  return <div>{questions && <Question q={questions[0]} />}</div>
}

export default App
