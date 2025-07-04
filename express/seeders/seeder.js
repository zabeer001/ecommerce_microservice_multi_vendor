import mongoose from 'mongoose';
import { DB_URI } from '../config/env.js';

import userSeeder from './userSeeder.js';
// import productSeeder from './productSeeder.js';


const runAllSeeders = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log('Connected to MongoDB');

    await userSeeder();
    // await productSeeder();


    console.log('All seeders completed');

    process.exit(0);
  } catch (error) {
    console.error('Error running seeders:', error);
    process.exit(1);
  }
};

runAllSeeders();
