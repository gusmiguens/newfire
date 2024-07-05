/// <reference types="cypress" />
const url = Cypress.env("API_URL");

describe("OK", () => {
    before(() => cy.apiAuth());

    it("should be able to get all user's books", () => {
        cy.request({
            method: "GET",
            url: `${url}/BookStore/v1/Books`,
            headers: {
                Authorization: "Bearer " + Cypress.env("token"),
            },
        }).as("getBooks");
        cy.get("@getBooks").then((res) => {
            expect(res.status).to.eq(200);
            expect(res.body.books).to.have.length.greaterThan(0);
        });
    });

    it("should be able to get a specific user's book", () => {
        cy.fixture("getBook.json").then((book) => {
            cy.request({
                method: "GET",
                url: `${url}/BookStore/v1/Book?ISBN=${book.isbn}`,
                headers: {
                    Authorization: "Bearer " + Cypress.env("token"),
                },
            }).as("getBook");
            cy.get("@getBook").then((res) => {
                expect(res.status).to.eq(200);
                expect(res.body.author).eq(book.author);
            });
        });
    });
});
