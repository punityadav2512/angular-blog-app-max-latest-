const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cors = require("cors");

const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const app = express();
require("dotenv").config();

mongoose
  .connect(
    "mongodb+srv://Punityadav2512:" +
      process.env.DbPW +
      "@cluster0.rvw26.mongodb.net/node-angular?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch((err) => {
    console.log("connection failed");
  });

app.use(cors({ origin: "https://effervescent-taffy-ab563e.netlify.app/" }));
app.use(express.json());
const _app_folder = "public";

app.use("/images", express.static(path.join(__dirname, "/images")));
app.use("/", express.static(path.join(__dirname, "/public")));

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

// ---- SERVE STATIC FILES ---- //
// app.get('*.*', express.static(_app_folder, {maxAge: '1y'}));

// // ---- SERVE APLICATION PATHS ---- //
// app.all('*', function (req, res) {
//     res.status(200).sendFile(`/`, {root: _app_folder});
// });

app.use((req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});

const port = process.env.PORT || 3000;

// listen to app
app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});
// module.exports = app;
