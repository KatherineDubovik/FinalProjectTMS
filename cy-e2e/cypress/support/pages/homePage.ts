import { BasePage } from "./basePage";
import { DARK_PAGE_OPTIONS } from "../types/types";

export class HomePage extends BasePage {
    constructor() {
        super();
        this.url = "/";
    }

    public getSearchFieldElement() {
        return cy.get("#search2");
    }

    public searchTutorialsByText(text: string) {
        this.getSearchFieldElement().type(`${text} {enter}`);
    }

    public clickOnWhereToBeginLink() {
        cy.get("a").contains("Not Sure Where To Begin?").click();
    }

    public getDarkPageModeElement() {
        return cy.get("a[onmouseover='mouseoverdarkicon()']");
    }

    public clickOnDarkPageModeElement() {
        this.getDarkPageModeElement().click();
    }

    public clickOnDarkPageModeOption(option: DARK_PAGE_OPTIONS) {
        this.getDarkPageModeElement().trigger("mouseover");
        cy.get("label").contains(option).click();
    }

    public getPageBodyElement() {
        return cy.get("body");
    }

    public waitForActiveTopBarItemToHaveText(text: string) {
        cy.get('a[class="w3-bar-item w3-button active"]').contains(text, { matchCase: false });
    }
}
