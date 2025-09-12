const Item = require('../models/item-model');
const Project = require('../models/project-model');
const User = require('../models/user-model');

createItem = async (req, res) => {
    try {

        const body = req.body;
        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide an Item'
            })
        }

        // Create and save item
        const item = new Item({ ...body });
        await item.save();

        // Find and update user
        const user = await User.findById(body.user);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!',
            });
        }
        user.items.push(item._id);
        await user.save();

        // Find and update project
        const project = await Project.findById(body.project);
        if (!project) {
            return res.status(404).json({
                success: false,
                message: 'Project not found!',
            });
        }
        project.items.push(item._id);
        await project.save();

        // ✅ Only send ONE response here (prev code was setup to send 2 and errored)
        return res.status(201).json({
            success: true,
            output: { item, project, user },
            message: 'Item created! Project and User updated!',
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            error,
            message: 'Item not created!',
        });
    }
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
    try {
        const item = await Item.findOneAndDelete({ _id: req.params.id });
        
        if (!item) {
            return res.status(404).json({
                success: false,
                message: 'Item not found',
            });
        }

        // Remove the item reference from the PROJECT
        await Project.updateMany(
            { items: item._id },
            { $pull: { items: item._id } }
        );

        // Remove the item reference from the USER
        await User.updateMany(
            { items: item._id },
            { $pull: { items: item._id } }
        );

        return res.status(200).json({ 
            success: true, 
            output: req.params.id,
            message: 'Item deleted and references removed from users+projects',
        });
    } catch (err) {
        return res.status(400).json({ success: false, error: err });
    }
}

module.exports = {
    createItem,
    updateItem,
    deleteItem
}





