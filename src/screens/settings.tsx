import { Input } from "@mantine/core"
import React from "react"

import { ThemeColorSelect } from "~components/color-select"
import { ScreenBox } from "~components/screen-box"
import { ThemeSelect } from "~components/theme.select"

export const SettingsScreen = () => {
  return (
    <ScreenBox>
      <Input.Wrapper label="Primary color">
        <ThemeColorSelect />
      </Input.Wrapper>

      <Input.Wrapper label="Theme">
        <ThemeSelect />
      </Input.Wrapper>
    </ScreenBox>
  )
}
