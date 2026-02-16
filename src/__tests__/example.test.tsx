import { render, screen } from '@testing-library/react';

describe('Example test', () => {
  it('renders text', () => {
    render(<div>Vitest works!</div>);
    expect(screen.getByText('Vitest works!')).toBeDefined();
  });
});
