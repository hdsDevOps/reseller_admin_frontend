import React from 'react';
import Promotion from '../../src/components/cms/Promotion';

describe('Promotion.cy.tsx', () => {
  it('check everything is working', () => {
    cy.mount(<Promotion/>)
  })
})