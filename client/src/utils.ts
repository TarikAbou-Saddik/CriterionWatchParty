// Utility functions
export const copyToClipboard = (textValue: string) =>
  navigator.clipboard.writeText(textValue).catch(err => console.log(err));

export const getShortTime = () =>
  new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
