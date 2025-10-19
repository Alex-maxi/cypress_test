import BasePage from './basePage';

class LoginPage extends BasePage {
    constructor() {
        super();
        this.url = Cypress.env("baseUrl");

        this.title = 'app-login h1';
        this.emailField = '#email';
        this.passwordField = '#password';
        this.loginButton = '#loginButton';
        this.rememberMeCheckbox = '#rememberMe';
        this.successSnackBar = 'simple-snack-bar';
        this.emailError = 'mat-form-field:has(#email) mat-error';
        this.passwordError = 'mat-form-field:has(#password) mat-error';
        this.invalidCredentials = '.error',
        this.unique = this.title;
    }

    waitForScreenIsReady() {
        this.isDisplayed({ selector: this.unique });
        return this;
    }

    waitForScreenIsAbsent() {
        this.isAbsent({ selector: this.unique });
        return this;
    }

    open() {
        cy.visit(this.url + "/login");
        cy.get('.close-dialog').click({ force: true });
        return this;
    }

    fillLoginForm({ email, password, rememberMe = false }) {
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
        if (rememberMe) {
            cy.get(this.rememberMeCheckbox).check({ force: true });
        }
        return this;
    }

    clickLoginButton() {
        cy.get(this.loginButton).click();
        return this;
    }

    fillLoginFormAndSubmit({ email, password, rememberMe = false }) {
        this.fillLoginForm({ email, password, rememberMe });
        this.clickLoginButton();
        return this;
    }

    isLoginButtonEnabled() {
        cy.get(this.loginButton).should('be.enabled');
        return this;
    }

    isLoginButtonDisabled() {
        cy.get(this.loginButton).should('be.disabled');
        return this;
    }

    verifyInvalidCredentialsErrorText() {
        this.verifyElement(this.invalidCredentials, {
            text: this.getExpectedData().invalidCredentials,
            color: 'rgb(255, 87, 34)'
        });
        return this;
    }

    verifyEmailErrorText() {
        this.verifyElement(this.emailError, {
            text: this.getExpectedData().emailError,
            color: 'rgb(255, 87, 34)'
        });
        return this;
    }

    verifyPasswordErrorText() {
        this.verifyElement(this.passwordError, {
            text: this.getExpectedData().passwordError,
            color: 'rgb(255, 87, 34)'
        });
        return this;
    }

    isLoginSuccessful() {
        this.waitForScreenIsAbsent();
        return this;
    }

    getExpectedData() {
        return {
            title: "Login",
            emailPlaceholder: "Email",
            passwordPlaceholder: "Password",
            loginButtonText: "Log in",
            emailError: "Please provide an email address.",
            passwordError: "Please provide a password.",
            successSnackBar: "Login successful. Welcome back! X",
            invalidCredentials: "Invalid email or password."
        };
    }
}

export default LoginPage;
