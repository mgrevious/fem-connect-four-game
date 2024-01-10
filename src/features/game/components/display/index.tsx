import React from 'react';
import TurnDisplay from './TurnDisplay';
import WinnerDisplay from './WinnerDisplay';

interface Props {
  showWinner: boolean;
}

const Display: React.FC<Props> = ({ showWinner }) => {
  return showWinner ? <WinnerDisplay /> : <TurnDisplay />;
};

export default Display;
