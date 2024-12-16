import PasswordResetSuccessful from '../../src/pages/PasswordResetSuccessful';
import React from 'react';

describe('Test the complete functionality', () => {
  it('check everything is working', () => {
    cy.mount(<PasswordResetSuccessful/>)
  })
})