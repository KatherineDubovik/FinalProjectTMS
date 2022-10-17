import { FIELDS } from "unit/support/types";
import { LogInPage } from "../support/pages/logInPage";
import { PageFactory } from "../support/pages/pageFactory";
import { invalidEmails, invalidPasswords, validCreds, validEmails } from "../support/testData/testData";
import { FORM_TITLES, PAGES, PASSWORD, PASSWORD_REQUIREMENTS } from "../support/types/types";

describe("Tests for www.w3schools.com site - Log in Page", () => {
    const logInPage = PageFactory.getPage(PAGES.LOG_IN) as LogInPage;

    before(() => {
        logInPage.visitPage();        
    });

    it(`Should switch to ${FORM_TITLES.SIGN_UP} form`, () => {
        logInPage.switchBetweenSignUpLogInForms(FORM_TITLES.SIGN_UP);
        logInPage.getFormTitleElement().should("have.text", FORM_TITLES.SIGN_UP);
    });

    invalidEmails.forEach((email) => {
        it(`Should display error message when user enters invalid email "${email}"`, () => {
            logInPage.enterValueToEmailField(email);
            logInPage.clickOnSubmitFormButton();
            logInPage.getEmailFieldErrorMessageElement().should("have.text", "Looks like you forgot something");
            logInPage.getEmailInputElement().clear()
        });
    });

    validEmails.forEach((email) => {
        it(`Should display green checkmark at ${FIELDS.EMAIL} field when user enters valid email "${email}"`, () => {
            logInPage.enterValueToEmailField(email);
            logInPage.clickOnSubmitFormButton();
            logInPage.getEmailInputElement().should("not.have.class", "EmailInput_invalid__JpUbv");
            logInPage.getEmailInputValidationIcon().should("have.attr", "fill", "none");
            logInPage.getEmailInputElement().clear();
        });
    });

    it("Should mask entered password by default", () => {
        logInPage.getShowHidePasswordButtonElement().should("include.text", PASSWORD.SHOW_BUTTON);
        logInPage.getPasswordInputElement().should("have.attr", "type", PASSWORD.HIDDEN_ATTR);
    });


    it(`Should unmask entered password by clicking on "${PASSWORD.SHOW_BUTTON}" button`, () => {
        logInPage.clickOnShowHidePasswordButton();
        logInPage.getShowHidePasswordButtonElement().should("include.text", PASSWORD.HIDE_BUTTON);
        logInPage.getPasswordInputElement().should("have.attr", "type", PASSWORD.SHOWN_ATTR);
    });

    for(const item in invalidPasswords) {
        const password = invalidPasswords[item as keyof typeof invalidPasswords];
        const req = PASSWORD_REQUIREMENTS[item.toUpperCase() as keyof typeof PASSWORD_REQUIREMENTS];
        it(`Should leave highlighted missed requirement "${req}" for invalid password (without ${item}) - ${password}`, () => {
            logInPage.enterValueToPasswordField(password);
            logInPage.getPasswordRequirementElementByInnerText(req).should("have.class", "ValidationElement_invalid__+jaJI");
            logInPage.getPasswordInputElement().clear();
        });
    }

    it(`Should go to "${FORM_TITLES.ENTER_NAME}" registration step when user enters valid email and password`, () => {
        logInPage.enterValueToEmailField(validCreds.email);
        logInPage.enterValueToPasswordField(validCreds.password);
        logInPage.clickOnSubmitFormButton();
        logInPage.getFormTitleElement().should("have.text", FORM_TITLES.ENTER_NAME);
    });
});
