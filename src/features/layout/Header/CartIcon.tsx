import { Link } from 'react-router-dom';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge, IconButton } from '@mui/material';

import { useBasketStore } from '@/stores/basketStore';

export default function CartIcon(): JSX.Element {
  const numbOfItems = useBasketStore((state) => state.numbOfItems);

  return (
    <IconButton component={Link} to="/basket">
      <Badge badgeContent={numbOfItems} color="secondary">
        <ShoppingCartOutlinedIcon color="primary" fontSize="large" />
      </Badge>
    </IconButton>
  );
}
