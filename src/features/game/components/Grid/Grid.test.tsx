import { expect } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../../test/utils';
import Grid from '.';

test('Grid renders', () => {
  renderWithProviders(<Grid />);
  expect(screen.getByTestId('grid')).toBeInTheDocument();
});
test('If Selector button is clicked, Grid renders game piece', async () => {
  renderWithProviders(<Grid />);
  expect(screen.getByTestId('grid')).toBeInTheDocument();
  const selectedColumn = screen.getByTestId('selector-btn-0');
  expect(selectedColumn).toBeInTheDocument();

  fireEvent.click(selectedColumn);
  screen.getByTestId('active-gamepiece_06');
});
