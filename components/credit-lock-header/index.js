const templateStream = await fetch("/components/credit-lock-header/template.html");
const templateHtml = await templateStream.text();

class CreditLockHeader extends HTMLElement {
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
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = templateHtml;
    
    this.addThemeStyles(shadowRoot);
  }

  addThemeStyles(shadowRoot) {
    const themeToUrls = {
      "brigit": [
        "https://cdn-web-assets.array.io/brigit/brigit-common/brigit-common.203c32ae62d65e030d6ad68c20cda582.css",
        "https://cdn-web-assets.array.io/brigit/brigit-creditlock-1b/header.3b63bca06c1223af6a4a81a4652265e3.css"
      ]
    };

    if (Object.hasOwn(themeToUrls, this.theme)) {
      const urls = themeToUrls[this.theme];
      for (const url of urls) {
        const e = document.createElement("link");
        e.rel = "stylesheet";
        e.href = url;
        shadowRoot.appendChild(e);
      }
    }
  }
}

customElements.define("credit-lock-header", CreditLockHeader);
