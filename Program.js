/* eslint-disable */
function draw(arr)
{
    /* eslint-enable */

    var graphDiv = $("<div/>", {"class": "graph"});

    for (var index = 0; index < arr.length; index++) {
        var Name = arr[index][0];

        var graphBarDiv = $("<div/>", {"class": "graph-bar"});
    
        var graphLabelDiv = $("<div/>", {"class": "graph-label"});
        var graphLabel = $("<p>" + Name + "</p>");
        graphLabelDiv.html(graphLabel);
    
        var graphBar = $("<div/>", {"class": "graph-value", "id": Name + "Value"});
    
        var graphPrecentageDiv = $("<div/>", {"class": "graph-percentage"});
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

function set(arr)
{
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
function terminate() 
{
    var child = require('child_process').execFile;
    var executablePath = "C:\\Users\\Ali\\OneDrive\\Projects and Assignments\\CN-GUI-Design\\SharkHunt.exe";
    
    child(executablePath, function(err, data) {
         console.log(err);
         console.log(data.toString());
    });

    var arr = convertToJSON();
    draw(arr);
}

function convertToJSON()
{
    console.log('converting');
    var spawn = require('child_process').spawnSync;
    var child = spawn('ConvertPackets.exe');
    console.log('Stdout here: \n' + child.stdout);

    var arr = [
        ['UDP', 20],
        ['TCP', 80]
    ];

    return arr;
}

function startCap()
{
    // var child = require('child_process').spawn;
    // var executablePath = "C:\\Program Files\\Wireshark\\tshark.exe";
    // var parameters = ["-i", "WiFi", "-J", "tcp", "-w", "sout"];
    
    // child(executablePath, parameters);
}

/* eslint-enable */