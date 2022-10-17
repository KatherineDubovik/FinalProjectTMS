import { SignUpForm } from "../src/signUpForm";
import { FIELDS } from "../support/types";
import { expect } from "chai";

const signUpForm = new SignUpForm;

describe("Tests for Sign Up form", () => {
    describe(`Tests for "${FIELDS.EMAIL}" field`, () => {
        before(function() {
            this.valid = signUpForm.showValidValueSuccessMessage(FIELDS.EMAIL);
            this.invalid = signUpForm.showInvalidValueErrorMessage(FIELDS.EMAIL);
            this.empty = signUpForm.showEmptyFieldErrorMessage(FIELDS.EMAIL);
        });

        it("Should display success message for valid email (with lowercase letters)", function() {
            expect(signUpForm.validateEmailField("matthew@test.com")).to.equal(this.valid);
        });

        it("Should display success message for valid email (with uppercase letters)", function() {
            expect(signUpForm.validateEmailField("MATTHEW@TEST.COM")).to.equal(this.valid);
        });

        it("Should display success message for valid email (with numbers)", function() {
            expect(signUpForm.validateEmailField("andrew1970@test.com")).to.equal(this.valid);
        });

        it("Should display error message for empty Email field", function() {
            expect(signUpForm.validateEmailField("")).to.equal(this.empty);
        });

        it("Should display error message for empty Email field with spaces", function() {
            expect(signUpForm.validateEmailField("         ")).to.equal(this.empty);
        });
        
        it("Should display error message for invalid email (without '@')", function() {
            expect(signUpForm.validateEmailField("andrewtest.com")).to.equal(this.invalid);
        });

        it("Should display error message for invalid email (without domain part)", function() {
            expect(signUpForm.validateEmailField("andrew@")).to.equal(this.invalid);
        });

        it("Should display error message for invalid email (without local part)", function() {
            expect(signUpForm.validateEmailField("@test.com")).to.equal(this.invalid);
        });
    });


    describe(`Tests for "${FIELDS.PASSWORD}" field`, () => {
        before(function() {
            this.valid = signUpForm.showValidValueSuccessMessage(FIELDS.PASSWORD);
            this.invalid = signUpForm.showInvalidValueErrorMessage(FIELDS.PASSWORD);
            this.empty = signUpForm.showEmptyFieldErrorMessage(FIELDS.PASSWORD);
        });

        it("Should display success message for valid password (8 characters)", function() {
            expect(signUpForm.validatePasswordField("PSSwrd1$")).to.equal(this.valid);
        });

        it("Should display success message for valid password (9 characters)", function() {
            expect(signUpForm.validatePasswordField("PSSword1$")).to.equal(this.valid);
        });

        it("Should display success message for valid long password (20 characters)", function() {
            expect(signUpForm.validatePasswordField("EnterLongPassword$20")).to.equal(this.valid);
        });

        it("Should display error message for empty password", function() {
            expect(signUpForm.validatePasswordField("")).to.equal(this.empty);
        });

        it("Should display error message for invalid password (7 characters)", function() {
            expect(signUpForm.validatePasswordField("PSSwr1$")).to.equal(this.invalid);
        });

        it("Should display error message for invalid password (without number)", function() {
            expect(signUpForm.validatePasswordField("PASSwrd$")).to.equal(this.invalid);
        });

        it("Should display error message for invalid password (without uppercase letter)", function() {
            expect(signUpForm.validatePasswordField("password1$")).to.equal(this.invalid);
        });

        it("Should display error message for invalid password (without lowercase letter)", function() {
            expect(signUpForm.validatePasswordField("PASSWORD1$")).to.equal(this.invalid);
        });

        it("Should display error message for invalid password (without special character)", function() {
            expect(signUpForm.validatePasswordField("password123")).to.equal(this.invalid);
        });
    });

    describe(`Tests for "${FIELDS.CONFIRM_PASSWORD}" field`, () => {
        before(function() {
            this.valid = signUpForm.showValidValueSuccessMessage(FIELDS.CONFIRM_PASSWORD);
            this.invalid = signUpForm.showInvalidValueErrorMessage(FIELDS.CONFIRM_PASSWORD);
            this.empty = signUpForm.showEmptyFieldErrorMessage(FIELDS.CONFIRM_PASSWORD);
        });

        it("Should display success message for matched passwords", function() {
            expect(signUpForm.validateConfirmPasswordField("PSSwrd1$", "PSSwrd1$")).to.equal(this.valid);
        });

        it("Should display error message for empty Confirm password field", function() {
            expect(signUpForm.validateConfirmPasswordField("PSSwrd1$", "")).to.equal(this.empty);
        });

        it("Should display error message for mismatched passwords", function() {
            expect(signUpForm.validateConfirmPasswordField("PSSwrd1$", "password")).to.equal(this.invalid);
        });
    });
});
