let express = require('express'),
    request = require('request'),
    http = require('http'),
    bodyParser = require('body-parser'),
    app = express();
const url = require('url');
if (typeof String.prototype.replaceAll == "undefined") {
    String.prototype.replaceAll = function(match, replace) {
        return this.replace(new RegExp(match, 'g'), () => replace);
    }
}

const serialize = function (obj) {
    var str = [];
    for (var p in obj)
        if (obj.hasOwnProperty(p)) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        }
    return str.join("&");
}

let myLimit = typeof (process.argv[2]) != 'undefined' ? process.argv[2] : '100kb';
app.use(bodyParser.json({limit: myLimit}));

app.all('*', function (req, res, next) {

    const queryObject = url.parse(req.url, true).query;

    // Set CORS headers: allow all origins, methods, and headers: you may want to lock this down in a production environment
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "*");

    if (req.method === 'OPTIONS') {
        res.send();
    } else {
        let targetURL = queryObject.url;
        if (!targetURL) {
            res.send(400, {error: 'YA şu urlyi gönder!!!'});
            return;
        }
        if (!targetURL.includes('https://') && !targetURL.includes('http://')) {
            targetURL = 'http://' + targetURL;
        }
        console.log(targetURL);

        request({url: targetURL, method: req.method, timeout: 1000},
            function (error, response, body) {
                let Replacer = body;
                if (!response) {
                    res.header("Content-Type", "application/json");
                    if(error.rawPacket){
                        Replacer = error.rawPacket.toString().replace(/(\\r|\\n|\n|\r)/gm, "");
                    }
                }
                res.send(200, Replacer);
            });
    }
});

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), function () {
    console.log('Proxy server listening on port ' + app.get('port'));
});

// 3000 portu kavsakproxy.izum domainine ayarlanacak bu domain ayarlanınca uygulama cors "free" çalışır