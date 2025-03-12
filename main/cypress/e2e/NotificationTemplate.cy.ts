describe('admin portal microservice', () => {
  const baseUrl = "http://localhost:4000/notification-template";
  it('passes', () => {
    cy.viewport(1536, 960);

    cy.window().then((win) => {
      win.localStorage.setItem('LS_KEY_AUTH_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRUeGVVSWlTU2Rjb2lCOWtGd215WUowUVQyMTMiLCJpYXQiOjE3Mzk0MjMxODksImV4cCI6MTczOTUwOTU4OX0.qLrtXW7-hD9z7l2UMeQ1nF4aBHgKEHLlWYoUsiGcYKs');
      win.localStorage.setItem('LS_KEY_USER_ID', 'tTxeUIiSSdcoiB9kFwmyYJ0QT213');
    });

    cy.wait(2000); // wait for 2 seconds

    // STEP 1 ---------
    // go to notification template page
    cy.visit(baseUrl); // go to the url

    cy.wait(5000); // wait for 5 seconds

    // STEP 2 ---------
    // create a new notification template
    cy.get('button[button-name="add-new-template"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('div[cypress-name="add-new-notification-template-modal"]').should('be.visible');

    cy.get('input[name="subject"]').clear().type("Notification141");

    cy.get('button[button-name="add-voucher-submit-btn"]').click();
    
    cy.wait(5000); // wait for 2 seconds

    // STEP 3 ---------
    // update the notification template details
    cy.get('select[name="select-notification"]').select('Notification141');

    cy.wait(2000); // wait for 2 seconds

    cy.get('textarea[name="template_content"]').clear().type('<div style="background-color: black; color: white; border: 2px solid gray; border-radius: 5px; display: flex; justify-content: center;"><a>Hello</a></div>');

    cy.get('button[button-name="notificaiton-template-update-preview"]').click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('div[cypress-name="notification-template-preview-modal"]').should('be.visible');

    cy.get('button[button-name="notification-template-preview-close"]').click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('button[button-name="notificaiton-template-update-add"]').click();

    cy.wait(5000); // wait for 2 seconds

    // STEP 4 ---------
    // send the notification template for testing

    cy.get('input[type="email"]').clear().type('heshamreza2025-5@yopmail.com');

    cy.get('button[cypress-name="send-test-notification-template-to-email"]').click();

    cy.wait(5000); // wait for 5 seconds

    // STEP 5 ---------
    // delete the notification template

    cy.get('button[button-name="notificaiton-template-update-delete"]').click();

    cy.get('div[cypress-name="delete-notification-template-modal"]').should('be.visible');

    cy.wait(2000); // wait for 2 seconds

    cy.get('button[button-name="delete-notification-template-delete-btn"]').click();
  })
})