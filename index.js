const express = require("express");

const app = express();

app.use("/", (req, res) => {
  res.json("123");
});

app.listen(5000, () => {
  console.log("SERVER RUNNING AT PORT " + 5000);
  try {
      
  } catch (e) {
    console.log(e);
  }
});
