/* eslint-disable */
function draw()
{
    /* eslint-enable */
    var Name = "Meow";
    var Value = 50;

    var graphDiv = $("<div/>", {"class": "graph"});
    var graphBarDiv = $("<div/>", {"class": "graph-bar"});

    var graphLabelDiv = $("<div/>", {"class": "graph-label"});
    var graphLabel = $("<p>" + Name + "</p>");
    graphLabelDiv.html(graphLabel);

    var graphBar = $("<div/>", {"class": "graph-value", "id": Name + "Value"});

    var graphPrecentageDiv = $("<div/>", {"class": "graph-percentage"});
    var graphPercentage = $("<p>" + String(Value) + "%" + "</p>").attr("id", Name + "Percentage");
    graphPrecentageDiv.html(graphPercentage);

    graphBarDiv.append(graphLabelDiv);
    graphBarDiv.append(graphBar);
    graphBarDiv.append(graphPrecentageDiv);

    graphDiv.html(graphBarDiv);
    $("#target").html(graphDiv);

    $("#MeowValue").css("width", String((85 / 100) * Value) + "%");
    $("#MeowPercentage").html(String(Value) + "%");
}