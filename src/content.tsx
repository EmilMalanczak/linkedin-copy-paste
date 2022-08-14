import createCache from "@emotion/cache"
import {
  ActionIcon,
  Box,
  CloseButton,
  Group,
  MantineColor,
  Paper,
  Popover,
  ScrollArea,
  Stack,
  Text,
  Title,
  Tooltip
} from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import type { PlasmoContentScript } from "plasmo"
import { useEffect, useRef, useState } from "react"
import Draggable from "react-draggable"
import { VscGripper } from "react-icons/vsc"
import { useDebouncedCallback } from "use-debounce"

import { useStorage } from "@plasmohq/storage"

import { Logo } from "~components/logo"
import { TemplatesList } from "~components/templates-list"
import { useEventListener } from "~hooks/use-event-listener"
import { useTemplates } from "~hooks/use-templates"
import { ThemeProvider } from "~theme/theme-provider"

type DragCords = {
  x: number
  y: number
}

export const config: PlasmoContentScript = {
  matches: ["https://www.linkedin.com/*"]
}

const SHADOW_ROOT_ID = "linkedin-copy-paste"
export const getShadowHostId = () => SHADOW_ROOT_ID

const styleElement = document.createElement("style")

const CONTENT_WIDTH = 34
const CONTENT_HEIGHT = 34
const DRAGGABLE_OFFSET = 2

const styleCache = createCache({
  key: "plasmo-emotion-cache",
  prepend: true,
  container: styleElement
})

export const getStyle = () => styleElement

export const getMountPoint = async () => document.querySelector("body")

const PlasmoOverlay = () => {
  const [color] = useStorage<MantineColor>("primary-color", "blue")
  const { templates } = useTemplates()

  const [offset, setOffset] = useStorage<DragCords>("content-offset", {
    x: 0,
    y: 0
  })
  const focusedElement = useRef<HTMLElement | null>(null)

  const [isFocused, setIsFocused] = useState(false)
  const [visible, setVisible] = useState(false)
  const [opened, { close, open, toggle }] = useDisclosure(false)

  const [dragging, setDragging] = useState(false)
  const [copiedConfirm, setCopiedConfirm] = useState(false)
  const [bounds, setBounds] = useState<Partial<DOMRect>>({
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  })

  const getBounds = useDebouncedCallback(() => {
    const activeElement = document.activeElement as HTMLElement

    if (activeElement.getAttribute("role") === "textbox") {
      const bounds = activeElement.getBoundingClientRect()
      focusedElement.current = activeElement

      setBounds(bounds)
      setIsFocused(true)
      setVisible(true)
    }
  }, 1)

  const handleContentDrag = (_, { x, y }) => {
    setDragging(true)
    setOffset({
      x,
      y
    })
  }

  const handleContentDragStop = () => {
    setDragging(false)
  }

  useEventListener<FocusEvent>("focusin", getBounds, {})
  useEventListener<FocusEvent>(
    "focusout",
    () => {
      setIsFocused(false)
    },
    {}
  )

  useEffect(() => {
    // only way I could've access the plasmo wrapper element
    if (typeof document !== "undefined") {
      const plasmoWrapper = document
        .querySelector("div")
        .shadowRoot.getElementById("plasmo-shadow-container")

      plasmoWrapper.style.zIndex = "1000"
    }
  }, [])

  useEffect(() => {
    if (copiedConfirm) {
      const timer = setTimeout(() => {
        setCopiedConfirm(false)
      }, 2000)

      return () => clearTimeout(timer)
    }
  }, [copiedConfirm])

  return (
    <ThemeProvider cache={styleCache}>
      {visible && bounds && (
        <span
          id="linkedin-copy-paste"
          style={{
            position: "fixed",
            bottom: window.innerHeight - bounds?.top - CONTENT_HEIGHT,
            right: window.innerWidth - bounds?.right - CONTENT_WIDTH
          }}>
          <Draggable
            handle=".handle"
            defaultPosition={offset}
            position={null}
            scale={1}
            onDrag={handleContentDrag}
            onStop={handleContentDragStop}>
            <Popover
              width={240}
              position="right-end"
              withArrow
              shadow="md"
              closeOnClickOutside
              closeOnEscape
              opened={opened}
              onOpen={open}
              onClose={close}>
              <Popover.Target>
                <Paper
                  shadow="md"
                  className="handle"
                  onClick={toggle}
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
                    <clipPath
                      id="my-clip-path"
                      clipPathUnits="objectBoundingBox">
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
                        cursor: dragging ? "grabbing" : "grab"
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
                  <Tooltip
                    label="Copied"
                    position="bottom"
                    opened={copiedConfirm}>
                    <ActionIcon
                      color={color}
                      size="lg"
                      variant="filled"
                      sx={(theme) => ({
                        color:
                          theme.colors[color][
                            theme.primaryShade[theme.colorScheme]
                          ]
                      })}>
                      <Logo size={32} />
                    </ActionIcon>
                  </Tooltip>
                </Paper>
              </Popover.Target>
              <Popover.Dropdown>
                <Group position="apart" noWrap>
                  <Title order={4}>Choose a template</Title>
                  <CloseButton onClick={close} />
                </Group>
                <ScrollArea.Autosize
                  offsetScrollbars
                  scrollbarSize={10}
                  maxHeight={240}>
                  <TemplatesList
                    templates={templates}
                    onCopy={({ content }) => {
                      close()
                      setCopiedConfirm(true)

                      if (focusedElement.current) {
                        const text = focusedElement.current
                          .firstChild as HTMLElement
                        const placeholder =
                          focusedElement.current.nextElementSibling

                        const contentLines = content.split("\n")

                        // target form parent => 4x parentElement
                        console.log(contentLines)

                        focusedElement.current.replaceChildren()

                        contentLines.forEach((line) => {
                          const paragraph = document.createElement("p")

                          if (line) {
                            paragraph.innerHTML = line
                          } else {
                            const breakline = document.createElement("br")

                            paragraph.appendChild(breakline)
                          }

                          focusedElement.current.appendChild(paragraph)
                        })

                        placeholder?.remove()

                        const parentForm =
                          focusedElement.current.parentElement.parentElement
                            .parentElement.parentElement
                        const submitButton = parentForm.querySelector(
                          "[type=submit]"
                        ) as HTMLButtonElement

                        submitButton.disabled = false
                      }
                    }}
                  />
                </ScrollArea.Autosize>
              </Popover.Dropdown>
            </Popover>
          </Draggable>
        </span>
      )}
    </ThemeProvider>
  )
}

export default PlasmoOverlay
