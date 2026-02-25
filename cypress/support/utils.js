// Retorna a data vigente no formato dd/MM/yyyy
export function getDataAtual() {
    const dataAtual = new Date();
    const dia = String(dataAtual.getDate()).padStart(2, '0');
    const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const ano = dataAtual.getFullYear();
    return `${mes}-${dia}-${ano}`;

}

// Valida tamanhos de tela para testes responsivos
export const tamanhoTelas = [
  // "iphone-6",
  // "ipad-2",
  // "samsung-note9",
  // "macbook-15",
  "desktop",
];

export function runForTamanhosDeTela(describeTitle, testFn) {
  tamanhoTelas.forEach((tamanho) => {
    describe(`${describeTitle} - ${tamanho}`, () => {
      beforeEach(() => {
        cy.viewport(tamanho !== "desktop" ? tamanho : 1920, 1080);
      });
      testFn(tamanho);
    });
  });
}
