describe('Logging in', () => {
  it('Shows login page when not logged in', () => {
    cy.visit('/')
    cy.contains("login")
  })

  it('Login works with test credentials', () => {
    cy.visit('/')
    cy.get('input[placeholder*="username"]').type('test')
    cy.get('input[placeholder*="password"]').type('salasana')
    cy.contains('login').click()
    cy.contains('logout')
  })

  it('Login does not work with wrong credentials', () => {
    cy.visit('/')
    cy.get('input[placeholder*="username"]').type('test2')
    cy.get('input[placeholder*="password"]').type('salasana')
    cy.contains('login').click()
    cy.contains('login')
  })

  it('Logout works with test credentials', () => {
    cy.visit('/')
    cy.get('input[placeholder*="username"]').type('test')
    cy.get('input[placeholder*="password"]').type('salasana')
    cy.contains('login').click()
    cy.contains('logout').click()
    cy.contains('login')
  })
})