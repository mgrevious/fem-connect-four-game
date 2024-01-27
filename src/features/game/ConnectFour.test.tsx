import { render, screen } from '@testing-library/react';
import { ReduxProvider } from '../../../test/helpers';
import { store } from '../../app/store';
import ConnectFour from './ConnectFour';

describe('ConnectFour', () => {
  it('Renders Start Menu', () => {
    render(
      <ReduxProvider reduxStore={store}>
        <ConnectFour />
      </ReduxProvider>
    );
    const startMenu = screen.getByTestId('start-menu');
    expect(startMenu).toBeInTheDocument();
  });
});
