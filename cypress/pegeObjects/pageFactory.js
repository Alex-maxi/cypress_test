import LoginPage from './loginPage';
import RegisterPage from './registerPage';

class PageFactory {
    constructor() {
        this.loginPage = new LoginPage();
        this.registerPage = new RegisterPage();
    }
}

export const pageFactory = new PageFactory();
