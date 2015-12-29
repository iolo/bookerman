import React from 'react';
import reactMixin from 'react-mixin';
import {Container} from 'flux/utils';
import config from '../../config';
import ajaxer from '../mixins/ajaxer';
import AppStore from '../../stores/app';
import ACTIONS from '../../actions';
import {dispatch} from '../../dispatcher';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Content from '../components/content';
import TimeGutter from '../components/timeGutter';
import Schedule from '../components/schedule';
import RoomTypes from '../components/roomTypes';
import Timeline from '../components/timeline';
import Preloader from '../components/preloader';
import Popover from '../components/popover';

@reactMixin.decorate(ajaxer)
class Calendar extends React.Component {

    /**
     * Calendar에서 구독할 Store를 지정한다.
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
            events: AppStore.getState().get('events'),
            users: AppStore.getState().get('users'),
            profile: AppStore.getState().get('profile'),
            extended: AppStore.getState().get('extended'),
            loading: AppStore.getState().get('loading'),
            popover: AppStore.getState().get('popover')
        };
    }

    /**
     * Calendar가 DOM 트리에 추가되기 전 호출된다.
     */
    componentWillMount() {
        this.ajaxer.prepareData(this.props.params.date);
    }

    /**
     * Calendar가 DOM 트리에 해제되기 전 호출된다.
     */
    componentWillUnmount() {
        dispatch({type: ACTIONS.LOADING_MODE, value: true});
    }

    /**
     * Calendar의 Prop이 갱신될 때 호출된다.
     * @param {Object} nextProps
     */
    componentWillReceiveProps(nextProps) {
        if (this.props.params.date !== nextProps.params.date) {
            this.ajaxer.updateEvents(nextProps.params.date);
        }
    }

    /**
     * Calendar을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        const params = this.props.params;
        const startTime = config.TIME_TERM.START;
        const endTime = config.TIME_TERM.END;
        const roomList = config.ROOM_LIST;

        return (
            <div>
                <Header date={params.date}/>
                <Sidebar date={params.date} minimal={this.state.extended}/>
                <Content extend={this.state.extended}>
                    <TimeGutter start={startTime} end={endTime}/>
                    <Schedule>
                        <RoomTypes rooms={roomList}/>
                        <Timeline
                            date={params.date}
                            rooms={roomList}
                            events={this.state.events}
                            profile={this.state.profile}
                            start={startTime}
                            end={endTime}
                        />
                    </Schedule>
                    <Popover date={params.date} options={this.state.popover}/>
                </Content>
                <Preloader show={this.state.loading}/>
                {this.props.children}
            </div>
        );
    }
}

const CalendarContainer = Container.create(Calendar);
export default CalendarContainer;
