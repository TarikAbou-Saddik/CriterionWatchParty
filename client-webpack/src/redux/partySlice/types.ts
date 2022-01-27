export type Action = {
  type: string;
  payload?: any;
};

export type PartyPageType = 'INIT' | 'SETUP' | 'CHAT';

export interface UserIcon {
  id: number;
  url: string;
  description: string;
}

export interface User {
  id: number | null;
  dateCreated: Date | null;
  name: string;
  icon?: UserIcon;
}

export interface Message {
  id: number | null;
  user: User;
  data: string;
  timestamp: string;
  isUserMessage: boolean;
}

export interface PartyState {
  id: number | null;
  restrictPartyControl: boolean;
  partyUrl: string;
  dateCreated: string | null;
  users: User[];
  messages: Message[];
  currentPage: PartyPageType;
  showAudience: boolean;
}
