import BaseComponent from "../baseComponent.js";

const defaultNumOfHistoryItemsToShow = 5;

class CreditLockCenter extends BaseComponent {
  constructor() {
    const templatePath = "/components/creditLockCenter/template.tmpl";
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

  static get observedAttributes() {
    return [...BaseComponent.observedAttributes, "lock-history-uri"];
  }

  async connectedCallback() {
    await super.connectedCallback();

    const historyTitleElem = this.shadowRoot.querySelector(".history-title");
    historyTitleElem.addEventListener("click", this.historyTitleClickHandler);

    const showAllElem = this.shadowRoot.querySelector(".show-all");
    showAllElem.addEventListener("click", this.showAllClickHandler);

    await this.hydrateLockHistory();
  }
 
  disconnectedCallback() {
    const historyTitleElem = this.shadowRoot.querySelector(".history-title");
    historyTitleElem.removeEventListener("click", this.historyTitleClickHandler);

    const showAllElem = this.shadowRoot.querySelector(".show-all");
    showAllElem.removeEventListener("click", this.showAllClickHandler);
  }

  async hydrateLockHistory() {
    const lockHistoryUri = this.getAttribute("lock-history-uri");
    if (lockHistoryUri === undefined || lockHistoryUri === null) {
      throw new Error('The attribute "lock-history-uri" is required.');
    }

    const response = await fetch(lockHistoryUri);
    const historyEvents = await response.json();

    // Sort in descending order.
    historyEvents.sort((a, b) => {
      if (a.date > b.date) {
        return -1;
      } else if (a.date < b.date) {
        return 1;
      } else {
        return 0;
      }
    });

    // Populate the text for the "Show All" link/button.
    this.shadowRoot.querySelector(".show-all").innerText =
      `Show All (${historyEvents.length})`;

    // Populate history items.
    const historyElems = [];
    for (let i = 0; i < historyEvents.length; i++) {
      const historyElem = this.createHistoryEventElement(historyEvents[i]);

      if (i >= defaultNumOfHistoryItemsToShow) {
        historyElem.style.display = "none";
      }

      historyElems.push(historyElem);
    }
    const historyListElem = this.shadowRoot.querySelector("ul.history-list-wrapper");
    historyListElem.append(...historyElems);
  }

  createHistoryEventElement(historyEvent) {
    const li = document.createElement("li");
    li.classList.add("history-list");

    const dateSpan = document.createElement("span");
    dateSpan.classList.add("date");
    const date = new Date(historyEvent.date);
    dateSpan.innerText = date.toLocaleString();
    li.append(dateSpan);

    const lockWrapperDiv = document.createElement("div");
    lockWrapperDiv.classList.add("lock-wrapper");

    const lockImg = document.createElement("img");
    lockImg.classList.add("lock-icon");
    lockImg.src = historyEvent.type === "enrollment"
      ? "/components/creditLockCenter/lock-icon.svg"
      : "/components/creditLockCenter/unlock-icon.svg";
    lockWrapperDiv.append(lockImg);

    const lockSpan = document.createElement("span");
    lockSpan.classList.add("lock");
    lockSpan.innerText = historyEvent.type === "enrollment" ? "Locked" : "Unlocked";
    lockWrapperDiv.append(lockSpan);

    li.append(lockWrapperDiv);

    return li;
  }

  historyTitleClickHandler(event) {
    event.stopPropagation();

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

customElements.define("credit-lock-center", CreditLockCenter);
