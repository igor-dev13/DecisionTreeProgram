var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");

var app = express();
var jsonParser = bodyParser.json();
 
app.use(express.static(__dirname));

const historyFile = "history.json";
 
app.post("/history", jsonParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    
    var jsonFile = "",
        id = request.body.id,
        title = request.body.title,
        number = 1;

    var requestHandler = function() {
        fs.readFile(historyFile, 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                result = JSON.parse(data);
                if (!result.table.find(addRecord)) {
                    result.table.push({ id: id, title: title, number: number });
                }

                json = JSON.stringify(result);
                fs.writeFile(historyFile, json, 'utf8', callback);
            }
        });
    }

    var callback = function() { }

    var addRecord = function(item) {
        if (item.id === id) {
            item.number += 1;
            return true;
        }
        return false;
    }

    if (fs.existsSync(historyFile)) {
        requestHandler();
    }

    response.json(`${request.body.id} - ${request.body.title}`);
});
 
app.get("/history", function (request, response) {

    var responseString = "<title>Статистика</title><h1>Статистика</h1>";

    var compareAge = function(objA, objB) {
        return objB.number - objA.number;
    }

    if (fs.existsSync(historyFile)) {
        fs.readFile(historyFile, 'utf8', function readFileCallback(err, data) {
            if (err) {
                console.log(err);
            } else {
                result = JSON.parse(data);
                result = result.table;
                result.sort(compareAge);

                for (var i = 0; i < result.length; i++) {
                    if (result[i].title == "" || result[i].title == "Выберите проблему")
                        continue;

                    responseString += "<p>" + result[i].title + " - " + result[i].number + "</p>";
                }

                response.send(responseString);
            }
        });
    }
});
 
app.listen(3000);