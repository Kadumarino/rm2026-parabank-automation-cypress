const XLSX = require('xlsx');

// =============================================
// ABA 1 - CENÁRIOS DE TESTE
// =============================================
const cenarios = [
  // CADASTRO
  ['CEN01', 'Cadastro de Usuário', 'Funcional',  'Validar cadastro com sucesso utilizando dados gerados dinamicamente (faker)',         'Alta',  'Sim', 'Cobre o fluxo principal de registro de novo usuário'],
  ['CEN02', 'Cadastro de Usuário', 'Funcional',  'Validar cadastro com sucesso utilizando dados estáticos do JSON de fixtures',         'Alta',  'Sim', 'Garante compatibilidade com dados fixos de homologação'],
  ['CEN03', 'Cadastro de Usuário', 'Negativo',   'Validar mensagens de erro ao submeter formulário de cadastro com campos obrigatórios em branco', 'Alta', 'Sim', 'Prevenção de registros inválidos na base de dados'],

  // LOGIN
  ['CEN04', 'Login',               'Funcional',  'Validar login com sucesso utilizando credenciais válidas',                            'Alta',  'Sim', 'Fluxo principal de acesso à aplicação'],
  ['CEN05', 'Login',               'Negativo',   'Validar mensagem de erro ao tentar login com senha incorreta',                        'Alta',  'Sim', 'Segurança: impede acesso com credenciais inválidas'],
  ['CEN06', 'Login',               'Funcional',  'Validar recuperação de conta via informações pessoais (Customer Lookup)',              'Média', 'Sim', 'Usabilidade: recuperação de acesso sem suporte humano'],

  // ABERTURA DE CONTA
  ['CEN07', 'Abertura de Conta',   'Funcional',  'Validar abertura de conta do tipo SAVINGS com sucesso e captura do número da conta',  'Alta',  'Sim', 'Fluxo principal bancário de criação de conta'],
  ['CEN08', 'Abertura de Conta',   'Regressão',  'Validar que conta aberta aparece na listagem de contas do usuário',                  'Média', 'Sim', 'Garantia de integridade após abertura de conta'],

  // TRANSFERÊNCIA DE FUNDOS
  ['CEN09', 'Transferência de Fundos', 'Funcional', 'Validar transferência de valores entre contas do mesmo usuário com sucesso',       'Alta',  'Sim', 'Fluxo principal de movimentação financeira'],
  ['CEN10', 'Transferência de Fundos', 'Negativo',  'Validar comportamento ao tentar transferir valor superior ao saldo disponível',    'Alta',  'Sim', 'Prevenção de saldo negativo e transações inválidas'],

  // CONSULTA DE TRANSAÇÕES
  ['CEN11', 'Consulta de Transações', 'Funcional', 'Validar consulta de transações por período e visualização do extrato',             'Média', 'Sim', 'Rastreabilidade e auditoria de operações financeiras'],

  // ATUALIZAÇÃO DE CADASTRO
  ['CEN12', 'Atualização de Cadastro', 'Funcional', 'Validar atualização de dados pessoais do perfil do usuário com sucesso',          'Média', 'Sim', 'Manutenção de dados cadastrais atualizados'],
  ['CEN13', 'Atualização de Cadastro', 'Negativo',  'Validar mensagem de erro ao submeter formulário de atualização com campos obrigatórios em branco', 'Baixa', 'Sim', 'Prevenção de dados inválidos no perfil'],

  // EXCLUSÃO DE CONTA
  ['CEN14', 'Exclusão de Conta',   'Funcional',  'Validar exclusão de conta com sucesso e remoção do usuário do sistema',              'Alta',  'Sim', 'Ciclo completo de vida de uma conta bancária'],
];

const cabecalhoCenarios = [
  'ID do Cenário', 'Funcionalidade', 'Tipo de Teste', 'Descrição do Cenário',
  'Prioridade', 'Pode ser automatizado?', 'Justificativa'
];

