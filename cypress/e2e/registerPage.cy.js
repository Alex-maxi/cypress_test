import { pageFactory } from '../pegeObjects/pageFactory';

const { registerPage } = pageFactory;

const EMAIL = `test_${Date.now()}@juice.local`;
const PASSWORD = 'Test1234!';



describe('Register Page', function () {

  it('Successful registration of user.', function () {
    let expectedData = registerPage.getExpectedData();
    registerPage.open();
    registerPage.fillRegistrationFormAndSubmit({
      email: EMAIL,
      password: PASSWORD,
      repeatPassword: PASSWORD,
      securityAnswer: "qwert"
    });
    registerPage
      .waitForScreenIsAbsent()
      .isRegistrationSuccessful();
  })

  it('State of Register button and error text.', function () {
    registerPage.open();
    registerPage.fillRegistrationForm({
      email: EMAIL,
      password: PASSWORD,
      repeatPassword: PASSWORD,
      securityAnswer: "qwert"
    });
    registerPage.fillRegistrationForm({
      email: EMAIL,
      password: PASSWORD,
      repeatPassword: "",
      securityAnswer: "qwert"
    })
      .verifyRepeatPassordErrorText()
      .isRegisterButtonDisabled();
    registerPage.fillRegistrationForm({
      email: EMAIL,
      password: "",
      repeatPassword: PASSWORD,
      securityAnswer: "qwert"
    })
      .verifyPassordErrorText()
      .isRegisterButtonDisabled();
    registerPage.fillRegistrationForm({
      email: "",
      password: PASSWORD,
      repeatPassword: PASSWORD,
      securityAnswer: "qwert"
    })
      .verifyEmailErrorText()
      .isRegisterButtonDisabled();
    registerPage.fillRegistrationForm({
      email: EMAIL,
      password: PASSWORD,
      repeatPassword: PASSWORD,
      securityAnswer: ""
    })
      .verifySecurityAnswerErrorText()
      .isRegisterButtonDisabled();

  })

  it('Title observation.', function () {
    let expectedData = registerPage.getExpectedData();
    registerPage
      .open()
      .verifyElement(registerPage.title, { text: expectedData.title })
  })

})