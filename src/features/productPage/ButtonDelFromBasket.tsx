import { MyCartUpdate } from '@commercetools/platform-sdk';
import { Button } from '@mui/material';

import { changeNumberItemInBasket } from '@/api/clientService';
import { findItemInBasket } from '@/components/findItemInBasket/findItemInBasket';
import { useUserStore } from '@/stores/userStore';

function ButtonDelFromBasket({ disabled, sku }: { disabled: boolean; sku: string }): JSX.Element {
  const userId = useUserStore().userId;

  const testBody: MyCartUpdate = {
    version: 13,
    actions: [
      {
        action: 'changeLineItemQuantity',
        lineItemId: '90e15b73-fcac-4aaf-80a7-71ef82e7af36',
        quantity: 0,
      },
    ],
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
        return changeNumberItemInBasket(testBody, listItemID);
      })
      .then((data) => {
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
      }}
    >
      del from basket
    </Button>
  );
}

export default ButtonDelFromBasket;
