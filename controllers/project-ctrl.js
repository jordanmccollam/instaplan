const Project = require('../models/project-model');
const User = require('../models/user-model');
const Item = require('../models/item-model');

createProject = async (req, res) => {
    try {
        
        const body = req.body;
        if (!body) {
            return res.status(400).json({
                success: false,
                error: 'You must provide an Project'
            })
        }

        // Create and save project
        const project = new Project({ ...body });
        await project.save();

        // Find and update user
        const user = await User.findById(body.user);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found!',
            });
        }
        user.projects.push(project._id);
        await user.save();

        // ✅ Only send ONE response here (prev code was setup to send 2 and errored)
        return res.status(201).json({
            success: true,
            output: { project, user },
            message: 'Project created and User updated!',
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            error,
            message: 'Project not created!',
        });
    }
}

updateProject = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }
    
    Project.findOne({_id: req.params.id}).populate('collaborators').exec((err, project ) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Project not found!',
            })
        }

        var updatedCollaborators = [...project.collaborators];

        if (body.collaborator) {
            if (body.collaborator.action === 'add') {
                updatedCollaborators = [...updatedCollaborators.filter(c => c._id === body.collaborator.user._id), body.collaborator.user];
                console.log('updatedCollaborators (add):', updatedCollaborators);
            }
            else if (body.collaborator.action === 'remove') {
                updatedCollaborators = updatedCollaborators.filter(c => c._id === body.collaborator.user._id);
                console.log('updatedCollaborators (remove):', updatedCollaborators);
            }
        }

        project.name = body.name ? body.name : project.name;
        project.sections = body.sections ? body.sections : project.sections;
        project.description = body.description ? body.description : project.description;
        project.user = body.user ? body.user : project.user;
        project.collaborators = body.collaborator ? updatedCollaborators : project.collaborators;
        
        project
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    output: project,
                    collaborators: updatedCollaborators,
                    message: 'Project updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Project not updated!',
                })
            })
    })
}

deleteProject = async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({ _id: req.params.id });
        
        if (!project) {
            console.log("PROJECT NOT FOUND?")
            return res.status(404).json({
                success: false,
                message: 'Project not found',
            });
        }

        // Delete all tasks/items linked to this project
        // Store item Id's so we can remove their refrences from user
        const itemsToDelete = await Item.find({ project: project._id });
        const itemIds = itemsToDelete.map(item => item._id);
        await Item.deleteMany({ project: project._id });

        // Remove the project reference from the user
        await User.updateMany(
            { projects: project._id },
            { $pull: { projects: project._id } }
        );
        // Remove all item references from the user
        await User.updateMany(
            { items: { $in: itemIds } },
            { $pull: { items: { $in: itemIds } } }
        );

        return res.status(200).json({ 
            success: true, 
            output: req.params.id,
            message: 'Project deleted, tasks deleted, user references removed',
        });
    } catch (err) {
        return res.status(400).json({ success: false, error: err });
    }
}

module.exports = {
    createProject,
    updateProject,
    deleteProject
}





