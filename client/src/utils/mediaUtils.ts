import { UserIcon } from '../types';

const mediaDir = './static/media';
const selectUrls = (icon: UserIcon) => icon.url;

export const staticCriterionLogo = chrome.runtime.getURL(
  `${mediaDir}/CriterionLogo.svg`,
);

const staticIconUrlsById: { [key: number]: string } = {
  1: chrome.runtime.getURL(`${mediaDir}/JPB.svg`),
  2: chrome.runtime.getURL(`${mediaDir}/antoine.svg`),
  3: chrome.runtime.getURL(`${mediaDir}/brigitte.svg`),
  4: chrome.runtime.getURL(`${mediaDir}/karina.svg`),
  5: chrome.runtime.getURL(`${mediaDir}/marcello.svg`),
  6: chrome.runtime.getURL(`${mediaDir}/walken.svg`),
};

import JPB from '../assets/JPB.svg';
import antoine from '../assets/antoine.svg';
import brigitte from '../assets/brigitte.svg';
import karina from '../assets/karina.svg';
import marcello from '../assets/marcello.svg';
import walken from '../assets/walken.svg';

export const iconsList: UserIcon[] = [
  { id: 1, url: JPB, description: 'Jean Paul Belmondo' },
  { id: 2, url: antoine, description: 'Antoine Doinel' },
  { id: 3, url: brigitte, description: 'Brigitte Lin' },
  { id: 4, url: karina, description: 'Ana Karina' },
  { id: 5, url: marcello, description: 'Marcello Mastroianni' },
  { id: 6, url: walken, description: 'Christopher Walken' },
];

export const iconsListStatic: UserIcon[] = iconsList.map((icon: UserIcon) => ({
  ...icon,
  url: staticIconUrlsById[icon.id as number],
}));

export const iconsListUrls = iconsList.map(selectUrls);
export const iconsListStaticUrls = iconsListStatic.map(selectUrls);
