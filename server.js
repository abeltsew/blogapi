const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')


const Post = require('./models/post')

mongoose.connect('mongodb://root:Pa$$w0rd@ds133086.mlab.com:33086/blog-postman', { useNewUrlParser: true })

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log("connected to db")
});

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))

// get all List of Posts

app.get('/posts', (req, res) => {
    const posts = Post.find({}, (err, posts) => {
        res.send(posts)
    })

})
// get a single list by ID

app.get('/post/:id', (req, res) => {
    const post = Post.find({ _id: req.params.id }, (err, post) => {
        res.send(post)
    })

})

// delete post by id

app.delete('/post/:id', (req, res) => {
    const post = Post.deleteOne({ _id: req.params.id }, (err, post) => {
        res.send(post)
    })

})

// add a post

app.post('/post', (req, res) => {
    const post = new Post(req.body)

    post.save()

    res.send(req.body)
})

// update a post

app.patch('/post/:id', (req, res) => {
    const post = Post.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, post) => {
        res.send(post)
    })
})

const PORT = process.env.PORT || 7000
app.listen(PORT, () => console.log(`App is runing on port ${PORT}`))
