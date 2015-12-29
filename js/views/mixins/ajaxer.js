import {dispatch} from '../../dispatcher';
import ACTIONS from '../../actions';
import events from '../../apis/events';
import directory from '../../apis/directory';
import plus from '../../apis/plus';

var ajaxer = {

    /**
     * 컴포넌트가 마운트 되기 전 호출된다.
     * ajaxer 객체를 생성하고, API 객체를 할당한다.
     */
    componentWillMount() {
        this.ajaxer = {
            events,
            directory,
            plus,
            prepareData: this._prepareData,
            updateEvents: this._updateEvents
        };
    },

    /**
     * 애플리케이션 기본 데이터를 가져온다.
     * @param {string} date
     */
    _prepareData(date) {
        return Promise.all([
            this.events.findAll(date),
            this.directory.findAll(),
            this.plus.findBy('me')
        ]).then((values) => {
            dispatch({
                type: ACTIONS.PREPARE_DATA,
                value: {
                    events: values[0],
                    users: values[1],
                    profile: values[2],
                    loading: false
                }
            });
        });
    },

    /**
     * 전달한 날짜를 기준으로 이벤트 목록을 갱신한다.
     * @param {string} date
     */
    _updateEvents(date) {
        dispatch({type: ACTIONS.LOADING_MODE, value: true});

        return this.events.findAll(date).then((events) => {
            dispatch({
                type: ACTIONS.UPDATE_EVENTS,
                value: {
                    events,
                    loading: false
                }
            });
        });
    }
};

export default ajaxer;
