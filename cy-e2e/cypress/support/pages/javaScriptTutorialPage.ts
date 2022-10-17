import { SWITCH_PAGES_BUTTONS } from "../types/types";
import { HomePage } from "./homePage";

export class JavaScriptTutorialPage extends HomePage {
    constructor() { 
        super();
        this.url = '/js/default.asp';
     }

     public waitForSideBarElementToBeActive(indexElement: number) {
        cy.get('#leftmenuinnerinner > a[target=_top]').eq(indexElement).should("have.class", "active");
    }

    public clickOnTheNextPrevButtons(buttonType: SWITCH_PAGES_BUTTONS) {
        cy.get(".w3-clear > a").contains(buttonType).click();
    }

    public clickOnHomePageIconAtTopNavBar() {
        cy.get(".fa-home").click();
    }
}
