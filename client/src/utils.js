import JPB from './assets/JPB.svg';
import antonine from './assets/antoine.svg';
import brigitte from './assets/brigitte.svg';
import karina from './assets/karina.svg';
import marcello from './assets/marcello.svg';
import walken from './assets/walken.svg';
import CriterionLogo from './assets/CriterionLogo.svg';
import { v4 as uuid } from 'uuid';

// Utility functions
export const copyToClipboard = textValue =>
  navigator.clipboard.writeText(textValue).catch(err => console.log(err));

export const getShortTime = () =>
  new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

// FOR TESTING PURPOSES
export const getBotUser = () => ({
  id: null,
  dateCreated: null,
  name: 'CriterionBot',
  userIcon: {
    id: 7,
    url: CriterionLogo,
    description: 'Criterion Collection logo',
  },
});
export const iconsList = [
  { id: 1, url: JPB, description: 'Jean Paul Belmondo' },
  { id: 2, url: antonine, description: 'Antoine Doinel' },
  { id: 3, url: brigitte, description: 'Brigitte Lin' },
  { id: 4, url: karina, description: 'Ana Karina' },
  { id: 5, url: marcello, description: 'Marcello Mastroianni' },
  { id: 6, url: walken, description: 'Christopher Walken' },
];
export const iconsListUrls = iconsList.map(icon => icon.url);
export const getPartyId = () => uuid();
