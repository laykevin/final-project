import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import errorMiddleware from './lib/error-middleware.js';
// import authorizationMiddleware from './lib/authorization-middleware.js';
import pg from 'pg';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';
import ClientError from './lib/client-error.js';

// eslint-disable-next-line no-unused-vars -- Remove when used
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.use(express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'client', 'build')));

app.get('/api/products', async (req, res, next) => {
  try {
    const sql = `
    SELECT "productId",
           "productName",
           "price",
           "image",
           "category"
      FROM "products"
      ORDER BY "productName";
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

app.get('/api/products/details/:category/:productId', async (req, res, next) => {
  try {
    const category = req.params.category;
    const productId = req.params.productId;
    const sql = `
    SELECT "productId",
           "productName",
           "price",
           "image"
      FROM "products"
      WHERE "category" LIKE '%' || $1 || '%'
      EXCEPT
      SELECT "productId",
           "productName",
           "price",
           "image"
      FROM "products"
      WHERE "productId" = $2
    `;
    const params = [category, productId];
    const result = await db.query(sql, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

app.get('/api/products/:productId', async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    if (!productId || (productId < 1 || productId > 36)) {
      throw new ClientError(400, 'productId must be a positive integer between 1 and 36');
    }
    const sql = `
      select "productId",
            "productName",
            "price",
            "description",
            "image",
            "category"
        from "products"
        where "productId" = $1;
    `;
    const params = [productId];
    const result = await db.query(sql, params);
    if (!result.rows[0]) {
      throw new ClientError(404, `cannot find product with productId ${productId}`);
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    next(err);
  }
});

app.post('/api/auth/sign-up', async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    if (!username || !password || !email) {
      throw new ClientError(400, 'username, password, and email are required fields');
    }
    const selectUsernameSql = `
      select "username"
        FROM "customers"
        WHERE "username" = $1
    `;
    const selectUsernameSqlParams = [username.toLowerCase()];
    const usernameResult = await db.query(selectUsernameSql, selectUsernameSqlParams);
    if (usernameResult.rows.length > 0) {
      throw new ClientError(400, 'Username already exists');
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "customers" ("username", "hashedPassword", "email")
        values ($1, $2, $3)
        returning "customerId", "username", "email"
    `;
    const params = [username.toLowerCase(), hashedPassword, email];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    const sql2 = `
      insert into "carts" ("customerId")
        values ($1)
        returning "cartId", "customerId"
    `;
    const params2 = [user.customerId];
    const result2 = await db.query(sql2, params2);
    const [cart] = result2.rows;
    res.status(201).json({ user, cart });
  } catch (err) {
    next(err);
  }
});

app.post('/api/auth/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new ClientError(401, 'Username and Password are required fields!');
    }
    const sql = `
      select "customerId",
            "hashedPassword",
            "cartId"
        from "customers"
        JOIN "carts" using ("customerId")
      where "username" = $1
    `;
    const params = [username.toLowerCase()];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    if (!user) {
      throw new ClientError(401, 'Username and Password do not match!');
    }
    const { customerId, hashedPassword, cartId } = user;
    if (!await argon2.verify(hashedPassword, password)) {
      throw new ClientError(401, 'Username and Password do not match!');
    }
    const payload = { customerId, username, cartId };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.json({ token, user: payload });
  } catch (err) {
    next(err);
  }
});

// TODO: Use express router to define auth protected endpoints
// app.use(authorizationMiddleware);

