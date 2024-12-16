import React from 'react';
import AboutUs from '../../src/components/cms/AboutUs';

describe('AboutUs.cy.tsx', () => {
  it('check everything is working', () => {
    cy.mount(<AboutUs/>)
  })
})