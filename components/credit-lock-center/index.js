import BaseComponent from "../baseComponent.js";

class CreditLockCenter extends BaseComponent {
  constructor() {
    const templatePath = "/components/credit-lock-center/template.tmpl";
    const themesInfo = {
      brigit: {
        wrapperDivClass: "theme-brigit",
        styleUrls: [
          "https://cdn-web-assets.array.io/brigit/brigit-common/brigit-common.203c32ae62d65e030d6ad68c20cda582.css",
          "https://cdn-web-assets.array.io/brigit/brigit-creditlock-1b/credit-freeze-center.b2d872a91d97968b7a453c107a92899c.css"
        ],
      }
    };
    super(templatePath, themesInfo);
  }

  async connectedCallback() {
    await super.connectedCallback();

    const historyTitleElem = this.shadowRoot.querySelector(".history-title");
    historyTitleElem.addEventListener("click", this.historyTitleClickHandler);
  }
 
  disconnectedCallback() {
    const historyTitleElem = this.shadowRoot.querySelector(".history-title");
    historyTitleElem.removeEventListener("click", this.historyTitleClickHandler);
  }

  historyTitleClickHandler(event) {
    const historyTitleElem = event.target;
    const historyListPanelElem = historyTitleElem.closest(".history-list-panel");

    // Switch text to "Show" or "Hide".
    const title = historyTitleElem.innerText;
    if (title.indexOf("Show") === 0) {
      historyTitleElem.innerText = title.replace("Show", "Hide");
    } else {
      historyTitleElem.innerText = title.replace("Hide", "Show");
    }

    // Toggle visibility for the history list.
    const historyListWrapperElem = historyListPanelElem.querySelector(".history-list-wrapper");
    if (historyListWrapperElem.style.display === "none") {
      historyListWrapperElem.style.display = "block";
    } else {
      historyListWrapperElem.style.display = "none";
    }

    // Toggle visibility for the "Show All" link/button.
    const showAllElem = historyListPanelElem.querySelector(".show-all");
    if (showAllElem.style.display === "none") {
      showAllElem.style.display = "block";
    } else {
      showAllElem.style.display = "none";
    }
  }
}

customElements.define("credit-lock-center", CreditLockCenter);
