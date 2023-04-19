import 'dotenv/config';
import express from 'express';
import errorMiddleware from './lib/error-middleware.js';
import pg from 'pg';
// import cors from 'cors';

// eslint-disable-next-line no-unused-vars -- Remove when used
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
// app.use(cors({ origin: '*' }));
// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

// app.get('/api/hello', (req, res) => {
//   res.json({ message: 'Hello World!' });
// });

app.get('/api/products', async (req, res, next) => {
  try {
    const sql = `
    SELECT "productId",
           "productName",
           "price",
           "image"
      FROM "products";
    `;
    const result = await db.query(sql);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
  }
});

app.get('/api/products/:productId', async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    if (!productId) {
      throw new Error(400, 'productId must be a positive integer');
    }
    const sql = `
      select "productId",
            "productName",
            "price",
            "description",
            "image"
        from "products"
        where "productId" = $1
    `;
    const params = [productId];
    const result = await db.query(sql, params);
    console.log(result.rows[0]);
    if (!result.rows[0]) {
      throw new Error(404, `cannot find product with productId ${productId}`);
    }
    res.json(result.rows[0]);
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
