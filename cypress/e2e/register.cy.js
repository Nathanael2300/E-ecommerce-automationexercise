describe("Register User", () => {
  beforeEach(() => { cy.visit('/') });
  
  it("Should register a user successfully.", () => {
    cy.url().should('include', 'https://www.automationexercise.com');
    cy.contains('Signup / Login').click();
    cy.get('h2').contains('New User Signup!');

    cy.registerUser();

    cy.get('button.btn.btn-default').contains('Create Account').click();
    cy.get('b').should('contain', 'Account Created!');
  });
});

