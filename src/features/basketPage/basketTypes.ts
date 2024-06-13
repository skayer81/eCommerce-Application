export type BasketDataItem = {
  ID: string;
  discount: number | undefined;
  img: string;
  name: string;
  price: number;
  quantity: number;
  sku: string;
  // totalPrice: number;
};

export type BasketData = {
  basketItems: Array<BasketDataItem>;
  totalBasketPrice: number;
};