app.get('/api/mycart/:customerId', async (req, res, next) => {
  try {
    const user = req.params.customerId;
    const sql = `
      SELECT *
        FROM "products"
        JOIN "cartedProducts_map" using ("productId")
        JOIN "carts" using ("cartId")
        JOIN "customers" using ("customerId")
        WHERE "customers"."customerId" = $1
        ORDER BY "cartedProductId" DESC;
    `;
    const params = [user];
    const result = await db.query(sql, params);
    if (!result.rows) {
      throw new ClientError(404, `Cannot find cart of customerId: ${user}`);
    }
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

app.post('/api/mycart/addtocart', async (req, res, next) => {
  try {
    const { cartId, productId, quantity, productName } = req.body;
    const checkCartsql = `
       SELECT *
        FROM "cartedProducts_map"
        WHERE "cartedProducts_map"."productId" = $1 AND "cartedProducts_map"."cartId" = $2;
    `;
    const checkCartParams = [productId, cartId];
    const checkCartresult = await db.query(checkCartsql, checkCartParams);
    if (checkCartresult.rows.length > 0) {
      if (Number(checkCartresult.rows[0].productQuantity) + Number(quantity) <= 5) {
        const updateSql = `
        UPDATE "cartedProducts_map"
        SET "productQuantity" = "productQuantity" + $3
        WHERE "productId" = $1 AND "cartId" = $2;
        `;
        const updateCartParams = [productId, cartId, quantity];
        const updated = await db.query(updateSql, updateCartParams);
        res.status(201).json(updated);
      }
      throw new ClientError(400, `Limit 5 ${productName} per order!`);
    }

    const sql = `
      insert into "cartedProducts_map" ("cartId", "productId", "productQuantity")
        values ($1, $2, $3)
        returning "cartId", "productId", "productQuantity"
    `;
    const params = [cartId, productId, quantity];
    const result = await db.query(sql, params);
    const [user] = result.rows;
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

app.post('/api/mycart/update', async (req, res, next) => {
  try {
    const { cartId, productId, quantity } = req.body;
    if (!cartId || !productId || !quantity) {
      throw new ClientError(400, 'Missing cartId, productId, or quantity.');
    }
    const sql = `
        UPDATE "cartedProducts_map"
        SET "productQuantity" = $3
        WHERE "productId" = $1 AND "cartId" = $2;
    `;
    const updateCartParams = [productId, cartId, quantity];
    await db.query(sql, updateCartParams);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

app.post('/api/remove', async (req, res, next) => {
  try {
    const { cartId, productId } = req.body;
    if (!cartId || !productId) {
      throw new ClientError(400, 'Missing cart or product ids.');
    }
    const sql = `
        DELETE FROM "cartedProducts_map"
        WHERE "cartId" = $1 AND "productId" = $2;
      `;
    const params = [cartId, productId];
    await db.query(sql, params);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

app.post('/api/checkout/clearcart', async (req, res, next) => {
  try {
    const { cartId } = req.body;
    const sql = `
          DELETE
            FROM  "cartedProducts_map"
            WHERE "cartedProducts_map"."cartId" = $1;
        `;
    const params = [cartId];
    const result = await db.query(sql, params);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

app.post('/api/checkout/order', async (req, res, next) => {
  try {
    const { cartId } = req.body;
    if (!cartId) {
      throw new ClientError(400, 'username, password, and email are required fields');
    }
    const date = new Date();
    const sql2 = `
      insert into "orders" ("customerId", "dateTime")
        values ($1, $2)
        returning "orderId", "customerId"
    `;
    const params2 = [cartId, date];
    const result2 = await db.query(sql2, params2);
    const [cart] = result2.rows;
    const orderedProductsSql = `
    INSERT INTO "orderedProducts_map" ("orderId", "productQuantity", "productName", "price", "description", "image", "productId")
        SELECT "orderId", "productQuantity", "productName", "price", "description", "image", "products"."productId"
        FROM  "cartedProducts_map"
        JOIN "products" using ("productId")
        JOIN "carts" using ("cartId")
        JOIN "orders" using ("customerId")
        WHERE "orders"."orderId" = $1;
    `;
    const orderedProductsParams = [cart.orderId];
    const orderedProductsResult = await db.query(orderedProductsSql, orderedProductsParams);
    const ordered = orderedProductsResult.rows;
    const sql = `
           DELETE
        FROM  "cartedProducts_map"
        WHERE "cartedProducts_map"."cartId" = $1;
    `;
    const params = [cartId];
    const result = await db.query(sql, params);
    res.json({ result, cart, ordered });
  } catch (err) {
    next(err);
  }
});

app.get('/api/orderhistory/:customerId', async (req, res, next) => {
  try {
    const customerId = req.params.customerId;
    if (!customerId) {
      throw new ClientError(400, 'productId must be a positive integer');
    }
    const sql = `
      SELECT *
        FROM "orderedProducts_map"
        JOIN "orders" using ("orderId")
        WHERE "customerId" = $1
        ORDER BY "orderId" DESC;
    `;
    const params = [customerId];
    const result = await db.query(sql, params);
    if (!result.rows) {
      throw new ClientError(404, `cannot find product with productId ${customerId}`);
    }
    res.json(result.rows);
  } catch (err) {
    next(err);
  }
});

app.get('/*', function (req, res) {
  res.sendFile(path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'client', 'build', 'index.html'));
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
