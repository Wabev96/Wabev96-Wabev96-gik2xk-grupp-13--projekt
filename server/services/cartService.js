const db = require('../models');
const validate = require('validate.js');
const {
  createResponseSuccess,
  createResponseError,
  createResponseMessage,
} = require('../helpers/responseHelper');

async function get() {
  try {
    const carts = await db.cart.findAll();
    return createResponseSuccess(carts);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getCartRows(id) {
  const cartRows = await db.cartRow.findAll({
    where: { cart_id: id },
    include: [db.product],
  });
  return createResponseSuccess(cartRows);
}

async function addProduct(cartId, productId, amount) {
  if (!cartId) {
    return createResponseError(422, 'AnvändarId är obligatoriskt');
  }
  if (!productId) {
    return createResponseError(422, 'ProduktId är obligatoriskt');
  }

  const existingCartRow = await db.cartRow.findOne({
    where: { cart_id: cartId, product_id: productId },
  });

  if (existingCartRow) {
    // Konvertera både existingCartRow.amount och amount till tal innan addition
    const updatedAmount = existingCartRow.amount + 1;
    existingCartRow.amount = updatedAmount;
    await existingCartRow.save();
    return createResponseSuccess(existingCartRow);
  } else {
    // Om ingen cartRow finns, skapa en ny
    try {
      // Se till att amount är ett tal
      const newCartRow = await db.cartRow.create({
        cart_id: cartId,
        product_id: productId,
        amount: 1,
      });
      return createResponseSuccess(newCartRow);
    } catch (error) {
      // Hantera andra möjliga fel
      return createResponseError(error.status || 500, error.message);
    }
  }
}

async function reduceAmount(rowId) {
  if (!rowId) {
    return createResponseError(422, 'AnvändarId är obligatoriskt');
  }

  try {
    const cartRow = await db.cartRow.findOne({
      where: {
        id: rowId,
      },
    });
    if (!cartRow) {
      return createResponseError(404, 'Varukorgsraden hittades inte');
    }
    if (cartRow.amount > 1) {
      cartRow.amount -= 1;
      const saveResult = await cartRow.save();
      console.log('Save result:', saveResult);
      return createResponseSuccess(saveResult);
    } else {
      const destroyResult = await cartRow.destroy();
      console.log('Destroy result:', destroyResult);
      return createResponseSuccess(destroyResult);
    }
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function increaseAmount(rowId) {
  if (!rowId) {
    return createResponseError(422, 'AnvändarId är obligatoriskt');
  }

  try {
    const cartRow = await db.cartRow.findOne({
      where: {
        id: rowId,
      },
    });
    if (!cartRow) {
      return createResponseError(404, 'Varukorgsraden hittades inte');
    }
    cartRow.amount += 1;
    const newRes = await cartRow.save();
    return createResponseSuccess(newRes);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

async function getUserCart(userId) {
  if (!userId) {
    return createResponseError(422, 'Userid är obligatoriskt');
  }
  try {
    const cart = await db.cart.findOne({
      where: {
        user_id: userId,
      },
      include: [db.cartRow],
    });
    return createResponseSuccess(cart);
  } catch (error) {
    return createResponseError(error.status, error.message);
  }
}

module.exports = {
  get,
  getCartRows,
  addProduct,
  reduceAmount,
  increaseAmount,
  getUserCart,
};
