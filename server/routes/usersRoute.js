const router = require('express').Router();
const validate = require('validate.js');
const userService = require('../services/userService');
const constraints = require('../utils/userConstraints');

//
router.post('/signup', (req, res) => {
  const user = req.body;
  // Validate the user data
  const invalidData = validate(user, constraints);
  if (invalidData) {
    res.status(400).json(invalidData);
  } else {
    userService.signup(user).then((result) => {
      res.send(result);
    });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // Validate user input
  const invalidData = validate(req.body, constraints);
  if (invalidData) {
    res.status(400).json(invalidData);
  } else {
    userService
      .login(email, password)
      .then((result) => {
        if (result.error) {
          return res.status(400).json({ message: 'Login failed' });
        }
        res.send(result);
      })
      .catch((err) => {
        res.status(401).json({ message: 'Login failed' });
      });
  }
});

router.get('/:id/getCart/', (req, res) => {
  const id = req.params.id;
  userService.myCart(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});

module.exports = router;
