import { MyCartUpdate } from '@commercetools/platform-sdk';
import { Button } from '@mui/material';

import { changeNumberItemInBasket } from '@/api/clientService';
import { findItemInBasket } from '@/components/findItemInBasket/findItemInBasket';
import { useUserStore } from '@/stores/userStore';

function ButtonChangeQuantity({
  callback,
  children,
  disabled = false,
  quantity,
  sku,
}: {
  callback?: () => void;
  children: JSX.Element | string;
  disabled?: boolean;
  quantity: number;
  sku: string;
}): JSX.Element {
  const { updateCurrentVersion, basketId, basketVersion, userId } = useUserStore();

  const getBody = (listItemID: string): MyCartUpdate => {
    return {
      version: basketVersion,
      actions: [
        {
          action: 'changeLineItemQuantity',
          lineItemId: listItemID,
          quantity: quantity,
        },
      ],
    };
  };

  const changeQuantity = (): void => {
    findItemInBasket(sku, userId)
      .then((data) => {
        return data?.id;
      })
      .then((listItemID) => {
        if (!listItemID) {
          throw new Error('что то пошло не так');
        }
        return changeNumberItemInBasket(getBody(listItemID), basketId);
      })
      .then((data) => {
        updateCurrentVersion(data.body.version);
        console.log('поменяли', data);
      })
      .catch((error) => {
        console.log('ошибка', error);
      });
  };

  const onClick = (): void => {
    changeQuantity();
    if (callback) {
      callback();
    }
  };

  return (
    <Button disabled={disabled} onClick={onClick}>
      {children}
    </Button>
  );
}

export default ButtonChangeQuantity;
