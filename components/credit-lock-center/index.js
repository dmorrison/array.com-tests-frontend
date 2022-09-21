const templateResponse = await fetch("/components/credit-lock-center/template.html");
const templateHtml = await templateResponse.text();

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
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = templateHtml;
    
    this.addThemeStyles(shadowRoot);
  }

  addThemeStyles(shadowRoot) {
    const themeToUrls = {
      "brigit": [
        "https://cdn-web-assets.array.io/brigit/brigit-common/brigit-common.203c32ae62d65e030d6ad68c20cda582.css",
        "https://cdn-web-assets.array.io/brigit/brigit-creditlock-1b/credit-freeze-center.b2d872a91d97968b7a453c107a92899c.css"
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

customElements.define("credit-lock-center", CreditLockCenter);
