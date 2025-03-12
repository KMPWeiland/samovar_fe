describe('Subscription Detail Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/subscriptions', {
      statusCode: 200, 
      fixture: 'subscription_detail'
    });

    cy.visit('http://localhost:5173/'); 
  });

  it('displays title on page load', () => {
    cy.get('h1').contains('Samovar');
  });
});

