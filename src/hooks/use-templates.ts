import { useForceUpdate } from "@mantine/hooks"

import { useStorage } from "@plasmohq/storage"

import type { Template } from "~types/Template"

export const useTemplates = () => {
  const [templates, setTemplates] = useStorage<Template[]>("templates", [])
  const rerender = useForceUpdate()

  const handleAddTemplate = (template: Template) => {
    setTemplates([...templates, template])
    rerender()
  }

  const handleRemoveAllTemplates = () => {
    setTemplates([])
    rerender()
  }

  return {
    templates,
    add: handleAddTemplate,
    clear: handleRemoveAllTemplates
  }
}
