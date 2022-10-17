import { JavaScriptTutorialPage } from "../support/pages/javaScriptTutorialPage";
import { PageFactory } from "../support/pages/pageFactory";
import { PAGES, SWITCH_PAGES_BUTTONS, TUTORIALS } from "../support/types/types";

describe("Tests for www.w3schools.com site - JavaScript Tutorial Page", () => {
    const javaScriptTutorialPage = PageFactory.getPage(PAGES.JS_TUTORIAL) as JavaScriptTutorialPage;

    before(() => {
        javaScriptTutorialPage.visitPage();
    });

    it(`Should highlight ${TUTORIALS.JAVASCRIPT} item as active at top navigation bar`, () => {
        javaScriptTutorialPage.waitForActiveTopBarItemToHaveText(TUTORIALS.JAVASCRIPT);
    });

    it(`Should highlight first item as active by default at sidebar`, function () {
        this.indexElement = 0;
        javaScriptTutorialPage.waitForSideBarElementToBeActive(this.indexElement);
    });

    it(`Should follow the next tutorial page by clicking on the ${SWITCH_PAGES_BUTTONS.NEXT} button`, function () {
        javaScriptTutorialPage.clickOnTheNextPrevButtons(SWITCH_PAGES_BUTTONS.NEXT);
        this.indexElement += 1;
        javaScriptTutorialPage.waitForSideBarElementToBeActive(this.indexElement);
    });

    it(`Should follow the previous tutorial page by clicking on the ${SWITCH_PAGES_BUTTONS.PREV} button`, function () {
        javaScriptTutorialPage.clickOnTheNextPrevButtons(SWITCH_PAGES_BUTTONS.PREV);
        this.indexElement -= 1;
        javaScriptTutorialPage.waitForSideBarElementToBeActive(this.indexElement);
    });

    it(`Should follow ${PAGES.HOME} page by clicking on the Home icon at top navigation bar`, () => {
        javaScriptTutorialPage.clickOnHomePageIconAtTopNavBar();
        javaScriptTutorialPage.waitForPageTitleToIncludeText("W3Schools Online Web Tutorials");
    });
});
