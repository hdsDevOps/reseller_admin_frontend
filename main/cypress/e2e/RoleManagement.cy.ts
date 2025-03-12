describe('admin portal microservice', () => {
  const baseUrl = "http://localhost:4000/role";
  it('passes', () => {
    cy.viewport(1536, 960);

    cy.window().then((win) => {
      win.localStorage.setItem('LS_KEY_AUTH_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRUeGVVSWlTU2Rjb2lCOWtGd215WUowUVQyMTMiLCJpYXQiOjE3Mzk1MDg2NTMsImV4cCI6MTczOTU5NTA1M30.1b4gLcOzVz9vnsk-iylnUZ-xbmUfS3Z6GsI782YcDQU');
      win.localStorage.setItem('LS_KEY_USER_ID', 'tTxeUIiSSdcoiB9kFwmyYJ0QT213');
    });

    cy.wait(2000); // wait for 2 seconds

    // STEP 1 ---------
    // go to role list page
    cy.visit(baseUrl); // go to the url

    cy.wait(5000); // wait for 5 seconds

    // STEP 2 ---------
    // create a new role
    cy.get('button[cypress-name="add-new-role"]').should('be.visible').click();
    cy.wait(2000); // wait for 2 seconds

    cy.get('input[name="role_name"]').clear().type('Cypress User');
    cy.get('input[name="description"]').clear().type('Cypress User');

    cy.get('input[name="customer_management"]').click();
    cy.get('input[name="voucher_management"]').click();

    cy.get('button[type="submit"]').should('be.visible').click();

    // STEP 3 ---------
    // filter and edit the new role
    cy.get('input[name="user_type"]').clear().type('Cypress');
    cy.wait(2000); // wait for 2 seconds

    cy.get('[cypress-name="search-user-type-dropdown"] p').first().click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('tbody tr')
      .first()
      .find('button[cypress-name="edit-role-button"]')
      .click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('input[cypress-name="voucher-management-customer_group"]').should('be.visible').click();
    cy.get('input[cypress-name="voucher-management-voucher_list"]').should('be.visible').click();

    cy.get('input[name="notification_template"]').should('be.visible').click();

    cy.get('button[type="submit"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds

    // STEP 4 ---------
    // go to user list
    cy.get('button[cypress-name="sidebar-nav-name"]').contains('Role Management').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('button[cypress-name="sidebar-subnav-button"]').contains('User list').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds

    // STEP 5 ---------
    // add new role user
    cy.get('button[cypress-name="add-new-role-user"]').should('be.visible').click();
    cy.wait(2000); // wait for 2 seconds

    cy.get('input[name="first_name"]').clear().type('Tony');
    cy.get('input[name="last_name"]').clear().type('Stark');
    cy.get('input[name="email"]').clear().type('tony.stark10@yopmail.com');
    cy.get('input[name="phone"]').clear().type('13425830528');
    cy.get('select[cypress-name="select-role-for-new-user"]').select("Cypress User");

    cy.get('button[type="submit"]').should('be.visible').click();

    cy.wait(5000); // wait for 2 seconds

    // STEP 6 ---------
    // filter the users
    cy.get('select[cypress-name="filter-role"]').select("Admin");
    cy.wait(5000);

    cy.get('button[cypress-name="clear-filter-button"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('input[cypress-name="search-role-filter"]').clear().type('Tony Stark');
    cy.get('button[cypress-name="search-role-filter-button"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds

    // STEP 7 ---------
    // edit the new user
    cy.get('tbody tr')
      .first()
      .find('button[cypress-name="edit-role-user"]')
      .click();

    cy.wait(2000); // wait for 2 seconds

    cy.get('input[name="first_name"]').clear().type('Howard');
    cy.get('button[type="submit"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds
     
    cy.get('button[cypress-name="clear-filter-button"]').should('be.visible').click();

    cy.wait(2000); // wait for 2 seconds

    // STEP 8 ---------
    // log out and log in as new user
    cy.get('button[cypress-name="log-out-side-bar"]').should('be.visible').click();
    cy.wait(2000);
    cy.url().should('include', 'login');
    cy.wait(2000);
    cy.get('input[name="email"]').clear().type('tony.stark10@yopmail.com');
    cy.wait(1000 * 20);
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.url().should('include', '?mode=signin');
    cy.wait(2000);
    cy.contains('OTP verification').should('be.visible');
    cy.wait(1000 * 20);
    cy.get('button[type="submit"]').click();
    cy.wait(2000);
    cy.url().should('include', '/dashboard');
  })
})