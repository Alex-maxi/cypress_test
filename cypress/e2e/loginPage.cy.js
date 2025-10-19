import { pageFactory } from '../pegeObjects/pageFactory';

const { loginPage } = pageFactory;

const EMAIL = `test_${Date.now()}@juice.local`;
const PASSWORD = 'Test1234!';

describe('Login Page', function () {

    before(() => {
        cy.task('createUserIfNotExists', { email: EMAIL, password: PASSWORD });
    });

    it('Successful login of existing user.', function () {
        loginPage
            .open()
            .fillLoginFormAndSubmit({
                email: EMAIL,
                password: PASSWORD
            })
            .isLoginSuccessful()
    });

    it('State of Login button and error text.', function () {
        loginPage.open()
            .fillLoginForm({
                email: EMAIL,
                password: PASSWORD
            })
        loginPage
            .fillLoginForm({
                email: EMAIL,
                password: ""
            })
            .verifyPasswordErrorText()
            .isLoginButtonDisabled();
        loginPage
            .fillLoginForm({
                email: "",
                password: PASSWORD
            })
            .verifyEmailErrorText()
            .isLoginButtonDisabled();
    });

    it('Invalid credentials handling.', function () {
        loginPage
            .open()
            .fillLoginFormAndSubmit({
                email: "invalid@juice.local",
                password: "wrongPassword"
            })
            .verifyInvalidCredentialsErrorText();
    });

    it('Title observation.', function () {
        const expectedData = loginPage.getExpectedData();
        loginPage
            .open()
            .verifyElement(loginPage.title, { text: expectedData.title });
    });

});
