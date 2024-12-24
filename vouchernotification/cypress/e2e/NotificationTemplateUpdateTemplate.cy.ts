describe('notification template update template', () => {
  const baseUrl = "http://localhost:4000";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRUeGVVSWlTU2Rjb2lCOWtGd215WUowUVQyMTMiLCJpYXQiOjE3MzUwMzQ0NzksImV4cCI6MTczNTAzODA3OX0.-0LmLIYKWMGDWs3Ni9IT8RVF94Z8JbFHwUVPHHwJ-D4";
  it('voucher list add flow', () => {
    // step 1: visit voucher list page
    cy.visit(`${baseUrl}/notification-template`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('LS_KEY_AUTH_TOKEN', token); // Adjust the key to match your app's requirement
      },
    });

    // step 2: go to add new template
    cy.wait(2000);
    cy.get('select[name="select-notification"]').select("demo");
    cy.get('textarea[name="template_content"]').type('<div style="background-color: black; color: white; border: 2px solid gray; border-radius: 5px; display: flex; justify-content: center;"><a>Hello</a></div>');
    cy.get('button[button-name="notificaiton-template-update-preview"]').click();
    cy.wait(1000);
    cy.get('button[button-name="notification-template-preview-close"]').click();
    cy.wait(100);
    cy.get('button[button-name="notificaiton-template-update-add"]').click();
  })
})