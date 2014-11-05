var WebSocket = Meteor.npmRequire('ws');

var ws = new WebSocket('ws://tradingview.com/message-pipe-ws/public/');

ws.on('message', Meteor.bindEnvironment(function(data) {
    data = JSON.parse(data);

    if (data.text.content.data.room == 'qHo9VLefohcj3DnI') {
        var msg = data.text.content.data;
        msg.time = Date.parse(msg.time);

        Messages.insert(msg);
    }
}), function(error) {
    console.log(error);
});