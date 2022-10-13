import { PAGES } from "../types/types";
import { HomePage } from "./homePage";
import { JavaScriptTutorialPage } from "./javaScriptTutorialPage";

export class PageFactory {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() { }

    static getPage(pageName: PAGES) {
        switch (pageName) {
            case PAGES.HOME:
                return new HomePage();
            case PAGES.JS_TUTORIAL:
                return new JavaScriptTutorialPage();
            default:
                return new HomePage();
        }
    }
}
