import React from 'react';
import moment from 'moment';

class Body extends React.Component {

    /**
     * Body을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        const startTime = moment(this.props.start).format('HH:mm');
        const endTime = moment(this.props.end).format('HH:mm');

        return (
            <div className="popover__body">
                <ul className="popover__details">
                    <li className="popover__detail">
                        <span title={`${startTime} ~ ${endTime}`}>{`${startTime} ~ ${endTime}`}</span>
                    </li>
                    <li className="popover__detail ellipsis">
                        <span title="김승환님 예약">{`${this.props.creator}님 예약`}</span>
                    </li>
                    {this.props.attendees ? (
                        <li className="popover__detail">
                            <span title={`${this.props.attendees} 참석`}>
                                {`${this.props.attendees} 참석`}
                            </span>
                        </li>
                    ) : ''}
                </ul>
            </div>
        );
    }
}

/**
 * Body의 Props 인터페이스 정의
 * @property {?string} start
 * @property {?string} end
 * @property {?string} creator
 * @property {?string} attendees
 */
Body.propTypes = {
    start: React.PropTypes.string,
    end: React.PropTypes.string,
    creator: React.PropTypes.string,
    attendees: React.PropTypes.string
};

/**
 * Body의 Props 기본값 정의
 */
Body.defaultProps = {};

export default Body;
