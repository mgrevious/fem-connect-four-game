import { expect, test } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import ConnectFour from './ConnectFour';
import { renderWithProviders } from '../../../test/utils';

test('Renders Start Menu on Load', () => {
  renderWithProviders(<ConnectFour />);
  const startMenu = screen.getByTestId('start-menu');
  expect(startMenu).toBeInTheDocument();
});

test('Renders Game when Player vs Player button clicked', () => {
  renderWithProviders(<ConnectFour />);
  expect(screen.getByTestId('start-menu')).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('player-vs-player-btn'));
  expect(screen.getByTestId('game')).toBeInTheDocument();
});

test('Renders GameRules when game rules button clicked', () => {
  renderWithProviders(<ConnectFour />);
  expect(screen.getByTestId('start-menu')).toBeInTheDocument();

  fireEvent.click(screen.getByTestId('game-rules-btn'));
  expect(screen.getByTestId('game-rules')).toBeInTheDocument();
});
