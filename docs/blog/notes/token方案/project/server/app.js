const path = require("path");
const express = require("express");

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get("/login", (req, res) => {
  res.cookie("token", "123456", {
    // expires: new Date("2024-05-29 23:01"),
    maxAge: 1000 * 60 * 60 * 24,
    sameSite: "Lax",
  });
  res.send("login success");
});

app.get("/operation", (req, res) => {
  const token = req.headers.cookie.split("=")[1];
  console.log("🚀 ~ app.get ~ token:", token);
  if (token === "123456") {
    res.send("operation success");
  } else {
    res.send("operation fail");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
