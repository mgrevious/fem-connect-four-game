import { expect } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../test/utils';
import Game from './Game';
import { initialState } from '../game-slice';
import { AppView, PlayerName } from '../helpers';

test('Game renders', () => {
  renderWithProviders(<Game />);
  expect(screen.getByTestId('game')).toBeInTheDocument();
});

test('PlayerScore renders', () => {
  renderWithProviders(<Game />);
  expect(screen.getByTestId('player1')).toBeInTheDocument();
});

test('Header renders', () => {
  renderWithProviders(<Game />);
  expect(screen.getByTestId('header')).toBeInTheDocument();
});

test('Grid renders', () => {
  renderWithProviders(<Game />);
  expect(screen.getByTestId('grid')).toBeInTheDocument();
});

test('Game background has class bg-mustard, if player 2 wins.', () => {
  renderWithProviders(<Game />, {
    preloadedState: {
      game: {
        ...initialState,
        gameWinner: PlayerName.PLAYER_TWO,
        currentView: AppView.GAME,
      },
    },
  });
  expect(screen.getByTestId('bg-color')).toHaveClass('bg-mustard');
});

test('Game background has class bg-coral, if player 1 wins.', () => {
  renderWithProviders(<Game />, {
    preloadedState: {
      game: {
        ...initialState,
        gameWinner: PlayerName.PLAYER_ONE,
        currentView: AppView.GAME,
      },
    },
  });
  expect(screen.getByTestId('bg-color')).toHaveClass('bg-coral');
});

test('Game background has class bg-primary-dark, if gameWinner is undefined.', () => {
  renderWithProviders(<Game />, {
    preloadedState: {
      game: {
        ...initialState,
        gameWinner: undefined,
        currentView: AppView.GAME,
      },
    },
  });
  expect(screen.getByTestId('bg-color')).toHaveClass('bg-primary-dark');
});
