/// <reference types="cypress" />
import "cypress-each";
import testCases from "../../fixtures/loginScenarios.json";

describe("Login tests", { testIsolation: true }, () => {
    describe("Non successfull login scenarios", () => {
        beforeEach(() => cy.visit("/user/login"));

        it.each(testCases)(
            (testCase) =>
                `should not be able to continue with ${testCase.description}`,
            (testCase) => {
                cy.get("#email").clear().type(testCase.user);
                cy.get("#password1").clear().type(testCase.password);
                cy.get("[title='Login']").click();
                cy.get(".message").should("have.text", testCase.message);
            }
        );
    });

    describe("Successfull login", () => {
        beforeEach(() => cy.visit("/user/login"));

        it("should be able to login with correct credentials", () => {
            cy.intercept("/user/login").as("login");
            cy.get("#email").clear().type(Cypress.env("USER"));
            cy.get("#password1").clear().type(Cypress.env("PASS"));
            cy.get("[title='Login']").click();
            cy.wait("@login").then((interception) =>
                expect(interception.response.statusCode).equal(302)
            );
            cy.location("pathname").should("eq", "/user/");
        });
    });

    describe("Forgot password", () => {
        it("should be able to go to forgot password page", () => {
            cy.visit("/user/login");
            cy.get("[title='Reset Password']").click();
            cy.location("pathname").should("eq", "/user/forgot-password");
            cy.get("h3").should("have.text", "Forgot your password?");
        });

        it("should be able to reset password", () => {
            cy.visit("/user/forgot-password");
            cy.get("#email").clear().type(Cypress.env("USER"));
            cy.get("[title='Reset Password']").click();
            cy.get(".message").should(
                "have.text",
                "Password reset instructions sent to your email. Please check it."
            );
            cy.location("pathname").should("eq", "/user/forgot-password");
        });

        it("should not be able to reset password with a wrong user", () => {
            cy.visit("/user/forgot-password");
            cy.get("#email").clear().type("wronguser@gmail.com");
            cy.get("[title='Reset Password']").click();
            cy.get(".message").should(
                "have.text",
                "User not found. Please register to login."
            );
        });
    });
});
