import React from 'react';
import {Container} from 'flux/utils';
import config from '../../config';
import AppStore from '../../stores/app';
import ModalReservation from '../components/modalReservation';

class Operation extends React.Component {

    /**
     * Operation에서 구독할 Store를 지정한다.
     * @returns {Array.<FluxStore>}
     */
    static getStores() {
        return [AppStore];
    }

    /**
     * Store를 이용해 Calendar의 상태를 설정한다.
     * @returns {Object}
     */
    static calculateState() {
        return {
            creating: AppStore.getState().get('creating'),
            users: AppStore.getState().get('users')
        };
    }

    /**
     * Operation을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        const params = this.props.params;
        const startTime = config.TIME_TERM.START;
        const endTime = config.TIME_TERM.END;
        const roomList = config.ROOM_LIST;

        return (
            <ModalReservation
                date={params.date}
                show={true}
                rooms={roomList}
                users={this.state.users}
                values={this.state.creating}
                start={startTime}
                end={endTime}
            />
        );
    }
}

const OperationContainer = Container.create(Operation);
export default OperationContainer;
