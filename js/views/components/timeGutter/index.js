import React from 'react';
import moment from 'moment';
import Time from './time';

class TimeGutter extends React.Component {

    /**
     * TimeGutter을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        const times = [];
        const startTime = moment().hour(this.props.start).minute(0);
        const endTime = moment().hour(this.props.end).minute(0);
        const current = moment().hour();
        const heightRatio = Math.floor(1 / (endTime.hour() - startTime.hour()) * 10000) / 100 + '%';

        while (startTime.hour() < endTime.hour()) {
            const time = startTime.clone();

            times.push(
                <Time
                    key={time.hour()}
                    current={current === time.hour()}
                    hour={time.hour()}
                    heightRatio={heightRatio}
                />
            );

            startTime.add(1, 'hour');
        }

        return (
            <div className="time-gutter">
                <div className="time-gutter__inner">
                    <ul className="time-gutter__times">
                        {times}
                    </ul>
                </div>
            </div>
        );
    }
}

/**
 * TimeGutter의 Props 인터페이스 정의
 * @property {number} start
 * @property {end} end
 */
TimeGutter.propTypes = {
    start: React.PropTypes.number.isRequired,
    end: React.PropTypes.number.isRequired
};

/**
 * TimeGutter의 Props 기본값 정의
 */
TimeGutter.defaultProps = {};

export default TimeGutter;
