/* eslint-disable @typescript-eslint/no-empty-function */
import { FIELDS } from "../support/types";

export class SignUpForm {
    constructor() { }

    checkFieldToBeEmpty(value: string) {
        return value === "" ? true : false;
    }

    checkEmailValueToBeValid(email: string) {
        const re = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,6})$/;
        return re.test(email);
    }

    checkPasswordValueToBeValid(password: string) {
        const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})");
        return re.test(password);
    }
    
    showEmptyFieldErrorMessage(field: FIELDS) {
        return `${field} field can not be empty`;
    }

    showValidValueSuccessMessage(field: FIELDS) {
        return `${field} is valid!`;
    }

    showInvalidValueErrorMessage(field: FIELDS) {
        switch(field) {
            case FIELDS.EMAIL:
                return "Email is not valid. Please, try again";
            case FIELDS.PASSWORD:
                return "Password must be at least 8 characters including at least 1 lowercase and 1 uppercase letters, 1 number and 1 special character";
            case FIELDS.CONFIRM_PASSWORD:
                return "Passwords do not match. Please, try again";
        }
    }

    validateEmailField(email: string) {
        email = email.trim();
        if (this.checkFieldToBeEmpty(email)) {
            return this.showEmptyFieldErrorMessage(FIELDS.EMAIL);
        } else if (!this.checkEmailValueToBeValid(email)) {
            return this.showInvalidValueErrorMessage(FIELDS.EMAIL);
        } else {
            return this.showValidValueSuccessMessage(FIELDS.EMAIL);
        }
    }

    validatePasswordField(password: string) {
        if (this.checkFieldToBeEmpty(password)) {
            return this.showEmptyFieldErrorMessage(FIELDS.PASSWORD);
        } else if (!this.checkPasswordValueToBeValid(password)) {
            return this.showInvalidValueErrorMessage(FIELDS.PASSWORD);
        } else {
            return this.showValidValueSuccessMessage(FIELDS.PASSWORD);
        }
    }

    validateConfirmPasswordField(password: string, confirmPassword: string) {
        if (this.checkFieldToBeEmpty(confirmPassword)) {
            return this.showEmptyFieldErrorMessage(FIELDS.CONFIRM_PASSWORD);
        } else if (!(password === confirmPassword)) {
            return this.showInvalidValueErrorMessage(FIELDS.CONFIRM_PASSWORD);
        } else {
            return this.showValidValueSuccessMessage(FIELDS.CONFIRM_PASSWORD);
        }
    }
}
