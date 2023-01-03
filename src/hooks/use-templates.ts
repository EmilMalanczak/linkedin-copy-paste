import { useForceUpdate } from "@mantine/hooks"

import { useStorage } from "@plasmohq/storage/hook"

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

  const handleRemoveTemplate = (id: string) => {
    setTemplates(templates.filter((template) => template.id !== id))
    rerender()
  }

  const handlEditTemplate = (id: string, updatedTemplate: Template) => {
    setTemplates(
      templates.map((template) =>
        template.id === id ? updatedTemplate : template
      )
    )
    rerender()
  }

  return {
    templates,
    add: handleAddTemplate,
    clear: handleRemoveAllTemplates,
    remove: handleRemoveTemplate,
    edit: handlEditTemplate
  }
}
