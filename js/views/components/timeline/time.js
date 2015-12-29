import React from 'react';

class Time extends React.Component {

    /**
     * Time을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        const timeText = this.props.time.format('HH시 mm분');

        return (
            <li className="timeline__time" style={{height: this.props.heightRatio}}>
                <a href="#" role="button" onClick={this._onClick.bind(this)}>
                    <time><span className="blind">{timeText}</span></time>
                </a>
            </li>
        );
    }

    /**
     * a 엘리먼트의 click 이벤트 리스너
     * @param {SyntheticMouseEvent|MouseEvent} event
     * @private
     */
    _onClick(event) {
        event.preventDefault();

        if (this.props.onClick) {
            this.props.onClick(this.props.time.format());
        }
    }
}

/**
 * Time의 Props 인터페이스 정의
 * @property {moment} time
 * @property {string} heightRatio
 * @property {?function} onClick
 */
Time.propTypes = {
    time: React.PropTypes.object.isRequired,
    heightRatio: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func
};

/**
 * Time의 Props 기본값 정의
 */
Time.defaultProps = {};

export default Time;
