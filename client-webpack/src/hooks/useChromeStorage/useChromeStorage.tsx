import { useReducer, useEffect, useState } from 'react';
import { PartyState, Action, ChromeStorageResult } from './types';

const getChromeState = async (key: string): Promise<PartyState> => {
  return new Promise(resolve => {
    chrome.storage.sync.get([`${key}`], state => {
      resolve(state[`${key}`]);
    });
  });
};

const setChromeState = async (
  key: string,
  state: PartyState,
): Promise<void> => {
  let proxy: { [key: string]: PartyState } = {};
  proxy[`${key}`] = state;
  await chrome.storage.sync.set(proxy);
};

const reducer = (state: PartyState, action: Action): PartyState => {
  switch (action.type) {
    case 'initState':
      return { ...state };
    case 'restrictPartyControl':
      return {
        ...state,
        restrictPartyControl: !state.restrictPartyControl,
      };
    default:
      return state;
  }
};

const initialState: PartyState = {
  id: null,
  restrictPartyControl: false,
  partyUrl: '',
  dateCreated: null,
  users: [],
  messages: [],
  currentPage: 'INIT',
};

export const useChromeStorage = (storageKey: string): ChromeStorageResult => {
  const [isPersistent, setIsPesistent] = useState(false);
  const [state, dispatch]: [
    state: PartyState,
    dispatch: React.Dispatch<Action>,
  ] = useReducer(reducer, initialState);

  const fetchStateFromChrome = async () => {
    const chromeState = await getChromeState(storageKey);
    console.log(`fetchStateFromChrome: ${JSON.stringify(chromeState)}`);
    if (chromeState.id) {
      dispatch({ type: 'initState', payload: chromeState });
    }
  };

  const setState = (action: Action) => {
    dispatch(action);
    setIsPesistent(false);
  };

  useEffect(() => {
    fetchStateFromChrome();
  }, []);

  useEffect(() => {
    console.log(`State-dependent useEffect ran!`);
    if (!isPersistent) {
      setChromeState(storageKey, state);
      setIsPesistent(true);
    }
  }, [isPersistent]);

  const isChatActive = state.currentPage === 'CHAT';
  const isPartyCreated = state.currentPage === 'SETUP';

  // useEffect(() => {
  //   const onChange = (
  //     changes: { [key: string]: chrome.storage.StorageChange },
  //     area: any,
  //   ) => {
  //     if (storageKey in changes) {
  //       dispatch({ type: 'initState', payload: changes[storageKey].newValue });
  //     }
  //   };
  //   chrome.storage.onChanged.addListener(onChange);

  //   return () => {
  //     chrome.storage.onChanged.removeListener(onChange);
  //   };
  // }, [storageKey]);

  return { state, dispatch, isChatActive, isPartyCreated, setState };
};
