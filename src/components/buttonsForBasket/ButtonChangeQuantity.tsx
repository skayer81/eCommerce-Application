import { Cart, ClientResponse, MyCartUpdate } from '@commercetools/platform-sdk';
import { Button } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { changeNumberItemInBasket } from '@/api/clientService';
import { findItemInBasket } from '@/components/findItemInBasket/findItemInBasket';
import { useBasketStore } from '@/stores/basketStore';
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
  const { updateCurrentVersion, basketId, basketVersion } = useBasketStore();
  const { userId } = useUserStore();
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

  const changeQuantity = async (sku: string, userId: string): Promise<ClientResponse<Cart>> => {
    const liineItem = await findItemInBasket(sku, userId);
    if (!liineItem) {
      throw new Error('что то пошло не так');
    }
    const result = await changeNumberItemInBasket(getBody(liineItem.id), basketId);
    return result;
  };

  const { mutate } = useMutation<ClientResponse>({
    mutationFn: () => changeQuantity(sku, userId),
    onSuccess: ({ body }: ClientResponse<Cart>) => {
      console.log('lastBasket=', body);
      updateCurrentVersion(body.version);
      queryClient.invalidateQueries({ queryKey: ['basketList'] }).catch(() => {});
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
