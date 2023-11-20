import { ApolloError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET;

export const errorMiddleware = (err, _req, res, _next) => {
  // Handle the specific error thrown by ApolloError
  console.log('here', err);
  if (err instanceof ApolloError) {
    const statusCode = err.extensions?.statusCode || 500; // Default to 500 if statusCode is not provided

    res.status(statusCode).json({
      message: err.message,
      code: err.extensions?.code || 'INTERNAL_SERVER_ERROR',
    });
  } else {
    // Handle other types of errors
    console.error(err); // Log the error for debugging purposes

    // Send a generic error response
    res.status(500).json({
      message: 'Internal Server Error',
      code: 'INTERNAL_SERVER_ERROR',
    });
  }
};

export const validateToken = (token) => {
  try {
    // Verify the token and extract the payload
    console.log(token);
    const decoded = jwt.verify(token.split('Bearer ')[1], JWT_SECRET);
    return decoded;
  } catch (error) {
    throw new ApolloError('Invalid token', 'INVALID_TOKEN', {
      statusCode: 401,
    });
  }
};
