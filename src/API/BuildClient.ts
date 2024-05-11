import {
  type AnonymousAuthMiddlewareOptions,
  // Import middlewares
  type AuthMiddlewareOptions, // Required for auth
  type HttpMiddlewareOptions,
  type PasswordAuthMiddlewareOptions,
  // Required for sending HTTP requests
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

// anonym
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

// export const ctpClient = new ClientBuilder()
// .withProjectKey(import.meta.env.VITE_PROJECT_KEY) // .withProjectKey() is not required if the projectKey is included in authMiddlewareOptions
// .withClientCredentialsFlow(authAnonymMiddlewareOptions)
// .withHttpMiddleware(httpMiddlewareOptions)
// .withLoggerMiddleware() // Include middleware for logging
// .build();
