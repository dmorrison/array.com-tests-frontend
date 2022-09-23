const themesInfo = {
  brigit: {
    wrapperDivClass: "theme-brigit",
    styleUrls: [
      "https://cdn-web-assets.array.io/brigit/brigit-common/brigit-common.203c32ae62d65e030d6ad68c20cda582.css",
      "https://cdn-web-assets.array.io/brigit/brigit-creditlock-1b/header.3b63bca06c1223af6a4a81a4652265e3.css"
    ],
  }
};

class CreditLockHeader extends HTMLElement {
  constructor() {
    super();

    this.theme = "";

    this.attachShadow({ mode: "open" });
    this.hydrateTemplateHtml();
  }

  // Prototype of how to hydrate HTML from an external template file.
  async hydrateTemplateHtml() {
    const response = await fetch("/components/credit-lock-header/template.tmpl");
    const templateHtml = await response.text();
    this.shadowRoot.innerHTML = templateHtml;
    this.addThemeStyles();
  }

  // Prototype of how to support theming.
  addThemeStyles() {
    if (Object.hasOwn(themesInfo, this.theme)) {
      const themeInfo = themesInfo[this.theme];

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
  }

  static get observedAttributes() {
    return ["theme"];
  }

  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[property] = newValue;
  }
}

customElements.define("credit-lock-header", CreditLockHeader);
