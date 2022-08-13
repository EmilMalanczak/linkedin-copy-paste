import { ActionIcon, Group } from "@mantine/core"
import { MANTINE_COLORS } from "@mantine/styles"

import { useTheme } from "~theme/theme-provider"

export const ThemeColorSelect = () => {
  const { primaryColor, setPrimaryColor } = useTheme()

  return (
    <Group position="center" spacing={8} mt={8}>
      {MANTINE_COLORS.slice(1).map((color) => (
        <ActionIcon
          key={color}
          color={color}
          onClick={() => setPrimaryColor(color)}
          variant="filled">
          {primaryColor === color && "x"}
        </ActionIcon>
      ))}
    </Group>
  )
}
