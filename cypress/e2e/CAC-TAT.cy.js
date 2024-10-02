describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })
  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
    cy.get('#firstName').type('Estêvão')
    cy.get('#lastName').type('Lélis')
    cy.get('#email').type('estevaolelis@gmail.com', {delay: 0})
    cy.get('#phone').type('12983040170')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('.success').should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
    cy.get('#firstName').type('Estêvão')
    cy.get('#lastName').type('Lélis')
    cy.get('#email').type('estevaolelis@gmail,com', {delay: 0})
    cy.get('#phone').type('12983040170')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })
  it('campo telefone continua vázio quando preenchido com valor não númerico', () =>{
    cy.get('#phone')
      .type('abcdefg')
      .should('have.value', '')
  })
  it.only('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () =>{
    cy.get('#firstName').type('Estêvão')
    cy.get('#lastName').type('Lélis')
    cy.get('#email').type('estevaolelis@gmail.com', {delay: 0})
    cy.get('#phone-checkbox').click()
    cy.get('#open-text-area').type('teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })
})