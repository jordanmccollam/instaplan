const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Item = new Schema(
    {
        name: { type: String, required: true },
        section: { type: String, required: true, default: 'Todo' },
        dueDate: { type: String, required: false },
        done: { type: Boolean, required: true },
        tags: [{ type: Object, required: true }], // {name: 'tagName', color: 'primary'}
        assignee: { type: Schema.Types.ObjectId, ref: "users" },
        user: { type: Schema.Types.ObjectId, ref: "users" },
        project: { type: Schema.Types.ObjectId, ref: "projects" },
    },
    { timestamps: true },
);

module.exports = mongoose.model('items', Item);





