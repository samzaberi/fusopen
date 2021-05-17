describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            "username": "saitama",
            "name": "saitama",
            "password": "onepunch"
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.contains('log in to application')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.contains('log in').click()
            cy.get('#username').type('saitama')
            cy.get('#pswd').type('onepunch')
            cy.get('#login-btn').click()

            cy.contains('blogs')
        })

        it('fails with wrong credentials', function () {

            cy.get('#username').type('mluukkai')
            cy.get('#pswd').type('wrong')
            cy.get('#login-btn').click()

            cy.contains('wrong username or password')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            // cy.login({ username: "saitama", password: "onepunch" })
            cy.contains('log in').click()
            cy.get('#username').type('saitama')
            cy.get('#pswd').type('onepunch')
            cy.get('#login-btn').click()

            cy.contains('create blog').click()
            cy.get('#title').type('wire man')
            cy.get('#author').type('mines')
            cy.get('#url').type('mineurl')
            cy.get('#create').click()


            // cy.createBlog({
            //     title: "wire man",
            //     author: "link",
            //     url: "wman",
            //     likes: 0
            // })
        })

        it('A blog can be created', function () {
            cy.contains('create blog').click()
            cy.get('#title').type('smoke some cypress trees')
            cy.get('#author').type('smokeman')
            cy.get('#url').type('smokeurl')
            cy.get('#create').click()
            cy.contains('smoke some cypress trees')
        })

        it('a blog can be liked', function () {
            cy.contains('wire man')
                .contains('view').click()
                .get('.like-btn').click()

            cy.contains('likes 1')
        })

        it.only('a blog can be deleted', function () {
            cy.contains('wire man')
                .contains('view').click()

            cy.contains('remove').click()
            cy.get('html').should('not.contain', 'wireman')

        })
    })
})