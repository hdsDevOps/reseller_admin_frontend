import React from 'react';
import Faqs from '../../src/pages/Faqs';

describe('Faqs.cy.tsx', () => {
  it('check everything is working', () => {
    cy.mount(<Faqs/>)
  })
})