Meteor.methods({
    authorize: function(username, password) {
        this.unblock();
        var response = HTTP.call('POST', 'https://www.tradingview.com/accounts/signin/', {params: {username: username, password: password}});

        var body = JSON.parse(response.content);

        if (body.error)
            throw new Meteor.Error(0, body.error);

        var cookies = response.headers['set-cookie'];
        var qparams = {};

        cookies.forEach(function(cookie) {
            var qpart = cookie.split('=');
            qparams[decodeURIComponent(qpart[0])] = decodeURIComponent(qpart[1] || '');
        });

        var cookies = {
            csrftoken: qparams.csrftoken.substring(0, 32),
            sessionid: qparams.sessionid.substring(0, 32)
        }

        return cookies;
    },
    sendMessage: function(text, cookies) {
        var params = {
            text: text, 
            room: 'qHo9VLefohcj3DnI', 
            symbol: 'FROM:Botland', 
            meta: '{}'
        }

        var headers = {
            'Cookie': 'csrftoken=' + cookies.csrftoken + ';sessionid=' + cookies.sessionid
        }

        this.unblock();
        var response = HTTP.call('POST', 'https://www.tradingview.com/conversation-post/', {params: params, headers: headers});
    }
});