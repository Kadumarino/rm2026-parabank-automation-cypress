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
  //"macbook-15",
  "desktop",
];

export function runForTamanhosDeTela(describeOrFn, testFn) {
  const hasTitle = typeof describeOrFn === 'string';
  const fn = hasTitle ? testFn : describeOrFn;

  tamanhoTelas.forEach((tamanho) => {
    // Quando chamado com título: runForTamanhosDeTela('titulo', fn)
    // Quando chamado sem título: runForTamanhosDeTela(fn) — usa describe nativo interno
    if (hasTitle) {
      describe(`${describeOrFn} - ${tamanho}`, () => {
        beforeEach(() => {
          cy.viewport(tamanho !== 'desktop' ? tamanho : 1920, 1080);
        });
        fn(tamanho);
      });
    } else {
      beforeEach(() => {
        cy.viewport(tamanho !== 'desktop' ? tamanho : 1920, 1080);
      });
      fn(tamanho);
    }
  });
}
