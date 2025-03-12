describe('admin portal microservice', () => {
  const baseUrl = "http://localhost:4000/customers";
  it('passes', () => {
    cy.viewport(1536, 960);

    cy.window().then((win) => {
      win.localStorage.setItem('LS_KEY_AUTH_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRUeGVVSWlTU2Rjb2lCOWtGd215WUowUVQyMTMiLCJpYXQiOjE3Mzk0MjMxODksImV4cCI6MTczOTUwOTU4OX0.qLrtXW7-hD9z7l2UMeQ1nF4aBHgKEHLlWYoUsiGcYKs');
      win.localStorage.setItem('LS_KEY_USER_ID', 'tTxeUIiSSdcoiB9kFwmyYJ0QT213');
    });

    cy.wait(2000); // wait for 2 seconds

    // STEP 1 ---------
    // go to customers management page
    cy.visit(baseUrl); // go to the url

    cy.wait(5000); // wait for 5 seconds

    // STEP 2 ---------
    // go to "/add-customer" page
    cy.get('button[cypress-name="customers-add-new"]').should('be.visible').click(); // click on the "add new" button
    
    cy.wait(2000); // wait for 2 seconds

    cy.url().should('include', 'add-customer'); // shoudl be on the "/add-customer" page

    cy.wait(2000); // wait for 2 seconds

    cy.get('input[name="first_name"]').clear().type("Hesham");
    cy.get('input[name="last_name"]').clear().type("Reza");

    cy.get('input[name="addrress"]').clear().type("Kolkata, West Bengal, India");
    cy.wait(5000); // wait for 5 seconds to for API calling and data loading
    cy.get('[cypress-name="address-dropdown"] p').first().click();
    
    cy.get('input[name="phone_no"]').clear().type("917439447536");
    cy.get('input[name="email"]').clear().type("heshamreza2025-7@yopmail.com");

    cy.get('label[cypress-name="authorization-toggle-button"]').should('be.visible').click();

    cy.get('button[type="submit"]').should('be.visible').click();

    cy.wait(5000); // wait for 2 seconds

    // the submit button should redirect to the page "/customers"
    cy.url().should('include', 'customers');
    cy.wait(2000); // wait for 2 seconds


    // STEP 3 ---------
    // go to a customer information page
    cy.get('tbody tr')
      .first()
      .find('button[button-name="go-to-customer-information"]')
      .should('be.visible')
      .click();

    cy.wait(2000); // wait for 2 seconds
    
    cy.url().should('include', 'customer-information'); // url should have the text "customer-information"

    cy.wait(2000);

    cy.get('button[button-name="customer-information-reset-password"]').should('be.visible').click();
    
    cy.wait(2000); // wait for 2 seconds

    cy.get('div[cypress-name="reset-password-modal"]').should('be.visible');

    cy.get('input[cypress-name="new-password"]').clear().type('heshamreza2025-7@123');
    cy.get('input[cypress-name="new-confirmed-password"]').clear().type('heshamreza2025-7@123');

    cy.get('button[type="submit"]').click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('a[cypress-name="go-back-button"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds

    cy.url().should('include', 'customers');
    cy.wait(2000); // wait for 2 seconds

    // STEP 4 ---------
    // edit a customer data
    cy.get('tbody tr')
      .first()
      .find('button[cypress-name="show-list-button"]')
      .should('exist')
      .should('be.visible')
      .click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('a[cypress-name="edit-customer-button"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds

    cy.url().should('include', 'edit-customer'); // url should include the text "edit-customer"

    cy.get('input[name="first_name"]').clear().type("Hesham");
    cy.get('input[name="last_name"]').clear().type("Reza");

    cy.get('input[name="addrress"]').clear().type("Kolkata, West Bengal, India");
    cy.wait(5000); // wait for 5 seconds to for API calling and data loading
    cy.get('[cypress-name="address-dropdown"] p').first().click();
    
    cy.get('input[name="phone_no"]').clear().type("917439447536");

    cy.get('button[type="submit"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds

    cy.url().should('include', 'customers');
    cy.wait(2000); // wait for 2 seconds

    // STEP 5 ---------
    // change customer authentication and account status
    cy.get('tbody tr')
      .first()
      .find('label[cypress-name="customer-authentication-toggle-button"]')
      .should('exist')
      .should('be.visible')
      .click();

    cy.get('tbody tr')
      .first()
      .find('button[cypress-name="account-status-change-button"]')
      .should('exist')
      .should('be.visible')
      .click();

    // STEP 6 ---------
    // delete customer
    cy.get('tbody tr')
      .first()
      .find('button[cypress-name="show-list-button"]')
      .should('exist')
      .should('be.visible')
      .click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('a[cypress-name="delete-customer-button"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('div[cypress-name="common-list-modal"]').should('be.visible');

    cy.get('button[cypress-name="common-list-yes-button"]').click();

    cy.wait(5000);

    // STEP 7 ---------
    // filtering

    cy.get('input[name="domain"]').clear().type('find-a-domain-name.com'); // write "find-a-domain-name.com" to find the written domain

    cy.wait(5000); // wait for 2 seconds

    cy.get('[cypress-name="domain-filter-dropdown"] a').first().click();
    cy.wait(5000); // wait for 2 seconds
    cy.get('button[cypress-name="clear-filter-button"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('input[name="search_data"]').clear().type('mtreza52e23r3g39@yopmail.com'); // type "mtreza52e23r3g39@yopmail.com" to find the customers with email same as written
    cy.wait(5000); // wait for 2 seconds
    cy.get('button[cypress-name="clear-filter-button"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('button[button-name="customers-filter-btn"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('div[cypress-name="filter-modal"]').should('be.visible');

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

    cy.get('select[name="state_name"]').then($select => {
      const options = $select.find('option:not([value=""])');

      if(options.length > 0) {
        cy.wrap($select).select(options.first().val());
      } else {
        cy.wrap($select).select("");
      }
    });

    cy.wait(2000); // wait for 2 seconds

    cy.get('button[button-name="customers-filter-search-btn"]').should('be.visible').click();

    cy.wait(5000); // wait for 2 seconds

    cy.get('button[cypress-name="clear-filter-button"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds
  })
});