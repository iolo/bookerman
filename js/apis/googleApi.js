import config from '../config';

/**
 * 특정 API 객체를 불러온다.
 * @param {string} type
 * @param {string} version
 * @returns {Promise}
 */
function loadApi(type, version) {
    return new Promise((resolve) => {
        gapi.client.load(type, version, () => {
            resolve();
        });
    });
}

/**
 * Google API에 OAuth 인증을 하거나
 * 인증된 상태인지 판단한다.
 * @param {boolean?} [immediate=false]
 * @returns {Promise}
 */
function authenticating(immediate = false) {
    return new Promise((resolve, reject) => {
        var token = gapi.auth.getToken();

        if (token) {
            resolve(token);

            return false;
        }

        gapi.auth.authorize({
            'client_id': config.CLIENT_ID,
            scope: config.SCOPES,
            immediate
        }, (state) => {
            if (state && !state.error) {
                resolve(state);
            } else {
                reject(new Error(state.error), state);
            }
        });
    });
}

const googleApi = {

    /**
     * 사용하려는 구글 API를 불러온다.
     * @returns {Promise}
     */
    load() {
        return Promise.all([
            loadApi('calendar', 'v3'),
            loadApi('admin', 'directory_v1'),
            loadApi('plus', 'v1')
        ]);
    },

    /**
     * 인증을 진행한다.
     * @returns {Promise}
     */
    authorize() {
        return authenticating();
    },

    /**
     * 인증된 상태인지 판단한다.
     * @returns {Promise}
     */
    authenticate() {
        return authenticating(true);
    }
};

export default googleApi;
