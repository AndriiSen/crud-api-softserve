const express = require("express");
const cors = require("cors");
const app = express();
const users = require("./routes/users");

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "REST API",
      version: "1.0.0",
      description: "A simle rest API",
    },
    servers: [
      {
        url: "http://localhost:80",
      },
      {
        url: `http://${process.env.API_URL}`,
      },
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json());
app.use(cors());

app.use("/user", users);

const port = process.env.port || 3000;
app.listen(port, () => {
  console.log("Server running");
});
