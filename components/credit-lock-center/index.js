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
}

customElements.define("credit-lock-center", CreditLockCenter);
