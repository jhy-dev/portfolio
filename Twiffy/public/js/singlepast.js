$(function() {
    $(".knob").knob({
        'draw': function() {
            $(this.i).val(this.cv + '%')
        }
    })
});
$(document).ready(function() {
    $("#owl-slider").owlCarousel({
        navigation: true,
        slideSpeed: 300,
        paginationSpeed: 400,
        singleItem: true

    });
});
$(function() {
    $('select.styled').customSelect();
});
$(function() {
    $('#map').vectorMap({
        map: 'world_mill_en',
        series: {
            regions: [{
                values: gdpData,
                scale: ['#000', '#000'],
                normalizeFunction: 'polynomial'
            }]
        },
        backgroundColor: '#eef3f7',
        onLabelShow: function(e, el, code) {
            el.html(el.html() + ' (GDP - ' + gdpData[code] + ')');
        }
    });
});
var streamRunning=false;
var positiveWordSection=document.getElementById("mostpositivewords");
var negativeWordSection=document.getElementById("mostnegativewords");
var piegraphdiv= document.getElementById("piegraphSentiment");
var linegraphdiv= document.getElementById("linegraphSentiment");
var searchWhat=document.getElementById("searchingWhat");
var realtimeChatBox=document.getElementById("chatbox");
var overview=document.getElementById("overviewcontrol");

