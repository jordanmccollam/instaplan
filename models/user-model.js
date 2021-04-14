const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema(
    {
        email: { type: String, required: true, unique: true },
        theme: { type: String, required: true },
        projects: [{ type: Schema.Types.ObjectId, ref: "projects" }],
        items: [{ type: Schema.Types.ObjectId, ref: 'items' }]
    },
    { timestamps: true },
);

module.exports = mongoose.model('users', User);