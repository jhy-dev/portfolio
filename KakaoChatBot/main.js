var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var request = require('request');
var postCalendar = require('./Services/calendarpost');
var getCalendar = require('./Services/calendarget');
var app = express();
const GETPORT=5050;

const resCurrentWeather="날씨보기",
    resThisMonth="이번달",
    resThisWeek="일주일내",
    resReservation="예약하기";

const reservationStatus = {
    none: "none",
    first: "askDate",
    second: "askLocation",
    third: "askSummary",
    fourth: "askDuration",
    failDate: "errorDate",
    failHours: "errorHours"
};
let userReservation=[];

app.use(bodyParser.urlencoded({extended: false}));// url 인코딩 설정
app.use(bodyParser.json());// json 데이터 수집 설정




// 요청 응답 설정
app.get('/keyboard' , function(req, res){

    var data = {
        'type' : 'buttons',
        'buttons' : [resCurrentWeather, resThisMonth, resThisWeek, resReservation]
    };
    res.json(data);
});


app.post('/message' , async function (req, res) {
    process.env.TZ = 'Asia/Seoul';
    let currUser;
    //유저가 입력한 데이터
    console.log(req.body);

    var msg = req.body.content,
        userKey = req.body.user_key;
    createIfUserNotExisting(userKey);
    currUser = getCurrentUser(userKey);

    console.log('전달받은 메시지: ' + msg);
    console.log(currUser.status);

    var send = {};


    send = simpleLogic(msg, send);
    send = await weatherOption(msg, currUser, send);
    send = await googleCalendarEventsHandler(msg, currUser, send);
    send = await reservationLogic(msg, currUser, send);

    res.json(send);
});






















http.createServer(app).listen(process.env.PORT || GETPORT, function() {



    console.log('PORT SET UP...');
});

function requestWeather() {
    return new Promise(function (resolve) {
        request('https://api.openweathermap.org/data/2.5/weather?q=Busan&appid=e75bcdff57d4de56d7072126296cc2ce&units=metric&lang=kr', function (error, response, body) {
            if (!error && response.statusCode === 200) {
                //let weather=data.weather;
                //let temp=data.main.temp;
                //console.log(temp);
                let data = JSON.parse(body),
                    weather = (data.weather[0].description).toUpperCase(),
                    tempDegree = data.main.temp;


                //drizzle
                console.log(weather);
                console.log(tempDegree);

                var weatherinfo={
                    send_weather:weather,
                    send_degree:tempDegree
                };
                return resolve(weatherinfo);
            }
        });
    });

}

function getCalendarEventTexts(getEvents, send, titleText) {
    let eventString="";
    eventString+=titleText+" JHY님의 일정입니다.";
    eventString+="\n";
    for(let i=0;i<getEvents.length;i++)
    {
        eventString+=getEvents[i];
        eventString+="\n";
    }
    console.log(getEvents);
    send = {
        'message': {
            'text': eventString
        }
    };
    return send;
}

async function googleCalendarEventsHandler(msg, currUser, send) {
    if (msg === resThisWeek) {
        currUser.status = reservationStatus.none;
        var weeklyEvents = await getCalendar.getWeeklyEvents();
        send = getCalendarEventTexts(weeklyEvents, send, "일주일내");
    } else if (msg === resThisMonth) {
        currUser.status = reservationStatus.none;
        var monthlyEvents = await getCalendar.getMonthlyEvents();
        send = getCalendarEventTexts(monthlyEvents, send, "이번 달");
    }
    return send;
}

async function weatherOption(msg, currUser, send) {
    if (msg === resCurrentWeather) {
        currUser.status = reservationStatus.none;
        var weather = await requestWeather(),
            weatherTexts = weather.send_weather,
            weatherDegree = weather.send_degree;
        console.log(weather);
        send = {
            'message': {
                'text': "현재 부산 - [날씨: " + weatherTexts + " / 온도: " + weatherDegree + " 섭씨]"
            }
        };
    }
    return send;
}

function checkValidDate(msg, currUser, send) {
    return new Promise(function (resolve) {
        try {
            var parseDate = new Date(msg);
            parseDate.toISOString();
        } catch (Exception) {
            currUser.status = reservationStatus.failDate;
            send = {
                'message': {
                    'text': '에러 - 잘못된 형식입니다. 다시 입력해주세요\n ex) 2010-03-05 19:00'
                }
            };
            return resolve(send);
        }
        return resolve(send);
    });

}

