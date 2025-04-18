describe('To roll to down and after to roll to up', () => {
    it('Should to roll to down and after to roll to up', () => {
        cy.visit('/');
        cy.scrollTo('bottom');
        cy.contains('p', 'Copyright © 2021 All rights reserved').should('be.visible');
        cy.scrollTo('top');
        cy.get('div.header-middle').should('be.visible');
    });
});