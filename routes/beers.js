const beersRouter = require('express').Router();
const Beer = require('../models/beer')

beersRouter.get('/', (req, res) => {
    Beer.findMany(req.query.type, req.query.ph).then((results) => {
        res.json(results)
    }).catch((err) => {
        console.log(err);
        res.status(500).send('Error retrieving beers from database');
    })
})

beersRouter.get('/:id', (req, res) => {
    Beer.findOne(req.params.id).then((beer) => {
        if (beer.length) res.json(beer);
        else res.status(404).send('Beer not found');
    }).catch((err) => {
        console.log(err);
        res.status(500).send('Error retrieving beer from database');
    })
})

module.exports = beersRouter;