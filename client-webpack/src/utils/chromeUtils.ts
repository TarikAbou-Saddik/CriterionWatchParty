export const redirectToCriterionChannel = (): void => {
  if (chrome) {
    const criterionChannelUrl = 'https://www.criterionchannel.com/';
    chrome.tabs.create({ active: true, url: criterionChannelUrl });
  }
};

export const isActiveTabCriterionChannel = async (): Promise<boolean> => {
  if (chrome) {
    let queryOptions = { active: true, currentWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab.url?.includes('criterionchannel') || false;
  }
  return false;
};
