import { Box, Center, SegmentedControl } from "@mantine/core"

import { useTheme } from "~theme/theme-provider"

export const ThemeSelect = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div>
      <SegmentedControl
        value={theme}
        onChange={setTheme}
        data={[
          {
            value: "light",
            label: (
              <Center>
                <svg
                  fill="none"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4V2m0 20v-2m8-8h2M2 12h2m13.657-5.657L19.07 4.93M4.93 19.07l1.414-1.414m0-11.314L4.93 4.93M19.07 19.07l-1.414-1.414M12 17a5 5 0 100-10 5 5 0 000 10z"></path>
                </svg>
                <Box ml={10}>Light</Box>
              </Center>
            )
          },
          {
            value: "dark",
            label: (
              <Center>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg">
                  <g>
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill-rule="nonzero"
                      d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.979 6.979 0 0 0 10 7zm-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938 7.999 7.999 0 0 0 4 12z"></path>
                  </g>
                </svg>
                <Box ml={10}>Dark</Box>
              </Center>
            )
          }
        ]}
      />
    </div>
  )
}
