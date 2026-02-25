Cypress.Commands.add('abrirContaComSucesso', () => {
    cy.get('#leftPanel > ul > :nth-child(1) > a').click();
    cy.get('#type').select('SAVINGS');
    cy.contains('SAVINGS').should('be.visible');
    cy.get('#fromAccountId').select(0);
    cy.get('input[value="Open New Account"]').click();
    cy.contains('Account Opened!').should('be.visible');
    
    // Captura o número da conta gerado dinamicamente usando o ID do elemento
    cy.get('#newAccountId')
        .should('be.visible')
        .invoke('text')
        .then((numeroConta) => {
            cy.wrap(numeroConta.trim()).as('numeroConta');
            cy.log(`Conta criada: ${numeroConta.trim()}`);
        });
});