describe('Primeiro Teste', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5500/layouts/login.html')
    cy.wait(2000);
    cy.get('#email').type('joshua@gmail.com');
    cy.get('#senha').type('Admin@123')
    cy.get('#submit-btn').click()
  })
})