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

  it('displays the application header', () => {
    cy.get('.subscriptions-container').should('exist');
    cy.get("h1").should("contain", "SAMOVAR");
    cy.get('.header').find('img').should('have.attr', 'alt', 'Samovar Image')
    cy.get('.brush-script').should('contain', 'Premium global teas, to your front door');
  });

  it('displays portal headings', () => {
    cy.get('.subscriptions-container').first().click();
    cy.wait('@getDetails');

    cy.get('.admin-portal-heading').should('contain', 'Admin Portal');
    cy.get('.portal-view-type').should('contain', 'Subscription Details');
  });

  it('should display the correct subscription details when a suscription is clicked', () => {
    cy.get('.subscriptions-container').first().click();
    cy.wait('@getDetails');

    cy.get('.subscription-icon').should('exist');
    cy.get('h3').should('contain.text', 'Subscription Level: Platinum');
    cy.contains('.details-content', 'Subscription ID #').should('contain', '5');
    cy.contains('.details-content', 'Price:').should('contain', '$21');
    cy.contains('.details-content', 'Status:').should('contain', 'Non-Payment');
    cy.contains('.details-content', 'Frequency:').should('contain', 'Every 6 weeks');

    cy.get('.customer-info > h4').should('contain.text', 'Customer Information');
    cy.contains('.customer-info', 'Customer ID #').should('contain', '2');
    cy.contains('.customer-info', 'Name: ').should('contain', '2');

    cy.get('.teas-info > h4').should('contain.text', 'Teas in Subscription'); 
    cy.get('.tea-list li').should('have.length', 2);
    cy.get('.tea-list li').first().should('contain', 'Refreshingly Unconcerned With The Vulgar Exigencies Of Veracity');
    cy.get('.tea-list li').first().should('contain', 'Black');
    cy.get('.tea-list li').last().should('contain', 'Democritus');
    cy.get('.tea-list li').last().should('contain', 'Herbal');
  });


  it('should go back to subscription list when the Back to Subscription button is clicked', () => {
    cy.get('.subscriptions-container').first().click();
    cy.wait('@getDetails');

    cy.get(".backToListButton").click();

    cy.get('.subscriptions-container').should('exist');
    cy.get("h1").should("contain", "SAMOVAR");
  })

});