// =============================================
// ABA 2 - CASOS DE TESTE
// =============================================
const casos = [
  // CEN01
  ['CT01', 'CEN01', 'Usuário está na página inicial do ParaBank (/index.htm)',
   '1. Acessar /index.htm\n2. Clicar em "Register"\n3. Preencher todos os campos com dados gerados pelo faker\n4. Clicar em "Register"',
   'Dados gerados dinamicamente via faker (nome, sobrenome, endereço, CPF, usuário, senha)',
   'Exibe mensagem "Welcome [username]!" e redireciona para área logada',
   'Usuário criado com sucesso e redirecionado para o dashboard'],

  // CEN02
  ['CT02', 'CEN02', 'Usuário está na página inicial do ParaBank (/index.htm)',
   '1. Acessar /index.htm\n2. Clicar em "Register"\n3. Preencher todos os campos com dados do fixture criacao_de_cadastro.json\n4. Clicar em "Register"',
   'Dados estáticos do arquivo cypress/fixtures/criacao_de_cadastro.json',
   'Exibe mensagem "Welcome [username]!" e redireciona para área logada',
   'Usuário criado com sucesso utilizando dados fixos de homologação'],

  // CEN03
  ['CT03', 'CEN03', 'Usuário está na página inicial do ParaBank (/index.htm)',
   '1. Acessar /index.htm\n2. Clicar em "Register"\n3. Não preencher nenhum campo\n4. Clicar em "Register"',
   'Campos em branco',
   'Exibe mensagens de erro em todos os campos obrigatórios',
   'Sistema impede o cadastro e exibe validações de campo obrigatório'],

  // CEN04
  ['CT04', 'CEN04', 'Usuário cadastrado existe na base do ParaBank',
   '1. Acessar /index.htm\n2. Preencher username e password válidos\n3. Clicar em "Log In"',
   'username e password de usuário existente (fixtures/login_massivo.json)',
   'Exibe "Account Services" no painel lateral — usuário está autenticado',
   'Login realizado com sucesso e painel de serviços visível'],

  // CEN05
  ['CT05', 'CEN05', 'Usuário está na página inicial do ParaBank (/index.htm)',
   '1. Acessar /index.htm\n2. Preencher username válido e password incorreto\n3. Clicar em "Log In"',
   'username válido + password incorreto',
   'Exibe mensagem "Error! Please enter a username and password."',
   'Sistema bloqueia o acesso e exibe mensagem de erro'],

  // CEN06
  ['CT06', 'CEN06', 'Usuário cadastrado com dados pessoais completos no sistema',
   '1. Acessar /index.htm\n2. Clicar em "Forgot login info?"\n3. Preencher dados pessoais (nome, endereço, SSN)\n4. Clicar em "Find My Login Info"',
   'Dados pessoais do arquivo cypress/fixtures/recuperacao_de_conta.json',
   'Exibe "Your login information was located successfully." com o username',
   'Usuário consegue recuperar suas credenciais de acesso'],

  // CEN07
  ['CT07', 'CEN07', 'Usuário autenticado com pelo menos uma conta existente',
   '1. Fazer login\n2. Clicar em "Open New Account"\n3. Selecionar tipo SAVINGS\n4. Selecionar conta de origem\n5. Clicar em "Open New Account"',
   'Tipo de conta: SAVINGS; conta de origem: primeira disponível',
   'Exibe "Account Opened!" com o número da nova conta',
   'Nova conta SAVINGS criada com sucesso e número exibido na tela'],

  // CEN08
  ['CT08', 'CEN08', 'Usuário autenticado com conta SAVINGS criada',
   '1. Fazer login\n2. Clicar em "Accounts Overview"\n3. Verificar se a conta criada aparece na listagem',
   'Número de conta gerado no CEN07',
   'Conta aparece na listagem de contas do usuário',
   'Integridade dos dados: conta aberta visível no extrato de contas'],

  // CEN09
  ['CT09', 'CEN09', 'Usuário autenticado com duas contas e saldo disponível',
   '1. Fazer login\n2. Clicar em "Transfer Funds"\n3. Informar valor a transferir\n4. Selecionar conta de origem e destino\n5. Clicar em "Transfer"',
   'Valor: R$100; conta de origem: conta com saldo; conta destino: segunda conta',
   'Exibe "Transfer Complete!" com os detalhes da transação',
   'Transferência realizada com sucesso e confirmação exibida'],

  // CEN10
  ['CT10', 'CEN10', 'Usuário autenticado com saldo insuficiente na conta de origem',
   '1. Fazer login\n2. Clicar em "Transfer Funds"\n3. Informar valor superior ao saldo\n4. Clicar em "Transfer"',
   'Valor maior que o saldo disponível na conta',
   'Exibe mensagem de erro informando saldo insuficiente',
   'Sistema impede transação inválida por saldo insuficiente'],

  // CEN11
  ['CT11', 'CEN11', 'Usuário autenticado com movimentações na conta',
   '1. Fazer login\n2. Clicar em "Find Transactions"\n3. Selecionar período desejado\n4. Clicar em "Find Transactions"',
   'Período: mês atual',
   'Exibe listagem de transações do período com valores e descrições',
   'Extrato exibido corretamente com todas as movimentações do período'],

  // CEN12
  ['CT12', 'CEN12', 'Usuário autenticado na aplicação',
   '1. Fazer login\n2. Clicar em "Update Contact Info"\n3. Alterar dados (endereço, telefone)\n4. Clicar em "Update Profile"',
   'Novos dados do arquivo cypress/fixtures/atualizacao_registro.json',
   'Exibe "Profile Updated Successfully!"',
   'Dados pessoais atualizados com sucesso no perfil do usuário'],

  // CEN13
  ['CT13', 'CEN13', 'Usuário autenticado na aplicação',
   '1. Fazer login\n2. Clicar em "Update Contact Info"\n3. Apagar campos obrigatórios\n4. Clicar em "Update Profile"',
   'Campos obrigatórios em branco',
   'Exibe mensagens de erro nos campos obrigatórios',
   'Sistema impede atualização com dados inválidos'],

  // CEN14
  ['CT14', 'CEN14', 'Usuário autenticado com conta ativa',
   '1. Fazer login como admin ou usuário autorizado\n2. Navegar até opção de exclusão\n3. Confirmar exclusão da conta',
   'Usuário com conta ativa no sistema',
   'Conta removida do sistema e usuário redirecionado para tela de login',
   'Conta excluída com sucesso e usuário removido da base'],
];

