import { TokenCache, TokenStore } from '@commercetools/sdk-client-v2';

export class LocalStorageTokenCache implements TokenCache {
  constructor(private tokenKey: string) {}

  get(): TokenStore {
    const savedData = JSON.parse(localStorage.getItem(this.tokenKey) as string) as TokenStore;
    return savedData;
  }
  set(tokenData: TokenStore): void {
    localStorage.setItem(this.tokenKey, JSON.stringify(tokenData));
  }
}

const passwordTokenCache = new LocalStorageTokenCache('password-token');
const anonymTokenCache = new LocalStorageTokenCache('anonym-token');

export { anonymTokenCache, passwordTokenCache };
