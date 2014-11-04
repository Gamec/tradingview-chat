var WebSocket = Npm.require('ws');

var ws = new WebSocket('ws://tradingview.com/message-pipe-ws/public/');

ws.on('message', Meteor.bindEnvironment(function(data) {
    data = JSON.parse(data);

    if (data.text.content.data.room == 'bitcoin') {
        var msg = data.text.content.data;

        Messages.insert(msg);
    }
}), function(error) {
    console.log(error);
});