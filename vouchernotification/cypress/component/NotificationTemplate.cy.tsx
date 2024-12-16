import NotificationTemplate from '../../src/pages/NotificationTemplate';
import React from 'react';

describe('NotificationTemplate.cy.tsx', () => {
  it('check everything is working', () => {
    cy.mount(<NotificationTemplate/>)
  })
})