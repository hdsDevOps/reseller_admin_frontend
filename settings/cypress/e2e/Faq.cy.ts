describe('faq', () => {
  const baseUrl = "http://localhost:3000";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkQ4UGhESWxaNU1oZ1VjalI3MGFZRWQ0QXNBazIiLCJpYXQiOjE3MzM5MTQxNTQsImV4cCI6MTczMzkxNzc1NH0.O3I4xFzsc_rmeWVisK_rUQyyOWyOgLnnIP_fv2mM-Lc";
  it('faq flow', () => {
    // step 1: visit faqs page
    cy.visit(`${baseUrl}/faqs`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('LS_KEY_AUTH_TOKEN', token); // Adjust the key to match your app's requirement
      },
    });

    // step 2: operations on faq page
    cy.get('button[cypress-name="faq-number-5"]').click();

    // step 3: add new faq
    // cy.get('button[cypress-name="add-new-faq"]').click();
    // cy.get('input[name="question"]').type("What is Cypress?");
    // cy.get('input[name="answer"]').type("It is a testing software.");
    // cy.get('input[name="order"]').type("5");

    // cy.get('button[cypress-name="add-faq-submit"]').click();


    // step 4: edit the faq
    cy.wait(1000);
    // cy.get('button[cypress-name="edit-faq-number-5"]').click();
    // cy.get('input[name="answer"]').type("Cypress it the testing software I am using.");

    // cy.get('button[cypress-name="add-faq-submit"]').click();

    // step 5: delete the faq
    cy.get('button[cypress-name="delete-faq-number-5"]').click();
    cy.get('button[cypress-name="delete-faq-modal"]').click();
  })
})