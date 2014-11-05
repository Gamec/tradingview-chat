Meteor.subscribe('messages');

Meteor.startup(function() {
    if (Session.get('username')) {
        var snd = new Audio('sounds/slap.wav');
        messagesCursor = Messages.find();

        messagesCursor.observe({
            added: function(message, beforeIndex) {
                console.log('t'+message.time);
                console.log('l'+Session.get('last_sound'));

                if ((message.time > Session.get('last_sound') || ! Session.get('last_sound')) && message.text.indexOf('@' + Session.get('username')) > -1) {
                    snd.play();
                    Session.set('last_sound', message.time);
                }
            }
        });
    }
});
