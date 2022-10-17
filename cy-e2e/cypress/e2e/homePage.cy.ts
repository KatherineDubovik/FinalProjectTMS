import { PageFactory } from "../support/pages/pageFactory";
import { DARK_PAGE_CLASSES, DARK_PAGE_OPTIONS, PAGES, TUTORIALS } from "../support/types/types";

describe("Tests for www.w3schools.com site - Home Page", () => {
    const homePage = PageFactory.getPage(PAGES.HOME);

    beforeEach(() => {
        homePage.visitPage();
    });

    it('Should follow the "Where to begin" page', () => {
        homePage.clickOnWhereToBeginLink();
        homePage.getPageUrl().should("include", "/where_to_start.asp");
        homePage.waitForPageTitleToIncludeText("W3Schools - How To Become a Web Developer");
    });

    for(const tutorial in TUTORIALS) {
        const tutorialTitle = TUTORIALS[tutorial as keyof typeof TUTORIALS];
        it(`Should follow "${tutorialTitle} tutorial" page when entering "${tutorialTitle}" value at search field`, () => {
            homePage.searchTutorialsByText(tutorialTitle);
            homePage.waitForPageTitleToIncludeText(`${tutorialTitle} Tutorial`);
            homePage.waitForActiveTopBarItemToHaveText(tutorialTitle);
        });
    }

    it(`Should "${DARK_PAGE_OPTIONS.DARK_MODE}" and "${DARK_PAGE_OPTIONS.DARK_CODE}" options to be turned off by default`, () => {
        homePage.getPageBodyElement().should("not.have.class", DARK_PAGE_CLASSES.DARK_BOTH);
    });

    for(const option in DARK_PAGE_OPTIONS) {
        const optionTitle = DARK_PAGE_OPTIONS[option as keyof typeof DARK_PAGE_OPTIONS];
        const optionClass = DARK_PAGE_CLASSES[option as keyof typeof DARK_PAGE_CLASSES];
        it(`Should turn on "${optionTitle}" option for page by clicking on the "${optionTitle}" checkbox`, () => {
            homePage.clickOnDarkPageModeOption(optionTitle);
            homePage.getPageBodyElement().should("have.class", optionClass);
        });
    }

    it(`Should turn on both "${DARK_PAGE_OPTIONS.DARK_MODE}" and "${DARK_PAGE_OPTIONS.DARK_CODE}" options by clicking on dark page mode icon`, () => {
        homePage.clickOnDarkPageModeElement();
        homePage.getPageBodyElement().should("have.class", DARK_PAGE_CLASSES.DARK_BOTH);
    });
});
