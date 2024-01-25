import { render, screen } from '@testing-library/react';
import { ReduxProvider } from '../../../../tests/helpers';
import { store } from '../../../app/store';
import Game from './Game';

describe('Game', () => {
  it('Renders Start Menu', () => {
    render(
      <ReduxProvider reduxStore={store}>
        <Game />
      </ReduxProvider>
    );
    const startMenu = screen.getByTestId('start-menu');
    expect(startMenu).toBeInTheDocument();
  });
});
