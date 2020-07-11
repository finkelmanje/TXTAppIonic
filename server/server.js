// // Set up
// var express = require('express');
// var app = express();
// var MongoClient = require('mongodb').MongoClient;
// var morgan = require('morgan');             // log requests to the console (express4)
// var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
// var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
// var cors = require('cors');
// const mongoose = require('mongoose');
// let db;

// MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
//     if (err) throw err;
//     console.log("connected to DB");
//     db = client.db('Blogs');
//     console.log(db);
// })
// app.use(morgan('dev'));                                         // log every request to the console
// app.use(bodyParser.urlencoded({ 'extended': 'true' }));            // parse application/x-www-form-urlencoded
// app.use(bodyParser.json());                                     // parse application/json
// app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
// app.use(methodOverride());
// app.use(cors());

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

// // Models
// var Blog = mongoose.model('Blog', {
//     title: String,
//     content: String,
//     date: { type: Date, default: Date.now },
//     // location: {
//     //     type: {
//     //         type: String, // Don't do `{ location: { type: String } }`
//     //         enum: ['Point'], // 'location.type' must be 'Point'
//     //         required: true
//     //     },
//     //     coordinates: {
//     //         type: [Number],
//     //         required: true
//     //     }
//     // }
//     address: String

// });

// // Routes

// // GET: retrieve all todos
// app.get("/api/blogs", function (req, res) {
//     db.collection("listOfBlogs").find({}).toArray(function (err, docs) {
//         if (err) {
//             handleError(res, err.message, "Failed to get blogs");
//         } else {
//             res.status(200).json(docs);
//         }
//     });
// });

// // POST: create a new todo
// app.post("/api/blogs", function (req, res) {
//     var newBlog = {
//         title: req.body.title,
//         content: req.body.content,
//         date: req.body.date,
//         address: req.body.address
//     }

//     db.collection("listOfBlogs").insertOne(newBlog, function (err, doc) {
//         if (err) {
//             handleError(res, err.message, "Failed to add blog");
//         } else {
//             res.status(201).json(doc.ops[0]);
//         }
//     });
// });

// /*
// * Endpoint "/api/todos/:id"
// */

// // GET: retrieve a todo by id -- Note, not used on front-end
// app.get("/api/blogs/:id", function (req, res) {
//     db.collection("listOfBlogs").findOne({ _id: new ObjectID(req.params.id) }, function (err, doc) {
//         if (err) {
//             handleError(res, err.message, "Failed to get blog by _id");
//         } else {
//             res.status(200).json(doc);
//         }
//     });
// });

// // PUT: update a todo by id
// app.put("/api/blogs/:id", function (req, res) {
//     var updateBlog = req.body;
//     delete updateBlog._id;

//     db.collection("listOfBlogs").updateOne({ _id: new ObjectID(req.params.id) }, updateBlog, function (err, doc) {
//         if (err) {
//             handleError(res, err.message, "Failed to update blog");
//         } else {
//             res.status(204).end();
//         }
//     });
// });

// // DELETE: delete a todo by id
// app.delete("/api/blogs/:id", function (req, res) {
//     db.collection("listOfBlogs").deleteOne({ _id: new ObjectID(req.params.id) }, function (err, result) {
//         if (err) {
//             handleError(res, err.message, "Failed to delete blog");
//         } else {
//             res.status(204).end();
//         }
//     });
// });

// // Error handler for the api
// function handleError(res, reason, message, code) {
//     console.log("API Error: " + reason);
//     res.status(code || 500).json({ "Error": message });
// }


// // listen (start app with node server.js) ======================================
// app.listen(8080);
// console.log("App listening on port 8080");

var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var cors = require('cors');

// Configuration
mongoose.connect('mongodb://localhost/Blogs');

app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());
app.use(cors());

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

// Models
var Blog = mongoose.model('Blog', {
        title: String,
        content: String,
        date: { type: Date, default: Date.now },
        address: String
    
    }, 'blog');

// Routes

    // Get blogs
    app.get('/api/blogs', function(req, res) {

        console.log("fetching blogs");

        // use mongoose to get all blogs in the database
        Blog.find(function(err, blogs) {

            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)

            res.json(blogs); // return all blogs in JSON format
        });
    });

    // create blog and send back all blogs after creation
    app.post('/api/blogs', function(req, res) {

        console.log("creating blogs");

        // create a blog, information comes from request from Ionic
        Blog.create({
            title : req.body.title,
            content : req.body.content,
            address: req.body.address,
            done : false
        }, function(err, blog) {
            if (err)
                res.send(err);

            // get and return all the blogs after you create another
            Blog.find(function(err, blogs) {
                if (err)
                    res.send(err)
                res.json(blogs);
            });
        });

    });

    // delete a blog
    app.delete('/api/blogs/:blog_id', function(req, res) {
        Blog.remove({
            _id : req.params.blog_id
        }, function(err, blog) {

        });
    });


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log("App listening on port 8080");