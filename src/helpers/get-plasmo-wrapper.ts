export const getPlasmoWrapper = (): HTMLElement =>
  document
    .querySelector("div")
    .shadowRoot.getElementById("plasmo-shadow-container")
