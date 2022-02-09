export const getActiveTabUrl = async (): Promise<string | undefined> => {
  let url = '';
  if (chrome) {
    const tab = await getActiveTab();
    url = tab.url || '';
  }
  return url;
};

export const isActiveTabCriterionChannelWithVideo =
  async (): Promise<boolean> => {
    let isActive = false;
    if (chrome) {
      const tab = await getActiveTab();
      isActive = tab.url?.includes('criterionchannel') || false;
    }
    return isActive;
  };

export const getActiveTab = async (): Promise<chrome.tabs.Tab> => {
  let queryOptions = { active: true, currentWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  return tab;
};

export const removeChromeStorageValues = async (keys: string[]) => {
  return chrome.storage.sync.remove(keys);
};

type ChromeStorageRequestParam = { key: string; value: any };
type ChromeStateResponse = { success: boolean; data: any };

export const sendMessageToContentScript = async (message: any) => {
  const response = await new Promise(async resolve => {
    const activeTabId = (await getActiveTab()).id as number;
    chrome.tabs.sendMessage(activeTabId, message, response => {
      resolve(`Sent from Content Script: ${JSON.stringify(response)}`);
    });
  });
  return response;
};

export const getChromeState = async (
  key: string | null,
): Promise<ChromeStateResponse> => {
  const response: any = await new Promise((resolve, reject) => {
    chrome.storage.local.get(key !== null ? [`${key}`] : key, state => {
      if (chrome.runtime.lastError) {
        return reject({ success: false, data: chrome.runtime.lastError });
      }
      const data = key !== null ? state[`${key}`] : JSON.stringify(state);
      resolve({ success: true, data });
    });
  });
  return response;
};

export const setChromeStorageValue = async ({
  key,
  value,
}: ChromeStorageRequestParam): Promise<ChromeStateResponse> => {
  const response: any = await new Promise(async (resolve, reject) => {
    const proxy: { [key: string]: any } = {};
    proxy[`${key}`] = value;
    chrome.storage.local.set(proxy, () => {
      if (chrome.runtime.lastError) {
        return reject({ success: false, data: chrome.runtime.lastError });
      }
      resolve({ success: true, data: value });
    });
  });
  return response;
};