async function reservationLogic(msg, currUser, send) {
    if (msg.includes(resReservation)) {
        currUser.status = reservationStatus.first;
        currUser.event.dateTime = "";
        currUser.event.duration = 1;
        currUser.event.summary = "";
        currUser.event.location = "";
        send = {
            'message': {
                'text': '예약하실 날짜를 입력해주세요. ex) 2010-03-05 19:00'
            }
        };
    } else if (currUser.status === reservationStatus.first) {
        currUser.status = reservationStatus.second;
        currUser.event.dateTime = msg;
        send = {
            'message': {
                'text': '예약 내용을 입력해주세요. ex) 면접'
            }
        };
        send = await checkValidDate(msg, currUser, send);
        //console.log(userReservation);
    }else if(currUser.status === reservationStatus.failDate){
        currUser.status = reservationStatus.second;
        currUser.event.dateTime = msg;
        send = {
            'message': {
                'text': '예약 내용을 입력해주세요. ex) 면접'
            }
        };
        send = await checkValidDate(msg, currUser, send);
        //console.log(userReservation);
    } else if (currUser.status === reservationStatus.second) {
        currUser.status = reservationStatus.third;
        currUser.event.summary = msg;
        send = {
            'message': {
                'text': '기간(hours)을 입력해주세요. ex) 2'
            }
        };
        //console.log(userReservation);
    } else if (currUser.status === reservationStatus.third) {
        currUser.status = reservationStatus.fourth;
        currUser.event.duration = msg;
        send = {
            'message': {
                'text': '장소를 입력해주세요. ex) 서울특별시 강남구'
            }
        };
        var hh=msg;
        hh = hh.replace(/\D/g,'');
        if(isNaN(parseInt(hh)))
        {
            currUser.status = reservationStatus.failHours;
            send = {
                'message': {
                    'text': '에러 - 기간(hours)은 숫자만 입력해주세요.\n ex) 2'
                }
            };
        }
    } else if(currUser.status === reservationStatus.failHours) {
        currUser.status = reservationStatus.fourth;
        currUser.event.duration = msg;
        send = {
            'message': {
                'text': '장소를 입력해주세요. ex) 서울특별시 강남구'
            }
        };
        var hh=msg;
        hh = hh.replace(/\D/g,'');
        if(isNaN(parseInt(hh)))
        {
            currUser.status = reservationStatus.failHours;
            send = {
                'message': {
                    'text': '에러 - 기간(hours)은 숫자만 입력해주세요. ex) 2'
                }
            };
        }
    }else if (currUser.status === reservationStatus.fourth) {
        currUser.status = reservationStatus.none;
        currUser.event.location = msg;
        send = {
            'message': {
                'text': '예약완료 했습니다.'
            }
        };
        try {
            await postCalendar.googleInsertEvent(currUser.event.dateTime, parseInt(currUser.event.duration), currUser.event.summary, currUser.event.location);
        } catch (exception) {
            send = {
                'message': {
                    'text': '날짜 형식 또는 기간(hours)을 잘못입력하셔서 에러가 났습니다.'
                }
            };
        }



    }
    return send;
}

function simpleLogic(msg, send) {
    if (msg.includes("안녕") || msg.includes("하이")) {
        send = {
            'message': {
                'text': '안녕하세요! 무엇을 도와드릴까요?'
            }
        };
    } else {
        send = {
            'message': {
                'text': '죄송합니다. 무슨 말씀인지 모르겠습니다.\n가능한 옵션은:\nOpenWeatherMap API\n1) 날씨보기\nGoogle Calendar API\n2) 예약하기 3)이번달 4) 일주일내'
            }
        };
    }
    return send;
}
function createIfUserNotExisting(userKey) {


    let alreadyExists = false;
    for (let i = 0; i < userReservation.length; i++) {
        if (userKey === userReservation[i].user_key) {
            alreadyExists = true;
        }
    }
    if (!alreadyExists) {
        const userData = {
            user_key: userKey,
            status: reservationStatus.none,
            event:{
                dateTime:"",
                duration:1,
                summary:"",
                location:""
            }
        };
        userReservation.push(userData);
    }
}

function getCurrentUser(userKey) {
    var tempUser;
    for (let i = 0; i < userReservation.length; i++) {
        if (userKey === userReservation[i].user_key) {
            tempUser = userReservation[i];
        }
    }
    return tempUser;
}