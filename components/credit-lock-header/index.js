import BaseComponent from "../baseComponent.js";

class CreditLockHeader extends BaseComponent {
  constructor() {
    const templatePath = "/components/credit-lock-header/template.tmpl";
    const themesInfo = {
      brigit: {
        wrapperDivClass: "theme-brigit",
        styleUrls: [
          "https://cdn-web-assets.array.io/brigit/brigit-common/brigit-common.203c32ae62d65e030d6ad68c20cda582.css",
          "https://cdn-web-assets.array.io/brigit/brigit-creditlock-1b/header.3b63bca06c1223af6a4a81a4652265e3.css"
        ],
      }
    };
    super(templatePath, themesInfo);
  }
}

customElements.define("credit-lock-header", CreditLockHeader);
