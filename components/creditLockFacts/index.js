import BaseComponent from "../baseComponent.js";

class CreditLockFacts extends BaseComponent {
  constructor() {
    const templatePath = "/components/creditLockFacts/template.tmpl";
    const themesInfo = {
      brigit: {
        wrapperDivClass: "theme-brigit",
        styleUrls: [
          "https://cdn-web-assets.array.io/brigit/brigit-common/brigit-common.203c32ae62d65e030d6ad68c20cda582.css",
          "https://cdn-web-assets.array.io/brigit/brigit-common/brigit-collapsible.4f9dadd2c647f8351fc004a6dcc14a8a.css",
          "https://cdn-web-assets.array.io/brigit/brigit-creditlock-1b/facts-steps.2075b680902178e954fcf8ddfe0ac78a.css",
        ],
      }
    };
    super(templatePath, themesInfo);
  }

  static get observedAttributes() {
    return [...BaseComponent.observedAttributes];
  }

  async connectedCallback() {
    await super.connectedCallback();

    const collapsibleToggleElems = this.shadowRoot.querySelectorAll(
      ".question, .open-close-icon");
    for (const elem of collapsibleToggleElems) {
      elem.addEventListener("click", this.toggleCollapse);
    }
  }
 
  disconnectedCallback() {
    const collapsibleToggleElems = this.shadowRoot.querySelectorAll(
      ".question, .open-close-icon");
    for (const elem of collapsibleToggleElems) {
      elem.removeEventListener("click", this.toggleCollapse);
    }
  }

  toggleCollapse(event) {
    event.stopPropagation();

    event.target.closest('.collapsible').classList.toggle("expanded");
  }
}

customElements.define("credit-lock-facts", CreditLockFacts);
