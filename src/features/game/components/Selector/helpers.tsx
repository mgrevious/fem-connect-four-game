import styled, { keyframes } from 'styled-components';
import { ColumnNum } from '../../game.types';

function dropAnimation(offset: number) {
  return keyframes`
      from {
        top: 60px;
      }
      to {
        top: ${offset}px;
      }
      `;
}

export const AnimatedGamePiece = styled.div<{ $offset: number }>`
  animation: ${(props) => dropAnimation(props.$offset)} 600ms
    cubic-bezier(0.32, 0, 0.67, 0) forwards;
`;
