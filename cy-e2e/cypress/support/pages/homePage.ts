import { BasePage } from "./basePage";
import "cypress-iframe";
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

    public changeSiteLanguage(language: string) {
        this.getCurrentSiteLanguageElement().click();
        cy.frameLoaded("iframe[class='goog-te-menu-frame skiptranslate']");
        cy.iframe("iframe[class='goog-te-menu-frame skiptranslate']")
        .find("a[class='goog-te-menu2-item']")
        .contains(language)
        .click();
    }

    public getCurrentSiteLanguageElement() {
        cy.get("a[title='Translate W3Schools']").click();
        return cy.get(".goog-te-menu-value > span").first();
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
        return cy.get("body")
    }
}