import {
  AnonymousAuthMiddlewareOptions,
  AuthMiddlewareOptions,
  HttpMiddlewareOptions,
  PasswordAuthMiddlewareOptions,
  RefreshAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';

import { LocalStorageTokenCache, anonymTokenCache, passwordTokenCache } from './TokenCache';

const PROJECT_KEY = import.meta.env.VITE_PROJECT_KEY;
const SCOPES = [import.meta.env.VITE_SCOPES];
const API_URL = import.meta.env.VITE_API_URL;
const AUTH_URL = import.meta.env.VITE_AUTH_URL;
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;

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
    anonymousId: crypto.randomUUID(),
  },
  scopes: SCOPES,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  fetch,
  tokenCache: anonymTokenCache,
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
    tokenCache: passwordTokenCache,
  };
};

// refresh
export const refreshMiddlewareOptions = (
  token: string,
  tokenCache: LocalStorageTokenCache,
): RefreshAuthMiddlewareOptions => {
  return {
    host: AUTH_URL,
    projectKey: PROJECT_KEY,
    credentials: {
      clientId: CLIENT_ID,
      clientSecret: CLIENT_SECRET,
    },
    refreshToken: token,
    tokenCache: tokenCache,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    fetch,
  };
};
