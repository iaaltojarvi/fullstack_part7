/* eslint-disable no-undef */
describe('Blog ', function () {
  describe('Login', function () {
    it('Login fails with wrong credentials', function () {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('iaaltojarvi')
      cy.get('#password').type('salaisuus')
      cy.get('#login-button').click()
      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 255, 255)')
      cy.get('html').should('not.contain', '\'Inari Aaltojärvi\' logged in')
    })
    it('Login succeeds with correct credentials', function () {
      cy.visit('http://localhost:3000')
      cy.get('#username').type('iaaltojarvi')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('\'Inari Aaltojärvi\' logged in')
    })
  })
})

describe('When logged in', function () {
  beforeEach(function () {
    cy.login({ username: 'iaaltojarvi', password: 'salainen' })
  })
  describe('New blog', function () {
    it('a new blog can be created', function () {
      cy.createBlog({ title: 'Note created by cypress', author: 'Minä', url: 'testingWithCypress.com' })
      cy.contains('Note created by cypress')
    })
  })

  describe('Blog liked', function () {
    it('blog can be liked', function () {
      cy.createBlog({ title: 'Note created by cypress', author: 'Minä', url: 'testingWithCypress.com' })
      cy.contains('Note created by cypress')
      cy.get('#showMore-button').click()
      cy.get('#like-button').click()
      cy.wait(3500)
      cy.get('html').should('contain', 1)
    })
  })

  describe('Remove a blog', function () {
    it('blog can be removed', function () {
      cy.createBlog({ title: 'Note created by cypress', author: 'Minä', url: 'testingWithCypress.com' })
      cy.contains('Note created by cypress')
      cy.get('#showMore-button').click()
      cy.get('#remove-button').click()
      cy.get('html').should('not.contain', 'Note created by cypress')
    })
  })

  describe('Blogs are sorted by likes when more than one blog', function () {
    it('Blogs are sorted', function () {
      cy.createBlog({ title: 'Note created by cypress', author: 'MeMyself', url: 'testingWithCypress.com' })
      cy.createBlog({ title: 'Another note created by cypress', author: 'Minä taas', url: 'testingWithCypress.com' })
      cy.wait(3500)
      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('Show more').click()
        cy.wrap(blogs[0]).contains('Like').click()
        cy.wrap(blogs[1]).contains('Show more').click()
        cy.wrap(blogs[1]).contains('Like').click()
        cy.wrap(blogs[1]).contains('Like').click()
      })
      cy.get('.blog:first').should('contain', 'Minä taas')

    })
  })
})
