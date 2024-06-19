import { useState } from 'react';

import { Cart, ClientResponse, MyCartUpdate } from '@commercetools/platform-sdk';
import { Alert, Button, CircularProgress, Snackbar } from '@mui/material';
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

  const [snackBarState, setSnackBar] = useState(false);
  const [errorSnackBarState, setErrorSnackBar] = useState(false);

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

  const { mutate, isPending } = useMutation<ClientResponse>({
    mutationFn: () => changeNumberItemInBasket(getBody(ID), basketId),
    onSuccess: ({ body }: ClientResponse<Cart>) => {
      updateCurrentVersion(body.version);

      if (quantity === 0) {
        setSnackBar(true);
      }
      if (body.totalLineItemQuantity) {
        updateNumbOfItems(body.totalLineItemQuantity);
      } else {
        updateNumbOfItems(0);
      }
      queryClient.invalidateQueries({ queryKey: ['basketList'] }).catch((error: Error) => {
        throw new Error(error.message);
      });
      queryClient.invalidateQueries({ queryKey: ['productInCart'] }).catch((error: Error) => {
        throw new Error(error.message);
      });
    },
    onError: (error) => {
      console.error(error);
      if (quantity === 0) {
        setErrorSnackBar(true);
      }
    },
  });

  const onClick = (): void => {
    mutate();
    if (callback) {
      callback();
    }
  };

  if (isPending) {
    return (
      <Button sx={{ width: '64px', height: '32px' }}>
        <CircularProgress size={10} />
      </Button>
    );
  }

  return (
    <>
      <Button disabled={disabled} onClick={onClick} size="small" variant={variant}>
        {children}
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={3000}
        key={'top' + 'right'}
        message="Item successfully removed"
        onClose={() => setSnackBar(false)}
        open={snackBarState}
      />
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        autoHideDuration={3000}
        key={'bottom' + 'left'}
        onClose={() => setErrorSnackBar(false)}
        open={errorSnackBarState}
      >
        <Alert onClose={() => setErrorSnackBar(false)} severity="error" sx={{ width: '100%' }}>
          Failed to remove item
        </Alert>
      </Snackbar>
    </>
  );
}

export default ButtonChangeQuantity;
