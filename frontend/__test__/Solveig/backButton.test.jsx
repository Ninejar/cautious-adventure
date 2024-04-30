import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BackButton from '../../src/components/BackButton/BackButton';

describe('BackButton component - solveig', () => {
  // Test to verify that the BackButton renders correctly using the default properties
  it('renders correctly with default props - solveig', () => {
    // Render the BackButton inside a MemoryRouter to simulate routing context
    const { getByTestId } = render(
      <MemoryRouter>
        <BackButton />
      </MemoryRouter>
    );
    // Retrieve the button by its test ID and check if it navigates to the expected URL
    const link = getByTestId('back-button');
    expect(link.getAttribute('href')).toBe('/journals/');
  });

  it('links to a custom path when provided - solveig', () => {
    const customPath = '/custom-path';
    const { getAllByTestId } = render(
      <MemoryRouter>
        <BackButton destination="/journals/" />
        <BackButton destination={customPath} />
      </MemoryRouter>
    );
    const allLinks = getAllByTestId('back-button');
    const customLink = allLinks.find(link => link.getAttribute('href') === customPath);

    expect(customLink).toBeTruthy();
    expect(customLink.getAttribute('href')).toBe(customPath);
  });
});