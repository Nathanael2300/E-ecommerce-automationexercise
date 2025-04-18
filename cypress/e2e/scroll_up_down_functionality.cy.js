it('Should scroll down and then scroll up using the arrow button', () => {
    cy.visit('/');
    cy.scrollTo('bottom');
    cy.contains('p', 'Copyright © 2021 All rights reserved').should('be.visible');
    cy.wait(1000); 
    cy.get('#scrollUp').should('be.visible');
    cy.get('#scrollUp').click();
    cy.get('h2').contains('Category').should('be.visible');
  });
  