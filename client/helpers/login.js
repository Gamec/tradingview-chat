Template.login.events({
    'submit form': function(e) {
        e.preventDefault();

        var username = $(e.target).find('[name=username]').val();
        var password = $(e.target).find('[name=password]').val();

        Meteor.call('authorize', username, password, function(error, result) {
            if (error) {
                // throw
                return;
            }

            Session.set('cookies', result);
        });
    }
});