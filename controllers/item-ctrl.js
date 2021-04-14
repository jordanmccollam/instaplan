const Item = require('../models/item-model');

createItem = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an Item'
        })
    }

    const Item = new Item({...body, theme: 'theme--light'});

    if (!Item) {
        return res.status(400).json({ success: false, error: err })
    }

    Item.save().then(() => {
        return res.status(201).json({
            success: true,
            output: Item,
            message: 'Item created!',
        })
    }).catch(error => {
        return res.status(400).json({
            error,
            message: 'Item not created!',
        })
    })
}

updateItem = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Item.findOne({ _id: req.params.id }, (err, Item) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Item not found!',
            })
        }

        Project.name = body.name ? body.name : Project.name;
        Project.description = body.description ? body.description : Project.description;
        Project.items = body.items ? body.items : Project.items;

        Item
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    output: Item,
                    message: 'Item updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Item not updated!',
                })
            })
    })
}

module.exports = {
    createItem,
    updateItem
}





