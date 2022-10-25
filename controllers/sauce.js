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

    Sauce.find(req.body)
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