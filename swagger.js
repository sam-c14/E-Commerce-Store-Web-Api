const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-Mart Service API",
      version: "1.0.0",
      description: "API documentation for E-Mart API",
    },
  },
  apis: ["./routes/*.js", "./swaggerDocs.js"], // Path to your API route files
  servers: [
    {
      url: "https://e-mart-api.onrender.com/", // Link to your Swagger documentation
    },
  ],
};

const specs = swaggerJsdoc(options);

module.exports = specs;
