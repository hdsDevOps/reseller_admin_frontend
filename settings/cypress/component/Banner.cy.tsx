import React from 'react';
import Banner from '../../src/components/cms/Banner';

describe('Banner.cy.tsx', () => {
  it('check everything is working', () => {
    cy.mount(<Banner/>)
  })
})