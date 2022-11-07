const auth = require('../middleware/auth')
const Sauce = require('../models/sauce')
const User = require('../models/user')

exports.getAllSauce = (req, res, next) => {
    console.log('getAllSauce')

    Sauce.find()
        .then(sauces => res.status(200).json( sauces ))
        .catch(error => res.status(400).json( error ))
}

exports.getSauceById = (req, res, next) => {
    console.log('getSauceById')

    Sauce.findById(req.params.id)
        .then(sauce => res.status(200).json( sauce ))
        .catch(error => res.status(400).json( error ))
}

exports.createSauce = (req, res, next) => {
    console.log('createSauce')

    const sauceObject = JSON.parse(req.body.sauce)

    const sauce = new Sauce({ 
        ...sauceObject, 
        ...req.auth,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    })

    console.log("sauce", sauce)

    sauce.save()
        .then(() => res.status(201).json({message: "Nouvelle sauce créé !", sauce}))
        .catch(error => res.status(400).json({ message: "La sauce na pas pue être créé !", error}))
}

exports.editSauce = (req, res, next) => {
    console.log("editSauce")

    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body}

    console.log(sauceObject)

    delete sauceObject._userId

    Sauce.findById(req.params.id)
        .then((sauce) => {
            if (sauce.userId != req.auth.userId) {
                res.status(400).json({ message : "Non-autorisé"})
            } else {
                Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
                    .then(() => res.status(200).json({ message: "Mise à jour réussie"}))
                    .catch(error => res.status(400).json({error}))
            }
        })
        .catch(error => res.status(400).json({error}))    
}

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({ message: "Sauce supprimé !"}))
        .catch(error => res.status(400).json({ message: "La sauce na pas pue être supprimé !", error}))
}

exports.addLikeDislike = (req, res, next) => {
    console.log(req.body.like)

    Sauce.findById(req.params.id)
        .then((sauce) => {

            if (req.body.like == 1) { // Like
                console.log("addLike")

                Sauce.updateOne({_id: req.params.id}, {$push: {usersLiked: req.auth.userId}, likes: sauce.usersLiked.length +1})
                    .then(() => res.status(200).json({message: "Mise à jour des likes"}))
                    console.log(sauce)
                    .catch(error => console.log("addLike error", error))
                    
            } else if (req.body.like == -1) { // Dislike
                console.log("addDislike")

                Sauce.updateOne({_id: req.params.id}, {$push: {usersDisliked: req.auth.userId}, dislikes: sauce.usersDisliked.length +1})
                    .then(() => res.status(200).json({message: "Mise à jour des dislikes"}))  
                    console.log(sauce)
                    .catch(error => console.log("addDislike error", error))
                
            } else if (req.body.like == 0) { // No like no dislike
                console.log("noLikeNoDislike")

                if(sauce.usersLiked.includes(req.auth.userId)){ 
                    console.log("Si l'utilisateur avait like") // Si l'utilisateur avait like
                    console.log(sauce.usersLiked.find((user) => user = req.auth.userId))

                    Sauce.updateOne({_id: req.params.id}, {$pull: {usersLiked: req.auth.userId}, likes: sauce.usersLiked.length -1})
                        .then(() => res.status(200).json({message: "Mise à jour des like dislike"}))
                        console.log(sauce)
                        .catch(error => console.log("noLike error", error))

                } else {
                    console.log("Si l'utilisateur avait dislike") // Si l'utilisateur avait dislike

                    Sauce.updateOne({_id: req.params.id}, {$pull: {usersDisliked: req.auth.userId}, dislikes: sauce.usersDisliked.length -1})
                        .then(() => res.status(200).json({message: "Mise à jour des like dislike"}))
                        console.log(sauce)
                        .catch(error => console.log("noDislike error", error))
                }
            } 
        })
        .catch(error => console.log("noLikeNoDislike error", error))
}