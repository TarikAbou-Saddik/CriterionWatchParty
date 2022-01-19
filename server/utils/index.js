export const getShortTime = () =>
  new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

export const getBotUser = () => ({
  id: null,
  dateCreated: null,
  name: 'CriterionBot',
  userIcon: {
    id: 7,
    url: null,
    description: 'Criterion Collection logo',
  },
});

module.exports = { getShortTime, getBotUser };
