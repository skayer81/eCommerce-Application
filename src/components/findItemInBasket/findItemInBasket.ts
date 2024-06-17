import { LineItem } from '@commercetools/platform-sdk';

export function findIDItemInBasket(lineItems: Array<LineItem>, sku: string): string {
  const result = lineItems.find((item) => {
    return item.variant.sku === sku;
  });
  return result === undefined ? '' : result.id;
}
