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
  callback: () => void;
  children: JSX.Element | string;
  disabled?: boolean;
  quantity: number;
  sku: string;
}): JSX.Element {
  const userId = useUserStore().userId;
  const basketId = useUserStore().basketId;
  const version = useUserStore().basketVersion;
  const updateCurrentVersion = useUserStore().updateCurrentVersion;

  const getBody = (listItemID: string): MyCartUpdate => {
    return {
      version: version,
      actions: [
        {
          action: 'changeLineItemQuantity',
          lineItemId: listItemID,
          quantity: quantity,
        },
      ],
    };
  };

  const delFromBasket = (): void => {
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
        console.log('удалили', data);
      })
      .catch((error) => {
        console.log('ошибка', error);
      });
  };

  return (
    <Button
      disabled={disabled}
      onClick={() => {
        delFromBasket();
        callback();
      }}
    >
      {children}
    </Button>
  );
}

export default ButtonChangeQuantity;
