// Error handling Middleware function for logging the error message
export const errorLogger = (error, request, response, next) => {
  console.log(`error ${error.message}`);
  next(error); // calling next middleware
};

// Error handling Middleware function reads the error message
// and sends back a response in JSON format
export const errorResponder = (error, request, response, next) => {
  response.header('Content-Type', 'application/json');

  const status = error.status || 400;
  response.status(status).send(error.message);
};

// Fallback Middleware function for returning
// 404 error for undefined paths
export const invalidPathHandler = (request, response, next) => {
  response.status(404);
  response.send('invalid path');
};
