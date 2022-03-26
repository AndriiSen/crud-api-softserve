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
    ],
  },
  apis: ["./routes/*.js"],
};
const specs = swaggerJsDoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(express.json());
app.use(cors());

app.use("/user", users);

app.listen(process.env.PORT || 80, () => {
  console.log("Server running");
});
