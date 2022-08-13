import {
  ActionIcon,
  Avatar,
  Group,
  Stack,
  Table,
  Text,
  UnstyledButton
} from "@mantine/core"
import { useClipboard } from "@mantine/hooks"

import { useNavigation } from "~contexts/navigation-context"
import { useTemplates } from "~hooks/use-templates"

export const TemplatesList = () => {
  const { templates } = useTemplates()
  const { push } = useNavigation()
  const { copy } = useClipboard()

  return (
    <Table verticalSpacing={8} horizontalSpacing={4}>
      {templates.length > 0 ? (
        <tbody>
          {templates.map(({ name, content }) => (
            <tr>
              <td>
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
                  <ActionIcon
                    size="sm"
                    color="primary"
                    onClick={() => copy(content)}>
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 24 24"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg">
                      <path fill="none" d="M0 0h24v24H0V0z"></path>
                      <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
                    </svg>
                  </ActionIcon>
                  <ActionIcon color="primary" size="sm">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </ActionIcon>
                  <ActionIcon color="red" size="sm">
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </ActionIcon>
                </Group>
              </td>
              {/* </UnstyledButton> */}
            </tr>
          ))}
        </tbody>
      ) : (
        <Text size="sm" align="center">
          You dont have any templates yet.
        </Text>
      )}
    </Table>
  )
}
