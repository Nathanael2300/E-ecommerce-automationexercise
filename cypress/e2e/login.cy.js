describe('Successful login', () => {
    beforeEach(() => { cy.visit('/') });

    it('Should log in the user successfully', () => {
        cy.url().should('include', 'https://www.automationexercise.com');
        cy.contains('Signup / Login').click();
        cy.url().should('eq', 'https://www.automationexercise.com/login');
        cy.contains('h2', 'Login to your account');

        cy.get('[data-qa="login-email"]').type(Cypress.env('USER_EMAIL'));
        cy.get('[data-qa="login-password"]').type(Cypress.env('USER_PASSWORD'));
        cy.get('[data-qa="login-button"]').click();

        cy.get('.fa.fa-user').should('be.visible');
        cy.contains('Logged in as test12345').should('be.visible');
        cy.get('b').contains('test12345').should('be.visible');
    });
});

