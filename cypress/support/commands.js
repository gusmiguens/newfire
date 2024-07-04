Cypress.Commands.add("login", (credentials = {}) => {
    const { username, password } = credentials;

    const _credentials = {
        username: username || Cypress.env("USER"),
        password: password || Cypress.env("PASS"),
    };

    cy.session(
        _credentials.username,
        () => {
            cy.visit("/user/login");
            cy.get("#email").type(`${_credentials.username}`);
            cy.get("#password1").type(`${_credentials.password}`);
            cy.get("[title='Login']").click();
            cy.location("pathname").should("eq", "/user/");
        },
        {
            cacheAcrossSpecs: true,
        }
    );
});
