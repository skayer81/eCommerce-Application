import { Cart, ClientResponse, Image, LineItem } from '@commercetools/platform-sdk';

import { BasketData, BasketDataItem } from './basketTypes';

function basketDataAdapter(data: ClientResponse<Cart>): BasketData {
  const cart: Array<LineItem> = data.body.lineItems;
  const basketItems: Array<BasketDataItem> = [];
  cart.forEach((lineItem) => {
    const images: Image[] | undefined = lineItem.variant.images;
    const image: Image | undefined = images ? images[0] : undefined;
    const basketItem: BasketDataItem = {
      ID: lineItem.id,
      discount: lineItem.totalPrice.centAmount, // prices ? prices[0].discounted?.value.centAmount : undefined;
      img: image?.url ?? '',
      name: lineItem.name.en,
      price: lineItem.price.value.centAmount,
      quantity: lineItem.quantity,
      sku: lineItem.variant.sku ?? '',
      // totalPrice:
    };
    basketItems.push(basketItem);
  });
  const result: BasketData = {
    basketItems: basketItems,
    totalBasketPrice: data.body.totalPrice.centAmount,
  };
  return result;
}

export default basketDataAdapter;
