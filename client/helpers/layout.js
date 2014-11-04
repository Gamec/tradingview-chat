Template.layout.helpers({
    loggedIn: function() {
        return Boolean(Session.get('cookies'));
    }
});