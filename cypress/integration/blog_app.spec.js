describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user1 = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    const user2 = {
      name: 'Superuser',
      username: 'root',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user1)
    cy.request('POST', 'http://localhost:3003/api/users/', user2)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.get('input[id=username-input]').should('exist')
    cy.get('input[id=password-input]').should('exist')
    cy.get('button[id=login-button]').should('exist')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username-input').type('mluukkai')
      cy.get('#password-input').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username-input').type('mluukkai')
      cy.get('#password-input').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error')
        .contains('wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Matti Luukkainen logged in')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('can logout', function() {
      cy.get('#logout-button').click()
      cy.contains('log in to application')
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title-input').type('Test title')
      cy.get('#author-input').type('Test author')
      cy.get('#url-input').type('Test url')
      cy.get('#create-blog-button').click()

      cy.contains('Test title Test author')
      cy.get('.success')
        .contains('a new blog Test title by Test author added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
    })

    describe('and a blog exists', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test title',
          author: 'Test author',
          url: 'Test url',
        })
      })

      it('it can be liked', function () {
        cy.contains('Test title Test author').parent().as('newBlogDetails')

        cy.get('@newBlogDetails').find('#view-button').click()
        cy.get('@newBlogDetails').find('#like-button').click()
        cy.get('@newBlogDetails').contains('likes 1')
      })

      it('it can be deleted by user who created blog', function () {
        cy.contains('Test title Test author').parent().as('newBlogDetails')

        cy.get('@newBlogDetails').find('#view-button').click()
        cy.get('@newBlogDetails').find('#remove-button').click()
        cy.get('.success')
          .contains('Blog Test title by Test author has been removed')
          .and('have.css', 'color', 'rgb(0, 128, 0)')
        cy.get('html').should('not.contain', 'Test title Test author')
      })

      it('it cannot be deleted by other users who did not create the blog', function () {
        cy.get('#logout-button').click()
        cy.login({ username: 'root', password: 'sekret' })

        cy.contains('Test title Test author').parent().as('newBlogDetails')
        cy.get('@newBlogDetails').find('#view-button').click()
        cy.get('@newBlogDetails').find('#emove-button').should('not.exist')
      })
    })

    describe('and multiple blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'Test title1',
          author: 'Test author1',
          url: 'Test url1',
        })

        cy.createBlog({
          title: 'Test title2',
          author: 'Test author2',
          url: 'Test url2',
        })

        cy.createBlog({
          title: 'Test title3',
          author: 'Test author3',
          url: 'Test url3',
        })

        cy.contains('Test title1 Test author1').parent().as('blog1Details')
        cy.get('@blog1Details').find('#view-button').click()
        cy.contains('Test title2 Test author2').parent().as('blog2Details')
        cy.get('@blog2Details').find('#view-button').click()
        cy.contains('Test title3 Test author3').parent().as('blog3Details')
        cy.get('@blog3Details').find('#view-button').click()

        cy.get('@blog1Details').find('#like-button').click()
        cy.get('@blog1Details').contains('likes 1', { timeout: 10000 })
        cy.get('@blog2Details').find('#like-button').click()
        cy.get('@blog2Details').contains('likes 1', { timeout: 10000 })
        cy.get('@blog2Details').find('#like-button').click()
        cy.get('@blog2Details').contains('likes 2', { timeout: 10000 })
        cy.get('@blog2Details').find('#like-button').click()
        cy.get('@blog2Details').contains('likes 3', { timeout: 10000 })
        cy.get('@blog3Details').find('#like-button').click()
        cy.get('@blog3Details').contains('likes 1', { timeout: 10000 })
        cy.get('@blog3Details').find('#like-button').click()
        cy.get('@blog3Details').contains('likes 2', { timeout: 10000 })
      })

      it('they are ordered according to number of likes', function () {
        const correctOrder = ['0 Test title2', '1 Test title3', '2 Test title1']

        cy.get('.blog-details')
          .then(blogs => {
            blogs = [...blogs.map((index, blog) => `${index} ${blog.id}`)]
            expect(blogs).to.deep.equal(correctOrder)
          })
      })
    })
  })
})