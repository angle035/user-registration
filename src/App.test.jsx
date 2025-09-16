import { render, screen } from '@testing-library/react';
import App from './App';
import '../tests/matchMedia.mock'; 

test('Title should be render', () => {
  render(<App />);
  const linkElement = screen.getByText(/Multi-step User Registration/i);
  expect(linkElement).toBeInTheDocument();
});
