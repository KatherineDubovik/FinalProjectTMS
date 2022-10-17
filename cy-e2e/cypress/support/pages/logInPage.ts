import { FORM_TITLES } from "../types/types";
import { HomePage } from "./homePage";


export class LogInPage extends HomePage {
    constructor() {
        super();
        this.url = "https://profile.w3schools.com/log-in";
    }

    public switchBetweenSignUpLogInForms(formTitle: FORM_TITLES.LOG_IN | FORM_TITLES.SIGN_UP) {
        cy.get("div[class='EmailInput_label_wrapper__83g-2 -fif_label_wrp'] > span > span").contains(formTitle).click();
    }

    public getFormTitleElement() {
        return cy.get("div.LoginModal_modal_inner__zNxJo > div > h1");
    }

    public clickOnSubmitFormButton() {
        cy.get(".Button_primary__d2Jt3").click();
    }

    public getEmailInputElement() {
        return cy.get("input[name='email']");
    }

    public getPasswordInputElement() {
        return cy.get(".PasswordInput_input_field__EWMIU");
    }

    public enterValueToEmailField(value: string) {
        this.getEmailInputElement().type(value);
    }

    public enterValueToPasswordField(value: string) {
        this.getPasswordInputElement().type(value);
    }

    public getEmailFieldErrorMessageElement() {
        return cy.get("div.EmailInput_input_wrapper__taDTk > span");
    }

    public getEmailInputValidationIcon() {
        return this.getEmailInputElement().next();
    }

    public getShowHidePasswordButtonElement() {
        return cy.get("div[class='PasswordInput_label_wrapper__nvF4r -fif_label_wrp'] > span");
    }

    public clickOnShowHidePasswordButton() {
        this.getShowHidePasswordButtonElement().click();
    }

    public getPasswordRequirementElementByInnerText(text: string) {
        return cy.get("div[class='ValidationHelper_pwd_validation__SD+qY'] > li").contains(text);
    }
}
