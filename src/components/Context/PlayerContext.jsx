import { createContext, useContext, useReducer } from 'react'
import { initialState, reducer } from './reducer'

const GameContext = createContext()

export const useGameContext = () => {
  return useContext(GameContext)
}

export const GameWrapper = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const contextValue = { state, dispatch }

  return (
    <GameContext.Provider value={contextValue}>{children}</GameContext.Provider>
  )
}
