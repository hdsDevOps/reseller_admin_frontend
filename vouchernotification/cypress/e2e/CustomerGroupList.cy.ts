describe('customer group list', () => {
  const baseUrl = "http://localhost:3000";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkQ4UGhESWxaNU1oZ1VjalI3MGFZRWQ0QXNBazIiLCJpYXQiOjE3MzM5MDMzODQsImV4cCI6MTczMzkwNjk4NH0.mNbALh7ILNjRhTQmAJPsLiZydKz-wJFLSoqIqY9I2kU";
  it('customer group list', () => {
    // step 1: visit customer group list page
    cy.visit(`${baseUrl}/customer-group`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('LS_KEY_AUTH_TOKEN', token); // Adjust the key to match your app's requirement
      },
    });

    // step 2: filter custom group page
      cy.get('input[name="group_name"').type("test");
      cy.wait(3000);

      cy.get('button[button-name="clear-customer-group-filter"]').click();
  })
})