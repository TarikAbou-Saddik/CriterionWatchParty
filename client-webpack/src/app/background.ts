const stateKeys = {
  RESTRICT_CONTROL: 'restrictPartyControl',
  CRITERION_TAB_ID: 'criterionTabId',
};

chrome.tabs.onUpdated.addListener(async tabId => {
  const tab = await getTabById(tabId);
  if (tab.url?.includes('criterionchannel.com/videos')) {
    chrome.storage.local.set({ criterionTabId: tab.id });
    console.log(`Now watching a movie at: ${tab.url}`);
  }
});

chrome.tabs.onRemoved.addListener(async tabId => {
  const { criterionTabId } = await chrome.storage.local.get([
    `${stateKeys.CRITERION_TAB_ID}`,
  ]);
  if (tabId === criterionTabId) {
    console.log('Clearing contents from chrome.storage');
    chrome.storage.local.remove(Object.values(stateKeys));
  }
});

const getTabById = async (tabId: number) => {
  return await chrome.tabs.get(tabId);
};

const getActiveTab = async (): Promise<chrome.tabs.Tab[]> => {
  let queryOptions = { active: true, currentWindow: true };
  return await chrome.tabs.query(queryOptions);
};

export {};
