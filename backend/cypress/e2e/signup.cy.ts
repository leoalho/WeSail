describe('Signup', () => {
  beforeEach(() => {
    cy.task('init:db')
  })

  it('Signup page exists', () => {
    cy.visit('/signup')
    cy.contains('Create user')
  })

  it('Signup page is accessible via main page', () => {
    cy.visit('/')
    cy.contains('Sign up').click()
    cy.contains('Create user')
  })

  it('Creating a username with already taken username does not work', () => {
    cy.visit('/signup')
    cy.get('input[placeholder*="username"]').type('test')
    cy.get('input[placeholder="password"]').type('test')
    cy.get('input[placeholder*="password again"]').type('test')
    cy.get('input[placeholder*="email"]').type('test.test@test.test')
    cy.contains('Create user').click()
    cy.contains('Create user')
  })

  it('Passwords should match', () => {
    cy.visit('/signup')
    cy.get('input[placeholder*="username"]').type('test2')
    cy.get('input[placeholder="password"]').type('testtest')
    cy.get('input[placeholder*="password again"]').type('test')
    cy.get('input[placeholder*="email"]').type('test.test@test.test')
    cy.contains('Create user').click()
    cy.contains('Create user')
  })

  it('Sign up works', () => {
    cy.visit('/signup')
    cy.get('input[placeholder*="username"]').type('test2')
    cy.get('input[placeholder="password"]').type('testtest')
    cy.get('input[placeholder*="password again"]').type('testtest')
    cy.get('input[placeholder*="email"]').type('test.test@test.test')
    cy.contains('Create user').click()
    cy.contains('login')
    cy.get('input[placeholder*="username"]').type('test2')
    cy.get('input[placeholder="password"]').type('testtest')
    cy.contains('login').click()
    cy.contains('logout')
  })
})