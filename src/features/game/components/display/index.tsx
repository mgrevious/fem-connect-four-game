import React, { useRef } from 'react';
import TurnDisplay from './TurnDisplay';
import WinnerDisplay from './WinnerDisplay';
import { CountdownApi } from 'react-countdown';

interface Props {
  showWinner: boolean;
}

const Display: React.FC<Props> = ({ showWinner }) => {
  const countdownApi = useRef<CountdownApi | null>(null);
  return showWinner ? (
    <WinnerDisplay countdownApi={countdownApi} />
  ) : (
    <TurnDisplay countdownApi={countdownApi} />
  );
};

export default Display;
