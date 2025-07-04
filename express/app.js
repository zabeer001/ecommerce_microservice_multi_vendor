
import express from 'express';
import { PORT, NODE_ENV } from './config/env.js';
import connectTODatacase from './database/mongodb.js';
import userRouter from './routes/user.routes.js';
import authRouter from './routes/auth.routes.js';
// import User from './models/user.model.js';



const app = express();

// Middleware to parse JSON bodies
app.use(express.json());



app.get('/', (req, res) => {
  res.send(`app is running on http://localhost:${PORT}`);
});


app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);



app.listen(PORT, async () => {
    console.log(`http://localhost:${PORT}`);
    await connectTODatacase();
});

export default app;