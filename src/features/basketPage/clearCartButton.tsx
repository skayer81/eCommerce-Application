import { Cart, ClientResponse } from '@commercetools/platform-sdk';
import { Button } from '@mui/material';
import { useMutation } from '@tanstack/react-query';

import { deleteBasket } from '@/api/clientService';
import { useBasketStore } from '@/stores/basketStore';

export function ClearCartButton(): JSX.Element {
  const { createBasket, updateCurrentVersion, basketId, basketVersion } = useBasketStore();

  const { mutate } = useMutation<ClientResponse>({
    mutationFn: () => deleteBasket(basketId, basketVersion),
    onSuccess: ({ body }: ClientResponse<Cart>) => {
      createBasket();
      updateCurrentVersion(body.version);
    },
    onError: (error) => console.error(error),
  });

  return (
    <Button
      onClick={() => {
        mutate();
      }}
      sx={{ textAlign: 'center', display: 'block', width: '100%' }}
    >
      Clear Shopping Cart
    </Button>
  );
}
