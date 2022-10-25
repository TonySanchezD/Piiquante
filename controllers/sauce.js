const sauce = require('../models/sauce')
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

    /*Sauce.updateOne({_id: req.params.id}, {sauceObject, _id: req.params.id})
        .then(() => res.status(200).json({message: "La sauce a été modifié !"}))
        .catch(error => res.status(400).json({ message: "La sauce na pas pue être modifié !", error}))  */     
}

exports.deleteSauce = (req, res, next) => {
    Sauce.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({ message: "Sauce supprimé !"}))
        .catch(error => res.status(400).json({ message: "La sauce na pas pue être supprimé !", error}))
}

/*exports.addLikeDislike = (req, res, next) => {
    console.log("addLikeDislike")
    console.log(req.body)

    let likes = Number(Sauce.findById(req.params.id).likes)
    let dislikes = Number(Sauce.findById(req.params.id).dislikes)

    like = array.length !!!!!!

    if (req.body.like = 1) {
        likes++
        Sauce.updateOne({_id: req.params.id}, {likes: })
            .then(() => res.status(200).json({message: "Like"}))
            .catch(error => res.status(400).json({ message: "Error like", error})) 
    } else if (req.body.like = -1) {
        dislikes++
        Sauce.updateOne({_id: req.params.id}, {likes: dislikes})
            .then(() => res.status(200).json({message: "Dislike"}))
            .catch(error => res.status(400).json({ message: "Error Dislike", error})) 
    } else
    

}*/