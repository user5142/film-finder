const key = require('key');
key.config();

exports.handler = async (event, context) => {
  const apiKey = process.env.API_KEY;
  return apiKey;  
};
