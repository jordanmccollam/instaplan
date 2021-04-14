const Project = require('../models/project-model');

createProject = (req, res) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an Project'
        })
    }

    const Project = new Project({...body});

    if (!Project) {
        return res.status(400).json({ success: false, error: err })
    }

    Project.save().then(() => {
        return res.status(201).json({
            success: true,
            output: Project,
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

    Project.findOne({ _id: req.params.id }, (err, Project) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Project not found!',
            })
        }

        Project.name = body.name ? body.name : Project.name;
        Project.section = body.section ? body.section : Project.section;
        Project.dueDate = body.dueDate ? body.dueDate : Project.dueDate;
        
        Project
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    output: Project,
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

module.exports = {
    createProject,
    updateProject
}





