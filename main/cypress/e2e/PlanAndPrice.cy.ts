describe('admin portal microservice', () => {
  const baseUrl = "http://localhost:4000/plan-and-price-setup";
  it('passes', () => {
    cy.viewport(1536, 960);

    cy.window().then((win) => {
      win.localStorage.setItem('LS_KEY_AUTH_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRUeGVVSWlTU2Rjb2lCOWtGd215WUowUVQyMTMiLCJpYXQiOjE3Mzk0NTEyMjcsImV4cCI6MTczOTUzNzYyN30.pNQvM_WB5nEQLT-Tdk-OmoSjSErWiuCY4jocaJ7esFU');
      win.localStorage.setItem('LS_KEY_USER_ID', 'tTxeUIiSSdcoiB9kFwmyYJ0QT213');
    });

    cy.wait(2000); // wait for 2 seconds

    // STEP 1 ---------
    // go to plan and price page
    cy.visit(baseUrl); // go to the url

    cy.wait(5000); // wait for 5 seconds

    // STEP 2 ---------
    // add new plan and price
    cy.get('button[button-name="add-plan-and-price-btn"]').click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('input[name="plan_name"]').clear().type('Cypress Plan');

    cy.wait(1000 * 10); // wait 10 seconds for image upload

    cy.get('input[cypress-name="amount-0-0-price"]').clear().type(25);
    cy.get('input[cypress-name="amount-0-1-price"]').clear().type(300);
    cy.get('input[cypress-name="amount-0-2-price"]').clear().type(25);

    cy.get('input[cypress-name="amount-0-0-discount_price"]').clear().type(22);
    cy.get('input[cypress-name="amount-0-1-discount_price"]').clear().type(210);
    cy.get('input[cypress-name="amount-0-2-discount_price"]').clear().type(20);

    cy.get('input[name="trial_period"]').clear().type(30);

    cy.get('input[cypress-name="plan-and-price-feature-input"]').clear().type('feature1,feature2,feature3,');

    cy.get('button[type="submit"]').click();

    cy.wait(5000); // wait for 5 seconds

    // STEP 3 ---------
    // edit the newly added plan and price
    cy.get('div[cypress-grid-name="grid0"]')
      .find('button[cypress-name="plan-and-price-edit"]')
      .click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('input[name="plan_name"]').clear().type('Cypress Plan Updated');

    cy.get('input[name="trial_period"]').clear().type(20);

    cy.get('button[type="submit"]').click();

    cy.wait(5000); // wait for 5 seconds

    cy.get('a[cypress-name="go-back-to-plan-and-price-page"]').click();
    cy.wait(5000); // wait for 5 seconds

    cy.get('div[cypress-grid-name="grid0"]')
      .find('select[cypress-name="change-currency-flag"]').select("USD");

    cy.wait(2000); // wait for 2 seconds

    // STEP 4 ---------
    // change between grid and table mode
    cy.get('button[button-name="change-plan-and-price-view-mode-table"]').click();

    cy.wait(2000); // wait for 2 seconds

    // STEP 5 ---------
    // see view more
    cy.get('tbody[cypress-name="plan-and-price-table-view-table-tbody"] tr')
      .first()
      .find('button[cypress-name="plan-and-price-table-view-more-button"]')
      .click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('button[cypress-name="close-view-more"]').click();

    cy.wait(2000); // wait for 2 seconds

    // STEP 6 ---------
    // delete plan and price
    cy.get('tbody[cypress-name="plan-and-price-table-view-table-tbody"] tr')
      .first()
      .find('button[cypress-name="delete-plan-and-price-from-table-view"]')
      .click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('button[cypress-name="delete-plan-and-price"]').click();

    cy.wait(5000);

    // STEP 7 ---------
    // change between grid and table mode
    cy.get('button[button-name="change-plan-and-price-view-mode-grid"]').click();
  })
})