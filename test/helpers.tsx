import { Store } from '@reduxjs/toolkit';
import React from 'react';
import { Provider } from 'react-redux';

interface Props {
  children: React.ReactNode;
  reduxStore: Store;
}

export const ReduxProvider: React.FC<Props> = ({ children, reduxStore }) => (
  <Provider store={reduxStore}>{children}</Provider>
);
