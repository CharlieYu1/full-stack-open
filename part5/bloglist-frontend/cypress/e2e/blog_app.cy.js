describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test User',
      username: 'testuser',
      password: 'Abc123'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
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
    cy.get('#username').type('testuser')
    cy.get('#password').type('Abc123')
    cy.get('#login-button').click()

    cy.contains('testuser logged in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('testuser')
      cy.get('#password').type('Abc123')
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