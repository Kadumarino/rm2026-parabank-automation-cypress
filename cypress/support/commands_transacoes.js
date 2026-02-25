import { getDataAtual } from "./utils";

Cypress.Commands.add("procurarTransacaoEnviada", () => {
  cy.get('a[href="findtrans.htm"]').contains("Find Transactions").click();
  cy.get("#transactionDate").type(getDataAtual());
  cy.get("#findByDate").click();
  cy.contains("Transaction Results").should("be.visible");
  cy.contains("Funds Transfer Sent").click();
  cy.contains("Transaction Details").should("be.visible");
  cy.get("tbody > :nth-child(1) > :nth-child(2)")
    .invoke("text")
    .then((transactionId) => {
      cy.log(`ID da transação: ${transactionId.trim()}`);
      cy.contains(`Transaction ID: ${transactionId.trim()}`).should(
        "be.visible",
      );
      cy.contains(`Date: ${getDataAtual()}`).should("be.visible");
      cy.get(":nth-child(4) > :nth-child(2)")
        .invoke("text")
        .then((typePay) => {
          cy.log(`Tipo de pagamento: ${typePay.trim()}`);
          cy.get(":nth-child(5) > :nth-child(2)")
            .invoke("text")
            .then((ammount) => {
              cy.contains(`Amount: ${ammount.trim()}`).should("be.visible");
              cy.log(`Valor da transação: ${ammount.trim()}`);
            });
        });
    });
});
