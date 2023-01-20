describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })


  it('front page can be opened', function() {
    cy.contains('blogs')
  })

  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('user can login', function() {
    cy.contains('login').click()
    cy.get('#username').type('charlie')
    cy.get('#password').type('abc123')
    cy.get('#login-button').click()

    cy.contains('charlie logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('charlie')
      cy.get('#password').type('abc123')
      cy.get('#login-button').click()
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('A Blog Title')
      cy.get('#author').type('Some Author')
      cy.get('#url').type('http://example.com')
      cy.get('#create-button').click()
      cy.contains('A Blog Title Some Author')
    })
  })
})