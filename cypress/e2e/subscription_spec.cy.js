describe('Subscription Detail Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/subscriptions', {
      statusCode: 200, 
      fixture: 'subscriptions'
    }).as('getList');

    cy.intercept('GET', 'http://localhost:3000/api/v1/subscriptions/*', {
      statusCode: 200, 
      fixture: 'subscription_detail'
    }).as('getDetails');

    cy.visit('http://localhost:5173/');
    cy.wait('@getList');
  });

  it('should display the correct subscriptions details when a suscription is clicked', () => {
    cy.get('.subscriptions-container').first().click();
    // cy.wait('@getDetails');

    cy.get('.subscriptions-container').should('exist');
    cy.get('.subscription-icon').should('exist');
    cy.get('h3').should('contain.text', 'Subscription Level: Platinum');

    // cy.get('.Genres p').should('exist');
    // cy.get('.Genres').should("contain", "Family");
    // cy.get('.Genres').should("contain", "Fantasy");
    // cy.get('.details-content p').last().should('contain', 'Comedy');
    // cy.get('.Overview').should('contain', 'Inside of his book, adventurous Harold') 
  });
});
// describe('Subscription Detail Page', () => {
//   beforeEach(() => {
//     cy.intercept('GET', 'http://localhost:3000/api/v1/subscriptions', {
//       statusCode: 200, 
//       fixture: 'subscription_detail'
//     });

//     cy.visit('http://localhost:5173/'); 
//   });

//   it('displays title on page load', () => {
//     cy.get('h1').contains('Samovar');
//   });
// });