const cabecalhoCasos = [
  'ID do Caso de Teste', 'Cenário Relacionado', 'Pré-condição',
  'Passos de Execução', 'Dados de Entrada', 'Resultado Esperado', 'Critério de Aceite'
];

// =============================================
// GERAR PLANILHA
// =============================================
const wb = XLSX.utils.book_new();

// Aba 1
const ws1Data = [cabecalhoCenarios, ...cenarios];
const ws1 = XLSX.utils.aoa_to_sheet(ws1Data);

// Larguras das colunas - aba cenários
ws1['!cols'] = [
  { wch: 10 }, { wch: 22 }, { wch: 14 }, { wch: 70 },
  { wch: 12 }, { wch: 22 }, { wch: 55 }
];
XLSX.utils.book_append_sheet(wb, ws1, 'Cenários de Teste');

// Aba 2
const ws2Data = [cabecalhoCasos, ...casos];
const ws2 = XLSX.utils.aoa_to_sheet(ws2Data);

// Larguras das colunas - aba casos
ws2['!cols'] = [
  { wch: 18 }, { wch: 18 }, { wch: 45 },
  { wch: 65 }, { wch: 45 }, { wch: 55 }, { wch: 55 }
];
XLSX.utils.book_append_sheet(wb, ws2, 'Casos de Teste');

// Salvar
const caminho = './Plano_de_Testes_ParaBank.xlsx';
XLSX.writeFile(wb, caminho);
console.log(`Planilha gerada: ${caminho}`);
