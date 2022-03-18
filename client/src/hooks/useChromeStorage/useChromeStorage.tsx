import { useReducer, useEffect, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import { PartyState, User, IMessage } from 'Types/';
import { getActiveTab } from 'Utils/chromeUtils';
import {
  iconsListStatic as iconsList,
  staticCriterionLogo,
} from 'Utils/mediaUtils';
import {
  Action,
  ChromeStateResponse,
  ChromeStorageRequestParam,
} from './types';

const defaultUser: User = {
  id: null,
  dateCreated: new Date(),
  name: '',
  icon: iconsList[0],
};

const welcomeMessage: IMessage = {
  user: {
    id: null,
    dateCreated: new Date(),
    name: 'Criterion Bot',
    icon: {
      url: staticCriterionLogo,
      description: 'Criterion Logo',
    },
  },
  data: 'Welcome to the Criterion Channel Watch Party!',
  timestamp: '',
  isUserMessage: false,
};

const initialState: PartyState = {
  id: null,
  restrictPartyControl: false,
  showAudience: false,
  isChatActive: false,
  isPartyCreated: false,
  partyUrl: '',
  dateCreated: new Date(),
  users: [defaultUser],
  messages: [welcomeMessage],
  activeTabUrl: '',
};

const getUpdatedUsers = (
  changedProp: string,
  payload: any,
  state: PartyState,
): User[] => {
  const currentUser = state.users[0];
  return [
    { ...state.users[0], [changedProp]: payload },
    ...state.users.filter(x => x.id !== currentUser.id),
  ];
};

const reducer = (state: PartyState, action: Action): PartyState => {
  const { type, payload } = action;
  switch (type) {
    case 'INIT':
      return payload;
    case 'SET_PARTY_CONTROL':
      return {
        ...state,
        restrictPartyControl: !state.restrictPartyControl,
      };
    case 'SET_PARTY_CREATED':
      return {
        ...state,
        isPartyCreated: payload,
      };
    case 'SET_CHAT_ACTIVE':
      return {
        ...state,
        isChatActive: payload,
      };
    case 'SET_PARTY_URL':
      return {
        ...state,
        partyUrl: payload,
      };
    case 'SET_CURRENT_USER_NAME':
      return {
        ...state,
        users: getUpdatedUsers('name', payload, state),
      };
    case 'SET_CURRENT_USER_ICON':
      return {
        ...state,
        users: getUpdatedUsers('icon', payload, state),
      };
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, payload],
      };
    case 'RESET':
      return initialState;
    default:
      return state;
  }
};

const useChromeStorage = () => {
  const reducerChromeStorage = useCallback(
    (state: PartyState, action: Action): PartyState => {
      const newState = reducer(state, action);
      setChromeState({ key: 'partyState', value: newState });
      return newState;
    },
    [],
  );

  const [state, dispatch] = useReducer(reducerChromeStorage, initialState);

  useEffect(() => {
    const init = async () => {
      let { data: state }: { data: PartyState } = await getChromeState(
        'partyState',
      );
      let url = window.location.href;
      if (chrome.tabs) {
        url = (chrome.tabs && (await getActiveTab())).url as string;
      }

      const partyUrl = `${url}?criterionParty=${12345}`;
      if (state) {
        state.activeTabUrl = url;
        state.partyUrl = partyUrl;
      } else {
        state = {
          ...initialState,
          activeTabUrl: url,
          partyUrl: '',
        };
      }
      dispatch({ type: 'INIT', payload: state });
    };
    init();
  }, []);

  const getChromeState = async (
    key: string | null,
  ): Promise<ChromeStateResponse> => {
    const response: any = await new Promise((resolve, reject) => {
      chrome.storage.local.get(key !== null ? [`${key}`] : key, state => {
        if (chrome.runtime.lastError) {
          return reject({ success: false, data: chrome.runtime.lastError });
        }
        const data = key !== null ? state[`${key}`] : JSON.stringify(state);
        resolve({ success: true, data });
      });
    });
    return response;
  };

  const setChromeState = async ({
    key,
    value,
  }: ChromeStorageRequestParam): Promise<ChromeStateResponse> => {
    const response: any = await new Promise(async (resolve, reject) => {
      const proxy: { [key: string]: any } = {};
      proxy[`${key}`] = value;
      chrome.storage.local.set(proxy, () => {
        if (chrome.runtime.lastError) {
          return reject({ success: false, data: chrome.runtime.lastError });
        }
        resolve({ success: true, data: value });
      });
    });
    return response;
  };

  return { state, dispatch };
};

export default useChromeStorage;
