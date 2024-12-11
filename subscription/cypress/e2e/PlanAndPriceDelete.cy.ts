describe('plan & price setup delete page', () => {
  const baseUrl = "http://localhost:3000";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkQ4UGhESWxaNU1oZ1VjalI3MGFZRWQ0QXNBazIiLCJpYXQiOjE3MzM5MTAxMjEsImV4cCI6MTczMzkxMzcyMX0.2F319NtBa2Ao6Lce4Xtpgz-7qCBkXo1zyx19he4L6a0";
  const fileName = 'image.jpg';
  const filePath = 'images/'+fileName;
  it('plan & price setup add flow', () => {
    // step 1: visit plan & price setup page
    cy.visit(`${baseUrl}/plan-and-price-setup`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('LS_KEY_AUTH_TOKEN', token); // Adjust the key to match your app's requirement
      },
    });

    // step 2: open the modal
    cy.wait(1000);
    cy.get('div[cypress-grid-name="grid1"]').find('button[cypress-name="plan-and-price-delete"]').click();

    // step 3: delete the plan
    cy.get('button[cypress-name="delete-plan-and-price"]').click();
  })
})