import { MyCartUpdate } from '@commercetools/platform-sdk';
import { Button } from '@mui/material';

import { changeNumberItemInBasket } from '@/api/clientService';
import { useUserStore } from '@/stores/userStore';

// import { useQuery } from "@tanstack/react-query";

function ButtonAddToBasket({
  children,
  disabled,
  sku,
}: {
  children: JSX.Element | string;
  disabled: boolean;
  sku: string;
}): JSX.Element {
  const basketId = useUserStore().busketId;

  const addToBasket = (): void => {
    const testBady: MyCartUpdate = {
      version: 22,
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
      {children}
    </Button>
  );
}

export default ButtonAddToBasket;
