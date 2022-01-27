import { createAsyncThunk } from '@reduxjs/toolkit';

export const setPartyRestriction = createAsyncThunk(
  'party/setPartyRestriction',
  async (value: boolean) => {
    const response = await setChromeStorageValue({
      key: 'isPartyRestricted',
      value,
    });
    return response;
  },
);

export const getChromeState = createAsyncThunk(
  'party/getChromeState',
  async (key: string) => {
    const response: any = await new Promise(resolve => {
      chrome.storage.sync.get([`${key}`], state => {
        resolve(state[`${key}`]);
      });
    });
    return response;
  },
);

type ChromeStorageRequestParam = { key: string; value: any };

const setChromeStorageValue = async ({
  key,
  value,
}: ChromeStorageRequestParam) => {
  let proxy: { [key: string]: any } = {};
  proxy[`${key}`] = value;
  await chrome.storage.sync.set(proxy);
  return value;
};

// const setChromeState = createAsyncThunk<any, { key: string; value: any }>(
//   'party/setChromeState',
//   async ({ key, value }) => {
//     let proxy: { [key: string]: any } = {};
//     proxy[`${key}`] = value;
//     await chrome.storage.sync.set(proxy);
//     return value;
//   },
// );
