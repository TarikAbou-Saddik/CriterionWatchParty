type Action = {
  type: string;
  payload?: any;
};

type PartyPageType = 'INIT' | 'SETUP' | 'CHAT';

interface UserIcon {
  id: number;
  url: string;
  description: string;
}

interface User {
  id: number;
  dateCreated: Date;
  name: string;
  icon: UserIcon;
}

interface Message {
  id: number;
  user: User;
  data: string;
  timestamp: string;
  isUserMessage: boolean;
}

interface PartyState {
  id: number | null;
  restrictPartyControl: boolean;
  partyUrl: string;
  dateCreated: string | null;
  users: User[];
  messages: Message[];
  currentPage: PartyPageType;
}

interface ChromeStorageResult {
  state: PartyState;
  dispatch: React.Dispatch<Action>;
  isChatActive: boolean;
  isPartyCreated: boolean;
  setState: (action: Action) => void;
}

export type {
  UserIcon,
  User,
  Message,
  PartyState,
  Action,
  PartyPageType,
  ChromeStorageResult,
};
