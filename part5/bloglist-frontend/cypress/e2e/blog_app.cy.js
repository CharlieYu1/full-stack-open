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

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('testuser')
    cy.get('#password').type('Wrong')
    cy.get('#login-button').click()

    cy.contains('invalid username or password')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'testuser', password: 'Abc123' })
    })

    it('a new blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('A Blog Title')
      cy.get('#author').type('Some Author')
      cy.get('#url').type('http://example.com')
      cy.get('#create-button').click()
      cy.contains('A Blog Title Some Author')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'another blog title',
          author: 'another author',
          url: 'http://example.com'
        })
      })

      it('users can like a blog', function () {
        cy.contains('show').click()
        cy.contains('like').click()
        cy.contains('likes: 1')
      })

      it('users can delete a blog', function () {
        cy.contains('show').click()
        cy.contains('delete').click()
        cy.get('.blog').should('not.exist')
      })
    })
  })

  it('blogs are ordered by likes', function () {
    cy.login({ username: 'testuser', password: 'Abc123' })
    
    cy.createBlog({
      title: 'Blog 1',
      author: 'author 1',
      url: 'http://example.com'
    })
    cy.createBlog({
      title: 'Blog 2',
      author: 'author 2',
      url: 'http://example.com'
    })
    cy.createBlog({
      title: 'Blog 3',
      author: 'author 3',
      url: 'http://example.com'
    })
    cy.get('.showButton').eq(0).click()
    cy.get('.showButton').eq(1).click()
    cy.get('.showButton').eq(2).click()
    cy.get('.likeButton').eq(0).click()
    cy.get('.likeButton').eq(2).click()
    cy.get('.likeButton').eq(2).click()
    cy.visit('http://localhost:3000')
    cy.get('.blog').eq(0).should('contain', 'Blog 3 author 3')
    cy.get('.blog').eq(1).should('contain', 'Blog 1 author 1')
    cy.get('.blog').eq(2).should('contain', 'Blog 2 author 2')
  })
})