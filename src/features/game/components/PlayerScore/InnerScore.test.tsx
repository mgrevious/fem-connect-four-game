import { describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { store } from '../../../../app/store';
import InnerScore from './InnerScore';

describe('InnerScore component tests', () => {
  test('InnerScore renders', () => {
    const {
      game: { player1 },
    } = store.getState();
    render(<InnerScore player={player1} />);

    expect(screen.getByTestId('inner-score')).toBeInTheDocument();
  });

  test('InnerScore renders Player 1', () => {
    const {
      game: { player1 },
    } = store.getState();
    render(<InnerScore player={player1} />);

    expect(screen.getByText(/Player 1/i)).toBeDefined();
    expect(screen.getByText('0')).toBeDefined();
  });

  test('InnerScore renders Player 2', () => {
    const {
      game: { player2 },
    } = store.getState();
    render(<InnerScore player={player2} />);

    expect(screen.getByText(/Player 2/i)).toBeDefined();
    expect(screen.getByText('0')).toBeDefined();
  });
});
