import { List } from '@mui/material';

import { BasketPageListItem } from './basketPageListItem';
import { BasketDataList } from './basketTypes';

export function BasketPageList({ listData }: { listData: Array<BasketDataList> }): JSX.Element {
  return (
    <List>
      {listData.map((item, index) => (
        <BasketPageListItem key={index} listItem={item} />
      ))}
    </List>
  );
}
