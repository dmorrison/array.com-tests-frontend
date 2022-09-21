const stream = await fetch("/components/credit-lock-header/template.html");
const html = await stream.text();

class CreditLockHeader extends HTMLElement {
  constructor() {
    super();

    var shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.innerHTML = html;
  }
}

customElements.define("credit-lock-header", CreditLockHeader);
