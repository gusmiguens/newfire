class LoginPage {
    elements = {
        usernameInput: () => cy.get("#email"),
        passwordInput: () => cy.get("#password1"),
        loginBtn: () => cy.get("[title='Login']"),
        forgotPassword: () => cy.get("[title='Reset Password']"),
        message: () => cy.get(".message"),
        pageTitle: () => cy.get("h3"),
    };

    enterUsername(username) {
        this.elements.usernameInput().clear().type(username);
    }

    enterPassword(password) {
        this.elements.passwordInput().clear().type(password);
    }

    clickLoginButton() {
        this.elements.loginBtn().click();
    }

    clickforgotPassword() {
        this.elements.forgotPassword().click();
    }
}

export default LoginPage;
