// Have the server render views/index.ejs that has the form for the user to fill out
// The user fills out the form and submits
// The submitted form gets sent to /result
// The server recognizes when someone posts things to /result, grabs information from the POST, and sends the POST data back as it renders views/results.ejs

var express = require("express")
var bodyparser = require("body-parser")
var app = express();
var session = require('express-session');

//settings never touch
app.use(session({
    secret: 'admin',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 },

}))
app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");


//routes
app.get('/', (req, res) => {
    res.render("index")
})

app.post('/result', (req, res) => {
    req.session.results = req.body;
    console.log(req.body);
    res.redirect('/resultPage')
})

app.get('/resultPage', (req, res) => {
    res.render('resultPage', req.session.results);

})
// request.session = {
// results : req.body
//   }


app.listen(8000, function () {
    console.log("Listening on port: 8000");
})