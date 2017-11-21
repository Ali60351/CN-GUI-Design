/* eslint-disable */
var child_process = require('child_process');
var fs = require('fs');

function draw(arr) {
    /* eslint-enable */

    var graphDiv = $("<div/>", {
        "class": "graph"
    });

    for (var index = 0; index < arr.length; index++) {
        var Name = arr[index][0];

        var graphBarDiv = $("<div/>", {
            "class": "graph-bar"
        });

        var graphLabelDiv = $("<div/>", {
            "class": "graph-label"
        });
        var graphLabel = $("<p>" + Name + "</p>");
        graphLabelDiv.html(graphLabel);

        var graphBar = $("<div/>", {
            "class": "graph-value",
            "id": Name + "Value"
        });

        var graphPrecentageDiv = $("<div/>", {
            "class": "graph-percentage"
        });
        var graphPercentage = $("<p>" + "0%" + "</p>").attr("id", Name + "Percentage");
        graphPrecentageDiv.html(graphPercentage);

        graphBarDiv.append(graphLabelDiv);
        graphBarDiv.append(graphBar);
        graphBarDiv.append(graphPrecentageDiv);

        if (index == 0) {
            graphDiv.html(graphBarDiv);
        } else {
            graphDiv.append(graphBarDiv);
        }
    }

    // var Name = "Meow";

    // var graphDiv = $("<div/>", {"class": "graph"});
    // var graphBarDiv = $("<div/>", {"class": "graph-bar"});

    // var graphLabelDiv = $("<div/>", {"class": "graph-label"});
    // var graphLabel = $("<p>" + Name + "</p>");
    // graphLabelDiv.html(graphLabel);

    // var graphBar = $("<div/>", {"class": "graph-value", "id": Name + "Value"});

    // var graphPrecentageDiv = $("<div/>", {"class": "graph-percentage"});
    // var graphPercentage = $("<p>" + "0%" + "</p>").attr("id", Name + "Percentage");
    // graphPrecentageDiv.html(graphPercentage);

    // graphBarDiv.append(graphLabelDiv);
    // graphBarDiv.append(graphBar);
    // graphBarDiv.append(graphPrecentageDiv);

    // graphDiv.html(graphBarDiv);
    $("#target").html(graphDiv);

    setTimeout(function () {
        set(arr);
    }, 1000);
}

function set(arr) {
    for (var index = 0; index < arr.length; index++) {
        var Name = arr[index][0];
        var Value = arr[index][1];

        $("#" + Name + "Value").css("width", String((85 / 100) * Value) + "%");
        $("#" + Name + "Percentage").html(String(Value) + "%");
    }
    // var Value = arr[0][1];

    // $("#MeowValue").css("width", String((85 / 100) * Value) + "%");
    // $("#MeowPercentage").html(String(Value) + "%");
}

/* eslint-disable */
function terminate() {
    var executablePath = "SharkHunt.exe";
    console.log('Executing sharkhunt.exe');
    child_process.spawn(executablePath);

    child_process.spawnSync('node', ['c.js']);

    var arr = convertToJSON();
    draw(arr);
}

