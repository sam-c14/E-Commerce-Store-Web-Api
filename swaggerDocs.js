const swaggerDocs = [
  {
    path: "/admin/v1/remove-product/:productId",
    method: "post",
    summary: "Delete an existing product",
    responses: {
      201: {
        description: "Product Deleted",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                response: {
                  type: "string",
                  description: "response message for successful delete request",
                },
              },
            },
            example: {
              response: "Product Successfully Removed",
            },
          },
        },
      },
    },
  },
  {
    path: "/admin/v1/update-product/:productId",
    method: "put",
    summary: "Update an existing product",
    responses: {
      201: {
        description: "Product Updated",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                response: {
                  type: "string",
                  description: "response message for successful request",
                },
              },
            },
            example: {
              response: "Product Successfully updated",
            },
          },
        },
      },
    },
  },
  {
    path: "/api/v1/send-otp",
    method: "post",
    summary: "Verify User's Otp request",
    responses: {
      201: {
        description: "Otp successfully verified",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                response: {
                  type: "string",
                  description: "Verify Otp",
                },
              },
            },
            example: {
              response: "Otp Successfully verified",
            },
          },
        },
      },
    },
  },
  {
    path: "/api/v1/logout",
    method: "post",
    summary: "User Log out",
    responses: {
      201: {
        description: "Logout Successful",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                response: {
                  type: "string",
                  description: "Successful logout",
                },
              },
            },
            example: {
              response: "User Successfully logged out",
            },
          },
        },
      },
    },
  },
  {
    path: "/api/v1/send-otp/:userEmail",
    method: "get",
    summary: "Send Otp to user's Email",
    responses: {
      200: {
        description: "Otp successfully sent",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                response: {
                  type: "string",
                  description: "Verify Otp",
                },
              },
            },
            example: {
              response: "Otp Successfully sent",
            },
          },
        },
      },
    },
  },
  {
    path: "/api/v1/signup",
    method: "post",
    summary: "Sign Up as a user",
    parameters: [
      {
        in: "path",
        name: "firstName",
        required: true,
      },
      {
        in: "path",
        name: "lastName",
        required: true,
      },
      {
        in: "path",
        name: "phoneNumber",
        required: true,
      },
      {
        in: "path",
        name: "email",
        required: true,
      },
      {
        in: "path",
        name: "role",
        required: true,
      },
    ],
    responses: {
      201: {
        description: "Otp successfully sent",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                response: {
                  type: "string",
                  description: "Sign Up Successful",
                },
              },
            },
            example: {
              response: "Sign Up Successful",
            },
          },
        },
      },
      500: {
        description: "Error with the server",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                response: {
                  type: "string",
                  description: "Error message",
                },
              },
            },
            example: {
              response: "There was an internal error wit the server",
            },
          },
        },
      },
    },
  },
  {
    path: "/api/v1/signup",
    method: "post",
    summary: "Login as a User",
    parameters: [
      {
        in: "path",
        name: "email",
        required: true,
      },
      {
        in: "path",
        name: "password",
        required: true,
      },
    ],
    responses: {
      201: {
        description: "User Login",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                response: {
                  type: "string",
                  description: "SignUp Successful",
                },
              },
            },
            example: {
              response: "SignUp Successful",
            },
          },
        },
      },
      500: {
        description: "Error with the server",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                response: {
                  type: "string",
                  description: "Error message",
                },
              },
            },
            example: {
              response: "There was an internal error wit the server",
            },
          },
        },
      },
    },
  },
  {
    path: "/api/v1/login",
    method: "post",
    summary: "Login as a User",
    parameters: [
      {
        in: "path",
        name: "email",
        required: true,
      },
      {
        in: "path",
        name: "password",
        required: true,
      },
    ],
    responses: {
      201: {
        description: "User Login",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  description: "ID of the user",
                },
                username: {
                  type: "string",
                  description: "Name of the user",
                },
                email: {
                  type: "string",
                  description: "Email Of the user",
                },
                roles: {
                  type: "array",
                  description: "Array of te users permissions or roles",
                },
                session: {
                  type: "object",
                  description: "Contains user session data",
                },
              },
            },
            example: {
              response: {
                id: "64cd12bd00b2dc759fc33972",
                username: "John Doe",
                email: "johndoe@example.com",
                roles: ["USERS"],
                session: {
                  token:
                    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ",
                },
              },
            },
          },
        },
      },
      500: {
        description: "Error with the server",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                response: {
                  type: "string",
                  description: "Error message",
                },
              },
            },
            example: {
              response: "There was an internal error wit the server",
            },
          },
        },
      },
    },
  },
  {
    path: "/admin/v1/get-products",
    method: "post",
    summary: "Fetch Products all Products",
    parameters: [],
    responses: {
      201: {
        description: "Fetch Products",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  description: "ID of the user",
                },
                username: {
                  type: "string",
                  description: "Name of the user",
                },
                email: {
                  type: "string",
                  description: "Email Of the user",
                },
                roles: {
                  type: "array",
                  description: "Array of te users permissions or roles",
                },
                session: {
                  type: "object",
                  description: "Contains user session data",
                },
              },
            },
            example: {
              response: {},
            },
          },
        },
      },
      500: {
        description: "Error with the server",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                response: {
                  type: "string",
                  description: "Error message",
                },
              },
            },
            example: {
              response: "There was an internal error wit the server",
            },
          },
        },
      },
    },
  },
  {
    path: "/admin/v1/get-products/:page",
    method: "post",
    summary: "Fetch Products as an Admin by pages",
    parameters: [
      {
        in: "path",
        name: "page-number",
        required: true,
      },
    ],
    responses: {
      201: {
        description: "Fetch Products",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: {
                  type: "string",
                  description: "ID of the user",
                },
                username: {
                  type: "string",
                  description: "Name of the user",
                },
                email: {
                  type: "string",
                  description: "Email Of the user",
                },
                roles: {
                  type: "array",
                  description: "Array of te users permissions or roles",
                },
                session: {
                  type: "object",
                  description: "Contains user session data",
                },
              },
            },
            example: {
              response: {},
            },
          },
        },
      },
      500: {
        description: "Error with the server",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                response: {
                  type: "string",
                  description: "Error message",
                },
              },
            },
            example: {
              response: "There was an internal error wit the server",
            },
          },
        },
      },
    },
  },
  {
    path: "/admin/v1/add-product",
    method: "post",
    summary: "Add a new product",
    parameters: [
      {
        in: "path",
        name: "sku",
        required: true,
      },
      {
        in: "path",
        name: "title",
      },
      {
        in: "path",
        name: "description",
      },
      {
        in: "path",
        name: "manufacture_details",
        description: "object",
      },
      {
        in: "path",
        name: "shipping_details",
        description: "object",
      },
      {
        in: "path",
        name: "product_details",
        description: "object",
      },
      {
        in: "path",
        name: "quantity",
        description: "number",
      },
      {
        in: "path",
        name: "categories",
        description: "array",
      },
      {
        in: "path",
        name: "pricing",
        description: "object",
      },
    ],
    responses: {
      201: {
        description: "Fetch Products",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                response: {
                  type: "string",
                  description: "response message for successful delete request",
                },
              },
            },
            example: {
              response: {
                message: "Product Successfully Added",
              },
            },
          },
        },
      },
      500: {
        description: "Error with the server",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                response: {
                  type: "string",
                  description: "Error message",
                },
              },
            },
            example: {
              response: "There was an internal error wit the server",
            },
          },
        },
      },
    },
  },
];

module.exports = swaggerDocs;
