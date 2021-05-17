require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const paginRoutes = require('./routes/paginRoutes');
const authRoutes = require('./routes/auth');
const privateRoutes = require('./routes/private');
const ordersRoutes = require('./routes/ordersRoutes');
const errorHandler = require('./middleware/error');

connectDB();

const app = express();

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/pagin/products', paginRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', privateRoutes);
app.use('/api/orders', ordersRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/build')));
  // app.use(express.static('frontend/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build/index.html'))
  })
};

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});