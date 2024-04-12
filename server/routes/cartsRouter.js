const router = require('express').Router();
const cartService = require('../services/cartService.js');

router.post('/addProduct', (req, res) => {
  const productId = req.body.productId;
  const cartId = req.body.cartId;
  cartService.addProduct(cartId, productId).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.put('/decreaseAmount/:id', (req, res) => {
  const rowId = req.params.id;
  cartService.reduceAmount(rowId).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.put('/increaseAmount/:id', (req, res) => {
  const rowId = req.params.id;
  cartService.increaseAmount(rowId).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.get('/user/:userId', (req, res) => {
  const userId = req.params.userId;
  cartService.getUserCart(userId).then((result) => {
    res.status(result.status).json(result.data);
  });
});
router.get('/:id/getCartRows', (req, res) => {
  const id = req.params.id;
  cartService.getCartRows(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

module.exports = router;
