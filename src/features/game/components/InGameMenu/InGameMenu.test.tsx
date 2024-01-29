import { describe } from 'vitest';
import {
  fireEvent,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import { renderWithProviders } from '../../../../../test/utils';
import ConnectFour from '../../ConnectFour';

describe('Render InGameMenu and Fire Click Events', async () => {
  test('Render InGameMenu', () => {
    renderWithProviders(<ConnectFour />);
    fireEvent.click(screen.getByTestId('player-vs-player-btn'));
    fireEvent.click(screen.getByTestId('header-navigate-to-menu'));
    expect(screen.getByTestId('in-game-menu')).toBeInTheDocument();
  });

  test('InGameMenu is removed from screen when Continue btn is clicked', () => {
    renderWithProviders(<ConnectFour />);
    fireEvent.click(screen.getByTestId('player-vs-player-btn'));
    fireEvent.click(screen.getByTestId('header-navigate-to-menu'));
    const InGameMenu = screen.getByTestId('in-game-menu');
    fireEvent.click(screen.getByTestId('in-game-menu-continue'));

    waitForElementToBeRemoved(InGameMenu, {
      timeout: 300,
    }).then(() => {
      expect(InGameMenu).not.toBeInTheDocument();
    });
  });

  test('InGameMenu is removed from screen when Restart btn is clicked', () => {
    renderWithProviders(<ConnectFour />);
    fireEvent.click(screen.getByTestId('player-vs-player-btn'));
    fireEvent.click(screen.getByTestId('header-navigate-to-menu'));
    const InGameMenu = screen.getByTestId('in-game-menu');
    fireEvent.click(screen.getByTestId('in-game-menu-restart'));

    waitForElementToBeRemoved(InGameMenu, {
      timeout: 300,
    }).then(() => {
      expect(InGameMenu).not.toBeInTheDocument();
    });
  });

  test('InGameMenu is removed from screen and user navigates to StartMenu when Quit btn is clicked', () => {
    renderWithProviders(<ConnectFour />);
    fireEvent.click(screen.getByTestId('player-vs-player-btn'));
    fireEvent.click(screen.getByTestId('header-navigate-to-menu'));
    const InGameMenu = screen.getByTestId('in-game-menu');
    fireEvent.click(screen.getByTestId('in-game-menu-quit'));

    waitForElementToBeRemoved(InGameMenu, {
      timeout: 300,
    }).then(() => {
      expect(InGameMenu).not.toBeInTheDocument();
      expect(screen.getByTestId('start-menu')).toBeInTheDocument();
    });
  });
});
