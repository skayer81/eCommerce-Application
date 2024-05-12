import {
  type AnonymousAuthMiddlewareOptions,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
} from '@commercetools/sdk-client-v2';
import fetch from 'node-fetch';

const projectKey = import.meta.env.VITE_PROJECT_KEY;
const scopes = [import.meta.env.VITE_SCOPES];

// Configure authMiddlewareOptions
export const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: import.meta.env.VITE_AUTH_URL,
  projectKey: projectKey,
  credentials: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CLIENT_SECRET,
  },
  scopes,
  fetch,
};

// Configure httpMiddlewareOptions
export const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: import.meta.env.VITE_API_URL,
  fetch,
};

// authanonym
export const authAnonymMiddlewareOptions: AnonymousAuthMiddlewareOptions = {
  host: import.meta.env.VITE_AUTH_URL,
  projectKey: `${projectKey}`,
  credentials: {
    clientId: import.meta.env.VITE_CLIENT_ID,
    clientSecret: import.meta.env.VITE_CLIENT_SECRET,
    anonymousId: crypto.randomUUID(),
  },
  scopes,
  fetch,
};

// authuser
export const authUserMiddlewareOptions = (
  email: string,
  password: string,
): PasswordAuthMiddlewareOptions => {
  return {
    host: import.meta.env.VITE_AUTH_URL,
    projectKey: `${projectKey}`,
    credentials: {
      clientId: import.meta.env.VITE_CLIENT_ID,
      clientSecret: import.meta.env.VITE_CLIENT_SECRET,
      user: {
        username: email,
        password,
      },
    },
    scopes,
    fetch,
  };
};
