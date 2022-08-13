import { Paper } from "@mantine/core"

import { NavigationProvider, useNavigation } from "~contexts/navigation-context"
import { MainScreen } from "~screens/main"
import { SettingsScreen } from "~screens/settings"
import { TemplateFormScreen } from "~screens/template-form"
import { ThemeProvider } from "~theme/theme-provider"
import { Screen } from "~types/ScreenType"

const Popup = () => {
  const { active } = useNavigation()

  return (
    <Paper
      p={16}
      radius={0}
      withBorder
      shadow="xl"
      style={{
        width: 320
      }}>
      {active.type === Screen.Main && <MainScreen />}
      {active.type === Screen.TemplateForm && <TemplateFormScreen />}
      {active.type === Screen.Settings && <SettingsScreen />}
    </Paper>
  )
}

export default () => (
  <NavigationProvider>
    <ThemeProvider>
      <Popup />
    </ThemeProvider>
  </NavigationProvider>
)
