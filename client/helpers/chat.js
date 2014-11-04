Template.chat.helpers({
    messages: function() {
        return Messages.find({}, {sort: {time: -1}});
    },
    chartAttached: function() {
        return this.meta.type == 'snapshot';
    }
});

Template.chat.events({
    'submit form': function(e) {
        e.preventDefault();

        var message = $('#message').val();

        Meteor.call('sendMessage', message, Session.get('cookies'), function(error, result) {
            if (error) {
                // throw
                return;
            }

            $('#message').val('');
        });
    },
    'click .username': function(e) {
        if ($('#message').val() != '') {
            $('#message').val($('#message').val() + ' @' + $(e.target).html());
        }
        else {
            $('#message').val('@' + $(e.target).html());
        }
    }
});