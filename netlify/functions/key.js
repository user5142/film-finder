const dotenv = require('dotenv');
dotenv.config();

export async function handler(event, context) {
  const apiKey = process.env.API_KEY;
  return apiKey;  
}