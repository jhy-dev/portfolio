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
var historyObject=document.getElementById("gethistory").innerHTML;
historyObject=historyObject.replace(/&#34;/g,"\"");

var historyContents=JSON.parse(historyObject);


//=====================================================================create table
var historySection=document.getElementById("tableSection");
var createTable = document.createElement("table");
createTable.className="table table-hover table-responsive";
//=====================================================================create row
var titleRows=createTable.insertRow(0);
titleRows.className="table-active";
//=====================================================================create cells
var titlec1=titleRows.insertCell(0);
var titlec2=titleRows.insertCell(1);
var titlec3=titleRows.insertCell(2);
var titlec4=titleRows.insertCell(3);
var titlec5=titleRows.insertCell(4);
var titlec6=titleRows.insertCell(5);
titlec1.innerHTML="Search Keyword";
titlec2.innerHTML="Total";
titlec3.innerHTML="Positive";
titlec4.innerHTML="Negative";
titlec5.innerHTML="Average Score";
titlec6.innerHTML="Created at";






for(var i=0;i<historyContents.length;i++)
{
    //=====================================================================create rows and cells
    var rows=createTable.insertRow(i+1);
    var cell1=rows.insertCell(0);
    var cell2=rows.insertCell(1);
    var cell3=rows.insertCell(2);
    var cell4=rows.insertCell(3);
    var cell5=rows.insertCell(4);
    var cell6=rows.insertCell(5);

    var hyperlinkhistory = document.createElement('a');
    var linkText = document.createTextNode(historyContents[i].searchkeyword);
    hyperlinkhistory.appendChild(linkText);
    //embed with hyperlink that links to pastsearch
    hyperlinkhistory.href = "/pastsearch/"+historyContents[i].searchkeyword;
    cell1.appendChild(hyperlinkhistory);

    //history table elements
    cell2.innerHTML=historyContents[i].total;
    cell3.innerHTML=historyContents[i].positive;
    cell4.innerHTML=historyContents[i].negative;
    cell5.innerHTML=historyContents[i].averagescore;
    cell6.innerHTML=historyContents[i].created_at;
    createTable.appendChild(rows);
}
historySection.appendChild(createTable);