import React from 'react';
import mixin from 'react-mixin';
import {History} from 'react-router';
import Reservation from './reservation';
import ACTIONS from '../../../actions';
import {dispatch} from '../../../dispatcher';

class Timeline extends React.Component {

    /**
     * Timeline의 생성자
     * @constructs
     * @param {Timeline.propTypes} props
     */
    constructor(props) {
        super(props);

        this.state = {};
    }

    /**
     * Timeline이 rerender 되기 전 호출된다.
     * @param {Timeline.propTypes} nextProps
     * @returns {boolean}
     */
    shouldComponentUpdate(nextProps) {
        return (
            nextProps.rooms !== this.props.rooms ||
            nextProps.events !== this.props.events ||
            nextProps.profile !== this.props.profile ||
            nextProps.start !== this.props.start ||
            nextProps.end !== this.props.end
        );
    }

    /**
     * Timeline을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        const totalRoomCount = this.props.rooms.length;
        const reservations = this.props.rooms.map((room, index) => {
            const widthRatio = Math.floor(1 / totalRoomCount * 10000) / 100 + '%';
            const events = this.props.events.filter((event) => {
                const location = event.get('location');
                const isSameFloor = new RegExp('^' + room.floor, 'g');

                return (
                    isSameFloor.test(location) &&
                    location.indexOf(room.name) > -1 &&
                    location.indexOf(room.alias) > -1
                );
            });

            return (
                <Reservation
                    key={index}
                    floor={room.floor}
                    name={room.name}
                    alias={room.alias}
                    profile={this.props.profile}
                    start={this.props.start}
                    end={this.props.end}
                    events={events}
                    widthRatio={widthRatio}
                    onClickReservation={this._onClickReservation.bind(this)}
                    onClickTime={this._onClickTime.bind(this)}
                />
            );
        });

        return (
            <div className="timeline">
                <h2 className="blind">회의실 예약 현황</h2>
                {reservations}
            </div>
        );
    }

    /**
     * Reservation의 clickReservation 이벤트 리스너
     * @param {string} eventId
     * @param {number} x
     * @param {number} y
     * @private
     */
    _onClickReservation(eventId, x, y) {
        var targetEvent = this.props.events.find((event) => event.get('id') === eventId);
        var creatorEmail = targetEvent.get('creator').get('email');
        var signedUserEmail = this.props.profile.get('email');

        dispatch({type: ACTIONS.POPOVER_MODE, value: {
            show: true,
            useButton: creatorEmail === signedUserEmail,
            event: targetEvent,
            x,
            y
        }});
    }

    /**
     * Reservation의 clickTime 이벤트 리스너
     * @param {number} floor
     * @param {string} name
     * @param {string} alias
     * @param {string} time
     * @private
     */
    _onClickTime(floor, name, alias, time) {
        this.history.pushState(null, `/calendar/${this.props.date}/create`);

        dispatch({type: ACTIONS.CREATING, value: {floor, name, alias, time}});
    }
}

/**
 * Timeline의 Props 인터페이스 정의
 * @property {Array} rooms
 * @property {Immutable.List} events
 * @property {Immutable.Map} profile
 * @property {string} date
 * @property {number} start
 * @property {number} end
 */
Timeline.propTypes = {
    rooms: React.PropTypes.array.isRequired,
    events: React.PropTypes.object.isRequired,
    profile: React.PropTypes.object.isRequired,
    date: React.PropTypes.string.isRequired,
    start: React.PropTypes.number.isRequired,
    end: React.PropTypes.number.isRequired
};

/**
 * Timeline의 Props 기본값 정의
 */
Timeline.defaultProps = {};

mixin.onClass(Timeline, History);

export default Timeline;
