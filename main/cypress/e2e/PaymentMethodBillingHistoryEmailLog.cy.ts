describe('admin portal microservice', () => {
  const baseUrl = "http://localhost:4000/payment-method";
  it('passes', () => {
    cy.viewport(1536, 960);

    cy.window().then((win) => {
      win.localStorage.setItem('LS_KEY_AUTH_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRUeGVVSWlTU2Rjb2lCOWtGd215WUowUVQyMTMiLCJpYXQiOjE3Mzk1MDg2NTMsImV4cCI6MTczOTU5NTA1M30.1b4gLcOzVz9vnsk-iylnUZ-xbmUfS3Z6GsI782YcDQU');
      win.localStorage.setItem('LS_KEY_USER_ID', 'tTxeUIiSSdcoiB9kFwmyYJ0QT213');
    });

    cy.wait(2000); // wait for 2 seconds

    // STEP 1 ---------
    // go to payment method page
    cy.visit(baseUrl); // go to the url

    cy.wait(5000); // wait for 5 seconds

    // STEP 2 ---------
    // switch active methods to inactive
    cy.get('select[cypress-name="payment-status-0"]').select("Inactive");
    cy.wait(2000); // wait for 2 seconds
    cy.get('select[cypress-name="payment-status-1"]').select("Inactive");
    cy.wait(2000); // wait for 2 seconds

    // STEP 3 ---------
    // switch inactive methods to active
    cy.get('select[cypress-name="payment-status-0"]').select("Active");
    cy.wait(2000); // wait for 2 seconds
    cy.get('select[cypress-name="payment-status-1"]').select("Active");
    cy.wait(5000); // wait for 2 seconds

    // STEP 4 ---------
    // go to billing history page
    cy.get('button[cypress-name="sidebar-nav-name"]').contains('Billing History').should('be.visible').click();
    cy.wait(5000); // wait for 5 seconds

    // STEP 5 ---------
    // filter billing history page
    cy.get('input[name="domain"]').clear().type('ascwf3qwawaqc.com');
    cy.wait(2000); // wait for 2 seconds

    cy.get('[cypress-name="billing-history-domain-search-dropdown"] p').first().click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('button[cypress-name="cypress-name=billing-history-clear-filter"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('input[name="search_data"]').clear().type('txn_3QrfqzHJst0MFfZt1yfa4Nwm');
    cy.get('button[cypress-name="billing-history-filter-search-button"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('button[cypress-name="cypress-name=billing-history-clear-filter"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds

    // STEP 6 ---------
    // download invoice from billing history page
    cy.get('tbody tr')
      .first()
      .find('button[cypress-name="invoice_download"]')
      .click();
    cy.wait(2000); // wait for 2 seconds

    cy.get('svg[cypress-name="download-invoice-button"]').should('be.visible').click();
    cy.wait(2000);

    cy.get('svg[cypress-name="close-download-invoice-button"]').should('be.visible').click();
    cy.wait(2000);

    // STEP 7 ---------
    // go to email log page
    cy.get('button[cypress-name="sidebar-nav-name"]').contains('Email Log').should('be.visible').click();
    cy.wait(5000); // wait for 5 seconds
  })
})