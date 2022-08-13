import { createContext, useContext, useState } from "react"

import { Screen } from "~types/ScreenType"

type ScreenType = {
  active: Screen
  history: Screen[]
}

type NavigationContextType = {
  screen: ScreenType
  push: (screen: Screen) => void
  back: () => void
}

const NavigationContext = createContext<NavigationContextType>(
  {} as NavigationContextType
)

export const useNavigation = () => useContext(NavigationContext)

export const NavigationProvider = ({ children }) => {
  const [screen, setScreen] = useState({
    active: Screen.Main,
    history: [Screen.Main]
  })

  const push = (newScreen: Screen) => {
    setScreen({
      active: newScreen,
      history: [...screen.history, newScreen]
    })
  }

  const back = () => {
    if (screen.history.length > 1) {
      const history = [...screen.history]
      history.pop()

      const [newScreen] = history.slice(-1)

      setScreen({
        active: newScreen,
        history
      })
    }
  }

  return (
    <NavigationContext.Provider value={{ screen, back, push }}>
      {children}
    </NavigationContext.Provider>
  )
}
