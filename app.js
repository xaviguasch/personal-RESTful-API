const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');


const app = express();


app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static("public"));


mongoose.connect('mongodb://localhost:27017/wikiDB', {
    useNewUrlParser: true
})

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
})

const Article = mongoose.model('Article', articleSchema)


app.route('/articles')

    .get(function (req, res) {
        Article.find(function (err, foundArticles) {
            if (!err) {
                res.send(foundArticles)
            } else {
                res.send(err)
            }
        })
    })

    .post(function (req, res) {
        const newArticle = new Article({
            title: req.body.title,
            content: req.body.content
        })

        newArticle.save(function (err) {
            if (!err) {
                res.send('Successfully added a new article')
            } else {
                res.send(err)
            }
        })
    })

    .delete(function (req, res) {
        Article.deleteMany(function (err) {
            if (!err) {
                res.send('Successfully deleted all articles')
            } else {
                res.send(err)
            }
        })
    })






app.listen(3000, function () {
    console.log("Server has started successfully");
});


// SAVED ARTICLES

// {
//     "_id": "5c78fdf5fec9ac1db30f54e2",
//     "title": "REST",
//     "content": "REST is short for REpresentational State Transfer. It's architectural style for designing APIs."
// },
// {
//     "_id": "5c139771d79ac8eac11e754a",
//     "title": "API",
//     "content": "API stands for Application Programming Interface. It is a set of subroutine definitions, communication protocols, and tools for building software. In general terms, it is a set of clearly defined methods of communication among various components. A good API makes it easier to develop a computer program by providing all the building blocks, which are then put together by the programmer."
// },
// {
//     "_id": "5c1398aad79ac8eac11e7561",
//     "title": "Bootstrap",
//     "content": "This is a framework developed by Twitter that contains pre-made front-end templates for web design"
// },
// {
//     "_id": "5c1398ecd79ac8eac11e7567",
//     "title": "DOM",
//     "content": "The Document Object Model is like an API for interacting with our HTML"
// },
// {
//     "_id": "5c7d0ce645234762a96419ef",
//     "title": "Jack Bauer",
//     "content": "Jack Bauer once stepped into quicksand.",
//     "__v": 0
// },
// {
//     "_id": "5c7d0e076ce6d06582eb1e35",
//     "title": "Michael Mayers",
//     "content": "The new movie is quite good",
//     "__v": 0
// }