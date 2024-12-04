import React from 'react';
import SEO from '../../src/components/cms/SEO';

describe('SEO.cy.tsx', () => {
  it('check everything is working', () => {
    cy.mount(<SEO/>)
  })
})