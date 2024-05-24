import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

import { PROJECT_KEY } from '@/config/clientConfig';
export class LocalStorageTokenCache implements TokenCache {
  private tokenKey = PROJECT_KEY;

  deleteToken(): void {
    localStorage.removeItem(this.tokenKey);
    document.cookie = `${this.tokenKey}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
  get(): TokenStore {
    const savedData = JSON.parse(localStorage.getItem(this.tokenKey) as string) as TokenStore;
    return savedData;
  }

  set(tokenData: TokenStore): void {
    localStorage.setItem(this.tokenKey, JSON.stringify(tokenData));
    document.cookie = `${this.tokenKey}=${tokenData.token}; expires=${new Date(tokenData.expirationTime).toUTCString()}; path=/`;
  }
}

const tokenCache = new LocalStorageTokenCache();

export { tokenCache };
