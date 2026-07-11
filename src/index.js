import express from 'express';
import 'dotenv/config';
import {pool} from './db/index.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/health', (req,res) => {
  res.json({ status: 'OK', message: 'Inventory core backend is active.'});
});

// Test database connection
async function testConnection(){
  try{
    const [rows] = await pool.query('SELECT 1 + 1 AS result');
    console.log('Database connection verified successfully, Test results: ', rows[0].result);

    // Start listening only after database confirmation
    app.listen(PORT, () => {
      console.log(`Server running smoothly on port ${PORT}`);
    });
  } catch (error){
    console.error('Database connection failed! Error: ', error.message);
    process.exit(1);
  }
}

testConnection();