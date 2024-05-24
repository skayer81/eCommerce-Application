import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

import { PROJECT_KEY } from '@/config/clientConfig';
export class LocalStorageTokenCache implements TokenCache {
  private tokenKey = PROJECT_KEY;

  deleteToken(): void {
    localStorage.removeItem('fun-code-token');
  }
  get(): TokenStore {
    const savedData = JSON.parse(localStorage.getItem(this.tokenKey) as string) as TokenStore;
    return savedData;
  }

  set(tokenData: TokenStore): void {
    console.log('tokenstore=', tokenData);
    // const newTokenData: TokenStore = { ...tokenData, expirationTime: Date.now() + 60 * 1000 };

    localStorage.setItem(this.tokenKey, JSON.stringify(tokenData));
  }
}

const tokenCache = new LocalStorageTokenCache();

export { tokenCache };
