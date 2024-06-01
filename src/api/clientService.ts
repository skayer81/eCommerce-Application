import {
  ByProjectKeyRequestBuilder,
  ClientResponse,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { Client, ClientBuilder } from '@commercetools/sdk-client-v2';

import { PROJECT_KEY } from '@/config/clientConfig';
import { LoginForm, RegistrationRequestBody } from '@/types/interfaces';
import { PRODUCTS_LIMIT } from '@/utils/constants';

import {
  authAnonymMiddlewareOptions,
  authMiddlewareOptions,
  authUserMiddlewareOptions,
  existingTokenMiddlewareoptions,
  httpMiddlewareOptions,
  refreshMiddlewareOptions,
} from './BuildClient';
import { LocalStorageTokenCache } from './tokenCache';

const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  .withLoggerMiddleware()
  .build();

let apiRoot = getApiRoot(ctpClient);

function getApiRoot(ctpClient: Client): ByProjectKeyRequestBuilder {
  return createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: PROJECT_KEY,
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

export function existingFlowAuth(token: string): ByProjectKeyRequestBuilder {
  const ctpClient = new ClientBuilder()
    .withExistingTokenFlow(token, existingTokenMiddlewareoptions)
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  apiRoot = getApiRoot(ctpClient);

  return apiRoot;
}

export async function getProject(root: ByProjectKeyRequestBuilder): Promise<void> {
  return root.get().execute().then(console.log).catch(console.error);
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

export async function getCustomer(root: ByProjectKeyRequestBuilder): Promise<void> {
  return root.me().get().execute().then(console.log).catch(console.error);
}

export async function getProducts(
  categoryId = '',
  sortValue: string,
  attributes: Record<string, string>,
): Promise<ClientResponse> {
  const attrFilters = Object.entries(attributes)
    .filter(([attrkey, value]) => value !== '' && attrkey) // Фильтрация элементов с пустыми значениями
    .map(([key, value]) => `variants.attributes.${key}.key:"${value}"`);
  const catFilter = categoryId ? [`categories.id:subtree("${categoryId}")`] : [];
  const resFilters = [...attrFilters, ...catFilter];

  console.log('filters=', resFilters);
  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        'filter.query': resFilters,
        sort: sortValue === '' ? undefined : [sortValue],
        limit: PRODUCTS_LIMIT,
        markMatchingVariants: true,
      },
    })
    .execute();
}

export async function getMainCategories(): Promise<ClientResponse> {
  return apiRoot
    .categories()
    .get({ queryArgs: { where: ['parent(id is not defined)'] } })
    .execute();
}

export async function getSubCategories(categoryId: string): Promise<ClientResponse> {
  return apiRoot
    .categories()
    .get({ queryArgs: { where: [`parent(id="${categoryId}")`] } })
    .execute();
}

export async function getCategoryById(categoryId: string): Promise<ClientResponse> {
  return apiRoot.categories().withId({ ID: categoryId }).get().execute();
}

export async function getDiscountById(id: string): Promise<ClientResponse> {
  return apiRoot.productDiscounts().withId({ ID: id }).get().execute();
}

export async function getAttributes(productTypeKey: string): Promise<ClientResponse> {
  return apiRoot.productTypes().withKey({ key: productTypeKey }).get().execute();
}
