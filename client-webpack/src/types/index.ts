export interface UserIcon {
  id?: number | null;
  url: string;
  description: string;
}

export interface User {
  id?: number | null;
  dateCreated?: Date | null;
  name: string;
  icon?: UserIcon | null;
}

export interface Message {
  id: number | null;
  user: User;
  data: string;
  timestamp: string;
  isUserMessage: boolean;
}

export interface Film {
  title: string;
  timestamp: string;
  info: string;
}

export interface PartyState {
  id: number | null;
  restrictPartyControl: boolean;
  partyUrl: string;
  dateCreated: string | null;
  users: User[];
  messages: Message[];
  showAudience: boolean;
  isChatActive: boolean;
  isPartyCreated: boolean;
}
