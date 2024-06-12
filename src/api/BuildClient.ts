import {
  AnonymousAuthMiddlewareOptions,
  AuthMiddlewareOptions,
  ExistingTokenMiddlewareOptions,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';

import {
  API_URL,
  AUTH_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  PROJECT_KEY,
  SCOPES,
} from '../config/clientConfig.ts';
import { LocalStorageTokenCache, tokenCache } from './tokenCache.ts';

// Configure authMiddlewareOptions
export const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: AUTH_URL,
  projectKey: PROJECT_KEY,
  credentials: {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
  },
  scopes: SCOPES,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  fetch,
};

// Configure httpMiddlewareOptions
export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: API_URL,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  fetch,
};

// authanonym
export const authAnonymMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: AUTH_URL,
  projectKey: PROJECT_KEY,
  credentials: {
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    // anonymousId: crypto.randomUUID(),
  },
  scopes: SCOPES,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  fetch,
};

// authuser
export const authUserMiddlewareOptions = (
  email: string,
  password: string,
): PasswordAuthMiddlewareOptions => {
  return {
    host: AUTH_URL,
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
      user: {
        username: email,
        password,
      },
    },
    scopes: SCOPES,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    fetch,
    tokenCache: tokenCache,
  };
};

export const refreshMiddlewareOptions = (
  refrToken: string,
  tokenCache: LocalStorageTokenCache,
): RefreshAuthMiddlewareOptions => {
  return {
    host: AUTH_URL,
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    },
    refreshToken: refrToken,
    tokenCache: tokenCache,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    fetch,
  };
};

export const existingTokenMiddlewareoptions: ExistingTokenMiddlewareOptions = {
  force: true,
};
