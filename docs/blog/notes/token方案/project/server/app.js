const path = require("path");
const express = require("express");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/login", (req, res) => {
  res.cookie("token", "123456", {
    // expires: new Date("2024-05-29 23:01"),
    maxAge: 1000 * 10,
  });
  res.send("login success");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
