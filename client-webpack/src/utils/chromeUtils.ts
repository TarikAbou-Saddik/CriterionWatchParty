export const getActiveTab = async (): Promise<chrome.tabs.Tab> => {
  let queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};

export const sendMessageToContentScript = async (message: any) => {
  const response = await new Promise(async resolve => {
    const activeTabId = (await getActiveTab()).id as number;
    chrome.tabs.sendMessage(activeTabId, message, response => {
      resolve(`Sent from Content Script: ${JSON.stringify(response)}`);
    });
  });
  return response;
};
