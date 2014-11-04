Meteor.publish('messages', function() {
    return Messages.find({}, {sort: {time: -1}, limit: 100});
});