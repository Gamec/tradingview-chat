Template.chat.helpers({
    messages: function() {
        return Messages.find({}, {sort: {time: -1}, limit: 100});
    },
    chartAttached: function() {
        return this.meta.type == 'snapshot';
    },
    formattedDate: function() {
        var dateObj = new Date(this.time);
        return dateObj.format('m-d H:i:s');
    },
    formattedText: function() {
        text = this.text;

        text = text.replace(/:sell:/g, '<span class="emoticon emoticon-sell"></span>');
        text = text.replace(/:buy:/g, '<span class="emoticon emoticon-buy"></span>');
        text = text.replace(/:agree:/g, '<span class="emoticon emoticon-agree"></span>');
        text = text.replace(/:disagree:/g, '<span class="emoticon emoticon-disagree"></span>');
        text = text.replace(/:loss:/g, '<span class="emoticon emoticon-loss"></span>');
        text = text.replace(/:profit:/g, '<span class="emoticon emoticon-profit"></span>');
        text = text.replace(/:\)/g, '<span class="emoticon emoticon-smile"></span>');
        text = text.replace(/:D/g, '<span class="emoticon emoticon-bigsmile"></span>');
        text = text.replace(/;\)/g, '<span class="emoticon emoticon-wink"></span>');
        text = text.replace(/:\(/g, '<span class="emoticon emoticon-sad"></span>');
        text = text.replace(/o_O/g, '<span class="emoticon emoticon-eyes"></span>');
        text = text.replace(/:\|/g, '<span class="emoticon emoticon-wtf"></span>');
        text = text.replace(/:uptrend:/g, '<span class="emoticon emoticon-uptrend"></span>');
        text = text.replace(/:downtrend:/g, '<span class="emoticon emoticon-downtrend"></span>');
        text = text.replace(/:dollar:/g, '<span class="emoticon emoticon-dollar"></span>');
        text = text.replace(/:yen:/g, '<span class="emoticon emoticon-yen"></span>');
        text = text.replace(/:euro:/g, '<span class="emoticon emoticon-euro"></span>');
        text = text.replace(/:pound:/g, '<span class="emoticon emoticon-pound"></span>');
        text = text.replace(/:bitcoin:/g, '<span class="emoticon emoticon-bitcoin"></span>');
        text = text.replace(/:bear:/g, '<span class="emoticon emoticon-bear"></span>');
        text = text.replace(/:bull:/g, '<span class="emoticon emoticon-bull"></span>');
        text = text.replace(/]:-\)/g, '<span class="emoticon emoticon-devil"></span>');

        text = text.autoLink();
        text = text.replace(/(?:^|\W)@(\w+)(?!\w)/g, '<a href="https://www.tradingview.com/u/\\$1/" target="_blank">@\$1</a>');

        return text;
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
            Session.set('username', username);
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
            $('#message').val($('#message').val() + ' @' + $(e.target).html() + ' ');
        }
        else {
            $('#message').val('@' + $(e.target).html() + ' ');
        }

        $('#message').focus();
    }
});