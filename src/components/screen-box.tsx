import { ActionIcon, Group, Stack } from "@mantine/core"
import type { ReactNode } from "react"

import { useNavigation } from "~contexts/navigation-context"

import { Logo } from "./logo"

type Props = {
  children: ReactNode
  onBack?: () => void
  navigationActions?: ReactNode
  bottomActions?: ReactNode
}

export const ScreenBox = ({
  children,
  onBack,
  navigationActions,
  bottomActions
}: Props) => {
  const { back, history } = useNavigation()

  const handleGoBack = () => {
    onBack?.()

    back()
  }

  return (
    <Stack>
      <Group position="apart" noWrap spacing={8}>
        <Group
          spacing={4}
          align="center"
          sx={(theme) => ({
            color:
              theme.colors[theme.primaryColor][
                theme.primaryShade[theme.colorScheme]
              ]
          })}>
          {history.length > 1 && (
            <ActionIcon onClick={handleGoBack}>
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 512 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="48"
                  d="M328 112L184 256l144 144"></path>
              </svg>
            </ActionIcon>
          )}

          <Logo size={28} />
        </Group>
        {navigationActions}
      </Group>

      {children}
      {bottomActions && <Group position="right">{bottomActions}</Group>}
    </Stack>
  )
}
