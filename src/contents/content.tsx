import type { PlasmoContentScript } from "plasmo"
import { useEffect, useState } from "react"

import { useStorage } from "@plasmohq/storage"

export const config: PlasmoContentScript = {
  matches: ["https://www.linkedin.com/*"],
  all_frames: true
}

export const getRootContainer = () => {
  return document.querySelector(".identity-headline")
}

const PlasmoOverlay = () => {
  const [isOpen, setOpen] = useState(false)

  useEffect(() => {
    window.addEventListener("focusin", (event) => {
      // TODO - typescript is disabdle - false typing
      // https://developer.mozilla.org/en-US/docs/Web/API/Element/focusin_event
      // @ts-ignore
      event.target.style.background = "pink"
      setOpen(true)
    })

    window.addEventListener("focusout", (event) => {
      setOpen(false)
    })
  }, [])

  return (
    <div
      style={{
        padding: 24,
        background: isOpen ? "green" : "red",
        top: 0,
        left: 0,
        color: "blue"
      }}>
      <h1>HELLO WORLDI should be {isOpen}</h1>
    </div>
  )
}

export default PlasmoOverlay
