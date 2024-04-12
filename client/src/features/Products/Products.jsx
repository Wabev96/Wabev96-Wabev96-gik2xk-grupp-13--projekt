import React from 'react';
import { Row, Col, Button, Spinner, Container } from 'react-bootstrap';
import ProductItem from './ProductItem';
import { useProducts } from './useProducts';
import { Link, useLocation } from 'react-router-dom';

const Products = () => {
  const { products, isLoading } = useProducts();
  const { pathname } = useLocation();
  const isAdmin = pathname === '/admin';

  return (
    <Container>
      <h1>Products</h1>
      {isAdmin && (
        <div style={{ textAlign: 'center' }}>
          <Link to='/products/new'>
            <Button variant='primary'>Create New Product</Button>
          </Link>
        </div>
      )}

      {isLoading ? (
        <div style={{ display: 'flex' }}>
          <Spinner variant='primary' />
        </div>
      ) : (
        <Row>
          {products.map((product) => (
            <Col
              style={{ marginBottom: '20px' }}
              sm={2}
              md={4}
              key={product.id}
            >
              <ProductItem product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Products;
