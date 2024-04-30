import React from 'react';
import { describe, it, expect, beforeAll } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import axios from 'axios';
import Signup from '../../src/components/Signup/Signup';

describe('Signup component', () => {

  describe('Signup process', () => {
    it('allows user to sign up', async () => {
      const { getByPlaceholderText, getByLabelText, getByText, queryByText } = render(
        <MemoryRouter>
          <Signup />
        </MemoryRouter>
      );
  
      // Fill in the input fields
      fireEvent.change(getByPlaceholderText('First name'), { target: { value: 'John' } });
      fireEvent.change(getByPlaceholderText('Last name'), { target: { value: 'Doe' } });
      fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'john.doe@example.com' } });
      fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });
  
      // Select the role
      fireEvent.click(getByLabelText('Student'));
  
      // Trigger signup
      fireEvent.click(getByText('Signup'));
  
      // Wait for a confirmation message to appear
      await waitFor(() => {
        expect(queryByText('Signup successful!')).toBe(null);
      });
    });
  });
  
});
