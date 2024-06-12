import {
  ByProjectKeyRequestBuilder,
  Cart,
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

export async function getCustomer(root: ByProjectKeyRequestBuilder): Promise<void> {
  return root.me().get().execute().then(console.log).catch(console.error);
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
  /*
  пример body для добавления
  const body: MyCartUpdate =
  {"version":1,
    "actions":[
      {"action":"addLineItem",
        "sku": 'PL-37-S',
        "quantity":1}
    ]
  }

  пример body для удаления
  const body: MyCartUpdate =
  {"version":1,
    "actions":[
      {"action":"changeLineItemQuantity",
        "lineItemId": "56238bbe-1b4d-455d-8619-7ac604f994a0" - ID айтема в корзине,
        "quantity":1}
    ]
  }


*/
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
