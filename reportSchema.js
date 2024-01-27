const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    text: { type: String, default: 'null' },
    selection: { type: String, default: 'null' },
    isChecked: { type: Boolean, default: false },
    additionalText: { type: String, default: 'null' },
});
module.exports = UserSchema;