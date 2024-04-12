import React from 'react';
import { CircularProgress } from '@mui/material';
import { useCartRows } from './useCartRows';
import CartRow from './CartRow';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

const Cart = () => {
  const { data = [], isLoading } = useCartRows();
  const totalPrice = data.reduce(
    (acc, curr) => acc + curr.amount * curr.product.price,
    0
  );
  if (isLoading) return <CircularProgress />;
  return (
    <Card sx={{ maxWidth: 700 }}>
      <Card.Body>
        <h2>Cart</h2>

        <Table style={{ minWidth: 650 }} striped hover responsive>
          <thead>
            <tr>
              <th>Product</th>
              <th align='right'>Price</th>
              <th align='right'>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <CartRow key={row.id} item={row} />
            ))}
          </tbody>
        </Table>

        <div style={{ marginTop: '2rem' }}>
          <h5 gutterBottom variant='h5' component='div'>
            Total: {totalPrice}
          </h5>
        </div>
      </Card.Body>
      <Card.Footer>
        <Button variant='primary'>Checkout</Button>
      </Card.Footer>
    </Card>
  );
};

export default Cart;
