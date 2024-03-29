const mongoose =  require('mongoose')

const sauceShema = mongoose.Schema({
    userId: { type: String, require: true},
    name: { type: String, require: true},
    manufacturer: { type: String, require: true},
    description: { type: String, require: true},
    mainPepper: { type: String, require: true},
    imageUrl: { type: String, require: true},
    heat: { type: Number, require: true},
    likes: { type: Number, default: 0},
    dislikes: { type: Number, default: 0},
    usersLiked: { type: [String], default: []},
    usersDisliked: { type: [String], default: []},
})

module.exports = mongoose.model('Sauce', sauceShema)