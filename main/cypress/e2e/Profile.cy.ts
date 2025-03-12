describe('admin portal microservice', () => {
  const baseUrl = "http://localhost:4000/profile-settings";
  it('passes', () => {
    cy.viewport(1536, 960);

    cy.window().then((win) => {
      win.localStorage.setItem('LS_KEY_AUTH_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRUeGVVSWlTU2Rjb2lCOWtGd215WUowUVQyMTMiLCJpYXQiOjE3Mzk1MDg2NTMsImV4cCI6MTczOTU5NTA1M30.1b4gLcOzVz9vnsk-iylnUZ-xbmUfS3Z6GsI782YcDQU');
      win.localStorage.setItem('LS_KEY_USER_ID', 'tTxeUIiSSdcoiB9kFwmyYJ0QT213');
    });

    cy.wait(2000); // wait for 2 seconds

    // STEP 1 ---------
    // go to profile settings page
    cy.visit(baseUrl); // go to the url

    cy.wait(5000); // wait for 5 seconds

    // STEP 2 ---------
    // edit profile settings
    cy.get('button[cypress-name="edit-profile-button"]').should('be.visible').click();
    cy.wait(2000); // wait for 2 seconds

    cy.get('input[cypress-name="first_name"]').clear().type('Hesham');
    cy.get('input[cypress-name="last_name"]').clear().type('Reza');
    cy.get('input[cypressName="phone"]').clear().type('919434386362');
    cy.get('input[cypress-name="street_name"]').clear().type('Mumbai, Maharashtra, India');
    cy.wait(2000); // wait for 2 seconds
    cy.get('[cypress-name="profile-street-dropdown"] p')
      .first()
      .click();

    cy.get('button[cypress-name="edit-profile-submit-button"]').should('be.visible').click();

    cy.wait(2000);

    // STEP 3 ---------
    // edit profile image
    cy.get('label[cypress-name="profile-update-image-button"]').should('be.visible').click();

    cy.wait(1000 * 10); // wait for 20 seconds

    cy.get('button[cypress-name="profile-image-submit-button"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds
  })
})