import express from 'express';
import { PORT, NODE_ENV } from './config/env.js';
import connectTODatacase from './database/mongodb.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
import categoryRouter from './routes/category.routes.js';
import productRouter from './routes/product.routes.js';
import promoCodeRouter from './routes/promoCode.routes.js';
import reviewRouter from './routes/review.routes.js';
import orderRouter from './routes/order.routes.js';
import contactRouter from './routes/contact.router.js';
import cors from 'cors';
import stripeRouter from './routes/stripe.routes.js';
import subscribeRouter from './routes/subscribe.routers.js';
import generalRouter from './routes/general.router.js';
import customerRouter from './routes/customer.routers.js';
import bodyParser from 'body-parser';
import chatRouter from './routes/chat.routes.js';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.IO handle
io.on('connection', (socket) => {
  console.log('A new user connected:', socket.id);
  socket.on('disconnect', () => console.log('User disconnected:', socket.id));
});

// Middleware to parse JSON bodies
app.use(express.json());

// Allow all origins (Access-Control-Allow-Origin: *)
app.use(cors());

app.get('/', (req, res) => {
  res.send(`app is running on http://localhost:${PORT}`);
});

app.use('/api', generalRouter);
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/promocodes', promoCodeRouter);
app.use('/api/reviews', reviewRouter);
app.use('/api/orders', orderRouter);
app.use('/api/customers', customerRouter);
app.use('/api/contacts', contactRouter);
app.use('/api/stripe', stripeRouter);
app.use('/api/subscribe', subscribeRouter);
app.use('/api', chatRouter);

// Start the server
server.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  await connectTODatacase();
});

export default app;