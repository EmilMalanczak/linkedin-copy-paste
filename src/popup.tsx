import { Paper } from "@mantine/core"
import React from "react"

import { useStorage } from "@plasmohq/storage"

import { NavigationProvider, useNavigation } from "~contexts/navigation-context"
import { CreateTemplateScreen } from "~screens/create-template"
import { MainScreen } from "~screens/main"
import { SettingsScreen } from "~screens/settings"
import { ThemeProvider } from "~theme/theme-provider"
import { Screen } from "~types/ScreenType"

const Popup = () => {
  const [templates] = useStorage("templates")

  const { screen } = useNavigation()

  return (
    <ThemeProvider>
      <Paper
        p={16}
        radius={0}
        shadow="xl"
        sx={(theme) => ({
          width: 320
          // background:
          //   theme.colorScheme === "dark"
          //     ? theme.colors.dark[6]
          //     : theme.colors.gray[3]
        })}>
        {screen.active === Screen.Main && <MainScreen />}
        {screen.active === Screen.CreateTemplate && <CreateTemplateScreen />}
        {screen.active === Screen.Settings && <SettingsScreen />}
      </Paper>
    </ThemeProvider>
  )
}

export default () => (
  <NavigationProvider>
    <Popup />
  </NavigationProvider>
)
