const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const app = express();

mongoose.connect("mongodb://localhost/shortener", {
    useNewUrlParser: true, useUnifiedTopology: true
}).catch( error => {
    console.log(error)
})

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
    const shorturls = await ShortUrl.find();
    // console.log(shorturls)
    res.render("index", shorturls);
});

app.post("/shorten", async (req, res) => {
    await ShortUrl.create({ full: req.body.fullUrl });
    console.log(ShortUrl.create({ full: req.body.full }))
    res.redirect("/");
});

app.listen(process.env.PORT || 5000)
