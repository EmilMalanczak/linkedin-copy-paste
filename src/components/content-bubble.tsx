import { ActionIcon, Box, MantineColor, Paper } from "@mantine/core"
import { forwardRef } from "react"

import { useStorage } from "@plasmohq/storage/hook"

import { CONTENT_HEIGHT, CONTENT_WIDTH, DRAGGABLE_OFFSET } from "~constants"

import { Logo } from "./logo"

type Props = {
  onClick: () => void
  active: boolean
}

export const ContentBubble = forwardRef<HTMLDivElement, Props>(
  ({ onClick, active }, ref) => {
    const [color] = useStorage<MantineColor>("primary-color", "blue")

    return (
      <Paper
        shadow="md"
        className="handle"
        onClick={onClick}
        ref={ref}
        sx={(theme) => ({
          padding: DRAGGABLE_OFFSET,
          position: "relative",
          background: theme.colors.gray[3],
          color: theme.colors.dark[4],
          width: CONTENT_WIDTH + DRAGGABLE_OFFSET * 2,
          height: CONTENT_HEIGHT + DRAGGABLE_OFFSET * 2,
          borderRadius: 4
        })}>
        <svg
          style={{
            position: "absolute",
            width: 0,
            height: 0
          }}>
          <clipPath id="my-clip-path" clipPathUnits="objectBoundingBox">
            <path d="M-0.006,0.968 C0.004,0.949,0.217,0.772,0.399,0.617 C0.58,0.462,0.762,0.236,0.923,0.006 C1,-0.224,0.923,0.968,0.923,0.968 C0.923,0.968,-0.015,0.987,-0.006,0.968"></path>
          </clipPath>
        </svg>

        <Box
          component="span"
          sx={(theme) => ({
            borderRadius: 4,
            position: "absolute",
            height: "100%",
            display: "flex",
            alignItems: "flex-end",
            bottom: 0,
            left: 0,
            marginLeft: -9
          })}>
          <Box
            sx={(theme) => ({
              background: theme.colors.gray[3],
              position: "absolute",
              top: 0,
              right: 0,
              zIndex: -1,
              height: "calc(100% - 10px)",
              width: 12,
              flexGrow: 1,
              clipPath: "url(#my-clip-path)",
              borderBottomLeftRadius: 6
            })}
          />
          <Box
            sx={(theme) => ({
              background: theme.colors.gray[3],
              color: theme.colors.dark[6],
              display: "flex",
              padding: 2,
              borderBottomLeftRadius: 6,
              borderTopLeftRadius: 4,
              cursor: active ? "grabbing" : "grab"
            })}>
            <svg
              width="8"
              height="12"
              viewBox="0 0 8 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M1 1H3V3H1V1ZM1 5H3V7H1V5ZM1 9H3V11H1V9ZM5 1H7V3H5V1ZM5 5H7V7H5V5ZM5 9H7V11H5V9Z"
                fill="currentColor"
              />
            </svg>
          </Box>
        </Box>
        <ActionIcon
          color={color}
          size="lg"
          variant="filled"
          sx={(theme) => ({
            color: theme.colors[color][theme.primaryShade[theme.colorScheme]]
          })}>
          <Logo size={32} />
        </ActionIcon>
      </Paper>
    )
  }
)
