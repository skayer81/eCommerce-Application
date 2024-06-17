export type BasketDataItem = {
  ID: string;
  discountedPrice: number;
  img: string;
  name: string;
  price: number;
  quantity: number;
  sku: string;
  totalItem: number;
};

export type BasketData = {
  basketId: string;
  basketItems: Array<BasketDataItem>;
  basketVersion: number;
  discountCodes: Array<string>;
  discountOnTotalPrice: number;
  totalBasketPrice: number;
  totalBeforeDiscount: number;
};
