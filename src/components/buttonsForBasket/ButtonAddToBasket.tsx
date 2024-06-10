import { MyCartUpdate } from '@commercetools/platform-sdk';
import { Button } from '@mui/material';

import { changeNumberItemInBasket } from '@/api/clientService';
import { useUserStore } from '@/stores/userStore';

type AddToBasketBtnProps = {
  callback?: () => void;
  children: JSX.Element | string;
  disabled: boolean;
  quantity?: number;
  sku?: string;
};

function ButtonAddToBasket({
  callback,
  children,
  disabled,
  quantity,
  sku,
}: AddToBasketBtnProps): JSX.Element {
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

  const onClick = (): void => {
    addToBasket();
    if (callback) {
      callback();
    }
  };

  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      sx={{
        transition: 'background-color 0.3s',
        '&:hover': {
          backgroundColor: 'rgba(70, 163, 88, 0.3)',
        },
      }}
    >
      {children}
    </Button>
  );
}

export default ButtonAddToBasket;
