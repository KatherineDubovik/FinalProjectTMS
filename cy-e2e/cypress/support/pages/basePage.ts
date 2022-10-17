export class BasePage {
    protected url!: string;

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() { }

    public getPageTitle() {
        return cy.title();
    }

    public waitForPageTitleToIncludeText(pageTitleText: string) {
        this.getPageTitle().should("include", pageTitleText);
    }

    public getPageUrl() {
        return cy.url();
    }

    public visitPage() {
        cy.visit(this.url);
    }
}
