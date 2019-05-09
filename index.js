require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const PORT = process.env.PORT;
const userRouter = require("./routes/users");

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/users", userRouter);

app.listen(PORT, () => {
  console.log(`listen port ${PORT}`);
});
