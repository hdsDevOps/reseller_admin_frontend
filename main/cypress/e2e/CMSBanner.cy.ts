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
    cy.get('button[cypress-name="cms-sction-1"]').should('be.visible').click();
    cy.wait(5000); // wait for 2 seconds

    // STEP 3 ---------
    // add new banner
    cy.get('button[cypress-name="cms-add-new-banner"]').should('be.visible').click();
    cy.wait(2000);

    cy.get('input[name="title"]').clear().type('Cypress');
    cy.get('label[cypress-name="cms-add-banner-show-video-toggle"]').should('be.visible').click();
    cy.get('input[name="video_url"]').clear().type('https://www.youtube.com/watch?v=l8knG0BPr-o');
    cy.get('input[cypress-name="currency-add"]').clear().type(10);
    cy.get('button[cypress-name="currency-add-button"]').should('be.visible').click();
    cy.wait(1000); // wait for 1 second
    
    cy.get('input[name="button_title"]').clear().type('Cypress');
    cy.get('input[name="button_url"]').clear().type('https://www.cypress.io/');

    cy.wait(1000 * 20); // wait for 10 seconds

    cy.get('button[cypress-name="cms-add-banner-submit"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds
    cy.get('button[cypress-name="close-cms-add-banner"]').should('be.visible').click();
    cy.wait(5000); // wait for 2 seconds

    // STEP 4 ---------
    // edit the new banner
    cy.get('[cypress-name="cms-banner"]').each(($banner) => {
      cy.wrap($banner)
        .find('td.banner-table-td-2')
        .then(($cells) => {
          if ($cells.text().trim().includes('Cypress')) {
            cy.wrap($banner)
              .find('[cypress-name="edit-cms-banner-button"]') // Find the edit button
              .click();
          }
        });
    });

    cy.wait(2000);

    cy.get('input[name="title"]').clear().type('Cypress Banner');
    cy.get('label[cypress-name="cms-add-banner-show-video-toggle"]').should('be.visible').click();

    cy.get('button[cypress-name="cms-add-banner-submit"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds

    // STEP 5 ---------
    // delete the new banner
    cy.get('[cypress-name="cms-banner"]').each(($banner) => {
      cy.wrap($banner)
        .find('td.banner-table-td-2')
        .then(($cells) => {
          if ($cells.text().trim().includes('Cypress')) {
            cy.wrap($banner)
              .find('[cypress-name="delete-cms-banner-button"]') // Find the edit button
              .click();
          }
        });
    });

    cy.wait(2000);

    cy.get('button[cypress-name="cms-banner-delete-button"]').should('be.visible').click();
  })
})