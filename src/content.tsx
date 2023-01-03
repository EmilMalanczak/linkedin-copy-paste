import createCache from "@emotion/cache"
import { CloseButton, Group, Popover, ScrollArea, Title } from "@mantine/core"
import { clamp, useDisclosure } from "@mantine/hooks"
import type { PlasmoContentScript } from "plasmo"
import { useEffect, useRef, useState } from "react"
import Draggable from "react-draggable"
import { useDebouncedCallback } from "use-debounce"

import { useStorage } from "@plasmohq/storage/hook"

import { ContentBubble } from "~components/content-bubble"
import { TemplatesList } from "~components/templates-list"
import { CONTENT_HEIGHT, CONTENT_WIDTH, SHADOW_ROOT_ID } from "~constants"
import { getPlasmoWrapper } from "~helpers/get-plasmo-wrapper"
import { injectTemplateToInput } from "~helpers/inject-template-to-input"
import { useEventListener } from "~hooks/use-event-listener"
import { useTemplates } from "~hooks/use-templates"
import { ThemeProvider } from "~theme/theme-provider"
import type { Template } from "~types/Template"

type DragCords = {
  x: number
  y: number
}

export const config: PlasmoContentScript = {
  matches: ["https://www.linkedin.com/*"]
}

export const getShadowHostId = () => SHADOW_ROOT_ID

const styleElement = document.createElement("style")

const styleCache = createCache({
  key: "linkedin-copy-paste-csui",
  prepend: true,
  container: styleElement
})

export const getStyle = () => styleElement

export default function LinkedInTemplatePickerCsui() {
  const [isFocused, setIsFocused] = useState(false)
  const [visible, setVisible] = useState(false)
  const [dragging, setDragging] = useState(false)
  const { templates } = useTemplates()
  const [opened, { close, open, toggle }] = useDisclosure(false)

  const [offset, setOffset] = useStorage<DragCords>("content-offset", {
    x: 0,
    y: 0
  })
  const focusedElement = useRef<HTMLElement | null>(null)
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
  }, 240)

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

  const handleCopyTemplate = ({ content }: Template) => {
    close()

    if (focusedElement.current) {
      injectTemplateToInput(focusedElement.current, content)
    }
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
      const plasmoWrapper = getPlasmoWrapper()

      plasmoWrapper.style.zIndex = "1000"
    }
  }, [])

  return (
    <ThemeProvider cache={styleCache}>
      {visible && bounds && (
        <span
          id="linkedin-copy-paste"
          style={{
            position: "fixed",
            bottom: clamp(
              window.innerHeight - bounds?.top - CONTENT_HEIGHT,
              0,
              window.innerHeight - CONTENT_HEIGHT
            ),
            right: clamp(
              window.innerWidth - bounds?.right - CONTENT_WIDTH,
              0,
              window.innerWidth - CONTENT_WIDTH
            )
          }}>
          <Draggable
            handle=".handle"
            defaultPosition={offset}
            position={null}
            scale={1}
            offsetParent={document.body}
            onDrag={handleContentDrag}
            onStop={handleContentDragStop}>
            <span style={{ position: "absolute" }}>
              <Popover
                width={240}
                position="right-end"
                withArrow
                shadow="md"
                closeOnClickOutside
                closeOnEscape
                positionDependencies={[bounds]}
                opened={opened}
                onOpen={open}
                onClose={close}>
                <Popover.Target>
                  <ContentBubble onClick={toggle} active={dragging} />
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
                      onCopy={handleCopyTemplate}
                    />
                  </ScrollArea.Autosize>
                </Popover.Dropdown>
              </Popover>
            </span>
          </Draggable>
        </span>
      )}
    </ThemeProvider>
  )
}
