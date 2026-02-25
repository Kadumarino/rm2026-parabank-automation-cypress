Cypress.Commands.add('excluirConta', () => {
    cy.get('.leftmenu > :nth-child(6) > a').click();
    cy.contains('Administration').should('be.visible');
    cy.get(':nth-child(2) > :nth-child(1) > [name="accessMode"]').click();
    cy.get('.button').contains('CLEAN').click();
    cy.contains('Database Cleaned').should('be.visible');
    cy.get('#adminForm > .button').click();
    cy.contains('Settings saved successfully.').should('be.visible');

});