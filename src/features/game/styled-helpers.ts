import styled, { keyframes } from 'styled-components';

type FillMode = 'forwards' | 'backwards' | 'both' | 'none';
type TimingFunction =
  | 'ease-in'
  | 'ease-out'
  | 'ease'
  | 'linear'
  | 'step-start'
  | 'step-end';

const fadeIn = keyframes`
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

export function getFadeInContainer(
  fillMode: FillMode = 'forwards',
  timingFunction: TimingFunction = 'ease-in',
  duration: number = 0.5
) {
  return styled.div`
    animation: ${fadeIn} ${fillMode} ${timingFunction} ${duration}s;
  `;
}
