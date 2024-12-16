import React from 'react';
import ContactSection from '../../src/components/cms/ContactSection';

describe('ContactSection.cy.tsx', () => {
  it('check everything is working', () => {
    cy.mount(<ContactSection/>)
  })
})