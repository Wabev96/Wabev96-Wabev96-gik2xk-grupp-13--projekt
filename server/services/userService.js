const db = require('../models');
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage,
} = require('../helpers/responseHelper');
const validate = require('validate.js');

const constraints = {
  email: {
    length: {
      minimum: 4,
      maximum: 200,
      tooShort: '^E-postaddressen måste vara minst %{count} tecken lång.',
      tooLong: '^E-postaddressen får inte vara längre än %{count} tecken lång.',
    },
    email: {
      message: '^E-postaddressen är i ett felaktigt format.',
    },
  },
  password: {
    length: {
      minimum: 8,
      maximum: 20,
      tooShort: '^Lösenordet måste vara minst %{count} tecken lång.',
      tooLong: '^Lösenordet får inte vara längre än %{count} tecken lång.',
    },
    format: {
      pattern: '[A-Za-z0-9]+',
      message: '^Lösenordet är i ett felaktigt format.',
    },
  },
};

async function login(email, password) {
  try {
    const user = await db.user.findOne({ where: { email, password } });
    if (!user) throw new Error("Couldn't find user");
    const cart = await db.cart.findOne({
      where: { user_id: user.id },
    });
    return createResponseSuccess({ user, cart });
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}
async function signup(newUser) {
  try {
    const user = await db.user.create(newUser);
    // create a cart for this user
    const cart = await db.cart.create({
      user_id: user.id,
      userId: user.id,
    });

    return createResponseSuccess({ user, cart });
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function myCart(id) {
  if (!id) {
    return createResponseError(422, 'Id är obligatoriskt');
  }
  try {
    const carts = await db.cart.findAll({
      where: { user_id: id },
      include: [db.cartRow],
    });
    return createResponseSuccess(carts);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

module.exports = { login, signup, myCart };
