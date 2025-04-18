describe('Unsuccessful login', () => {
    beforeEach(() => { cy.visit('/') });

    it('Should return an error when trying to log in', () => {
        cy.url().should('include', 'https://www.automationexercise.com');
        cy.contains('Signup / Login').click();
        cy.url().should('eq', 'https://www.automationexercise.com/login');
        cy.contains('h2', 'Login to your account');

        cy.get('[data-qa="login-email"]').type('test@gmail.com');
        cy.get('[data-qa="login-password"]').type('teste');
        cy.get('[data-qa="login-button"]').click();

        cy.contains('p', 'Your email or password is incorrect!').should('be.visible');
    });
});

