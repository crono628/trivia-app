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

  // const randoNum = Math.floor(Math.random() * 10)
  // console.log(randoNum)

  return (
    <div>
      {questions?.map((q) => {
        console.log(q)
        return (
          <div key={q.id}>
            <Question obj={q} />
          </div>
        )
      })}
    </div>
  )
}

export default App
