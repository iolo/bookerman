import React from 'react';
import moment from 'moment';

class SelectTime extends React.Component {

    /**
     * SelectTime의 생성자
     * @constructs
     * @param {SelectTime.propTypes} props
     */
    constructor(props) {
        super(props);

        this.state = {
            startTime: props.startTime,
            endTime: props.endTime,
            value: props.startTime
        };
    }

    /**
     * RoomTypes의 Props가 갱신될 떄 호출된다.
     * @param {SelectTime.propTypes} nextProps
     */
    componentWillReceiveProps(nextProps) {
        if (this.state.startTime !== nextProps.startTime) {
            this.setState({
                startTime: nextProps.startTime,
                endTime: nextProps.endTime,
                value: nextProps.startTime
            });
        }
    }

    /**
     * SelectTime을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        var startTime = this.state.startTime.clone();
        var endTime = this.state.endTime.clone();
        const selectedTime = this.state.value.clone();
        const startTimes = [];
        const endTimes = [];

        while (!startTime.isSame(endTime)) {
            const current = startTime.format('H:mm');

            startTimes.push(
                <option key={current} value={current}>{`${current}`}</option>
            );

            startTime.add(30, 'm');
        }

        startTime = selectedTime.add(30, 'm');
        endTime = endTime.add(30, 'm');

        while (!startTime.isSame(endTime)) {
            const current = startTime.format('H:mm');

            endTimes.push(
                <option key={current} value={current}>{`${current}`}</option>
            );

            startTime.add(30, 'm');
        }

        return (
            <div className="form-inline">
                <label>
                    <span>예약시간 :</span>
                    <select
                        className="form-control modal-reservation__clock"
                        name="start"
                        value={this.state.value.format('H:mm')}
                        onChange={this._onChangeStartTime.bind(this)}
                    >
                        {startTimes}
                    </select>
                    <span >부터</span>
                </label>
                <label>
                    <span className="blind">종료시간</span>
                    <select
                        className="form-control modal-reservation__clock end"
                        name="end"
                    >
                        {endTimes}
                    </select>
                    <span>까지</span>
                </label>
            </div>
        );
    }

    /**
     * startTime 옵션 메뉴의 change 이벤트 리스너
     * @param {SyntheticInputEvent} event
     * @private
     */
    _onChangeStartTime(event) {
        this.setState({
            value: moment(event.target.value, 'H:mm')
        });
    }
}

/**
 * SelectTime의 Props 인터페이스 정의
 * @property {moment} startTime
 * @property {moment} endTime
 */
SelectTime.propTypes = {
    startTime: React.PropTypes.object.isRequired,
    endTime: React.PropTypes.object.isRequired
};

/**
 * SelectTime의 Props 기본값 정의
 */
SelectTime.defaultProps = {};

export default SelectTime;
