import React from 'react';
import classnames from 'classnames';

class Time extends React.Component {

    /**
     * Time을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        const current = classnames({
            'time-gutter__time--current': this.props.current
        });

        return (
            <li className={`time-gutter__time ${current}`} style={{height: this.props.heightRatio}}>
                <span className="time-gutter__text">{`${this.props.hour}시`}</span>
                {this.props.current ? (
                <div className="time-gutter__indicator">
                    <span className="blind">(현재 시각)</span>
                </div>
                ) : ''}
            </li>
        );
    }
}

/**
 * Time의 Props 인터페이스 정의
 * @property {number} hour
 * @property {string} heightRatio
 * @property {boolean?} current
 */
Time.propTypes = {
    hour: React.PropTypes.number.isRequired,
    heightRatio: React.PropTypes.string.isRequired,
    current: React.PropTypes.bool
};

/**
 * Time의 Props 기본값 정의
 * @property {boolean} current
 */
Time.defaultProps = {
    current: false
};

export default Time;
