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
  variant,
}: {
  ID: string;
  callback?: () => void;
  children: JSX.Element | string;
  disabled?: boolean;
  quantity: number;
  variant?: 'contained' | 'outlined' | 'text';
}): JSX.Element {
  const { basketId, basketVersion, updateCurrentVersion, updateNumbOfItems } = useBasketStore(
    (state) => ({
      basketId: state.basketId,
      basketVersion: state.basketVersion,
      updateCurrentVersion: state.updateCurrentVersion,
      updateNumbOfItems: state.updateNumbOfItems,
    }),
  );
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
      if (body.totalLineItemQuantity) {
        updateNumbOfItems(body.totalLineItemQuantity);
      } else {
        updateNumbOfItems(0);
      }
      queryClient.invalidateQueries({ queryKey: ['basketList'] }).catch((error: Error) => {
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
    <Button disabled={disabled} onClick={onClick} size="small" variant={variant}>
      {children}
    </Button>
  );
}

export default ButtonChangeQuantity;
