import axios from 'axios';

const AUTH_HEADER =
  'Basic ' + btoa(`${import.meta.env.VITE_CLIENT_ID}:${import.meta.env.VITE_CLIENT_SECRET}`);

const BASE_AUTH_URL = `${import.meta.env.VITE_AUTH_URL}/oauth/${import.meta.env.VITE_PROJECT_KEY}`;
const BASE_API_URL = `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_PROJECT_KEY}`;

const SCOPES: string = import.meta.env.VITE_SCOPES;

const headers = {
  Authorization: AUTH_HEADER,
  'Content-Type': 'application/x-www-form-urlencoded',
};

// получение токена для анонима

// POST https://{auth_host}/oauth/{projectKey}/anonymous/token
// Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
// Content-Type: application/x-www-form-urlencoded
// grant_type=client_credentials&scope={scope}

export async function getAnonymToken() {
  const requestdata = {
    grant_type: 'client_credentials',
    scope: SCOPES,
  };
  try {
    const { data } = await axios.post(`${BASE_AUTH_URL}/anonymous/token`, requestdata, { headers });
    console.log('responseAnonym=', data);
    console.log('token=', data.access_token);
    // const bearerToken = response.data.access_token;
  } catch (error) {
    console.error(error);
  }
}

// получение токена для авторизованного юзера

// POST https://{auth_host}/oauth/{projectKey}/customers/token
// Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==
// Content-Type: application/x-www-form-urlencoded
// grant_type=password&username={email}&password={password}&scope={scope}

interface LoginData {
  email: string;
  password: string;
}

export async function getAuthToken(loginData: LoginData) {
  const requestdata = {
    grant_type: 'password',
    username: loginData.email,
    password: loginData.password,
    scope: SCOPES,
  };
  try {
    const { data } = await axios.post(`${BASE_AUTH_URL}/customers/token`, requestdata, { headers });
    console.log('responseAuth=', data);

    const bearerToken: string = data.access_token;

    await loginUser(loginData, bearerToken);
  } catch (error) {
    console.error(error);
  }
}

// логин юзера

// curl https://api.{region}.commercetools.com/{projectKey}/me/login -i \
// --header 'Authorization: Bearer ${BEARER_TOKEN}' \
// --header 'Content-Type: application/json' \
// --data-binary @- << DATA
// {
//   "email" : "johndoe@example.com",
//   "password" : "secret123",
//   "anonymousCart" : {
//     "id" : "{{cart-id}}",
//     "typeId" : "cart"
//   }
// }
// DATA

export async function loginUser(loginData: LoginData, bearerToken: string) {
  const requestdata = {
    email: loginData.email,
    password: loginData.password,
  };

  const headers = {
    Authorization: `Bearer ${bearerToken}`,
    'Content-Type': 'application/json',
  };
  try {
    const { data } = await axios.post(`${BASE_API_URL}/me/login`, JSON.stringify(requestdata), {
      headers,
    });
    console.log('responselogin=', data);
  } catch (error) {
    console.error(error);
  }
}
