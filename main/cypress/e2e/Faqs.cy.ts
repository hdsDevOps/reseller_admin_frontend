describe('admin portal microservice', () => {
  const baseUrl = "http://localhost:4000/faqs";
  it('passes', () => {
    cy.viewport(1536, 960);

    cy.window().then((win) => {
      win.localStorage.setItem('LS_KEY_AUTH_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRUeGVVSWlTU2Rjb2lCOWtGd215WUowUVQyMTMiLCJpYXQiOjE3Mzk1MDg2NTMsImV4cCI6MTczOTU5NTA1M30.1b4gLcOzVz9vnsk-iylnUZ-xbmUfS3Z6GsI782YcDQU');
      win.localStorage.setItem('LS_KEY_USER_ID', 'tTxeUIiSSdcoiB9kFwmyYJ0QT213');
    });

    cy.wait(2000); // wait for 2 seconds

    // STEP 1 ---------
    // go to faqs page
    cy.visit(baseUrl); // go to the url

    cy.wait(5000); // wait for 5 seconds

    // STEP 2 ---------
    // add new faq
    cy.get('button[cypress-name="add-new-faq"]').should('be.visible').click();
    cy.wait(2000); // wait for 2 seconds

    cy.get('input[name="question"]').clear().type('What is a Faq?');
    cy.get('input[name="answer"]').clear().type('Faq is Frequently Asked Questions.');
    cy.get('input[name="order"]').clear().type(12);

    cy.wait(2000); // wait for 2 seconds

    cy.get('button[type="submit"]').should('be.visible').click();

    // STEP 3 ---------
    // show faqs and edit the new faq
    cy.get('button[cypress-name="faq-number-1"]').should('be.visible').click();
    cy.wait(2000); // wait for 2 seconds
    
    cy.get('button[cypress-name="faq-number-12"]').should('be.visible').click();
    cy.wait(2000); // wait for 2 seconds
    
    cy.get('button[cypress-name="edit-faq-number-12"]').should('be.visible').click();
    cy.wait(2000); // wait for 2 seconds

    cy.get('input[name="answer"]').clear().type('A frequently asked questions (FAQ) list is often used in articles, websites, email lists, and online forums where common questions tend to recur, for example through posts or queries by new users related to common knowledge gaps.');
    cy.wait(2000); // wait for 2 seconds

    cy.get('button[type="submit"]').should('be.visible').click();

    // STEP 4 ---------
    // delete the new faq
    cy.get('button[cypress-name="delete-faq-number-12"]').should('be.visible').click();
    cy.wait(2000); // wait for 2 seconds

    cy.get('button[cypress-name="delete-faq-modal"]').should('be.visible').click();
    cy.wait(2000); // wait for 2 seconds
  })
})