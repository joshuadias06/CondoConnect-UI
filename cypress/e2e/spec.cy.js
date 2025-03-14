describe('Primeiro Teste', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5500/layouts/product.html')
    cy.visit('www.google.com')
  })
})