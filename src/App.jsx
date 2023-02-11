import { useEffect, useState } from 'react'
import getQuestions from './functions/getQuestions'

const App = () => {
  const [questions, setQuestions] = useState([])

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

  console.log(questions)

  const listItems = questions?.map((item) => (
    <li key={item.id}>{item.question}</li>
  ))

  return <ul>{listItems}</ul>
}

export default App
