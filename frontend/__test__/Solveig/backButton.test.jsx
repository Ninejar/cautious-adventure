import React from 'react';
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BackButton from '../../src/components/BackButton/BackButton';

describe('BackButton component', () => {
  it('renders correctly with default props', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <BackButton />
      </MemoryRouter>
    );
    const link = getByTestId('back-button');
    expect(link.getAttribute('href')).toBe('/journals/');
  });

  it('links to a custom path when provided', () => {
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