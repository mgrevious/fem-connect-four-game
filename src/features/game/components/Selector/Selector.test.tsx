import { describe } from 'vitest';
import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../../test/utils';
import Selector from '.';

describe('Selector tests', () => {
  test('Render Selector', () => {
    renderWithProviders(<Selector setAnimationComplete={() => {}} />);
    expect(screen.getByTestId('selector')).toBeInTheDocument();
  });

  test('Animated game piece should render after selector is clicked', () => {
    renderWithProviders(<Selector setAnimationComplete={() => {}} />);
    fireEvent.click(screen.getByTestId('selector-btn-0'));
    expect(screen.getByTestId('animated-game-piece')).toBeInTheDocument();
  });

  test('View column selector on hover', () => {
    renderWithProviders(<Selector setAnimationComplete={() => {}} />);
    fireEvent.mouseOver(screen.getByTestId('selector-btn-0'));
    expect(screen.getByTestId('selector-marker')).toBeVisible();
  });
});
