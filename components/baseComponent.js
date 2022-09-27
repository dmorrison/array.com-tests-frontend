class BaseComponent extends HTMLElement {
  constructor(templatePath, themesInfo) {
    super();

    this.templatePath = templatePath;
    this.themesInfo = themesInfo;
    this.commonFontLinks = [
      "https://cdn-web-assets.array.io/assets/css/fonts.6dbfcff92a68d68f88fce60e4ec1a554.css",
      "https://cdn-web-assets.array.io/assets/css/euclid-fonts.8abeba6402d2a1e2efdb8c2ea40f9d81.css",
    ];
    this.addedFontLinks = [];

    this.attachShadow({ mode: "open" });
  }

  async connectedCallback() {
    await this.hydrateTemplateHtml();
    this.addFonts();
    this.setThemeStyles(this.getAttribute("theme"));
  }

  disconnectedCallback() {
    this.removeFonts();
  }

  // Prototype of how to hydrate HTML from an external template file.
  async hydrateTemplateHtml() {
    const response = await fetch(this.templatePath);
    const templateHtml = await response.text();
    this.shadowRoot.innerHTML = templateHtml;
  }

  // Fonts need to be added in the root document to take effect on a
  // shadow DOM section.
  addFonts() {
    for (const fontLink of this.commonFontLinks) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = fontLink;
      document.head.appendChild(link);
    }
  }

  removeFonts() {
    for (const link of this.addedFontLinks) {
      document.head.removeChild(link);
    }
    this.addedFontLinks = [];
  }

  // Prototype of how to support theming.
  setThemeStyles(theme) {
    // Has the component been hydrated from the template?
    if (!this.shadowRoot.hasChildNodes()) return;

    const themeInfo = this.themesInfo[theme];
    if (themeInfo === undefined || themeInfo === null) return;

    const wrapperDivClass = themeInfo.wrapperDivClass;
    const themeWrapperDiv = this.shadowRoot.querySelector("#theme-wrapper");
    themeWrapperDiv.classList.add(wrapperDivClass);

    const urls = themeInfo.styleUrls;
    for (const url of urls) {
      const e = document.createElement("link");
      e.rel = "stylesheet";
      e.href = url;
      this.shadowRoot.appendChild(e);
    }
  }

  static get observedAttributes() {
    return ["theme"];
  }

  attributeChangedCallback(property, oldValue, newValue) {
    if (property === "theme") {
      this.setThemeStyles(newValue);
    }
  }
}

export default BaseComponent;
