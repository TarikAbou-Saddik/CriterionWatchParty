import React, { createContext, useMemo } from 'react';
import { useChromeStorage } from '../hooks/useChromeStorage';
import { ChromeStorageResult } from '../hooks/useChromeStorage/types';

export const PartyContext = createContext<ChromeStorageResult | {}>({});

export const PartyStateProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const chromeStorage = useChromeStorage('party');
  const contextValue = useMemo(() => chromeStorage, [chromeStorage]);

  return (
    <PartyContext.Provider value={contextValue}>
      {children}
    </PartyContext.Provider>
  );
};
