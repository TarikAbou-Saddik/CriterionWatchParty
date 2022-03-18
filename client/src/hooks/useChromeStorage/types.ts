export type ChromeStorageRequestParam = { key: string; value: any };
export type ChromeStateResponse = { success: boolean; data: any };

export interface Action {
  type: string;
  payload?: any;
}
