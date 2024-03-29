const { cart, products } = require("../models");
const ISODate = require("isodate");

const Cart = cart;
const createCart = async (req, res) => {
  try {
    const reqBody = req.body;
    // console.log(req.session);
    const newCart = await Cart.create(reqBody);
    res.send({ message: "Cart created successfully" });
  } catch (error) {
    res.send(error);
  }
};
const createUserDefCart = async (user) => {
  try {
    const date = new Date();
    const cart = {
      _id: user._id,
      status: "active",
      quantity: 0,
      total_price: 0,
      modified_on: new ISODate(date),
      products: [],
    };
    // console.log(req.session);
    await Cart.create(cart);
  } catch (error) {
    return error;
  }
};

const addToCart = async (req, res) => {
  try {
    const { _id: userSessionId, status, products } = req.body;
    if (!userSessionId || !status)
      return res
        .status(400)
        .json({ error: "Id and status fields cannot be empty" });
    const newQuantity = 1;
    const date = new Date();
    const cart = await Cart.findOneAndUpdate(
      { _id: userSessionId, status },
      {
        $set: { modified_on: new ISODate(date) },
        $push: { products },
      }
    );
    const oldQuantity = cart?.quantity;
    const quantityDelta = oldQuantity + newQuantity;
    cart.quantity = quantityDelta;
    cart.total_price += products.price;
    await cart.save();
    const filter = {
      sku: products.sku,
      quantity: {
        $gte: newQuantity,
      },
    };
    const updates = {
      $inc: { quantity: -1 * quantityDelta },
      $push: {
        in_carts: {
          quantity: quantityDelta,
          id: userSessionId,
          timestamp: new ISODate(date),
        },
      },
    };
    const updated = await updateProducts(filter, updates, { upsert: true });
    if (!updated) {
      db.carts.update(
        {
          _id: userSessionId,
          products: {
            sku: {
              $eq: products.sku,
            },
          },
        },
        {
          $set: { quantity: oldQuantity },
        }
      );
      res.status(400).send({ msg: "There was an issue adding to cart" });
      return;
    }
    res.status(201).send({ msg: "Successfully added to cart" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const updateProducts = async (filter, updates) => {
  try {
    await products.updateOne(filter, updates);
    return true;
  } catch (error) {
    return false;
  }
};

const checkCartStatus = async (req, res) => {
  const { status } = await product.findOne({ _id: req.body._id });
  res.status(200).send({ status });
};

const removeFromCart = async (req, res) => {
  let { sku, id: cartId, price } = req.body;
  const filter = {
    _id: cartId,
  };
  price = parseInt(price);
  const userCart = await Cart.findOne(filter);
  // console.log(typeof price);
  let itemQuantity = null;
  userCart.products.map((product) => {
    if (product.sku === sku) {
      itemQuantity = product.quantity;
    }
  });

  const newCartQuantity = userCart.quantity - itemQuantity;
  const newCartTotalPrice = userCart.total_price - itemQuantity * price;
  // console.log(userCart.total_price, newCartTotalPrice);
  const date = new Date();
  userCart.products = userCart.products.filter((item) => item.sku !== sku);

  const updates = {
    $set: {
      modified_on: new ISODate(date),
      quantity: newCartQuantity,
      total_price: newCartTotalPrice,
    },
  };
  try {
    const productToBeUpdated = await products.findOne({ sku });
    if (!productToBeUpdated) {
      return res
        .status(404)
        .json({ msg: "The product you're trying to remove cannot be found" });
    }

    productToBeUpdated.in_carts = productToBeUpdated.in_carts.filter(
      (item) => item.id !== cartId
    );
    // console.log("Got Here");
    productToBeUpdated.quantity += itemQuantity;
    // console.log("After");
    await productToBeUpdated.save();

    await cart.updateOne(filter, updates);
    await userCart.save();

    // const updatedProductCatalog = await products.updateOne(
    //   {
    //     sku,
    //   },
    //   {
    //     $inc: { quantity: itemQuantity },
    //     $pull: {
    //       in_carts: [{ id: cartId }],
    //     },
    //   }
    // );
    // console.log(productToBeUpdated);

    return res.status(201).json({ msg: "Item Successfully removed" });
  } catch (error) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
};

const changeProductQuantity = async (req, res) => {
  try {
    const { id: cartId, price, quantity, sku, op } = req.body;
    const userCart = await cart.findOne({ _id: cartId, status: "active" });
    const product = await products.findOne({ sku });
    if (op == "inc") {
      const newQuantity = userCart.quantity + quantity;
      const date = new Date();
      const oldPrice = userCart.total_price;
      const newPrice = oldPrice + price;

      const newCartProducts = userCart.products.map((product) => {
        if (product.sku === sku) {
          product.price = newPrice;
          product.quantity += quantity;
        }
        return product;
      });

      await Cart.updateOne(
        { _id: cartId, status: "active" },
        {
          $set: {
            quantity: newQuantity,
            total_price: newPrice,
            modified_on: new ISODate(date),
            products: newCartProducts,
          },
        }
      );

      const newProduct = product.in_carts.map((cart) => {
        if (cart.id === cartId) {
          cart.quantity += quantity;
        }
        return cart;
      });

      await products.updateOne(
        { sku },
        {
          $inc: {
            quantity: -1 * quantity,
          },
          $set: {
            in_carts: newProduct,
          },
        }
      );
    } else {
      const oldPrice = userCart.total_price;
      const newPrice = oldPrice - price;
      const newQuantity = userCart.quantity - quantity;
      let newCartProducts = userCart.products.map((product) => {
        if (product.sku === sku) {
          product.price = newPrice;
          product.quantity -= quantity;
        }
        return product;
      });

      newCartProducts = newCartProducts.filter(
        (product) => product.quantity !== 0
      );

      const date = new Date();
      await Cart.updateOne(
        { _id: cartId, status: "active" },
        {
          $set: {
            quantity: newQuantity,
            total_price: newPrice,
            modified_on: new ISODate(date),
            products: newCartProducts,
          },
        }
      );

      let newProduct = product.in_carts.map((cart) => {
        cart.id === cartId ? (cart.quantity -= quantity) : "";
        return cart;
      });

      newProduct = newProduct.filter((cart) => cart.quantity !== 0);

      await products.updateOne(
        { sku },
        {
          $inc: {
            quantity: 1 * quantity,
          },
          $set: {
            in_carts: newProduct,
          },
        }
      );
    }

    res.status(201).send({ msg: "Cart Quantity Successfully Updated" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: "An error occurred in the process" });
  }
};

const getCartData = async (req, res) => {
  try {
    const userCart = await Cart.findOne({ _id: req.query.id });

    if (!userCart || !req.query.id) {
      res.status(404).json({ msg: "We couldn't find your cart" });
    }

    res.status(200).json({ cart: userCart });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createCart,
  createUserDefCart,
  addToCart,
  checkCartStatus,
  removeFromCart,
  changeProductQuantity,
  getCartData,
};
