const removeLinkedinPlaceholder = (input: HTMLElement): void => {
  const placeholder = input.nextElementSibling as HTMLElement

  if (placeholder) {
    placeholder.style.display = "none"
  }
}

const createLinkedinTextLine = (line: string): HTMLParagraphElement => {
  const paragraph = document.createElement("p")

  if (line) {
    paragraph.innerHTML = line
  } else {
    const breakline = document.createElement("br")

    paragraph.appendChild(breakline)
  }

  return paragraph
}

const unlockLinkedinSubmitButton = (input: HTMLElement): void => {
  const parentForm =
    input.parentElement.parentElement.parentElement.parentElement

  const submitButton = parentForm.querySelector(
    "[type=submit]"
  ) as HTMLButtonElement

  submitButton.disabled = false
}

export const injectTemplateToInput = (
  input: HTMLElement,
  template: string
): void => {
  const contentLines = template.split("\n")

  input.replaceChildren()

  contentLines.forEach((line) => {
    const paragraph = createLinkedinTextLine(line)
    input.appendChild(paragraph)
  })

  removeLinkedinPlaceholder(input)
  unlockLinkedinSubmitButton(input)
}
