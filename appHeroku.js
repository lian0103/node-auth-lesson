const express = require("express");

const app = express();

const port = process.env.PORT || 3006;
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.json());
app.get("/", (req, res) => res.render("home"));

app.listen(port,()=>{
    console.log("listen on"+port);
});
