import Remove from '@mui/icons-material/Remove';
import Add from '@mui/icons-material/Add';
import React from 'react';
import { useInc } from './useInc';
import { useDec } from './useDec';
import Button from 'react-bootstrap/Button';

const CartRow = ({ item }) => {
  const { title, price } = item.product;
  const { amount, id } = item;
  const { increment, incrementing } = useInc();
  const { decrement, decrementing } = useDec();
  return (
    <tr sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <td component='th' scope='row'>
        {title}
      </td>
      <td align='right'>{price}</td>
      <td align='right' style={{ width: '200px' }}>
        <Button
          disabled={decrementing}
          onClick={() => decrement(id)}
          color='error'
          variant='danger'
          style={{ marginRight: '10px' }}
          size='sm'
        >
          <Remove />
        </Button>
        {amount}
        <Button
          disabled={incrementing}
          onClick={() => increment(id)}
          variant='primary'
          style={{ marginLeft: '10px' }}
          size='sm'
        >
          <Add />
        </Button>
      </td>
    </tr>
  );
};

export default CartRow;
