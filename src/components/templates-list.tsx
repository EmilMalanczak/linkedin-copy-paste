import {
  ActionIcon,
  Box,
  CopyButton,
  Group,
  Table,
  Text,
  Tooltip
} from "@mantine/core"
import { BsCheck } from "react-icons/bs"
import { FiChevronRight } from "react-icons/fi"
import { HiOutlineDuplicate, HiOutlineTrash } from "react-icons/hi"

import { useNavigation } from "~contexts/navigation-context"
import { useTemplates } from "~hooks/use-templates"
import { Screen } from "~types/ScreenType"

export const TemplatesList = () => {
  const { templates, remove } = useTemplates()
  const { push } = useNavigation()

  return (
    <Table verticalSpacing={8} horizontalSpacing={4}>
      {templates.length > 0 ? (
        <tbody>
          {templates.map((template) => {
            const { name, content, id } = template

            return (
              <tr
                style={{
                  cursor: "pointer"
                }}
                onClick={() => {
                  push(Screen.TemplateForm, template)
                }}>
                <td style={{ width: "100%" }}>
                  <div>
                    <Text size="sm" weight={500}>
                      {name}
                    </Text>

                    <Text color="dimmed" lineClamp={1} size="xs">
                      {content}
                    </Text>
                  </div>
                </td>

                <td>
                  <Group spacing={4} noWrap>
                    <CopyButton value={content} timeout={2000}>
                      {({ copied, copy }) => (
                        <Tooltip
                          label={copied ? "Copied" : "Copy"}
                          withArrow
                          position="bottom">
                          <ActionIcon
                            size="sm"
                            color={copied ? "teal" : "gray"}
                            onClick={(e) => {
                              e.stopPropagation()
                              copy()
                            }}>
                            {copied ? <BsCheck /> : <HiOutlineDuplicate />}
                          </ActionIcon>
                        </Tooltip>
                      )}
                    </CopyButton>

                    <ActionIcon
                      color="red"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        remove(id)
                      }}>
                      <HiOutlineTrash />
                    </ActionIcon>

                    <ActionIcon color="gray" size="sm">
                      <FiChevronRight />
                    </ActionIcon>
                  </Group>
                </td>
              </tr>
            )
          })}
        </tbody>
      ) : (
        <Text size="sm" align="center">
          You dont have any templates yet.
        </Text>
      )}
    </Table>
  )
}
