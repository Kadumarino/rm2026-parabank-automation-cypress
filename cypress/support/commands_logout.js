Cypress.Commands.add('logout', () => {
    cy.contains('Log Out').click();
    cy.contains('Customer Login').should('be.visible');
});