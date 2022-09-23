const templateResponse = await fetch("/components/credit-lock-center/template.html");
const templateHtml = await templateResponse.text();

const themesInfo = {
  brigit: {
    wrapperDivClass: "theme-brigit",
    styleUrls: [
      "https://cdn-web-assets.array.io/brigit/brigit-common/brigit-common.203c32ae62d65e030d6ad68c20cda582.css",
      "https://cdn-web-assets.array.io/brigit/brigit-creditlock-1b/credit-freeze-center.b2d872a91d97968b7a453c107a92899c.css"
    ],
  }
};

class CreditLockCenter extends HTMLElement {
  constructor() {
    super();
    this.theme = "";
  }

  static get observedAttributes() {
    return ["theme"];
  }

  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[property] = newValue;
  }

  connectedCallback() {
    this.attachShadow({ mode: "open" });
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
}

customElements.define("credit-lock-center", CreditLockCenter);
