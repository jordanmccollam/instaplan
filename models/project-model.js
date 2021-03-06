const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const defaultProjects = [
    'Todo',
    'In-Progress',
    'Done'
]

const Project = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        sections: [{ type: String, required: true, default: defaultProjects }],
        user: { type: Schema.Types.ObjectId, ref: "users" },
        items: [{ type: Schema.Types.ObjectId, ref: "items" }],
        collaborators: [{ type: Schema.Types.ObjectId, ref: "users" }],
    },
    { timestamps: true },
);

module.exports = mongoose.model('projects', Project);





