describe('voucher list add new', () => {
  const baseUrl = "http://localhost:3000";
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IkQ4UGhESWxaNU1oZ1VjalI3MGFZRWQ0QXNBazIiLCJpYXQiOjE3MzM5MTAxMjEsImV4cCI6MTczMzkxMzcyMX0.2F319NtBa2Ao6Lce4Xtpgz-7qCBkXo1zyx19he4L6a0";
  it('voucher list add flow', () => {
    // step 1: visit voucher list page
    cy.visit(`${baseUrl}/voucher-list`, {
      onBeforeLoad(win) {
        win.localStorage.setItem('LS_KEY_AUTH_TOKEN', token); // Adjust the key to match your app's requirement
      },
    });

    // step 2: go to add new voucher list
    cy.get('button[button-name="voucher-list-add-new-btn"').click();

    // step 3: enter details to form
    cy.get('input[name="voucher_code"]').type("New Voucher");
    cy.get('input[name="start_date"]').type("2024-12-11");
    cy.get('input[name="discount_rate"]').type("10");
    cy.get('input[name="end_date"]').type("2024-12-31");
    cy.get('textarea[name="template_details"]').type('<p style="background-color: red; text: white; width: 100px; height: 40px; border: 1px solid black;">This is my created template.</p>');
    cy.get('button[button-name="voucher-template-preview"]').click();
    cy.wait(3000);
    cy.get('button[button-name="voucher-preview-close"]').click();
    cy.get('button[button-name="add-new-voucher"]').click();
  })
})