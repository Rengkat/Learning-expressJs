const path = require("node:path");
const express = require("express");
const PORT = process.env.PORT || 3000;
const app = express();
// ^/$|/index(.html)? regex for when starts with / or index with or without .html extension
app.get("^/$|/index(.html)?", (req, res) => {
  //   res.sendFile("./index.html", { root: __dirname });
  res.sendFile(path.join(__dirname, "index.html"));
});
//regex (.html)? means with or without the extension .html
app.get("/new-index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "new-index.html"));
});
app.get("/old-html(.html)?", (req, res) => {
  res.redirect(301, "./new-index.html");
});

//route handler
app.get(
  "/new-site(.html)?",
  (req, res, next) => {
    console.log("Attempt to load New-index.html");
    next();
  },
  (req, res) => {
    res.send("Hello world");
  }
);
//using chaining
const one = (req, res, next) => {
  console.log("One");
  next();
};
const two = (req, res, next) => {
  console.log("two");
  next();
};
const three = (req, res, next) => {
  console.log("three");
  res.send("Finish");
};
app.get("/chaining(.html)?", [one, two, three]);
//fallback route
app.get("/*", (req, res) => {
  res.status(400).sendFile(path.join(__dirname, "./404.html"));
});
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
