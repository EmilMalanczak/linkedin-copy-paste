import { Global, css } from "@emotion/react"
import { useForceUpdate } from "@mantine/hooks"
import {
  ColorScheme,
  EmotionCache,
  MantineColor,
  MantineProvider
} from "@mantine/styles"
import React, { createContext, useContext } from "react"

import { useStorage } from "@plasmohq/storage"

type ThemeContextType = {
  theme: ColorScheme
  setTheme: (theme: ColorScheme) => void
  primaryColor: MantineColor
  setPrimaryColor: (color: MantineColor) => void
  cache?: EmotionCache
}

const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider = ({ children, cache }) => {
  const [theme, setTheme] = useStorage<ColorScheme>("theme", "light")
  const [color, setColor] = useStorage<MantineColor>("primary-color", "blue")

  const rerender = useForceUpdate()

  const handleChangeTheme = (newTheme: ColorScheme) => {
    setTheme(newTheme)
    rerender()
  }

  const handleChangeColor = (newColor: MantineColor) => {
    setColor(newColor)
    rerender()
  }

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        setTheme: handleChangeTheme,
        primaryColor: color,
        setPrimaryColor: handleChangeColor
      }}>
      <MantineProvider
        emotionCache={cache}
        theme={{
          colorScheme: theme,
          primaryColor: color
        }}>
        {children}
      </MantineProvider>
    </ThemeContext.Provider>
  )
}
