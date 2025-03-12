describe('admin portal microservice', () => {
  const baseUrl = "http://localhost:4000/cms";
  it('passes', () => {
    cy.viewport(1536, 960);

    cy.window().then((win) => {
      win.localStorage.setItem('LS_KEY_AUTH_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRUeGVVSWlTU2Rjb2lCOWtGd215WUowUVQyMTMiLCJpYXQiOjE3Mzk1MDg2NTMsImV4cCI6MTczOTU5NTA1M30.1b4gLcOzVz9vnsk-iylnUZ-xbmUfS3Z6GsI782YcDQU');
      win.localStorage.setItem('LS_KEY_USER_ID', 'tTxeUIiSSdcoiB9kFwmyYJ0QT213');
    });

    cy.wait(2000); // wait for 2 seconds

    // STEP 1 ---------
    // go to cms page
    cy.visit(baseUrl); // go to the url

    cy.wait(5000); // wait for 5 seconds

    // STEP 2 ---------
    // open banner
    cy.get('button[cypress-name="cms-sction-2"]').should('be.visible').click();
    cy.wait(5000); // wait for 2 seconds

    // STEP 3 ---------
    // add new banner
    cy.get('button[cypress-name="cypress-add-promotion"]').should('be.visible').click();
    cy.wait(2000); // wait for 2 seconds

    cy.get('input[name="code"]').clear().type('Cypress');
    cy.get('textarea[name="html_template"]').clear().type('<a>Cypress</a>');
    cy.get('input[name="start_date"]').clear().type('2025-02-28');
    cy.wait(1000); // wait for a seconds
    cy.get('input[name="end_date"]').clear().type('2025-02-14');
    cy.get('input[cypress-name="cms-add-promotion-discount"]').clear().type(5);
    cy.get('button[cypress-name="cms-add-promotion-discount-button"]').should('be.visible').click();

    cy.get('button[cypress-name="cypress-promotion-preview-btn"]').should('be.visible').click();

    cy.wait(4000); // wait for 4 seconds
    cy.get('button[cypress-name="close-promotion-preview-btn"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('button[cypress-name="submit-promotion-add-btn"]').should('be.visible').click();

    cy.wait(5000); // wait for 5 seconds

    // STEP 4 ---------
    // edit the new banner
    cy.get('[cypress-name="edit-promotion-button"]').each(($button) => {
      cy.wrap($button)
        .closest('div.p-4.border') // Navigate to the promotion container
        .find('td.banner-table-td-2') // Look in table cells where promo details exist
        .then(($cells) => {
          if ($cells.text().includes('Cypress')) {
            cy.wrap($button).click(); // Click the edit button if the promo code matches
          }
        });
    });
    cy.wait(2000); // wait for 2 seconds

    cy.get('textarea[name="html_template"]').clear().type('<a>This promotion has been created by Cypress.</a>');

    cy.get('button[cypress-name="cypress-promotion-preview-btn"]').should('be.visible').click();

    cy.wait(4000); // wait for 4 seconds
    cy.get('button[cypress-name="close-promotion-preview-btn"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('button[cypress-name="submit-promotion-add-btn"]').should('be.visible').click();

    cy.wait(5000); // wait for 5 seconds

    // STEP 5 ---------
    // delete the new banner
    cy.get('[cypress-name="delete-promotion-button"]').each(($button) => {
      cy.wrap($button)
        .closest('div.p-4.border') // Navigate to the promotion container
        .find('td.banner-table-td-2') // Look in table cells where promo details exist
        .then(($cells) => {
          if ($cells.text().includes('Cypress')) {
            cy.wrap($button).click(); // Click the edit button if the promo code matches
          }
        });
    });
    cy.wait(2000); // wait for 2 seconds

    cy.get('button[cypress-name="delete-promotion-btn"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds
  })
})