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

  // static get observedAttributes() {
  //   return ["theme", "lock-history-uri"];
  // }

  // async connectedCallback() {
  //   await super.connectedCallback();

  //   const script = document.createElement("script");
  //   script.textContent = `console.log("From array-credit-lock connectedCallback.")`;
  //   this.appendChild(script);
  // }
}

customElements.define("array-credit-lock", ArrayCreditLock);