function convertToJSON() {
    console.log('converting');
    var contents = fs.readFileSync("output.json");
    var arr = [
        ['HTTPS', 0], // 0
        ['HTTP', 0], // 1
        ['FTP', 0], // 2
        ['DNS', 0], // 3
        ['SMTP', 0], // 4
        ['SIP', 0], // 5
        ['RTP', 0] // 6
    ];

    var previousA = 0;
    var previousB = 0;
    var port = 0;

    if (contents.length !== 0) { // Define to JSON type
        console.log("Buffer length: " + contents.length);
        var jsonContent = JSON.parse(contents);
        // Get Value from JSON
        console.log("jsonContent length: " + jsonContent.length);
        if (jsonContent.length !== 0) {
            console.log("jsonContent length: " + jsonContent.length);
            for (var i = 0; i < jsonContent.length; i++) {
                console.log('Inside Loop');
                if (jsonContent[i].hasOwnProperty('_source')) {
                    console.log('Inside 1st IF');
                    if (jsonContent[i]._source.hasOwnProperty('layers')) {
                        console.log('Inside 2nd IF');
                        if (jsonContent[i]._source.layers.hasOwnProperty('tcp.port')) {
                            //arr[0][1]++;
                            console.log('Inside 3rd IF');
                            console.log("ALALALA" + jsonContent[i]._source.layers['tcp.port']);
                            port = jsonContent[i]._source.layers['tcp.port'];
                            console.log('port[0]: ' + port[0]);
                            //port = port.split(',');

                            if ((port[0].valueOf() == 80) || (port[1].valueOf() == 80)) {
                                arr[1][1]++; //http
                            } else if ((port[0].valueOf() == 20) || (port[1].valueOf() == 20)) {
                                arr[2][1]++; //ftp
                            } else if ((port[0].valueOf() == 21) || (port[1].valueOf() == 21)) {
                                arr[2][1]++; //ftp
                            } else if ((port[0].valueOf() == 443) || (port[1].valueOf() == 443)) {
                                arr[0][1]++; //https
                            } else if ((port[0].valueOf() == 53) || (port[1].valueOf() == 53)) {
                                arr[3][1]++; //dns
                            } else if ((port[0].valueOf() == 25) || (port[1].valueOf() == 25)) {
                                arr[4][1]++; //smtp
                            } else if (((port[0].valueOf() >= 10000) && (port[0].valueOf() <= 30000)) ||
                                ((port[1].valueOf() >= 10000) && (port[1].valueOf() <= 30000))) {
                                if (isRTP(previousA, previousB)) {
                                    arr[6][1]++; //RTP
                                }
                            } else if (((port[0].valueOf() >= 5060) && (port[0].valueOf() <= 5065)) ||
                                ((port[1].valueOf() >= 5060) && (port[1].valueOf() <= 5065))) {
                                arr[5][1]++; //SIP
                            }

                            previousA = port[0].valueOf();
                            previousB = port[1].valueOf();
                        } else if (jsonContent[i]._source.layers.hasOwnProperty('udp.port')) {
                            port = jsonContent[i]._source.layers['udp.port'];
                            console.log('port[0]: ' + port[0]);
                            //port = port.split(',');

                            if ((port[0].valueOf() == 53) || (port[1].valueOf() == 53)) {
                                arr[3][1]++; //dns
                            } else if (((port[0].valueOf() >= 10000) && (port[0].valueOf() <= 30000)) ||
                                ((port[1].valueOf() >= 10000) && (port[1].valueOf() <= 30000))) {
                                if (isRTP(previousA, previousB)) {
                                    arr[6][1]++; //RTP
                                }
                            } else if (((port[0].valueOf() >= 5060) && (port[0].valueOf() <= 5065)) ||
                                ((port[1].valueOf() >= 5060) && (port[1].valueOf() <= 5065))) {
                                arr[5][1]++; //SIP
                            }

                            previousA = port[0].valueOf();
                            previousB = port[1].valueOf();
                        }
                    }
                }
            }
        }
    }

    var count = 0;

    for (var index = 0; index < arr.length; index++) {
        count += arr[index][1];
    }

    for (index = 0; index < arr.length; index++) {
        arr[index][1] = toInt(arr[index][1] / count * 100);
    }

    return arr;
}

function isRTP(prevA, prevB) {
    if (prevA >= 5060 && prevA <= 5065) {
        return true;
    }

    if (prevB >= 5060 && prevB <= 5065) {
        return true;
    }

    if (prevA >= 10000 && prevA <= 30000) {
        return true;
    }

    if (prevB >= 10000 && prevB <= 30000) {
        return true;
    }

    return false;
}

function toInt(n) {
    return Math.round(Number(n));
}

function startCap() {
    var executablePath = "C:\\Program Files\\Wireshark\\tshark.exe";
    var parameters = ["-i", "5", "-w", "sout"];

    child_process.spawn(executablePath, parameters);
}

/* eslint-enable */