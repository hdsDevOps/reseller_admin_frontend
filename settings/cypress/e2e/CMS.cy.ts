describe('CMS', () => {
  const baseUrl = "http://localhost:3000";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkQ4UGhESWxaNU1oZ1VjalI3MGFZRWQ0QXNBazIiLCJpYXQiOjE3MzM5MTQxNTQsImV4cCI6MTczMzkxNzc1NH0.O3I4xFzsc_rmeWVisK_rUQyyOWyOgLnnIP_fv2mM-Lc";
  it('CMS flow', () => {
    // step 1: visit Email Log page
    cy.visit(`${baseUrl}/cms`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('LS_KEY_AUTH_TOKEN', token); // Adjust the key to match your app's requirement
      },
    });

    // step 2: view details of Promotion Section
    cy.get('button[cypress-name="cms-sction-2"]').click();

    // step 3: add promotion
    cy.get('button[cypress-name="cypress-add-promotion"]').click();
    cy.wait(3000);
    cy.get('input[name="code"]').type("Cypress code");
    cy.get('input[name="start_date"]').type("2024-12-01");
    cy.get('textarea[name="html_template"]').type('<div style="background-color: blue; color: white; border: 1px solid black; border-radius: 5px;">This is cypress template.</div>');
    cy.get('input[name="end_date"]').type("2024-12-31");

    cy.get('button[cypress-name="cypress-promotion-preview-btn"]').click();
    cy.wait(3000);
    cy.get('button[cypress-name="close-promotion-preview-btn"]').click();
    cy.get('button[cypress-name="submit-promotion-add-btn"]').click();

    // step 4: edit the promotion
    cy.get('button[cypress-name="edit-promotion-1"]').click();
    cy.wait(1000);

    cy.get('input[name="code"]').clear().type("Cypress edit");cy.get('button[cypress-name="cypress-promotion-preview-btn"]').click();
    cy.wait(3000);
    cy.get('button[cypress-name="close-promotion-preview-btn"]').click();
    cy.get('button[cypress-name="submit-promotion-add-btn"]').click();

    // step 5: delete the promotion
    cy.wait(3000);
    cy.get('button[cypress-name="delete-promotion-1"]').click();
    cy.get('button[cypress-name="delete-promotion-btn"]').click();
  })
})