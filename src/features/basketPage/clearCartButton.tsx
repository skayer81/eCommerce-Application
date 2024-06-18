import { useState } from 'react';

import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { createNewBasket, deleteBasket } from '@/api/clientService';
import { useBasketStore } from '@/stores/basketStore';

import BasketDialog from './basketDialog';

export function ClearCartButton(): JSX.Element {
  const [open, setOpen] = useState(false);
  //const { createBasket, updateCurrentVersion, basketId, basketVersion } = useBasketStore();
  const { updateCurrentVersion, basketId, basketVersion, addBasketIDInStore, updateNumbOfItems } =
    useBasketStore();

  const { mutate } = useMutation<ClientResponse>({
    mutationFn: () => deleteBasket(basketId, basketVersion),
    onSuccess: ({ body }: ClientResponse<Cart>) => {
      console.log('success delete=', body);
      addNewBasket.mutate();
    },
    onError: (error) => console.error(error),
  });

  const addNewBasket = useMutation<ClientResponse>({
    mutationFn: () => createNewBasket(),
    onSuccess: ({ body }: ClientResponse<Cart>) => {
      // createBasket();
      console.log('newbasket=', body);
      updateCurrentVersion(body.version);
      addBasketIDInStore(body.id);
      updateNumbOfItems(0);
    },
    onError: (error) => console.error(error),
  });

  const onClickYESButton = (): void => {
    mutate();
    setOpen(false);
  };

  const onClickNOButton = (): void => setOpen(false);

  return (
    <>
      {' '}
      <Button
        onClick={() => {
          setOpen(true);
        }}
        sx={{ textAlign: 'center', display: 'block', width: 'auto', alignSelf: 'center' }}
      >
        Clear Shopping Cart
      </Button>
      <BasketDialog
        isOpen={open}
        onClickNOButton={onClickNOButton}
        onClickYESButton={onClickYESButton}
      />
    </>
  );
}
