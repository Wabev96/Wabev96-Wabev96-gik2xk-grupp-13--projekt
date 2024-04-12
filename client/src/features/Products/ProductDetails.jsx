import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProduct } from './useProduct';
import { Rating } from '@mui/material';
import { useSubmitRating } from './useSubmitRating';
import { useRecoilValue } from 'recoil';
import { authAtom } from '../../atoms/authAtom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';

const ProductDetails = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useRecoilValue(authAtom);
  const [giveRating, setGiveRating] = useState(false);
  const { id } = useParams();
  const { product, getting } = useProduct(id);
  const [rating, setRating] = useState(0);
  const { submitRating, isRating } = useSubmitRating();
  if (getting) return <Spinner animation='border' variant='primary' />;
  const totalRating = product.ratings.reduce(
    (acc, curr) => acc + curr.rating,
    0
  );
  const avgRating =
    product.ratings.length > 0
      ? Number(totalRating / product.ratings.length).toFixed(1)
      : 0;
  const onRatingSubmit = () => {
    if (!isAuthenticated) return navigate('/auth');
    const body = {
      rating: rating,
    };
    submitRating({ id: product.id, body });
    setGiveRating(true);
    // addRating(body);
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Card
        style={{
          maxWidth: '500px',
        }}
      >
        <Card.Img height={400} variant='top' src={product.imageUrl} />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Rating
              name='read-only'
              value={+avgRating}
              readOnly
              precision={0.5}
            />
            <span>{avgRating}</span>
          </div>
          <p>
            Price: {product.price} <stroke>555</stroke>
          </p>
          <Card.Text>{product.description}</Card.Text>
        </Card.Body>
      </Card>
      <Card style={{ marginTop: '10px', width: '500px' }}>
        <Card>
          <Card.Body>
            {giveRating && <p>Thanks for your feedback</p>}
            {!giveRating && (
              <>
                <p>Give rating</p>
                <Rating
                  name='simple-controlled'
                  value={rating}
                  onChange={(event, newValue) => {
                    setRating(newValue);
                  }}
                  precision={0.5}
                />
              </>
            )}
          </Card.Body>
          {!giveRating && (
            <Card.Footer>
              <Button
                onClick={onRatingSubmit}
                variant='primary'
                disabled={isRating}
              >
                Submit
              </Button>
            </Card.Footer>
          )}
        </Card>
      </Card>
    </div>
  );
};

export default ProductDetails;
