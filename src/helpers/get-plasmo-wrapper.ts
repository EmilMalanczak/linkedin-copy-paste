export const getPlasmoWrapper = (): HTMLElement =>
  document
    .querySelector("plasmo-csui")
    .shadowRoot.getElementById("plasmo-shadow-container")
