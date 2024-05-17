import {
  ByProjectKeyRequestBuilder,
  ClientResponse,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { Client, ClientBuilder } from '@commercetools/sdk-client-v2';

import { LoginForm, RegistrationRequestBody } from '@/types/interfaces';

import {
  authAnonymMiddlewareOptions,
  authMiddlewareOptions,
  authUserMiddlewareOptions,
  httpMiddlewareOptions,
  refreshMiddlewareOptions,
} from './BuildClient';
import { LocalStorageTokenCache } from './TokenCache';

const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

let apiRoot = getApiRoot(ctpClient);

function getApiRoot(ctpClient: Client): ByProjectKeyRequestBuilder {
  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: import.meta.env.VITE_PROJECT_KEY,
  });
}

export function anonymFlowAuth(): ByProjectKeyRequestBuilder {
  const ctpClient = new ClientBuilder()
    .withAnonymousSessionFlow(authAnonymMiddlewareOptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  apiRoot = getApiRoot(ctpClient);

  return apiRoot;
}

export function passwordFlowAuth({ email, password }: LoginForm): ByProjectKeyRequestBuilder {
  const ctpClient = new ClientBuilder()
    .withPasswordFlow(authUserMiddlewareOptions(email, password))
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  apiRoot = getApiRoot(ctpClient);

  return apiRoot;
}

export function refreshFlowAuth(
  token: string,
  tokenCache: LocalStorageTokenCache,
): ByProjectKeyRequestBuilder {
  const ctpClient = new ClientBuilder()
    .withRefreshTokenFlow(refreshMiddlewareOptions(token, tokenCache))
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  apiRoot = getApiRoot(ctpClient);

  return apiRoot;
}

export async function getProject(root: ByProjectKeyRequestBuilder): Promise<void> {
  return root.get().execute().then(console.log).catch(console.error);
}

export async function getCustomer(root: ByProjectKeyRequestBuilder): Promise<void> {
  return root.me().get().execute().then(console.log).catch(console.error);
}

export async function loginUser({ email, password }: LoginForm): Promise<ClientResponse> {
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
  // .then(console.log)
  // .catch(console.error);
}

export async function checkUserEmail(email: string): Promise<void> {
  return apiRoot
    .customers()
    .get({
      queryArgs: {
        where: [`email="${email}"`],
      },
    })
    .execute()
    .then(console.log)
    .catch(console.error);
}

export function createCustomer(body: RegistrationRequestBody): Promise<ClientResponse> {
  return apiRoot
    .customers()
    .post({
      body: body,
    })
    .execute();
}
