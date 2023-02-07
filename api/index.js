const port = 8000;
const cors = require("cors");
const express = require("express");
const app = express();

const menuRouter = require("./routes/menu.route.js");
// const cateRouter = require("./routes/category.route.js");

const fs = require("fs");

app.use(cors());
app.use(express.json());

app.use("/api", menuRouter);

app.get("/api", (req, res) => {
    res.json({ message: "Welcome Rest API" });
});

app.listen(port, () => console.log(`server is runnig ${port}`));