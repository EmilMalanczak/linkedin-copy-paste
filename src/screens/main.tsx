import {
  ActionIcon,
  Box,
  Button,
  Group,
  Input,
  ScrollArea
} from "@mantine/core"
import { useState } from "react"
import { BiSearch } from "react-icons/bi"
import { TbSettings } from "react-icons/tb"

import { ScreenBox } from "~components/screen-box"
import { TemplatesList } from "~components/templates-list"
import { useNavigation } from "~contexts/navigation-context"
import { useTemplates } from "~hooks/use-templates"
import { Screen } from "~types/ScreenType"
import type { Template } from "~types/Template"

function filterData<T>(data: T[], search: string, getter: (item: T) => string) {
  const query = search.toLowerCase().trim()

  return data.filter((item) => getter(item).toLowerCase().includes(query))
}

export const MainScreen = () => {
  const { push } = useNavigation()
  const { templates, remove } = useTemplates()
  const [filter, setFilter] = useState("")

  return (
    <ScreenBox
      navigationActions={
        <Group style={{ width: "100%" }}>
          <Input
            size="xs"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Filter"
            rightSection={<BiSearch />}
            style={{
              flexGrow: 1
            }}
          />
          <ActionIcon
            color="primary"
            variant="light"
            onClick={() => {
              push(Screen.Settings)
            }}>
            <TbSettings />
          </ActionIcon>
        </Group>
      }
      bottomActions={
        <Button
          size="xs"
          variant="light"
          onClick={() => {
            push(Screen.TemplateForm)
          }}>
          Create Template
        </Button>
      }>
      <ScrollArea.Autosize offsetScrollbars scrollbarSize={10} maxHeight={240}>
        <TemplatesList
          onClick={(template) => push(Screen.TemplateForm, template)}
          onRemove={remove}
          templates={filterData<Template>(
            templates,
            filter,
            (template) => template.name
          )}
        />
      </ScrollArea.Autosize>
    </ScreenBox>
  )
}
