import './welcome.css'
import { useGameContext } from '../../Context/GameContext'

export const Welcome = () => {
  const { dispatch } = useGameContext()

  const handleClick = () => {
    dispatch({ type: 'update', payload: { key: 'gameStart', value: true } })
  }

  return (
    <div className="welcome-wrapper">
      <h1>Welcome to trivia!</h1>
      <p>Click the button below to start the game</p>
      <button onClick={handleClick}>Start</button>
    </div>
  )
}
