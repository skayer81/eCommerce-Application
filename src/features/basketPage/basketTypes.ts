export type BasketDataItem = {
  ID: string;
  img: string;
  name: string;
  price: number;
  quantity: number;
  sku: string;
  // discount: number | undefined;
  totalItem: number;
};

export type BasketData = {
  basketItems: Array<BasketDataItem>;
  discountCodes: Array<string>;
  discountOnTotalPrice?: number;
  totalBasketPrice: number;
};
