chrome.runtime.onMessage.addListener(function (request, sender) {
  chrome.tabs.update(sender.tab?.id as number, { url: request.redirect });
});

chrome.tabs.onUpdated.addListener(async tabId => {
  const tab = await getTabById(tabId);
  if (tab.url?.includes('criterionchannel.com/videos')) {
    chrome.storage.local.set({ criterionTabId: tab.id });
    console.log(`[TAB ID: ${tab.id}] Now watching a movie at: ${tab.url}`);
  }
});

chrome.tabs.onRemoved.addListener(async tabId => {
  const { criterionTabId } = await chrome.storage.local.get(['criterionTabId']);
  if (tabId === criterionTabId) {
    console.log('Clearing contents from chrome.storage');
    chrome.storage.local.remove(['partyState', 'filmState']);
  }
});

const getTabById = async (tabId: number) => {
  return await chrome.tabs.get(tabId);
};

export {};
