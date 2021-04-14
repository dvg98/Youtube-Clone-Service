const mongoose = require('mongoose');
const channel = require('./channel');
const videoSchema = mongoose.Schema({
    name: {type:String, required:[true,'Name is missing']},
    thumbnailImage: {type:String},
    viewsCount: {type: Number},
    channel: {type: mongoose.SchemaTypes.ObjectId, ref:'channel' },
    tags: {type:String}
});

module.exports = mongoose.model('video',videoSchema);