/**
 * @license
 * Copyright Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// [START calendar_quickstart]
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar', 'https://www.googleapis.com/auth/calendar.events'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';

module.exports={
    getMonthlyEvents : function()
    {
        return new Promise(function (resolve) {
            fs.readFile('credentials.json', async (err, content) => {
                if (err) return console.log('Error loading client secret file:', err);
                // Authorize a client with credentials, then call the Google Calendar API.
                var eventCalendar = await authorize(JSON.parse(content), getThisMonthEvents);
                return resolve(eventCalendar);
            });
        });

    },
    getWeeklyEvents : function()
    {
        return new Promise(function (resolve) {
            fs.readFile('credentials.json', async (err, content) => {
                if (err) return console.log('Error loading client secret file:', err);
                // Authorize a client with credentials, then call the Google Calendar API.
                var eventCalendar = await authorize(JSON.parse(content), getThisWeekEvents);
                return resolve(eventCalendar);
            });
        });
    }
};


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {

    return new Promise(function (resolve) {
        process.env.TZ = 'Asia/Seoul';
        const {client_secret, client_id, redirect_uris} = credentials.installed;
        const oAuth2Client = new google.auth.OAuth2(
            client_id, client_secret, redirect_uris[0]);

        // Check if we have previously stored a token.
        fs.readFile(TOKEN_PATH, async (err, token) => {
            if (err) return getAccessToken(oAuth2Client, callback);
            oAuth2Client.setCredentials(JSON.parse(token));
            var eventsCalendar = await callback(oAuth2Client);
            return resolve(eventsCalendar);
        });
    });


}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
    });
    console.log('Authorize this app by visiting this url:', authUrl);
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oAuth2Client.getToken(code, (err, token) => {
            if (err) return console.error('Error retrieving access token', err);
            oAuth2Client.setCredentials(token);
            // Store the token to disk for later program executions
            fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
                if (err) console.error(err);
                console.log('Token stored to', TOKEN_PATH);
            });
            callback(oAuth2Client);
        });
    });
}








function getThisMonthEvents(auth) {
    return new Promise(function (resolve) {
        let eventArray=[],
            thisMonth=parseInt(new Date().getMonth())+1;

        const calendar = google.calendar({version: 'v3', auth});

        calendar.events.list({
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            maxResults: 100,
            singleEvents: true,
            orderBy: 'startTime',
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const events = res.data.items;
            if (events.length) {
                //console.log('Upcoming events in this month:');
                events.map((event, i) => {
                    const start = event.start.dateTime || event.start.date;
                    let thisSchedule=new Date(start).toLocaleString(),
                        thisScheduleMonth=parseInt(new Date(thisSchedule).getMonth())+1;
                    //this month
                    if(thisMonth === thisScheduleMonth)
                    {
                        eventArray.push(thisSchedule+": "+event.summary);
                    }
                });
                return resolve(eventArray);
            } else {
                console.log('No upcoming events found.');
            }
        });
    });

}
function getThisWeekEvents(auth) {

    return new Promise(function (resolve) {
        let eventArray=[],
            curr = new Date(),
            first = curr.getDate();
        const tempfirst=first;
        let last = tempfirst+7,
            lastday = new Date(curr.setDate(last));

        const calendar = google.calendar({version: 'v3', auth});


        calendar.events.list({
            calendarId: 'primary',
            timeMin: (new Date()).toISOString(),
            maxResults: 100,
            singleEvents: true,
            orderBy: 'startTime',
        }, (err, res) => {
            if (err) return console.log('The API returned an error: ' + err);
            const events = res.data.items;
            if (events.length) {
                //console.log('Upcoming events in this month:');
                events.map((event, i) => {
                    const start = event.start.dateTime || event.start.date;
                    let thisSchedule=new Date(start).toLocaleString(),
                        thisScheduleMonth=parseInt(new Date(thisSchedule).getMonth())+1;
                    //this week range
                    if(new Date(start) <= new Date(lastday))
                    {
                        eventArray.push(thisSchedule+": "+event.summary);
                    }
                });
                return resolve(eventArray);
            } else {
                console.log('No upcoming events found.');
            }
        });
    });

}





















