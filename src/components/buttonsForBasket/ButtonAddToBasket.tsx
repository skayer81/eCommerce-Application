import { Cart, ClientResponse, MyCartUpdate } from '@commercetools/platform-sdk';
import { Button, CircularProgress } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { changeNumberItemInBasket } from '@/api/clientService';
import { useBasketStore } from '@/stores/basketStore';

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
  const queryClient = useQueryClient();

  const { basketId, basketVersion, updateCurrentVersion, updateNumbOfItems } = useBasketStore(
    (state) => ({
      basketId: state.basketId,
      basketVersion: state.basketVersion,
      updateCurrentVersion: state.updateCurrentVersion,
      updateNumbOfItems: state.updateNumbOfItems,
    }),
  );

  const addToBasket = (): void => {
    const itemBody: MyCartUpdate = {
      version: basketVersion,
      actions: [{ action: 'addLineItem', sku: sku, quantity: quantity ?? 1 }],
    };

    mutate(itemBody);
  };

  const { mutate, isPending } = useMutation<ClientResponse, Error, MyCartUpdate>({
    mutationFn: (itemBody) => changeNumberItemInBasket(itemBody, basketId),
    onSuccess: async ({ body }: ClientResponse<Cart>) => {
      updateCurrentVersion(body.version);
      if (body.totalLineItemQuantity) {
        updateNumbOfItems(body.totalLineItemQuantity);
      }
      await queryClient.invalidateQueries({ queryKey: ['cart'] });
      await queryClient.invalidateQueries({ queryKey: ['productInCart'] });
    },
    onError: (error) => console.error(error),
  });

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
      {isPending ? <CircularProgress size={20} /> : children}
    </Button>
  );
}

export default ButtonAddToBasket;
