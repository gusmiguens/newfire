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

Cypress.Commands.add("apiAuth", (credentials = {}) => {
    const url = Cypress.env("API_URL");

    const { username, password } = credentials;

    const _credentials = {
        userName: username || Cypress.env("API_USER"),
        password: password || Cypress.env("PASS"),
    };

    cy.request("POST", `${url}/Account/v1/GenerateToken`, _credentials).as(
        "token"
    );
    cy.get("@token").then((res) => {
        const token = res.body.token;
        Cypress.env("token", token);
    });
});
