const config = {
    CLIENT_ID: 'user_app_id.apps.googleusercontent.com',
    SCOPES: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/admin.directory.user.readonly',
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
    ],
    APPLICATION_URL: 'http://lezhin-room.dev',
    CALENDAR_ID: 'calendar@you_domain.com',
    ROOM_LIST: [
        {name: '대회의실', alias: '1번', floor: 1},
        {name: '소회의실', alias: '2번', floor: 1},
        {name: '소회의실', alias: '3번', floor: 1},
        {name: '중회의실', alias: '1번', floor: 2},
        {name: '소회의실', alias: '2번', floor: 2},
        {name: '휴게회의실', alias: '1번', floor: 4}
    ],
    TIMEZONE: 'Asia/Seoul',
    TIME_TERM: {
        START: 9,
        END: 20
    },
    TITLE_PATTERN: /^\d층, [\uac00-\ud7a3]+\(\d번\)+/i
};

export default config;
