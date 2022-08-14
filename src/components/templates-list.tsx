import {
  ActionIcon,
  CopyButton,
  Group,
  Table,
  Text,
  Tooltip
} from "@mantine/core"
import { Fragment } from "react"
import { BsCheck } from "react-icons/bs"
import { HiOutlineDuplicate, HiOutlineTrash } from "react-icons/hi"

import type { Template } from "~types/Template"

type Props = {
  onClick?: (data: Template) => void
  onCopy?: (data: Template) => void
  onRemove?: (id: string) => void
  templates: Template[]
}

export const TemplatesList = ({
  templates,
  onClick,
  onRemove,
  onCopy
}: Props) => {
  return (
    <Table verticalSpacing={8} horizontalSpacing={4}>
      {templates.length > 0 ? (
        <tbody>
          {templates.map((template) => {
            const { name, content, id } = template

            return (
              <Fragment key={id}>
                <CopyButton value={content} timeout={2000}>
                  {({ copied, copy }) => (
                    <tr
                      style={{
                        cursor: "pointer"
                      }}
                      onClick={() => {
                        if (onClick) {
                          onClick(template)
                        } else {
                          copy()
                          onCopy?.(template)
                        }
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
                        <Group spacing={4} noWrap pr={12}>
                          <Tooltip
                            label={copied ? "Copied" : "Copy"}
                            withArrow
                            position="left">
                            <ActionIcon
                              size="sm"
                              color={copied ? "teal" : "gray"}
                              onClick={(e) => {
                                e.stopPropagation()
                                copy()
                                onCopy?.(template)
                              }}>
                              {copied ? <BsCheck /> : <HiOutlineDuplicate />}
                            </ActionIcon>
                          </Tooltip>

                          {onRemove && (
                            <ActionIcon
                              color="red"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                onRemove(id)
                              }}>
                              <HiOutlineTrash />
                            </ActionIcon>
                          )}
                        </Group>
                      </td>
                    </tr>
                  )}
                </CopyButton>
              </Fragment>
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
