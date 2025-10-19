import BasePage from './basePage';


class RegisterPage extends BasePage{
    constructor() {
        super();
        this.url = Cypress.env("baseUrl");

        this.title = 'app-register h1';
        this.emailField = '#emailControl';
        this.passwordField = '#passwordControl';
        this.repeatPasswordField = '#repeatPasswordControl';
        this.securityQuestionDropdown = '[name="securityQuestion"]';
        this.securityQuestion =  (index) => `#cdk-overlay-2 #mat-option-${index}`;
        this.dropDown = 'div[role="listbox"]';
        this.securityAnswerField = '#securityAnswerControl';
        this.registerButton = '#registerButton';
        this.successSnackBar = 'simple-snack-bar';
        this.emailError = 'mat-form-field:has(#emailControl) mat-error';
        this.passwordError = 'mat-form-field:has(#passwordControl) mat-error';
        this.repeatPasswordError = 'mat-form-field:has(#repeatPasswordControl) mat-error';
        this.securityAnswerError = 'mat-form-field:has(#securityAnswerControl) mat-error';
        this.unique = this.title
    }

    waitForScreenIsReady() {
        this.isDisplayed({
            selector: this.unique
        })
        return this;
    }

    waitForScreenIsAbsent() {
        this.isAbsent({
            selector: this.unique
        })
        return this;
    }

    open() {
        cy.visit(this.url + "/register");
        cy.get('.close-dialog').click();
        return this;
    }

    fillRegistrationFormAndSubmit({ email, password, repeatPassword, securityAnswer }) {
        this.fillRegistrationForm({ email, password, repeatPassword, securityAnswer });
        this.selectSecurityQuestion();
        this.clickRegisterButton();
        return this;
    }

    fillRegistrationForm({ email, password, repeatPassword, securityAnswer }) {
        if (email) {
            cy.get(this.emailField).clear().type(email);
        } else if (email === "") {
            cy.get(this.emailField).clear();
        }
        if (password) {
            cy.get(this.passwordField).clear().type(password);
        } else if (password === "") {
            cy.get(this.passwordField).clear();
        }
        if (repeatPassword) {
            cy.get(this.repeatPasswordField).clear().type(repeatPassword);
        } else if (repeatPassword === "") {
            cy.get(this.repeatPasswordField).clear();
        }
        if (securityAnswer) {
            cy.get(this.securityAnswerField).clear().type(securityAnswer);
        } else if (securityAnswer === "") {
            cy.get(this.securityAnswerField).clear();
        }
        return this;
    }

    selectSecurityQuestion(questionText = "Mother's maiden name?") {
        cy.get(this.securityQuestionDropdown).click();
        cy.get(this.dropDown).contains(questionText).click();
        cy.get(this.dropDown).should('not.exist');
        return this;
    }

    clickRegisterButton() {
        cy.get(this.registerButton).click();
        return this;
    }

    isRegisterButtonEnabled() {
        cy.get(this.registerButton).should('be.enabled');
    }

    isRegisterButtonDisabled() {
        cy.get(this.registerButton).should('be.disabled');
    }

    verifyEmailErrorText() {
        this.verifyElement(this.emailError, {
            text: this.getExpectedData().emailError,
            color: 'rgb(255, 87, 34)'
        })
        return this
    }

    verifyPassordErrorText() {
        this.verifyElement(this.passwordError, {
            text: this.getExpectedData().passwordError,
            color: 'rgb(255, 87, 34)'
        })
        return this
    }

    verifyRepeatPassordErrorText() {
        this.verifyElement(this.repeatPasswordError, {
            text: this.getExpectedData().repeatPasswordError,
            color: 'rgb(255, 87, 34)'
        })
        return this
    }

    verifySecurityAnswerErrorText() {
        this.verifyElement(this.securityAnswerError, {
            text: this.getExpectedData().securityAnswerError,
            color: 'rgb(255, 87, 34)'
        })
        return this
    }

    waitForDropDownAbsent() {
        cy.get(this.dropDown).should('not.exist');
        return this;
    }

    isRegistrationSuccessful() {
        this.verifyElement(this.successSnackBar, { text: this.getExpectedData().successSnackBar });
        return this;
    }

    getExpectedData() {
        return {
            title: "User Registration",
            emailPlaceholder: "Email",
            passwordPlaceholder: "Password",
            repeatPasswordPlaceholder: "Repeat Password",
            securityQuestionLabel: "Security Question",
            securityAnswerPlaceholder: "Answer",
            registerButtonText: "Register",
            emailError: "Please provide an email address.",
            passwordError: "Please provide a password.",
            repeatPasswordError: "Please repeat your password. Passwords do not match",
            securityAnswerError: "Please provide an answer to your security question.",
            successSnackBar: "Registration completed successfully. You can now log in. X"
        };
    }

}

export default RegisterPage;
