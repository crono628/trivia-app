import { useEffect, useState } from 'react'
import getQuestions from './functions/getQuestions'

const App = () => {
  const [questions, setQuestions] = useState([])

  useEffect(() => {
    console.log('render')

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

  let newThing = questions?.map((item) => {
    console.log('item', item)
  })

  console.log(newThing)

  return (
    <ul>
      {questions?.map((item) => {
        for (const key in item) {
          return decodeURI(item[key])
        }
      })}
    </ul>
  )
}

export default App
