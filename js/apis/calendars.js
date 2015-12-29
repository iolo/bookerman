const calendars = {

    /**
     * 로그인한 계정에 해당하는 캘린더 리스트를 반환한다.
     * @returns {Promise}
     */
    findAll() {
        return new Promise((resolve) => {
            gapi.client.calendar.calendarList.list().execute((resource) => {
                resolve(resource.items);
            });
        });
    }
};

export default calendars;
