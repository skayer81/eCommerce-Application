import { Cart, ClientResponse, Image, LineItem } from '@commercetools/platform-sdk';

import { BasketDataList } from './basketTypes';

function basketDataAdapter(data: ClientResponse<Cart>): Array<BasketDataList> {
  const cart: Array<LineItem> = data.body.lineItems;
  const result: Array<BasketDataList> = [];
  cart.forEach((lineItem) => {
    const images: Image[] | undefined = lineItem.variant.images;
    const image: Image | undefined = images ? images[0] : undefined;
    const listItem: BasketDataList = {
      img: image?.url ?? '',
      name: lineItem.name.en,
      price: lineItem.price.value.centAmount,
      quantity: lineItem.quantity,
    };
    result.push(listItem);
  });
  return result;
}

export default basketDataAdapter;
