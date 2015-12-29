import React from 'react';

class Display extends React.Component {

    /**
     * Display을 렌더링한다.
     * @returns {ReactElement|XML}
     */
    render() {
        return (
            <div className="date-navi__date">
                <time dateTime={this.props.date.format('YYYY-MM-DD')}>
                    <span>{this.props.date.format('YYYY년 MM월 DD일')}</span>
                </time>
            </div>
        );
    }
}

/**
 * Display의 Props 인터페이스 정의
 * @param {moment} date
 */
Display.propTypes = {
    date: React.PropTypes.object.isRequired
};

/**
 * Display의 Props 기본값 정의
 */
Display.defaultProps = {};

export default Display;
