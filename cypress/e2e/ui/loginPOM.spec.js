/// <reference types="cypress" />
import "cypress-each";
import LoginPage from "../../pageObjects/loginPage";
import testCases from "../../fixtures/loginScenarios.json";

describe("Login tests", { testIsolation: true }, () => {
    const loginPage = new LoginPage();

    describe("Non successfull login scenarios", () => {
        beforeEach(() => cy.visit(`/user/login`));

        it.each(testCases)(
            (testCase) =>
                `should not be able to continue with ${testCase.description}`,
            (testCase) => {
                loginPage.enterUsername(testCase.user);
                loginPage.enterPassword(testCase.password);
                loginPage.clickLoginButton();
                loginPage.elements
                    .message()
                    .should("have.text", testCase.message);
            }
        );
    });

    describe("Successfull login", () => {
        beforeEach(() => cy.visit(`/user/login`));

        it("should be able to login with correct credentials", () => {
            cy.intercept("/user/login").as("login");
            loginPage.enterUsername(Cypress.env("USER"));
            loginPage.enterPassword(Cypress.env("PASS"));
            loginPage.clickLoginButton();
            cy.wait("@login").then((interception) =>
                expect(interception.response.statusCode).equal(302)
            );
            cy.location("pathname").should("eq", "/user/");
        });
    });

    describe("Forgot password", () => {
        it("should be able to go to forgot password page", () => {
            cy.visit("/user/login");
            loginPage.clickforgotPassword();
            cy.location("pathname").should("eq", "/user/forgot-password");
            loginPage.elements
                .pageTitle()
                .should("have.text", "Forgot your password?");
        });

        it("should be able to reset password", () => {
            cy.visit("/user/forgot-password");
            loginPage.enterUsername(Cypress.env("USER"));
            loginPage.clickforgotPassword();
            loginPage.elements
                .message()
                .should(
                    "have.text",
                    "Password reset instructions sent to your email. Please check it."
                );
            cy.location("pathname").should("eq", "/user/forgot-password");
        });

        it("should not be able to reset password with a wrong user", () => {
            cy.visit("/user/forgot-password");
            loginPage.enterUsername("wronguser@gmail.com");
            loginPage.clickforgotPassword();
            loginPage.elements
                .message()
                .should(
                    "have.text",
                    "User not found. Please register to login."
                );
        });
    });
});
