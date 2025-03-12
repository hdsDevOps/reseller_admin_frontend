describe('admin portal microservice', () => {
  const baseUrl = "http://localhost:4000/cms";
  it('passes', () => {
    cy.viewport(1536, 960);

    cy.window().then((win) => {
      win.localStorage.setItem('LS_KEY_AUTH_TOKEN', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InRUeGVVSWlTU2Rjb2lCOWtGd215WUowUVQyMTMiLCJpYXQiOjE3Mzk1MDg2NTMsImV4cCI6MTczOTU5NTA1M30.1b4gLcOzVz9vnsk-iylnUZ-xbmUfS3Z6GsI782YcDQU');
      win.localStorage.setItem('LS_KEY_USER_ID', 'tTxeUIiSSdcoiB9kFwmyYJ0QT213');
    });

    cy.wait(2000); // wait for 2 seconds

    // STEP 1 ---------
    // go to cms page
    cy.visit(baseUrl); // go to the url

    cy.wait(5000); // wait for 5 seconds

    // STEP 2 ---------
    // open about us
    cy.get('button[cypress-name="cms-sction-3"]').should('be.visible').click();
    cy.wait(5000); // wait for 2 seconds

    // STEP 3 ---------
    // edit about us
    cy.get('button[cypress-name="cms-edit-about-us-button"]').should('be.visible').click();
    cy.wait(2000); // wait for 2 seconds

    cy.get('input[cypress-name="cms-about-us-page-heading"]').clear().type('Everything you need to know');
    cy.get('input[cypress-name="cms-block-1-content-title"]').clear().type('Make decisions faster, face to face.');
    cy.get('input[cypress-name="cms-block-2-content-title"]').clear().type('Secure your data and devices.');

    cy.get('button[cypress-name="cms-about-us-submit-button"]').should('be.visible').click();
    cy.wait(2000); // wait for 2 seconds

    cy.get('button[cypress-name="cms-about-us-close-button"]').should('be.visible').click();
    cy.wait(2000); // wait for 2 seconds

    // STEP 4 ---------
    // open resources
    cy.get('button[cypress-name="cms-sction-4"]').should('be.visible').click();
    cy.wait(5000); // wait for 5 seconds

    // STEP 5 ---------
    // edit resources
    cy.get('button[cypress-name="cms-edit-resources-button"]').should('be.visible').click();
    cy.wait(2000); // wait for 2 seconds

    cy.get('input[cypress-name="cms-resources-content-title-1"]').clear().type('Connect');
    cy.get('input[cypress-name="cms-resources-content-title-2"]').clear().type('Create');
    cy.get('input[cypress-name="cms-resources-content-title-3"]').clear().type('Access');
    cy.get('input[cypress-name="cms-resources-content-title-4"]').clear().type('Contact');

    cy.get('button[cypress-name="cms-resources-submit-button"]').should('be.visible').click();
    cy.wait(2000); // wait for 2 seconds

    // STEP 6 ---------
    // open contact us
    cy.get('button[cypress-name="cms-sction-5"]').should('be.visible').click();
    cy.wait(5000); // wait for 5 seconds

    // STEP 7 ---------
    // edit contact us
    cy.get('button[cypress-name="cms-edit-contact-us-button"]').should('be.visible').click();
    cy.wait(2000); // wait for 2 seconds

    cy.get('textarea[name="content_description"]').clear().type('Fill the form to contact us for more information');
    cy.get('textarea[name="address"]').clear().type('Hordanso LLC 4364 Western Center Blvd PMB 2012 Fort Worth');
    cy.get('input[name="phone_no"]').clear().type('+1 469-893-0678');
    cy.get('input[name="email"]').clear().type('sutapa.bhattacharjee@schemaphic.com');

    cy.get('button[cypress-name="cms-contact-us-submit-button"]').should('be.visible').click();
    cy.wait(2000); // wait for 2 seconds

    // STEP 8 ---------
    // open contact us
    cy.get('button[cypress-name="cms-sction-6"]').should('be.visible').click();
    cy.wait(5000); // wait for 5 seconds

    // STEP 9 ---------
    // edit contact us
    cy.get('button[cypress-name="cms-edit-footer-button"]').should('be.visible').click();
    cy.wait(2000); // wait for 2 seconds

    cy.get('input[cypress-name="cms-footer-marketing_section_data-name-0"]').clear().type('Video');
    cy.get('input[cypress-name="cms-footer-marketing_section_data-link-0"]').clear().type('https://www.google.com/');
    cy.get('input[cypress-name="cms-footer-marketing_section_data-name-1"]').clear().type('SEO');
    cy.get('input[cypress-name="cms-footer-marketing_section_data-link-1"]').clear().type('https://simplify.jobs/');

    cy.get('input[cypress-name="cms-footer-website_section_data-name-0"]').clear().type('Domain Name');
    cy.get('input[cypress-name="cms-footer-website_section_data-link-0"]').clear().type('https://simplify.jobs/');
    cy.get('input[cypress-name="cms-footer-website_section_data-name-1"]').clear().type('Design');
    cy.get('input[cypress-name="cms-footer-website_section_data-link-1"]').clear().type('https://simplify.jobs/');

    cy.get('input[cypress-name="cms-footer-newsletter_section_data-name-0"]').clear().type('Video');
    cy.get('input[cypress-name="cms-footer-newsletter_section_data-link-0"]').clear().type('https://www.bing.com/search?q=free+video+urls&FORM=R5FD1');
    cy.get('input[cypress-name="cms-footer-newsletter_section_data-name-1"]').clear().type('SMO');
    cy.get('input[cypress-name="cms-footer-newsletter_section_data-link-1"]').clear().type('https://www.youtube.com/results?search_query=cartoon');

    cy.get('button[cypress-name="cms-footer-submit-button"]').should('be.visible').click();
    cy.wait(2000); // wait for 2 seconds

    // STEP 10 ---------
    // open header
    cy.get('button[cypress-name="cms-sction-7"]').should('be.visible').click();
    cy.wait(5000); // wait for 5 seconds

    // STEP 11 ---------
    // edit header
    cy.get('button[cypress-name="cms-edit-header-button"]').should('be.visible').click();
    cy.wait(2000); // wait for 2 seconds

    cy.get('input[name="menu1"]').clear().type('Plan & Price');
    cy.get('input[name="menu2"]').clear().type('About Us');
    cy.get('input[name="menu3"]').clear().type("FAQ's");
    cy.get('input[name="menu4"]').clear().type('Resources');
    cy.get('input[name="menu5"]').clear().type('AI');
    cy.get('input[name="menu6"]').clear().type('Contact Us');

    cy.get('button[cypress-name="cms-header-submit-button"]').should('be.visible').click();
    cy.wait(2000); // wait for 2 seconds

    // STEP 12 ---------
    // open seo
    cy.get('button[cypress-name="cms-sction-8"]').should('be.visible').click();
    cy.wait(5000); // wait for 5 seconds

    // STEP 13 ---------
    // edit seo
    cy.get('button[cypress-name="cms-edit-seo-button"]').should('be.visible').click();
    cy.wait(2000); // wait for 2 seconds

    cy.get('input[name="title"]').clear().type('Hordanso GWS Customer Portal');
    cy.get('input[name="alt_image"]').clear().type('Image');
    cy.get('input[name="urllink"]').clear().type('https://main.customer.gworkspace.withhordanso.com/');

    cy.get('button[cypress-name="cms-seo-submit-button"]').should('be.visible').click();
    cy.wait(2000); // wait for 2 seconds

    cy.get('button[cypress-name="cms-seo-close-button"]').should('be.visible').click();
    cy.wait(2000); // wait for 2 seconds
  })
})