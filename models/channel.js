const mongoose = require('mongoose');

const channelSchema = mongoose.Schema({
    name: {type:String, required:[true,'Name is missing']},
    thumbnailImage: {type:String},
    subscriberCount: {type: Number}
});

module.exports = mongoose.model('channel',channelSchema);