/// <reference types="cypress" />

describe("Welcome page tests", () => {
    before(() => cy.login());
    beforeEach(() => cy.visit("/user/login"));

    it("should see manage your account options", () => {
        cy.get("h5").first().should("have.text", "Welcome John Doe");
        cy.get("[title='My Account Information']").should(
            "have.attr",
            "href",
            "profile"
        );
        cy.get("[title='My Locations']").should(
            "have.attr",
            "href",
            "my-locations"
        );
        cy.get("[title='My Orders']").should("have.attr", "href", "my-orders");
        cy.get("[title='My Batch Geocodes']").should(
            "have.attr",
            "href",
            "my-batch-geocodes"
        );
        cy.get("[title='My Batch Reverse Geocodes']").should(
            "have.attr",
            "href",
            "my-batch-reverse-geocodes"
        );
    });

    it("should be able to logout", () => {
        cy.get("[title='User Logout']")
            .should("have.attr", "href", "logout")
            .click();
        cy.location("pathname").should("eq", "/user/login");
    });
});
