import Immutable from 'immutable';
import {MapStore} from 'flux/utils';
import Dispatcher from '../dispatcher';
import ACTIONS from '../actions';

class App extends MapStore {

    /**
     * App의 초기 상태를 반환한다.
     * @returns {Immutable.Map<K, V>}
     */
    getInitialState() {
        return Immutable.Map({
            events: Immutable.Map(),
            users: Immutable.Map(),
            profile: Immutable.Map(),
            extended: false,
            loading: true,
            popover: Immutable.Map({
                show: false,
                useButton: false,
                event: Immutable.Map(),
                x: 0,
                y: 0
            }),
            creating: Immutable.Map({
                name: '',
                alias: '',
                floor: 0,
                time: ''
            })
        });
    }

    /**
     * Action에 해당하는 작업을 수행한다.
     * @param {Immutable.Map<K, V>} state
     * @param {Object} action
     * @returns {Immutable.Map<K, V>}
     */
    reduce(state, action) {
        switch (action.type) {
            case ACTIONS.PREPARE_DATA:
                state = state.set('events', Immutable.fromJS(action.value.events));
                state = state.set('users', Immutable.fromJS(action.value.users));
                state = state.set('profile', Immutable.fromJS(action.value.profile));
                state = state.set('loading', action.value.loading);

                return state;
            case ACTIONS.UPDATE_EVENTS:
                state = state.set('events', Immutable.fromJS(action.value.events));
                state = state.set('loading', action.value.loading);
                state = state.set('popover', state.get('popover').set('show', false));

                return state;
            case ACTIONS.CREATING:
                var creating = state.get('creating');

                creating = creating.set('name', action.value.name || '');
                creating = creating.set('alias', action.value.alias || '');
                creating = creating.set('floor', action.value.floor || '');
                creating = creating.set('time', action.value.time || '');

                return state.set('creating', creating);
            case ACTIONS.TOGGLE_EXTEND_MODE:
                return state.set('extended', !state.get('extended'));
            case ACTIONS.LOADING_MODE:
                return state.set('loading', action.value);
            case ACTIONS.POPOVER_MODE:
                var popover = state.get('popover');

                popover = popover.set('show', action.value.show || false);
                popover = popover.set('useButton', action.value.useButton || false);
                popover = popover.set('event', action.value.event || Immutable.Map());
                popover = popover.set('x', action.value.x || 0);
                popover = popover.set('y', action.value.y || 0);

                return state.set('popover', popover);
            default:
                return state;
        }
    }
}

const app = new App(Dispatcher);
export default app;
