const Item = require('../models/item-model');
const Project = require('../models/project-model');
const User = require('../models/user-model');

createItem = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an Item'
        })
    }

    const item = new Item({...body});

    if (!item) {
        return res.status(400).json({ success: false, error: err })
    }

    item.save().then(() => {
        User.findOne({ _id: body.user }, (err, user) => {
            if (err) {
                return res.status(404).json({
                    err,
                    message: 'User not found!',
                })
            }

            user.items.push(item._id)

            user
                .save()
                .then(() => {
                    return res.status(200).json({
                        success: true,
                        output: user,
                        message: 'User updated!',
                    })
                })
                .catch(error => {
                    return res.status(404).json({
                        error,
                        message: 'User not updated!',
                    })
                })
        })
        Project.findOne({ _id: body.project }, (err, project) => {
            if (err) {
                return res.status(404).json({
                    err,
                    message: 'item not found!',
                })
            }

            project.items.push(item._id)

            project
                .save()
                .then(() => {
                    return res.status(200).json({
                        success: true,
                        output: project,
                        message: 'item updated!',
                    })
                })
                .catch(error => {
                    return res.status(404).json({
                        error,
                        message: 'item not updated!',
                    })
                })
        })
        
        return res.status(201).json({
            success: true,
            output: item,
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

    Item.findOne({_id: req.params.id}).populate('assignee').exec((err, item ) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Item not found!',
            })
        }

        item.name = body.name ? body.name : item.name;
        item.section = body.section ? body.section : item.section;
        item.dueDate = body.dueDate ? body.dueDate : item.dueDate;
        item.tags = body.tags ? body.tags : item.tags;
        item.done = body.done ? body.done : item.done;
        item.assignee = body.assignee ? body.assignee : item.assignee;

        item
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    output: item,
                    assignee: body.assignee,
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

deleteItem = async (req, res) => {
    await Item.findOneAndDelete({ _id: req.params.id }, (err, entry) => {
        if (!err) {
            return res.status(200).json({ success: true, output: req.params.id });
        } else {
            return res.status(400).json({ success: false, error: err });
        }
    }).catch(err => console.log(err))
}

module.exports = {
    createItem,
    updateItem,
    deleteItem
}