var searchObject=document.getElementById("pastsearchresult").innerHTML;
searchObject=searchObject.replace(/&#34;/g,"\"");
var tweet=JSON.parse(searchObject);
searchWhat.innerHTML="Search Keyword: "+tweet.searchkeyword;

RenderingOverviewControl(tweet);
RenderingRealTimeTweets(tweet);
RenderingSingleWord(tweet);
RenderingGraphs(tweet);




function RenderingOverviewControl(tweet)
{
    while(overview.firstChild)
    {
        overview.removeChild(overview.firstChild);
    }
    var headingstatus=document.createElement("h3");
    if(streamRunning)
    {
        headingstatus.innerHTML="Status: Now Running";
    }
    else {
        headingstatus.innerHTML="Status: Now Stopped";
    }
    var resumeButton=document.createElement("button");
    resumeButton.className="btn btn-default";
    resumeButton.id="resumeButtonId";
    resumeButton.innerHTML="Resume";
    var pauseButton=document.createElement("button");
    pauseButton.className="btn btn-default";
    pauseButton.id="pauseButtonId";
    pauseButton.innerHTML="Pause";
    overview.appendChild(headingstatus);

    var totalAnalysis = parseFloat(tweet.analysis[0].total);
    var positiveAnalysis = parseInt((parseFloat(tweet.analysis[0].positive) / totalAnalysis) * 100);
    var negativeAnalysis = parseInt((parseFloat(tweet.analysis[0].negative) / totalAnalysis) * 100);
    var averageAnalysis=tweet.analysis[0].averagescore.toFixed(2);
    var headingoverview=document.createElement("h3");
    var facecontainer=document.createElement("div");
    var emoticonImage=document.createElement("img");
    var descriptionEmoticon=document.createElement("p");

    if(positiveAnalysis>=80 && averageAnalysis > 2.5)
    {
        headingoverview.innerHTML="Overall: Really Good";
        emoticonImage.src="/img/good2.png";
        emoticonImage.style.cssText="width:200px; height:200px;";
        descriptionEmoticon.innerHTML="Total: " + tweet.analysis[0].total + " (Positive: " + tweet.analysis[0].positive + " Negative: " + tweet.analysis[0].negative + ")"+
            "- Average Score: " + tweet.analysis[0].averagescore.toFixed(2);
    }
    else if(positiveAnalysis>=65 && averageAnalysis>1.5)
    {
        headingoverview.innerHTML="Overall: Good";
        emoticonImage.src="/img/good1.gif";
        emoticonImage.style.cssText="width:200px; height:200px;";
    }
    else if(negativeAnalysis>=70 && averageAnalysis < -1.5)
    {
        headingoverview.innerHTML="Overall: Really Bad";
        emoticonImage.src="/img/bad2.png";
        emoticonImage.style.cssText="width:200px; height:200px;";
    }
    else if(negativeAnalysis>=55 && averageAnalysis<0)
    {
        headingoverview.innerHTML="Overall: Bad";
        emoticonImage.src="/img/bad1.png";
        emoticonImage.style.cssText="width:200px; height:200px;";
    }
    else {
        headingoverview.innerHTML="Overall: Ok";
        emoticonImage.src="/img/ok.gif";
        emoticonImage.style.cssText="width:200px; height:200px;";
    }
    descriptionEmoticon.innerHTML="<br>Total: " + tweet.analysis[0].total + " (Positive: " + tweet.analysis[0].positive + " | Negative: " + tweet.analysis[0].negative
        +" | Average Score: " + tweet.analysis[0].averagescore.toFixed(2)+ ")";
    facecontainer.appendChild(headingoverview);
    facecontainer.appendChild(emoticonImage);
    facecontainer.appendChild(descriptionEmoticon);
    overview.appendChild(facecontainer);




}








//===========================================================================Functions
function RenderingSingleWord(tweet) {
    var UniqueTweetTexts = removeDuplicates(tweet.everyword, "text");
    var positiveTweets = UniqueTweetTexts.slice();
    var negativeTweets = UniqueTweetTexts.slice();
    while (positiveWordSection.firstChild) {
        positiveWordSection.removeChild(positiveWordSection.firstChild);
    }
    while (negativeWordSection.firstChild) {
        negativeWordSection.removeChild(negativeWordSection.firstChild);
    }
    positiveTweets.sort(function (a, b) {
        return b.score - a.score;
    });
    negativeTweets.sort(function (a, b) {
        return a.score - b.score;
    });
    for (var i = 0; i < 25; i++) {
        try{
            if(positiveTweets[i].text!=="" && positiveTweets[i].score>0)
            {
                //positive
                var positiveWord = document.createElement("button");
                positiveWord.className = "btn btn-default tooltips";
                positiveWord.type = "button";
                positiveWord.innerHTML = positiveTweets[i].text;
                positiveWordSection.appendChild(positiveWord);
            }
            if(negativeTweets[i].text!=="" && negativeTweets[i].score<0)
            {
                //negative
                var negativeWord = document.createElement("button");
                negativeWord.className = "btn btn-default tooltips";
                negativeWord.type = "button";
                negativeWord.innerHTML = negativeTweets[i].text;
                negativeWordSection.appendChild(negativeWord);
            }

        }catch(Exception)
        {
            //console.log("index out of range - not created yet");
        }


        //console.log("pos " + positiveTweets[i].score);
        //console.log("neg " + negativeTweets[i].score);
    }
}

function RenderingRealTimeTweets(tweet) {
    while (realtimeChatBox.firstChild) {
        realtimeChatBox.removeChild(realtimeChatBox.firstChild);
    }
    for (var i = 0; i < 100; i++) {

        try{
            var tweetCreatedTime = new Date(tweet.tweetcomponents[i].created_at);
            if (i % 2 === 1) {
                var createLi = document.createElement("li");
                createLi.className = "by-me";
                var createAva = document.createElement("div");
                createAva.className = "avatar pull-left";
                var createImage = document.createElement("img");
                createImage.src = tweet.tweetcomponents[i].profileimage;
                createAva.appendChild(createImage);
                var chatContents = document.createElement("div");
                chatContents.className = "chat-content";
                var createMeta = document.createElement("div");
                createMeta.className = "chat-meta";
                var spanName = document.createElement("span");
                spanName.className = "pull-left";
                spanName.innerHTML = tweet.tweetcomponents[i].username + " (" + tweetCreatedTime.getHours() + ":" + tweetCreatedTime.getMinutes() + ":" + tweetCreatedTime.getSeconds() + ")";
                var pullTime = document.createElement("span");
                pullTime.className = "pull-right";
                pullTime.innerHTML = tweet.tweetcomponents[i].created_at;
                var textContent = document.createElement("p");
                textContent.innerHTML = "<br>" + (tweet.tweetcomponents[i].text);
                createMeta.appendChild(spanName);
                //createMeta.appendChild(pullTime);
                chatContents.appendChild(createMeta);
                chatContents.appendChild(textContent);
                createLi.appendChild(createAva);
                createLi.appendChild(chatContents);
                realtimeChatBox.appendChild(createLi);
            }
            else {
                var createLi = document.createElement("li");
                createLi.className = "by-other";
                var createAva = document.createElement("div");
                createAva.className = "avatar pull-right";
                var createImage = document.createElement("img");
                createImage.src = tweet.tweetcomponents[i].profileimage;
                createAva.appendChild(createImage);
                var chatContents = document.createElement("div");
                chatContents.className = "chat-content";
                var createMeta = document.createElement("div");
                createMeta.className = "chat-meta";
                var pullTime = document.createElement("span");
                pullTime.innerHTML = tweet.tweetcomponents[i].created_at;
                pullTime.className = "pull-left";
                var spanName = document.createElement("span");
                spanName.className = "pull-right";
                spanName.innerHTML = "(" + tweetCreatedTime.getHours() + ":" + tweetCreatedTime.getMinutes() + ":" + tweetCreatedTime.getSeconds() + ") " + tweet.tweetcomponents[i].username;
                var textContent = document.createElement("p");
                textContent.innerHTML = "<br>" + (tweet.tweetcomponents[i].text);
                //createMeta.appendChild(pullTime);
                createMeta.appendChild(spanName);
                chatContents.appendChild(createMeta);
                chatContents.appendChild(textContent);
                createLi.appendChild(createAva);
                createLi.appendChild(chatContents);
                realtimeChatBox.appendChild(createLi);
            }
        }catch(Exception)
        {
            //console.log("index out of range - not created yet");
        }




    }
}
function removeDuplicates( arr, prop ) {
    var obj = {};
    for ( var i = 0, len = arr.length; i < len; i++ ){
        if(!obj[arr[i][prop]]) obj[arr[i][prop]] = arr[i];
    }
    var newArr = [];
    for ( var key in obj ) newArr.push(obj[key]);
    return newArr;
}

function RenderingGraphs(tweet) {
    var totalAnalysis = parseFloat(tweet.analysis[0].total);
    var positiveAnalysis = parseInt((parseFloat(tweet.analysis[0].positive) / totalAnalysis) * 100);
    var negativeAnalysis = parseInt((parseFloat(tweet.analysis[0].negative) / totalAnalysis) * 100);
    while (piegraphdiv.firstChild) {
        piegraphdiv.removeChild(piegraphdiv.firstChild);
    }
    DrawPieGraph(positiveAnalysis, negativeAnalysis);
    while (piegraphdiv.firstChild) {
        piegraphdiv.removeChild(piegraphdiv.firstChild);
    }
    while (linegraphdiv.firstChild) {
        linegraphdiv.removeChild(linegraphdiv.firstChild);
    }
    DrawPieGraph(positiveAnalysis, negativeAnalysis);
    DrawLineGraph(tweet.tweetcomponents, parseFloat(tweet.analysis[0].averagescore));
    document.getElementById("pieDescription").innerHTML = "Pie Graph - Total: " + tweet.analysis[0].total + " (Positive: " + tweet.analysis[0].positive + " Negative: " + tweet.analysis[0].negative + ")";
    document.getElementById("lineDescription").innerHTML = "Line Graph (Recent 500 tweets) - Average Score: " + tweet.analysis[0].averagescore.toFixed(2);
}

//======================================================================Draw Graphs
function DrawPieGraph(postive, negative) {
    var w = 450,                        //width
        h = 450,                            //height
        r = 175,                            //radius
        color = d3.scale.category20c();     //builtin range of colors

    data = [{"label":"Good("+postive+"%)", "value":postive},
        {"label":"Bad("+negative+"%)", "value":negative}];

    var vis = d3.select("#piegraphSentiment")
        .append("svg:svg")              //create the SVG element inside the <body>
        .data([data])                   //associate our data with the document
        .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
        .attr("height", h)
        .append("svg:g")                //make a group to hold our pie chart
        .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r);

    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return d.value; });    //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
        .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
        .attr("class", "slice");    //allow us to style things in the slices (like text)

    arcs.append("svg:path")
        .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
        .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

    arcs.append("svg:text")                                     //add a label to each slice
        .attr("transform", function(d) {                    //set the label's origin to the center of the arc
            //we have to make sure to set these before calling arc.centroid
            d.innerRadius = 0;
            d.outerRadius = r;
            return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
        })
        .attr("text-anchor", "middle")                          //center the text on it's origin
        .text(function(d, i) { return data[i].label; });        //get the label from our original data array
}





