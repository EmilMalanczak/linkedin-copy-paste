import { createContext, useContext, useState } from "react"

import { Screen } from "~types/ScreenType"

type ScreenType = {
  type: Screen
  data: any
}

type NavigationContextType = {
  active: ScreenType
  history: ScreenType[]
  push: (pushedScreen: Screen, data?: any) => void
  back: () => void
}

const NavigationContext = createContext<NavigationContextType>(
  {} as NavigationContextType
)

export const useNavigation = () => useContext(NavigationContext)

const initialScreen = {
  type: Screen.Main,
  data: null
}

export const NavigationProvider = ({ children }) => {
  const [{ active, history }, setScreen] = useState({
    active: initialScreen,
    history: [initialScreen]
  })

  const push = (pushedScreen: Screen, data: any = null) => {
    const newScreen = {
      type: pushedScreen,
      data
    }
    setScreen({
      active: newScreen,
      history: [...history, newScreen]
    })
  }

  const back = () => {
    if (history.length > 1) {
      const historyCopy = [...history]
      historyCopy.pop()

      const [newScreen] = historyCopy.slice(-1)

      setScreen({
        active: newScreen,
        history: historyCopy
      })
    }
  }

  return (
    <NavigationContext.Provider value={{ active, history, back, push }}>
      {children}
    </NavigationContext.Provider>
  )
}
