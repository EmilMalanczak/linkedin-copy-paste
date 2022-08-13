import { InputWrapper } from "@mantine/core"
import React from "react"

import { ThemeColorSelect } from "~components/color-select"
import { ScreenBox } from "~components/screen-box"
import { ThemeSelect } from "~components/theme.select"

export const SettingsScreen = () => {
  return (
    <ScreenBox>
      <InputWrapper label="Primary color">
        <ThemeColorSelect />
      </InputWrapper>

      <InputWrapper label="Theme">
        <ThemeSelect />
      </InputWrapper>
    </ScreenBox>
  )
}
