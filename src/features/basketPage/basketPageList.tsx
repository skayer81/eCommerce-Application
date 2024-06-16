import { List } from '@mui/material';

import { BasketPageListItem } from './basketPageListItem';
import { BasketDataItem } from './basketTypes';

export function BasketPageList({ listData }: { listData: Array<BasketDataItem> }): JSX.Element {
  return (
    <List sx={{ mt: '10px' }}>
      {listData.map((item, index) => (
        <BasketPageListItem key={index} listItem={item} />
      ))}
    </List>
  );
}
