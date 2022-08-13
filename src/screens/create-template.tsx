import { Button, Group, Stack, TextInput, Textarea } from "@mantine/core"
import { useForm } from "@mantine/form"
import { nanoid } from "nanoid"
import React, { useState } from "react"

import { ScreenBox } from "~components/screen-box"
import { useNavigation } from "~contexts/navigation-context"
import { useTemplates } from "~hooks/use-templates"

export const CreateTemplateScreen = () => {
  const { back } = useNavigation()
  const { add, clear } = useTemplates()

  const form = useForm({
    initialValues: {
      name: "",
      content: ""
    },

    validate: {
      name: (value) => (value.length > 0 ? null : "Name is required"),
      content: (value) => (value.length > 0 ? null : "Content is required")
    }
  })

  const handleSubmit: Parameters<typeof form.onSubmit>[0] = ({
    name,
    content
  }) => {
    add({
      name,
      content,
      id: nanoid()
    })
    back()
  }

  return (
    <ScreenBox>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput label="Name" {...form.getInputProps("name")} />
          <Textarea
            minRows={3}
            maxRows={10}
            autosize
            label="Content"
            {...form.getInputProps("content")}
          />
          <Group position="right">
            <Button variant="default" onClick={back}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Group>
        </Stack>
      </form>
    </ScreenBox>
  )
}
