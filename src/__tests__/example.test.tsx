import { render, screen } from '@testing-library/react';

describe('Example test', () => {
  it('renders text', () => {
    render(<div>Jest work!</div>);
    expect(screen.getByText('Jest work!')).toBeInTheDocument();
  });
});
