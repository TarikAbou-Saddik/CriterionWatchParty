export type Id = number | string | null;

export interface UserIcon {
  id?: Id;
  url: string;
  description: string;
}

export interface User {
  [index: string]: Date | string | UserIcon | Id | null | undefined;
  id?: Id;
  dateCreated?: Date | null;
  name: string;
  icon?: UserIcon | null;
}

export interface IMessage {
  id?: Id;
  user: User;
  data: string;
  timestamp: string;
  isUserMessage: boolean;
}

export interface Film {
  title: string;
  timestamp: string | null;
  info: string;
}

export interface PartyState {
  id?: Id;
  restrictPartyControl: boolean;
  partyUrl: string;
  dateCreated: string | Date | null;
  users: User[];
  messages: IMessage[];
  showAudience: boolean;
  isChatActive: boolean;
  isPartyCreated: boolean;
  activeTabUrl?: string;
}
