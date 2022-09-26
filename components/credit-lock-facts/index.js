import BaseComponent from "../baseComponent.js";

class CreditLockFacts extends BaseComponent {
  constructor() {
    const templatePath = "/components/credit-lock-facts/template.tmpl";
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

    // const showAllElem = this.shadowRoot.querySelector(".show-all");
    // showAllElem.addEventListener("click", this.showAllClickHandler);
  }
 
  disconnectedCallback() {
    // const showAllElem = this.shadowRoot.querySelector(".show-all");
    // showAllElem.removeEventListener("click", this.showAllClickHandler);
  }

  showAllClickHandler(event) {
    event.stopPropagation();

    const showAllElem = event.target;
    const needToShow = showAllElem.innerText.startsWith("Show All");
    const historyListPanelElem = showAllElem.closest(".history-list-panel");
    const historyElems = historyListPanelElem.querySelectorAll("ul.history-list-wrapper > li");

    for (let i = 0; i < historyElems.length; i++) {
      if (i >= defaultNumOfHistoryItemsToShow) {
        historyElems[i].style.display = needToShow ? "block" : "none";
      }
    }

    showAllElem.innerText = needToShow ? "Show Less" : `Show All (${historyElems.length})`;
  }
}

customElements.define("credit-lock-facts", CreditLockFacts);
