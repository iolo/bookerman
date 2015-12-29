import moment from 'moment';
import config from '../config';

/**
 * @typedef {Object} Event
 * @property {string} summary
 * @property {string} description
 * @property {string} location
 * @property {string} datetime
 * @property {Array.<string>} attendees
 * @property {string} start
 * @property {string} end
 */

const events = {

    /**
     * 특정 날짜에 해당하는 일정을 모두 검색한다.
     * @param {string} datetime
     * @returns {Promise}
     */
    findAll(datetime) {
        var timeMin = moment(datetime).set({hour: 9, minutes: 0}).format();
        var timeMax = moment(datetime).set({hour: 23, minutes: 59}).format();

        return new Promise((resolve) => {
            gapi.client.calendar.events.list({
                calendarId: config.CALENDAR_ID,
                showDeleted: false,
                singleEvents: true,
                maxResults: 300,
                timeMin: timeMin,
                timeMax: timeMax,
                timeZone: 'Asia/Seoul',
                orderBy: 'startTime'
            }).execute(function(events) {
                events = events.items.filter((event) => {
                    event.summary = event.summary.replace(/\[.+] /, '');

                    return config.TITLE_PATTERN.test(event.location);
                });

                resolve(events);
            });
        });
    },

    /**
     * 일정(이벤트)을 생성한다.
     * @param {Event} event
     * @returns {Promise}
     */
    create(event) {
        var date = moment(event.datetime);
        var start = moment(event.start, 'H:mm');
        var end = moment(event.end, 'H:mm');
        var startTime = date.set({hour: start.hours(), minutes: start.minutes()}).format();
        var endTime = date.set({hour: end.hours(), minutes: end.minutes()}).format();

        return new Promise((resolve) => {
            gapi.client.calendar.events.insert({
                calendarId: config.CALENDAR_ID,
                sendNotifications: true,
                resource: {
                    summary: `[${event.location}] ${event.summary}`,
                    description: event.description,
                    location: event.location,
                    start: {
                        dateTime: startTime,
                        timeZone: 'Asia/Seoul'
                    },
                    end: {
                        dateTime: endTime,
                        timeZone: 'Asia/Seoul'
                    },
                    attendees: event.attendees.map(email => {return {email}; }),
                    reminders: {
                        useDefault: false,
                        overrides: [
                            {method: 'email', 'minutes': 24 * 60},
                            {method: 'popup', 'minutes': 10}
                        ]
                    }
                }
            }).execute(resolve);
        });
    },

    /**
     * 일정(이벤트)을 삭제한다.
     * @param {string} eventId
     * @returns {Promise}
     */
    removeBy(eventId) {
        return new Promise((resolve) => {
            gapi.client.calendar.events.delete({
                calendarId: config.CALENDAR_ID,
                eventId
            }).execute(resolve);
        });
    }
};

export default events;
