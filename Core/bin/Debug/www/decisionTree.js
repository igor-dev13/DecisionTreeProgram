var express = require("express");
var bodyParser = require("body-parser");
const Json2csvParser = require('json2csv').Parser;
var fs = require("fs");

var app = express();
var jsonParser = bodyParser.json();
 
app.use(express.static(__dirname));

const historyFile = "history.json";
const csvFile = "history.csv";
 
app.post("/history", jsonParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    
    var jsonFile = "",
        dateTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
        guid = request.body.guid,
        label = request.body.label;

    var requestHandler = function() {
        fs.readFile(historyFile, 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                result = JSON.parse(data);
                result.table.push({ DateTime: dateTime, GUID: guid, Label: label });
                saveJson(result);
            }
        });
    }

    var callback = function () { }

    var saveJson = function (result) {
        json = JSON.stringify(result);
        fs.writeFile(historyFile, json, 'utf8', callback, saveCsv(result));
    }

    var saveCsv = function (result) {
        var fields = ['DateTime', 'GUID', 'Label'];
        var opts = { fields, delimiter: ';', withBOM: true };
        var parser = new Json2csvParser(opts);
        var csv = parser.parse(result.table);

        fs.writeFile(csvFile, csv, 'utf8', callback);
    }

    if (fs.existsSync(historyFile)) {
        requestHandler();
    }

    response.json(`${request.body.guid}`);
});
 
app.listen(3000);