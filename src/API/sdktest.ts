import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

import {
  authAnonymMiddlewareOptions,
  authUserMiddlewareOptions,
  /* authMiddlewareOptions, */
  httpMiddlewareOptions,
} from './BuildClient';

interface MyForm {
  email: string;
  password: string;
}
// Create apiRoot from the imported ClientBuilder and include your Project key

// Export the ClientBuilder
const ctpClient = new ClientBuilder();

let apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: import.meta.env.VITE_PROJECT_KEY,
});

export function getAnonymToken() {
  const ctpClient = new ClientBuilder()
    .withClientCredentialsFlow(authAnonymMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: import.meta.env.VITE_PROJECT_KEY,
  });

  return apiRoot.get().execute();
}

export function authUser({ email, password }: MyForm) {
  const ctpClient = new ClientBuilder()
    .withClientCredentialsFlow(authUserMiddlewareOptions(email, password))
    .withHttpMiddleware(httpMiddlewareOptions)
    .withLoggerMiddleware()
    .build();

  apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
    projectKey: import.meta.env.VITE_PROJECT_KEY,
  });

  loginUser({ email, password }).then(console.log).catch(console.error);
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

// Retrieve Project information and output the result to the log
// getProject().then(console.log).catch(console.error);

// Example call to return Project information
// This code has the same effect as sending a GET request to the commercetools Composable Commerce API without any endpoints.
// export const getProject = () => {
//   return apiRoot.get().execute();
// };