function DrawLineGraph(tweetvalues, tweetaverage) {

    var averageScoreArray=[];
    tweetvalues.forEach(function (tt) {

        tt.created_at=new Date(tt.created_at);
        const params={
            created_at: tt.created_at,
            score: tweetaverage
        };
        averageScoreArray.push(params);
    })

    var data=null;
    if(tweetaverage !== 'NaN')
    {
        data = [
            {
                name: "Sentiment Analysis",
                values: tweetvalues
            },
            {
                name: "Average Score",
                values: averageScoreArray
            }


        ];
    }
    else {
        data = [
            {
                name: "Sentiment Analysis",
                values: tweetvalues
            }

        ];
    }


    var width = 600;
    var height = 400;
    var margin = 50;
    var duration = 250;

    var lineOpacity = "0.25";
    var lineOpacityHover = "0.85";
    var otherLinesOpacityHover = "0.1";
    var lineStroke = "1.5px";
    var lineStrokeHover = "2.5px";

    var circleOpacity = '0.85';
    var circleOpacityOnLineHover = "0.25"
    var circleRadius = 3;
    var circleRadiusHover = 6;


    /* Format Data */

    /* Scale */
    var xScale = d3.scaleTime()
        .domain([d3.min(data[0].values, d => d.created_at), d3.max(data[0].values, d => d.created_at)])
        .range([0, width-margin]);


    var yScale = d3.scaleLinear()
        .domain([d3.min(data[0].values, d => d.score), d3.max(data[0].values, d => d.score)])
        .range([height-margin, 0]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    /* Add SVG */
    var svg = d3.select("#linegraphSentiment").append("svg")
        .attr("width", (width+margin)+"px")
        .attr("height", (height+margin)+"px")
        .append('g')
        .attr("transform", `translate(${margin}, ${margin})`);


    /* Add line into SVG */
    var line = d3.line()
        .x(d => xScale(d.created_at))
        .y(d => yScale(d.score));

    let lines = svg.append('g')
        .attr('class', 'lines');

    lines.selectAll('.line-group')
        .data(data).enter()
        .append('g')
        .attr('class', 'line-group')
        .on("mouseover", function(d, i) {
            svg.append("text")
                .attr("class", "title-text")
                .style("fill", color(i))
                .text(d.name)
                .attr("text-anchor", "middle")
                .attr("x", (width-margin)/2)
                .attr("y", 5);
        })
        .on("mouseout", function(d) {
            svg.select(".title-text").remove();
        })
        .append('path')
        .attr('class', 'line')
        .attr('d', d => line(d.values))
        .style('stroke', (d, i) => color(i))
        .style('opacity', lineOpacity)
        .on("mouseover", function(d) {
            d3.selectAll('.line')
                .style('opacity', otherLinesOpacityHover);
            d3.selectAll('.circle')
                .style('opacity', circleOpacityOnLineHover);
            d3.select(this)
                .style('opacity', lineOpacityHover)
                .style("stroke-width", lineStrokeHover)
                .style("cursor", "pointer");
        })
        .on("mouseout", function(d) {
            d3.selectAll(".line")
                .style('opacity', lineOpacity);
            d3.selectAll('.circle')
                .style('opacity', circleOpacity);
            d3.select(this)
                .style("stroke-width", lineStroke)
                .style("cursor", "none");
        });


    /* Add circles in the line */
    lines.selectAll("circle-group")
        .data(data).enter()
        .append("g")
        .style("fill", (d, i) => color(i))
        .selectAll("circle")
        .data(d => d.values).enter()
        .append("g")
        .attr("class", "circle")
        .on("mouseover", function(d) {
            d3.select(this)
                .style("cursor", "pointer")
                .append("text")
                .attr("class", "text")
                .text(`${d.score}`)
                .attr("x", d => xScale(d.created_at) )
                .attr("y", d => yScale(d.score) );
        })
        .on("mouseout", function(d) {
            d3.select(this)
                .style("cursor", "none")
                .transition()
                .duration(duration)
                .selectAll(".text").remove();
        })
        .append("circle")
        .attr("cx", d => xScale(d.created_at))
        .attr("cy", d => yScale(d.score))
        .attr("r", circleRadius)
        .style('opacity', circleOpacity)
        .on("mouseover", function(d) {
            d3.select(this)
                .transition()
                .duration(duration)
                .attr("r", circleRadiusHover);
        })
        .on("mouseout", function(d) {
            d3.select(this)
                .transition()
                .duration(duration)
                .attr("r", circleRadius);
        });


    /* Add Axis into SVG */
    var xAxis = d3.axisBottom(xScale).ticks(5);
    var yAxis = d3.axisLeft(yScale).ticks(5);

    svg.append("g")
        .attr("class", "x axis")
        .attr("transform", `translate(0, ${height-margin})`)
        .call(xAxis);

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)
        .append('text')
        .attr("y", 15)
        .attr("transform", "rotate(-90)")
        .attr("fill", "#000")
        .text("Score");
}










