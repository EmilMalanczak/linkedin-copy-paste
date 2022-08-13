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

import type { Template } from "~types/Template"

type Props = {
  onClick: (data: Template) => void
  onRemove: (id: string) => void
  templates: Template[]
}

export const TemplatesList = ({ templates, onClick, onRemove }: Props) => {
  console.log(templates)

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
                  onClick(template)
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
                        onRemove(id)
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
