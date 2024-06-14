import {
  ByProjectKeyRequestBuilder,
  Cart,
  CartDraft,
  ClientResponse,
  CustomerUpdate,
  MyCartDraft,
  MyCartUpdate,
  MyCustomerUpdate,
  createApiBuilderFromCtpClient,
} from '@commercetools/platform-sdk';
import { Client, ClientBuilder } from '@commercetools/sdk-client-v2';

import { PROJECT_KEY } from '@/config/clientConfig';
import { Customer } from '@/features/profilePage/Types';
import { LoginForm, PasswordChange, RegistrationRequestBody } from '@/types/interfaces';
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

export function getCustomer(root: ByProjectKeyRequestBuilder): Promise<ClientResponse> {
  return root.me().get().execute();
}

export function getProductByKey(key?: string): Promise<ClientResponse> {
  if (!key) {
    throw new Error('key is undefined');
  }
  return apiRoot.products().withKey({ key: key }).get().execute();
}

export async function getProducts(
  categoryId = '',
  sortValue: string,
  attributes: Record<string, string>,
  searchValue = '',
  page: number,
): Promise<ClientResponse> {
  const attrFilters = Object.entries(attributes)
    .filter(([attrkey, value]) => value !== '' && attrkey)
    .map(([key, value]) => `variants.attributes.${key}.key:"${value}"`);
  const catFilter = categoryId ? [`categories.id:subtree("${categoryId}")`] : [];
  const resFilters = [...attrFilters, ...catFilter];

  return apiRoot
    .productProjections()
    .search()
    .get({
      queryArgs: {
        'filter.query': resFilters,
        sort: sortValue === '' ? ['createdAt asc'] : [sortValue],
        limit: PRODUCTS_LIMIT,
        offset: PRODUCTS_LIMIT * (page - 1),
        markMatchingVariants: true,
        fuzzy: true,
        'text.en': searchValue,
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

export async function getUserInfo(): Promise<ClientResponse<Customer>> {
  return apiRoot.me().get().execute();
}

export async function changeData(
  data: CustomerUpdate,
  customerId: string,
): Promise<ClientResponse> {
  return apiRoot.customers().withId({ ID: customerId }).post({ body: data }).execute();
}

export async function addOrChangeAddres(data: MyCustomerUpdate): Promise<ClientResponse> {
  return apiRoot.me().post({ body: data }).execute();
}

export async function changePassword(data: PasswordChange): Promise<ClientResponse<Customer>> {
  return apiRoot.customers().password().post({ body: data }).execute();
}

///////////////////// Basket

export function changeNumberItemInBasket(
  body: MyCartUpdate,
  basketID: string,
): Promise<ClientResponse<Cart>> {
  return apiRoot
    .me()
    .carts()
    .withId({ ID: basketID })
    .post({
      body: body,
    })
    .execute();
}

export function getCustomerBasket(customerId: string): Promise<ClientResponse<Cart>> {
  return apiRoot.carts().withCustomerId({ customerId: customerId }).get().execute();
}

export function createBasket(): Promise<ClientResponse<Cart>> {
  const body: MyCartDraft = {
    country: 'RU',
    currency: 'USD',
  };
  return apiRoot.me().carts().post({ body: body }).execute();
}

export function createAnonymBasket(
  root: ByProjectKeyRequestBuilder,
): Promise<ClientResponse<Cart>> {
  const body: CartDraft = {
    currency: 'USD',
  };
  return root.me().carts().post({ body: body }).execute();
}

export function getUserBasket(cartId: string): Promise<ClientResponse<Cart>> {
  return apiRoot
    .me()
    .carts()
    .withId({ ID: cartId })
    .get({
      queryArgs: {
        expand: ['discountCodes[*].discountCode'],
      },
    })
    .execute();
}

export function getActiveBasket(root: ByProjectKeyRequestBuilder): Promise<ClientResponse<Cart>> {
  return root.me().activeCart().get().execute();
}
