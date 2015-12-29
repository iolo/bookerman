const directory = {

    /**
     * 사원 목록을 반환한다.
     * @returns {Promise.<string>}
     */
    findAll() {
        return new Promise((resolve) => {
            gapi.client.directory.users.list({
                customer: 'my_customer',
                maxResults: 100,
                orderBy: 'email',
                viewType: 'domain_public'
            }).execute((directory) => {
                resolve(directory.users.slice(1));
            });
        });
    }
};

export default directory;
