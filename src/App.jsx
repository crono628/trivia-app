import { useGameContext } from './Context/GameContext'
import Question from './components/Question'
import { locateCurrentQ } from './functions/helperFunctions'
import { Welcome } from './components/Welcome/Welcome'

const App = () => {
  const { state, dispatch } = useGameContext()

  const handleClick = (e) => {
    // reflects the index of the questions answers stored in the targets id
    let choice = e.target.id
    // finds the currently displayed question
    let current = locateCurrentQ(state.selections)
    // updates the selections array with the users answer
    function updatedArr() {
      const newArr = [...state.selections]
      newArr[current] = state.questions[current].answers[Number(choice)].correct
        ? 1
        : 0
      return newArr
    }
    dispatch({
      type: 'update',
      payload: {
        key: 'selections',
        value: updatedArr()
      }
    })
  }

  // if (state.gameOver) return <div>GAME OVER</div>
  if (!state.gameStart)
    return (
      <div>
        <Welcome />
      </div>
    )

  return (
    <div className="app-wrapper">
      <div className="score-div">
        SCORE:{' '}
        {state.selections?.reduce(
          (a, b) => (typeof b === 'number' ? a + b : a),
          0
        )}
      </div>
      <div className="question-wrapper">
        {state.questions?.map((q, i) => {
          let next = locateCurrentQ(state.selections)
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

export default App
