const plus = {

    /**
     * 프로필 정보를 반환한다.
     * @param {string|number} userId
     */
    findBy(userId) {
        return new Promise((resolve) => {
            gapi.client.plus.people.get({
                userId
            }).execute(function(profile) {
                profile.email = profile.emails[0].value;

                resolve(profile);
            });
        });
    }
};

export default plus;
