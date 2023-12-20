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
//falback route
app.get("/*", (req, res) => {
  res.status(400).sendFile(path.join(__dirname, "./404.html"));
});
app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
