import { icons } from '../../utils';

export const filmInfo = {
  title: 'The Third Man',
  director: 'Carol Reed',
  year: 1949,
  country: 'United Kingdom',
};

export const createMessage = (data, isMessage = true) => ({
  userName: 'TheCynicalEdge',
  profileImage: icons.JPB,
  data,
  isMessage,
});

export const fakeMessages = [
  {
    userName: 'TheCynicalEdge',
    profileImage: icons.JPB,
    data: 'Created the session',
    isMessage: false,
  },
  {
    userName: 'TheCynicalEdge',
    profileImage: icons.JPB,
    data: 'Jumped to 8:14',
    isMessage: false,
  },
  {
    userName: 'TheCynicalEdge',
    profileImage: icons.JPB,
    data: 'Started playing the movie.',
    isMessage: false,
  },
  {
    userName: 'TheCynicalEdge',
    profileImage: icons.JPB,
    data: 'Paused the movie',
    isMessage: false,
  },
  {
    userName: 'Brigitte Lin',
    profileImage: icons.brigitte,
    data: 'Joined the party.',
    isMessage: false,
  },
  {
    userName: 'Brigitte Lin',
    profileImage: icons.brigitte,
    data: 'Started playing the movie.',
    isMessage: false,
  },
  {
    userName: 'Brigitte Lin',
    profileImage: icons.brigitte,
    data: "I've heard of this movie!",
    isMessage: true,
  },
  {
    userName: 'Brigitte Lin',
    profileImage: icons.brigitte,
    data: "It's a classic!",
    isMessage: true,
  },
  {
    userName: 'Brigitte Lin',
    profileImage: icons.brigitte,
    data: 'Orson Welles is in it too!',
    isMessage: true,
  },
];
