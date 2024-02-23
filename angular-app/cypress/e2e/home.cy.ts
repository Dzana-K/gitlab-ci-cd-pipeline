

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/login');
  });

  it('should successfully log in with valid credentials', () => {

    cy.fixture('user').then((user) => {

      cy.intercept('POST', '/login', { body: user }).as('login');


      cy.get('#email').type(user.email);
      cy.get('#password').type(user.password);


      cy.get('.custom-button').click();


      cy.wait('@login').then((xhr) => {
        if (xhr.response) {
          expect(xhr.response.statusCode).to.equal(200);

        } else {
          throw new Error('Login request failed or timed out');
        }
      });


      cy.url().should('include', 'http://localhost:4200/dashboard');
    });
  });

  it('should display an error message with invalid credentials', () => {

    cy.intercept('POST', '/login', { statusCode: 401 }).as('login');

    cy.fixture('user').then((user) => {

      cy.get('#email').type(user.email);
      cy.get('#password').type('invalidpassword');


      cy.get('.custom-button').click();


      cy.wait('@login');



    });
  });
});
