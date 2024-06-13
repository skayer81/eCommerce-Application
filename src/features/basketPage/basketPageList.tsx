import { List } from '@mui/material';

import { BasketPageListItem } from './basketPageListItem';
import { BasketDataItem } from './basketTypes';
import { ClearCartButton } from './clearCartButton';

export function BasketPageList({ listData }: { listData: Array<BasketDataItem> }): JSX.Element {
  return (
    <>
      <List>
        {listData.map((item, index) => (
          <BasketPageListItem key={index} listItem={item} />
        ))}
      </List>
      <ClearCartButton />
    </>
  );
}
