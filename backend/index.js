require("dotenv").config();

console.log(process.env.BLA);

const express = require("express");
const app = express();

app.get("/", (req, res) => {});

const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
