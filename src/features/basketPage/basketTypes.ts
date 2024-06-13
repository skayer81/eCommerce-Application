export type BasketDataItem = {
  ID: string;
  discount: number | undefined;
  img: string;
  name: string;
  price: number;
  quantity: number;
  sku: string;
};

export type BasketData = {
  basketItems: Array<BasketDataItem>;
  discountCodes: Array<string>;
  discountOnTotalPrice?: number;
  totalBasketPrice: number;
};
