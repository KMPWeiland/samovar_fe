describe('Subscriptions List Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/subscriptions', {
      statusCode: 200, 
      fixture: 'subscriptions'
    }) 

    cy.visit('http://localhost:5173/');
  });

  it('displays the application header', () => {
    cy.get('.subscriptions-container').should('exist');
    cy.get("h1").should("contain", "SAMOVAR");
    cy.get('.header').find('img').should('have.attr', 'alt', 'Samovar Image')
    cy.get('.brush-script').should('contain', 'Premium global teas, to your front door');
  });

  it('displays portal headings', () => {
    cy.get('.admin-portal-heading').should('contain', 'Admin Portal');
    cy.get('.portal-view-type').should('contain', 'The following is a record of all your subscriptions');

  });

  it('should sort subscriptions by price', () => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/subscriptions?sort=price').as('sortRequest');
    
    cy.get(".sort-button").should('contain', 'Sort by Price').click();

    cy.wait('@sortRequest');

    cy.get('.subscription-card').first().find('p', 'Price').should('contain', '$14');
  })

  it('should fetch subscriptions from API and display them', () => {
    cy.get('.subscriptions-container').should('exist')
    cy.get('.subscription-card').should('have.length.at.least', 2)
    cy.contains('.subscription-card', 'Subscription ID #').should('contain', '2');
    cy.get('.subscription-card > h3').should('contain.text', 'Professional');
    cy.contains('.subscription-card', 'Price').should('contain', '$71');
    cy.contains('.subscription-card', 'Status').should('contain', 'Active');
  });
});
 