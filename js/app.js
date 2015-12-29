import 'moment/locale/ko';
import 'moment-timezone';
import 'core-js/es6/promise';
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import moment from 'moment';
import config from './config';
import googleAPI from './apis/googleApi';
import calendars from './apis/calendars';
import Calendar from './views/container/calendar';
import Operation from './views/container/operation';
import Authentication from './views/authentication';
import NotFound from './views/notFound';

moment.tz.setDefault(config.TIMEZONE);

var permissionVerified = false;

function authenticate(nextState, replaceState, next) {
    const today = moment().format('YYYY-MM-DD');
    const currentPath = nextState.location.pathname;

    googleAPI.authenticate().then(() => {
        if (!permissionVerified) {
            permissionVerified = true;

            return calendars.findAll().then((calendarList) => {
                const calendar = calendarList.some((c) => c.summary === config.CALENDAR_ID);

                if (!calendar) {
                    throw Error('access denied');
                }
            });
        }
    }).then(() => {
        if (currentPath === '/') {
            replaceState({nextPathname: currentPath}, `/calendar/${today}`);
        }

        next();
    }).catch((err) => {
        if (err.message === 'access denied') {
            alert(`${config.CALENDAR_ID} 캘린더에 접근할 수 없습니다.`);

            window.location.href = (`
                https://www.google.com/accounts/Logout?
                continue=https://appengine.google.com/_ah/logout?
                continue=${config.APPLICATION_URL}/auth
            `.replace(/\s/g, ''));

            return false;
        }

        replaceState({nextPathname: currentPath}, '/auth');

        next();
    });
}

window.activate = function() {
    googleAPI.load().then(() => {
        const wrapper = document.querySelector('.wrap');

        ReactDOM.render(
            <Router history={createBrowserHistory()}>
                <Route path="/(calendar/:date)" component={Calendar} onEnter={authenticate}>
                    <Route path="create" component={Operation} />
                </Route>
                <Route path="auth" component={Authentication}/>
                <Route path="*" component={NotFound}/>
            </Router>,
            wrapper
        );
    });
};
