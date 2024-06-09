import { MyCartUpdate } from '@commercetools/platform-sdk';
import { Button } from '@mui/material';

import { changeNumberItemInBasket } from '@/api/clientService';
import { useUserStore } from '@/stores/userStore';

// import { useQuery } from "@tanstack/react-query";

function ButtonAddToBasket({ disabled, sku }: { disabled: boolean; sku: string }): JSX.Element {
  const basketId = useUserStore().busketId;

  const addToBasket = (): void => {
    const testBady: MyCartUpdate = {
      version: 16,
      actions: [{ action: 'addLineItem', sku: sku, quantity: 1 }],
    };
    changeNumberItemInBasket(testBady, basketId)
      .then((data) => {
        console.log('добавили', data);
      })
      .catch((error) => {
        console.log('ошибка', error);
      });
  };

  return (
    <Button
      disabled={disabled}
      onClick={() => {
        addToBasket();
      }}
    >
      add to basket
    </Button>
  );
}

export default ButtonAddToBasket;
