var express = require('express');
var path = require('path');
var app = express();

app.set('port', (process.env.PORT || 3000));
app.use(express.static(__dirname));

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(app.get('port'), function() {
  console.log("App running at: " + app.get('port'));
});