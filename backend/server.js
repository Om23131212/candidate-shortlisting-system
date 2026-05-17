const express = require("express");

const mongoose = require("mongoose");

const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log(
      "MongoDB Connected"
    );
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  "/api/auth",
  require("./routes/authRoutes")
);

app.use(
  "/api/candidates",
  require("./routes/candidateRoutes")
);

app.use(
  "/api/ai",
  require("./routes/aiRoutes")
);

app.listen(5000, () => {
  console.log(
    "Server running on 5000"
  );
});