import { render, screen } from '@testing-library/react';
import App from './App';
import { Film, FilmResponse } from './models/film';

describe('App', () => {
  test('should render "Loading..." at the beginning', () => {
    render(<App />);
    const result = screen.getByText('Loading...');
    expect(result).toBeVisible();
  });

  test('should render list of films with "Start Wars films:" paragraph', async () => {
    window.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ results: [] as Film[] } as FilmResponse)
    })) as jest.Mock;

    render(<App />);

    const result = await screen.findByText('Start Wars films:');
    expect(result).toBeVisible();
  });
});