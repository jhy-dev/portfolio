var bodyParser = require('body-parser');
var express = require('express');
const port = 3000;
var app = express();
app.use(bodyParser.urlencoded({extended: false}));// url 인코딩 설정
app.use(bodyParser.json());// json 데이터 수집 설정

var request=require('request');
request('https://api.openweathermap.org/data/2.5/weather?q=Busan&lang=kr&appid=e75bcdff57d4de56d7072126296cc2ce&units=metric', function (error, response, body) {
    if (!error && response.statusCode === 200) {
        //let weather=data.weather;
        //let temp=data.main.temp;
        //console.log(temp);
        let data=JSON.parse(body),
            notifyTexts="";
            weather=(data.weather[0].description).toUpperCase();
            tempDegree=data.main.temp;
        if(weather.includes("RAIN"))
        {
            notifyTexts="오늘은 비가 내립니다. 우산을 준비해주세요.";
        }
        else if(weather.includes("THUNDERSTORM"))
        {
            notifyTexts="오늘은 천둥 번개가 내립니다. 각별히 주의해주세요.";
        }
        else if(weather.includes("STORM"))
        {
            notifyTexts="오늘은 폭풍이 있습니다. 각별히 주의해주세요.";
        }
        console.log(weather);
        console.log(tempDegree);
        if(notifyTexts !== "")
        {

        }
    }
});

var http = require('http'),
    server = http.createServer(app);

var postCalendar = require('./Services/calendarpost');
var getCalendar = require('./Services/calendarget');
//var getEvents=getCalendar.getThisWeekEvents();


function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}
console.log(new Date());

console.log(new Date().toLocaleString());

server.listen(port, async function () {
    var monthlyEvents=await getCalendar.getMonthlyEvents();
    console.log("monthlyEvents "+monthlyEvents);
//var weeklyEvents=await getCalendar.getWeeklyEvents();
//console.log("weeklyEvents "+weeklyEvents);
    /*
    var hh="시간 sdfafwa 3";
    hh = hh.replace(/\D/g,'');
    if(!isNaN(parseInt(hh)))
    {
    }
    */

    /*






const getInsertTexts="2018-11-26 19:00 / 1 / 인터뷰 / 서울특별시 강남구";
let decomposeTexts=getInsertTexts.split('/'),
eventDateTime=decomposeTexts[0],
eventHours=parseInt(decomposeTexts[1]),
eventSummary=decomposeTexts[2],
eventLocation=decomposeTexts[3];
eventHours=eventHours.replace(/\s/g, '');
eventSummary=eventSummary.replace(/\s/g, '');
eventLocation=eventLocation.replace(/\s/g, '');
*/
    //console.log(eventDateTime);
    //console.log(eventHours);
    //console.log(eventSummary);
    //console.log(eventLocation);
    //postCalendar.googleInsertEvent(eventDateTime, eventHours, eventSummary, eventLocation);
    //console.log('http://localhost:%s',port);
});



