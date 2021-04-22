const User = require('../models/user-model');

getUser = async (req, res) => {
    await User.findOne({ email: req.params.email }).populate([
        {
            path: 'projects',
            populate: [
                {path: 'items', model: 'items', populate: [{path: 'assignee', model: 'users'}]},
                {path: 'collaborators', model: 'users'},
                {path: 'user', model: 'users'}
            ]
        },
        {
            path: 'shared',
            populate: [
                {path: 'items', model: 'items', populate: {path: 'assignee', model: 'users'}},
                {path: 'collaborators', model: 'users'},
                {path: 'user', model: 'users'}
            ]
        },
        {
            path: 'items',
            populate: [{path: 'assignee', model: 'users'}]
        }
    ]).populate('items').exec((err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        } else {
            return res.status(200).json({ success: true, output: user });
        }
    })
}

createUser = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an user'
        })
    }

    const user = new User({...body, theme: 'theme--light'});

    if (!user) {
        return res.status(400).json({ success: false, error: err })
    }

    user.save().then(() => {
        return res.status(201).json({
            success: true,
            output: user,
            message: 'User created!',
        })
    }).catch(error => {
        return res.status(400).json({
            error,
            message: 'User not created!',
        })
    })
}

updateUser = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    User.findOne({email: req.params.email}).populate('shared').exec((err, user ) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'User not found!',
            })
        }

        var updatedShared = [...user.shared];

        if (body.shared) {
            if (body.shared.action === 'add') {
                updatedShared = [...updatedShared.filter(s => s._id === body.shared.project._id), body.shared.project];
                console.log('updatedShared (add):', updatedShared);
            }
            else if (body.shared.action === 'remove') {
                updatedShared = updatedShared.filter(s => s._id === body.shared.project._id);
                console.log('updatedShared (remove):', updatedShared);
            }
        }

        user.shared = body.shared ? updatedShared : user.shared;

        user
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    output: user,
                    shared: updatedShared,
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
}

module.exports = {
    getUser,
    createUser,
    updateUser
}