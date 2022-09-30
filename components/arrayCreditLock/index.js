import BaseComponent from "/components/baseComponent.js";
import "/components/creditLockHeader/index.js";
import "/components/creditLockCenter/index.js";
import "/components/creditLockFacts/index.js";

class ArrayCreditLock extends BaseComponent {
  constructor() {
    const templatePath = "/components/arrayCreditLock/template.tmpl";
    const themesInfo = {};
    super(templatePath, themesInfo);
  }

  static get observedAttributes() {
    return [...BaseComponent.observedAttributes, "lock-history-uri"];
  }

  async connectedCallback() {
    await super.connectedCallback();

    this.setThemeOnSubcomponents(this.getAttribute("theme"));
    this.setLockHistoryUriOnSubcomponent(this.getAttribute("lock-history-uri"));
  }

  attributeChangedCallback(property, oldValue, newValue) {
    super.attributeChangedCallback(property, oldValue, newValue);

    if (property === "theme") {
      this.setThemeOnSubcomponents(newValue);
    } else if (property === "lock-history-uri") {
      this.setLockHistoryUriOnSubcomponent(newValue);
    }
  }

  setThemeOnSubcomponents(theme) {
    if (!this.isHydrated) return;
    for (const kid of this.shadowRoot.children) {
      kid.setAttribute("theme", theme);
    }
  }

  setLockHistoryUriOnSubcomponent(uri) {
    if (!this.isHydrated) return;
    const creditLockCenterElem = this.shadowRoot.querySelector("credit-lock-center");
    creditLockCenterElem.setAttribute("lock-history-uri", uri);
  }
}

customElements.define("array-credit-lock", ArrayCreditLock);
