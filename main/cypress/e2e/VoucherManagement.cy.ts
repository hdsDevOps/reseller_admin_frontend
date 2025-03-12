describe('admin portal microservice', () => {
  const baseUrl = "http://localhost:4000/customer-group";
  it('passes', () => {
    cy.viewport(1536, 960);

    cy.window().then((win) => {
      win.localStorage.setItem('LS_KEY_AUTH_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRUeGVVSWlTU2Rjb2lCOWtGd215WUowUVQyMTMiLCJpYXQiOjE3Mzk0MjMxODksImV4cCI6MTczOTUwOTU4OX0.qLrtXW7-hD9z7l2UMeQ1nF4aBHgKEHLlWYoUsiGcYKs');
      win.localStorage.setItem('LS_KEY_USER_ID', 'tTxeUIiSSdcoiB9kFwmyYJ0QT213');
    });

    cy.wait(2000); // wait for 2 seconds

    // STEP 1 ---------
    // go to vouhcer management page
    cy.visit(baseUrl); // go to the url

    cy.wait(5000); // wait for 5 seconds

    // STEP 2 ---------
    // add new customer group
    cy.get('button[cypress-name="add-new-customer-group-btn"]').click();

    cy.wait(2000); // wait for 2 seconds

    cy.url().should('include', 'add-customer-group'); // url should include "add-customer-group" text

    cy.wait(2000); // wait for 2 seconds

    cy.get('input[name="group_name"]').clear().type("Customer Group 1");

    cy.wait(2000); // wait for 2 seconds
    
    cy.get('select[name="country"]').then($select => {
      const options = $select.find('option:not([value=""])');

      if(options.length > 0) {
        cy.wrap($select).select(options.first().val());
      } else {
        cy.wrap($select).select("");
      }
    });

    cy.wait(2000); // wait for 2 seconds

    cy.get('select[name="region"]').then($select => {
      const options = $select.find('option:not([value=""])');

      if(options.length > 0) {
        cy.wrap($select).select(options.first().val());
      } else {
        cy.wrap($select).select("");
      }
    });

    cy.wait(2000); // wait for 2 seconds

    cy.get('input[name="license_usage"]').clear().type("5");

    cy.wait(2000); // wait for 2 seconds

    cy.get('button[type="submit"]').should('be.visible').click();

    cy.wait(5000); // wait for 5 seconds

    // STEP 3 ---------
    // add another new customer group
    cy.get('button[cypress-name="add-new-customer-group-btn"]').click();

    cy.wait(2000); // wait for 2 seconds

    cy.url().should('include', 'add-customer-group'); // url should include "add-customer-group" text

    cy.wait(2000); // wait for 2 seconds

    cy.get('input[name="group_name"]').clear().type("Customer Group 2");

    cy.wait(2000); // wait for 2 seconds
    
    cy.get('select[name="country"]').then($select => {
      const options = $select.find('option:not([value=""])');

      if(options.length > 0) {
        cy.wrap($select).select(options.first().val());
      } else {
        cy.wrap($select).select("");
      }
    });

    cy.wait(2000); // wait for 2 seconds

    cy.get('select[name="region"]').then($select => {
      const options = $select.find('option:not([value=""])');

      if(options.length > 0) {
        cy.wrap($select).select(options.first().val());
      } else {
        cy.wrap($select).select("");
      }
    });

    cy.wait(2000); // wait for 2 seconds

    cy.get('input[name="license_usage"]').clear().type("1");

    cy.wait(2000); // wait for 2 seconds

    cy.get('button[type="submit"]').should('be.visible').click();

    cy.wait(5000); // wait for 5 seconds

    // STEP 4 ---------
    // go to voucher list

    // cy.get('input[name="group_name"]').clear().type('Customer Group 1');
    cy.get('button[cypress-name="sidebar-nav-name"]').contains('Voucher Management').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('button[cypress-name="sidebar-subnav-button"]').contains('Voucher list').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds

    cy.url().should('include', 'voucher-list'); // url should have text "voucher-list"

    // STEP 5 ---------
    // select the vouhcer currency to INR

    cy.get('div[cypress-name="currency-selector-button"]').click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('div[cypress-name="currency-selector-options"]').contains('INR').click();

    cy.wait(2000); // wait for 2 seconds

    // STEP 6 ---------
    // send voucher to customers

    cy.get('tbody tr')
      .first()
      .find('button[cypress-name="send-voucher-mail-button"]')
      .should('be.visible')
      .click()

    cy.wait(2000); // wait for 2 seconds
    

    cy.get('div[cypress-name="send-voucher-mail-modal"]').should('be.visible');

    cy.get('input[cypress-name="group"]').click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('input[cypress-name="customer-group-search-input"]').clear().type('customer group 2');

    cy.wait(2000); // wait for 2 seconds

    cy.get('[cypress-name="customer-group-search-dropdown"] div').first().click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('button[cypress-name="send-voucher-mail-send-button"]').click();

    cy.wait(5000); // wait for 2 seconds

    cy.get('input[cypress-name="individual"]').click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('input[cypress-name="customer-individual-search-input"]').clear().type('heshamreza2025-5@yopmail.com');

    cy.wait(2000); // wait for 2 seconds

    cy.get('[cypress-name="customer-individual-search-dropdown"] a').first().click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('button[cypress-name="send-voucher-mail-send-button"]').click();

    cy.wait(1000); // wait for 1 seconds

    cy.get('button[cypress-name="send-voucher-mail-close-btn"]').click()
  })
})