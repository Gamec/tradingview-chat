Template.chat.helpers({
    messages: function() {
        return Messages.find({}, {sort: {time: -1, limit: 30}});
    },
    chartAttached: function() {
        return this.meta.type == 'snapshot';
    },
    formattedText: function() {
        return this.text.autoLink();
    },
    loggedIn: function() {
        return Boolean(Session.get('cookies'));
    }
});

Template.chat.events({
    'submit #login': function(e) {
        e.preventDefault();

        var username = $(e.target).find('[name=username]').val();
        var password = $(e.target).find('[name=password]').val();

        Meteor.call('authorize', username, password, function(error, result) {
            if (error) {
                throwError(error);
                return;
            }

            Session.set('cookies', result);
        });
    },
    'submit #send-message': function(e) {
        e.preventDefault();

        var message = $('#message').val();

        Meteor.call('sendMessage', message, Session.get('cookies'), function(error, result) {
            if (error) {
                throwError(error);
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