import { Cart, ClientResponse, MyCartUpdate } from '@commercetools/platform-sdk';
import { Button } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { changeNumberItemInBasket } from '@/api/clientService';
import { useBasketStore } from '@/stores/basketStore';

function ButtonChangeQuantity({
  ID,
  callback,
  children,
  disabled = false,
  quantity,
}: {
  ID: string;
  callback?: () => void;
  children: JSX.Element | string;
  disabled?: boolean;
  quantity: number;
  sku?: string;
}): JSX.Element {
  const { updateCurrentVersion, basketId, basketVersion } = useBasketStore();
  const queryClient = useQueryClient();

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

  const { mutate } = useMutation<ClientResponse>({
    mutationFn: () => changeNumberItemInBasket(getBody(ID), basketId),
    onSuccess: ({ body }: ClientResponse<Cart>) => {
      updateCurrentVersion(body.version);
      queryClient.invalidateQueries({ queryKey: ['basketList'] }).catch((error: Error) => {
        throw new Error(error.message);
      });
      queryClient.invalidateQueries({ queryKey: ['productInCart'] }).catch((error: Error) => {
        throw new Error(error.message);
      });
    },
    onError: (error) => console.error(error),
  });

  const onClick = (): void => {
    mutate();
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
