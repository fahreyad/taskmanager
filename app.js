const connectDB = require("./db/connection");
require("dotenv").config();
const express = require("express");
const tasks = require("./routes/task");
const notFound = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/errorHandler");
const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);
const PORT = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server listening at port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
