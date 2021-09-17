const express = require("express");

const app = express();

const port = 3008;
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.get("/", (req, res) => res.render("home"));

app.listen(port,()=>{
    console.log("listen on"+port);
});
