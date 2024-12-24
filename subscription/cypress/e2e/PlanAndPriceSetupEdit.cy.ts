import 'cypress-file-upload';

describe('plan & price setup add page', () => {
  const baseUrl = "http://localhost:4000";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRUeGVVSWlTU2Rjb2lCOWtGd215WUowUVQyMTMiLCJpYXQiOjE3MzUwMzQ0NzksImV4cCI6MTczNTAzODA3OX0.-0LmLIYKWMGDWs3Ni9IT8RVF94Z8JbFHwUVPHHwJ-D4";
  const fileName = 'image.jpg';
  const filePath = 'images/'+fileName;
  it('plan & price setup add flow', () => {
    // step 1: visit plan & price setup page
    cy.visit(`${baseUrl}/plan-and-price-setup`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('LS_KEY_AUTH_TOKEN', token); // Adjust the key to match your app's requirement
      },
    });

    // step 2: go to plan & price add page
    cy.wait(1000);
    cy.get('div[cypress-grid-name="grid1"]').find('button[cypress-name="plan-and-price-edit"]').click();

    // step 3: edit data to forms
    cy.get('input[name="plan_name"]').type(" edit");

    cy.get('input[name="trial_period"]').clear().type(60);

    cy.get('button[button-name="add-plan-and-price-btn"]').click();
  })
})