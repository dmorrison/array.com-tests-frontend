fetch("/components/credit-lock-header/template.html")
  .then((stream) => stream.text())
  .then((text) => define(text));

function define(html) {
  class CreditLockHeader extends HTMLElement {
    constructor() {
      super();

      var shadowRoot = this.attachShadow({ mode: "open" });
      shadowRoot.innerHTML = html;
    }
  }

  customElements.define("credit-lock-header", CreditLockHeader);
}
