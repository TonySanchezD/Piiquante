const express = require('express')
const mongoose = require('mongoose');
const path = require('path')

const userRouter = require('./routes/user')
const sauceRouter = require('./routes/sauce')

const app = express()

mongoose.connect('mongodb+srv://TonySan:Luna57vf@cluster0.qzgzh1u.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})

app.use('/api/auth', userRouter)
app.use('/api/sauces', sauceRouter)
app.use('/images', express.static(path.join(__dirname, 'images')))


module.exports = app;