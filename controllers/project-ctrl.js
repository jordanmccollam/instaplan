const Project = require('../models/project-model');
const User = require('../models/user-model');

createProject = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an Project'
        })
    }

    const project = new Project({...body});

    if (!project) {
        return res.status(400).json({ success: false, error: err })
    }

    project.save().then(() => {
        User.findOne({ _id: body.user }, (err, User) => {
            if (err) {
                return res.status(404).json({
                    err,
                    message: 'User not found!',
                })
            }

            User.projects.push(project._id)

            User
                .save()
                .then(() => {
                    return res.status(200).json({
                        success: true,
                        output: User,
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

        return res.status(201).json({
            success: true,
            output: project,
            message: 'Project created!',
        })
    }).catch(error => {
        return res.status(400).json({
            error,
            message: 'Project not created!',
        })
    })
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
    await Project.findOneAndDelete({ _id: req.params.id }, (err, entry) => {
        if (!err) {
            return res.status(200).json({ success: true, output: req.params.id });
        } else {
            return res.status(400).json({ success: false, error: err });
        }
    }).catch(err => console.log(err))
}

module.exports = {
    createProject,
    updateProject,
    deleteProject
}





