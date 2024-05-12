import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

import {
  authAnonymMiddlewareOptions,
  authUserMiddlewareOptions,
  httpMiddlewareOptions,
} from './BuildClient';

interface MyForm {
  email: string;
  password: string;
}

const ctpClient = new ClientBuilder();

let apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: import.meta.env.VITE_PROJECT_KEY,
});

export function getAnonymToken() {
  const ctpClient = new ClientBuilder()
    .withClientCredentialsFlow(authAnonymMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: import.meta.env.VITE_PROJECT_KEY,
  });

  return apiRoot.get().execute();
}

export function getUserToken({ email, password }: MyForm) {
  const ctpClient = new ClientBuilder()
    .withClientCredentialsFlow(authUserMiddlewareOptions(email, password))
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: import.meta.env.VITE_PROJECT_KEY,
  });
}

export function loginUser({ email, password }: MyForm) {
  return apiRoot
    .me()
    .login()
    .post({
      body: {
        email,
        password,
      },
    })
    .execute();
}

export function checkUserEmail(email: string) {
  return apiRoot
    .customers()
    .get({
      queryArgs: {
        where: [`email="${email}"`],
      },
    })
    .execute();
}
