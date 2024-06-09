import { Cart, LineItem } from '@commercetools/platform-sdk';

import { getCustomerBasket } from '@/api/clientService';

function getBasket(userID: string): Promise<Cart> {
  const basket: Promise<Cart> = getCustomerBasket(userID)
    .then((basket) => {
      return basket.body;
    })
    .catch((error: Error) => {
      throw new Error(error.message);
    });
  return basket;
}

export async function findItemInBasket(sku: string, userID: string): Promise<LineItem | undefined> {
  const basket: Cart = await getBasket(userID);
  return basket.lineItems.find((item) => {
    return item.variant.sku === sku;
  });
}
