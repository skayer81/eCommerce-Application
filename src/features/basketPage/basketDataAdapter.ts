import { Cart, ClientResponse, Image, LineItem } from '@commercetools/platform-sdk';
// import { LineItemDraft } from '@commercetools/platform-sdk';

import { BasketData, BasketDataItem } from './basketTypes';

function basketDataAdapter(data: ClientResponse<Cart>): BasketData {
  console.log('пришло в адаптер', data);
  const cart: Array<LineItem> = data.body.lineItems;
  const basketItems: Array<BasketDataItem> = [];
  cart.forEach((lineItem) => {
    const images: Image[] | undefined = lineItem.variant.images;
    const image: Image | undefined = images ? images[0] : undefined;
    const basketItem: BasketDataItem = {
      ID: lineItem.id,
      totalItem: lineItem.totalPrice.centAmount,
      img: image?.url ?? '',
      name: lineItem.name.en,
      price: lineItem.price.discounted
        ? lineItem.price.discounted.value.centAmount
        : lineItem.price.value.centAmount,
      quantity: lineItem.quantity,
      sku: lineItem.variant.sku ?? '',
      discountedPrice:
        lineItem.discountedPricePerQuantity.length > 0
          ? lineItem.discountedPricePerQuantity[0].discountedPrice.value.centAmount
          : 0,
    };
    basketItems.push(basketItem);
  });
  const discountCodes: Array<string> = [];
  data.body.discountCodes.forEach((item) => {
    const code = item.discountCode.obj?.code;
    if (code) {
      discountCodes.push(code);
    }
  });

  const result: BasketData = {
    basketItems: basketItems,
    discountCodes: discountCodes,
    totalBasketPrice: data.body.totalPrice.centAmount,
    basketId: data.body.id,
    basketVersion: data.body.version,
    discountOnTotalPrice: data.body.discountOnTotalPrice
      ? data.body.discountOnTotalPrice.discountedAmount.centAmount
      : 0,
    totalBeforeDiscount:
      data.body.totalPrice.centAmount +
      (data.body.discountOnTotalPrice
        ? data.body.discountOnTotalPrice.discountedAmount.centAmount
        : 0),
  };

  return result;
}

export default basketDataAdapter;
