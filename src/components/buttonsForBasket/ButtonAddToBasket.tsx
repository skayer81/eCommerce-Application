import { MyCartUpdate } from '@commercetools/platform-sdk';
import { Button } from '@mui/material';

import { changeNumberItemInBasket } from '@/api/clientService';
import { useUserStore } from '@/stores/userStore';

function ButtonAddToBasket({
  callback,
  children,
  disabled,
  quantity,
  sku,
}: {
  callback?: () => void;
  children: JSX.Element | string;
  disabled: boolean;
  quantity?: number;
  sku: string;
}): JSX.Element {
  const updateCurrentVersion = useUserStore().updateCurrentVersion;
  const basketId = useUserStore().basketId;
  const version = useUserStore().basketVersion;

  const addToBasket = (): void => {
    const testBady: MyCartUpdate = {
      version: version,
      actions: [{ action: 'addLineItem', sku: sku, quantity: quantity ?? 1 }],
    };
    changeNumberItemInBasket(testBady, basketId)
      .then((data) => {
        updateCurrentVersion(data.body.version);
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
        if (callback) {
          callback();
        }
      }}
    >
      {children}
    </Button>
  );
}

export default ButtonAddToBasket;
