import React from 'react';
import moment from 'moment';
import Time from './time';
import Details from './details';

class Reservation extends React.Component {

    /**
     * Reservation을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        const roomName = `${this.props.floor}층 ${this.props.name}(${this.props.alias})`;
        const startTime = moment().hour(this.props.start).minute(0);
        const endTime = moment().hour(this.props.end).minute(0);
        const timeline = [];
        const timeRange = [];
        const heightRatio = Math.floor(1 / ((endTime.hour() - startTime.hour()) * 2) * 10000) / 100 + '%';

        while (startTime.hour() < endTime.hour()) {
            const time = startTime.clone();
            const timeFormat = time.format('HH:mm');

            timeline.push(
                <Time
                    key={timeFormat}
                    time={time}
                    heightRatio={heightRatio}
                    onClick={this._onClickTime.bind(this)}
                />
            );

            startTime.add(30, 'minute');
            timeRange.push(timeFormat);
        }

        timeRange.push(endTime.format('HH:mm'));

        return (
            <div className="timeline__reservation">
                <h3 className="blind">{roomName}</h3>
                <ul className="timeline__times">{timeline}</ul>
                <h3 className="blind">예약 상세 내역</h3>
                <Details
                    timeRange={timeRange}
                    events={this.props.events}
                    profile={this.props.profile}
                    heightRatio={parseFloat(heightRatio)}
                    onClick={this.props.onClickReservation}
                />
            </div>
        );
    }

    /**
     * Time의 click 이벤트 리스너
     * @param {string} time
     * @private
     */
    _onClickTime(time) {
        if (this.props.onClickTime) {
            this.props.onClickTime(this.props.floor, this.props.name, this.props.alias, time);
        }
    }
}

/**
 * Reservation의 Props 인터페이스 정의
 * @property {number|string} floor
 * @property {string} name
 * @property {string} alias
 * @property {Immutable.List} events
 * @property {Immutable.Map} profile
 * @property {number} start
 * @property {number} end
 * @property {?function} onClickReservation
 * @property {?function} onClickTime
 */
Reservation.propTypes = {
    floor: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]).isRequired,
    name: React.PropTypes.string.isRequired,
    alias: React.PropTypes.string.isRequired,
    events: React.PropTypes.object.isRequired,
    profile: React.PropTypes.object.isRequired,
    start: React.PropTypes.number.isRequired,
    end: React.PropTypes.number.isRequired,
    onClickReservation: React.PropTypes.func,
    onClickTime: React.PropTypes.func
};

/**
 * Reservation의 Props 기본값 정의
 */
Reservation.defaultProps = {};

export default Reservation;
